import Block from "@/core/Block.ts";

interface AuthCardProps {
  title: string;
  formId: string;
  children: Block[],
}
export default class AuthCard extends Block {
  constructor(props: AuthCardProps) {
    super("div", {
      ...props,
      className: "card",
    });
  }

  render(): string {
    return `
      <div class="card__header">
        <img class="card__logo" src="/icons/logo.svg" alt="logo"/>
        <h1 class="card__title">
          {{title}}
        </h1>
      </div>
      <form class="card__actions" id="{{formId}}" method="{{method}}">
        {{{children}}}
      </form>
    `;
  };
};
