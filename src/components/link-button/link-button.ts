import Block from '@/core/Block';

interface LinkButtonProps {
  label: string;
  onClick?: (e: Event) => void;
  iconRight?: string;
  iconLeft?: string;
  type?: string;
  href?: string;
}

export default class LinkButton extends Block {
  constructor(props: LinkButtonProps) {
    const {
      href,
      onClick,
    } = props;

    super(
      'a',
      {
        ...props,
        className: 'button button--link button--outline',
        attrs: {
          href,
        },
        events: {
          click: onClick,
        },
      },
    );
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
  }
}
