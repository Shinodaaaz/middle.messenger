import Block from "@/core/Block.ts";

export default class Navigate extends Block {
  constructor() {
    super('nav', {

    });
  };

  render(): string {
    return `
      <ul class="page-list">
          <li><a href="#" page="signIn">Sign in</a></li>
          <li><a href="#" page="signUp">Sign up</a></li>
          <li><a href="#" page="notFound">Not found</a></li>
          <li><a href="#" page="serverError">Server error</a></li>
          <li><a href="#" page="chat">Chat</a></li>
          <li><a href="#" page="settingsAccountDetails">Settings account</a></li>
          <li><a href="#" page="settingsChange">Settings security</a></li>
      </ul>
    `;
  };
};
