import Block from "@/core/Block.ts";

interface PopupProps {
  children: Block,
  title: string;
}

export default class Popup extends Block {
  constructor(props: PopupProps) {
    super('div', {
      ...props,
      className: 'popup-container',
    });
  }


  render(): string {
    return `
      <div class="popup">
          <h2 class="popup__title">{{title}}</h2>
              {{{children}}}
      </div>
    `;
  };
};
