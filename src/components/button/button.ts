import Block, {Props} from "@/core/Block.ts";

interface ButtonProps {
  label?: string;
  onClick?: (e: Event) => void;
  iconRight?: string;
  iconLeft?: string;
  type?: string;
  disabled?: boolean;
  fullwidth?: boolean;
  size?: string;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    const {
      disabled = false,
      fullwidth = false,
      onClick
    } = props;

    super("button",
      {
        ...props,
        className: [
          'button',
          props.type && `button--${props.type}`,
          props.size && `button--${props.size}`,
          fullwidth && 'button--full-width'
        ].filter(Boolean).join(' '),
        attrs: {
          ...(disabled ? {disabled: true} : {}),

        },
        events: {
          click: onClick,
        },
      });
  }

  componentDidUpdate(oldProps: Props,
    newProps: Props): boolean {
    if (!this.element) return false;

    if (oldProps.disabled !== newProps.disabled) {
      if (newProps.disabled) {
        this.element.setAttribute("disabled",
          "true");
      } else {
        this.element.removeAttribute("disabled");
      }
    }

    return false;
  }

  render(): string {
    return `
      {{#if iconLeft}}
        <span class="button__icon {{#if label}}button__icon--left{{/if}}">
          <img src="/icons/{{iconLeft}}.svg" alt="icon left" width="20" height="20" />
        </span>
      {{/if}}

      {{#if label}}
        <span class="button__label">{{label}}</span>
      {{/if}}

      {{#if iconRight}}
        <span class="button__icon {{#if label}}button__icon--right{{/if}}">
          <img src="/icons/{{iconRight}}.svg" alt="icon right" width="20" height="20" />
        </span>
      {{/if}}
    `;
  };
};
