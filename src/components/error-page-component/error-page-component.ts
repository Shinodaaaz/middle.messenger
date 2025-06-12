import Block from "@/core/Block.ts";
import {LinkButton} from "@/components";

interface ErrorProps {
  title: string;
  href?: string;
}

export default class ErrorPagesComponent extends Block {
  constructor(props: ErrorProps) {
    const { href} = props;

    super("div",
      {
        ...props,
        className: "error",
        LinkButton: new LinkButton({
          label: 'Back to chats',
          href: href,
        })
      });
  }


  render(): string {
    return `
      <div class="error__title">
          {{title}}
          <p>
              We're already fixing it
          </p>
      </div>
      {{{LinkButton}}}
    `;
  };
};
