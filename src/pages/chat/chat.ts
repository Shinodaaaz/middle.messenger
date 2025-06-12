import Block from "@/core/Block.ts";
import {Button, ChatCard, ChatDialog, ChatList} from "@/components";
import {ChatCardProps} from "@/components/chat-card/chat-card.ts";
import {generateMockChats} from "@/utils/helpers/mocked/generateMockChatCards.ts";
import {mapMessages} from "@/utils/mappers/mapMessage.ts";

export interface IMessage {
  messageText: string;
  incoming: boolean;
  outgoing: boolean;
  timestamp: string;
  unread?: boolean;
}

export interface Chat {
  id: number;
  nickName: string;
  isOnline: boolean;
  avatarUrl: string;
  dialogMessages: IMessage[];
  isActive?: boolean;
}

interface ChatPageProps {}

export function mapChatToCard(chat: Chat): ChatCardProps {
  const lastMessage = chat.dialogMessages.at(-1);

  const unreadMessages = chat.dialogMessages.filter(msg => msg.unread).length;

  return {
    id: chat.id,
    isOnline: chat.isOnline,
    nickName: chat.nickName,
    lastMessageCount: unreadMessages > 0 ? String(unreadMessages) : '',
    time: lastMessage?.timestamp ?? '',
    dialogMessages: chat.dialogMessages,
    yourMessage: lastMessage?.outgoing ? lastMessage.messageText : undefined,
    message: !lastMessage?.outgoing ? lastMessage?.messageText : undefined,
    avatarUrl: chat.avatarUrl,
    isActive: chat.isActive ?? false,
  };
}

export default class ChatPage extends Block {
  private chats: Chat[];
  private chatCards: ChatCard[];

  constructor(props: ChatPageProps) {
    const chats = generateMockChats(5);

    const chatCards = chats.map((chat) =>
      new ChatCard({
        ...mapChatToCard(chat),
        onClick: () => {
          this.setProps({ activeChatId: chat.id });
        },
      })
    );

    super("div", {
      ...props,
      activeChatId: -1,
      chatListLength: chatCards.length,
      className: "chat-layout",
      ChatList: new ChatList({ children: chatCards }),
      AddFriendButton: new Button({
        label: 'Add friend',
        iconLeft: 'add-friend'
      }),
      ChatDialog: new ChatDialog({
        avatarUrl: '',
        nickName: '',
        isOnline: false,
        children: []
      }),
    });

    this.chats = chats;
    this.chatCards = chatCards;
  }

  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    const { activeChatId } = newProps;

    if (_oldProps.chatListLength > 0 && activeChatId !== undefined && activeChatId !== -1) {
      const activeChat = this.chats.find(chat => chat.id === activeChatId);
      if (!activeChat) return false;

      this.chatCards.forEach((card) => {
        const chat = this.chats.find(c => c.id === card.props.id);
        const isActive = chat?.id === activeChatId;
        if (chat) {
          card.setProps(mapChatToCard({ ...chat, isActive }));
        }
      });
      this.children.ChatDialog.setProps({
        avatarUrl: activeChat.avatarUrl,
        nickName: activeChat.nickName,
        isOnline: activeChat.isOnline,
        children: mapMessages(activeChat.dialogMessages),
      });
    }

    return true;
  }

  render(): string {
    return `
      <aside class="chat-sidebar">
        {{#if chatListLength}}
          {{{ChatList}}}
        {{else}}
          <p>No chats yet. Add a friend to start chatting!</p>
          {{{AddFriendButton}}}
        {{/if}}
      </aside>

      <main class="chat-dialog">
        {{#unless (isEqual activeChatId -1)}}
          {{{ChatDialog}}}
        {{else}}
            <div class="chat-dialog__empty">
                {{#if chatListLength}}
                    <p>Please select a chat to start messaging</p>
                {{/if}}
            </div>
        {{/unless}}
      </main>
    `;
  };
};
