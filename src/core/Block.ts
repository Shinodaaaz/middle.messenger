import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from '@/core/EventBus';

export type Props = Record<string, any>;
type Children = Record<string, Block | Block[]>;
type Events = Record<string, EventListener>;

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string; props: Props } | null = null;

  private _id: string = nanoid(6);

  protected children: Children = {};

  protected props: Props;

  private eventBus: () => EventBus;

  constructor(tagName = 'div', propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName, props } = this._meta!;
    this._element = this._createDocumentElement(tagName);

    if (typeof props.className === 'string') {
      const classes = props.className.split(' ');
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === 'object') {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element!.setAttribute(attrName, String(attrValue));
      });
    }
  }

  private _getChildrenAndProps(propsAndChildren: Props): {
    props: Props;
    children: Children;
  } {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.every((item) => item instanceof Block)) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  get id(): string {
    return this._id;
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(_oldProps?: Props): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (oldProps !== newProps) {
      const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
      if (!shouldUpdate) {
        return;
      }
      this._render();
    }
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  public getProps() {
    return this.props;
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _addEvents(): void {
    const { events = {} } = this.props as { events: Events };

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.addEventListener(event, listener);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as { events: Events };

    Object.entries(events).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((component) => `<div data-id="${component._id}"></div>`)
          .join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component._id}"]`,
          );
          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(
          `[data-id="${child._id}"]`,
        );
        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  private _render(): void {
    this._removeEvents();
    const block = this._compile();

    if (this._element!.children.length === 0) {
      this._element!.appendChild(block);
    } else {
      this._element!.replaceChildren(block);
    }

    this._addEvents();
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  private _makePropsProxy(props: Props): Props {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;

        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
