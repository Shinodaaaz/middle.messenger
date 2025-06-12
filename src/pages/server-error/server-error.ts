import Block from "@/core/Block.ts";
import {ErrorPagesComponent} from "@/components";

export default class ServerError extends Block {
  constructor(props: any) {
    super("div",
      {
        ...props,
        className: 'container',
        Error: new ErrorPagesComponent({
          href: '#',
          title: '500',
        })
      });
  }

  render(): string {
    return `
     {{{Error}}}
    `;
  };
};
