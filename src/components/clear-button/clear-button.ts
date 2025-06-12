import Block from "@/core/Block.ts";

type ClearButtonProps = {
  onClick?: () => void;
}

export default class ClearButton extends Block {
  constructor(props: ClearButtonProps) {
    super('button', {
      ...props,
      className: 'buttonClear',
      attrs: {
        type: 'button'
      },
      events: {
        click: props.onClick,
      }
    });
  }

  render(): string {
    return `
        <img src="/icons/close.svg" alt="close" />
    `;
  };
};
