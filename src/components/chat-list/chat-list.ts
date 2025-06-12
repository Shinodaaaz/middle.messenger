import Block, {Props} from "@/core/Block.ts";
import {LinkButton, SearchInput} from "@/components";

interface ChatListProps {
  children: Block[];
}

export default class ChatList extends Block {

  constructor(props: ChatListProps) {
    super("div",
      {
        ...props,
        className: "chat-list",
        LinkButton: new LinkButton({
          href: '',
          label: 'Profile'
        }),
        SearchInput: new SearchInput({
            placeholder: 'Search',
            value: '',
            onClear: () => {

            }
          },
        ),
        children: props.children
      });
  }

  componentDidUpdate(_oldProps: Props,
    _newProps: Props): boolean {
    return false;
  }

  render(): string {
    return `
       <div class="chat-list__header">
          <div class="chat-list__link">
              <img src="/icons/logo.svg" alt="">
              {{{LinkButton}}}
          </div>
          {{{ SearchInput }}}
      </div>
      <div class="chat-list__container">
            {{{children}}}
          <div class="shadow"></div>
      </div>
    `;
  };
};
