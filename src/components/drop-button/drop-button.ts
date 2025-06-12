import { Button } from '@/components';
import Block from '@/core/Block';

interface DropButtonProps {
  position: string;
  type: string;
  iconRight: string;
  Content: Block;
}

export default class DropButton extends Block {
  constructor(props: DropButtonProps) {
    super('div', {
      ...props,
      dropDownIsOpen: false,
      className: 'drop-button',
      Button: new Button({
        iconRight: props.iconRight,
        type: props.type,
        onClick: () => {
          this.setProps({ dropDownIsOpen: !this.props.dropDownIsOpen });
        },
      }),
    });
  }

  render(): string {
    return `
      {{{Button}}}
      {{#if dropDownIsOpen}}
        <div class="drop-button__content drop-button__content--{{position}}">
          {{{Content}}}
        </div>
      {{/if}}
    `;
  }
}
