import Block, { Props } from '@/core/Block';
import { Avatar } from '@/components';
import { IMessage } from '@/pages/chat/chat';

export interface ChatCardProps {
  id: number;
  isOnline: boolean;
  nickName: string;
  lastMessageCount: string;
  time: string;
  dialogMessages: IMessage[];
  yourMessage?: string;
  message?: string;
  avatarUrl?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default class ChatCard extends Block {
  constructor(props: ChatCardProps) {
    super(
      'div',
      {
        ...props,
        className: 'chat-card',
        Avatar: new Avatar({
          isOnline: props.isOnline,
          avatarUrl: props.avatarUrl,
          nickName: props.nickName,
        }),
        events: {
          click: props.onClick,
        },
      },
    );
  }

  getProps() {
    return this.props;
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const isActiveChanged = oldProps.isActive !== newProps.isActive;

    if (this.element && isActiveChanged) {
      this.element.className = newProps.isActive ? 'chat-card active' : 'chat-card';
    }

    return false;
  }

  render(): string {
    return `
        {{{Avatar}}}
        <div class="chat-card__info">
            <div class="chat-card__info-title">
                {{nickName}}
            </div>
            <div class="chat-card__info-message">
                {{#if yourMessage}}
                    <span>You:</span>
                {{/if}}
                {{message}}
            </div>
        </div>
        <div class="chat-card__counters">
            <div>
                {{time}}
            </div>
            {{#if lastMessageCount}}
                <div class="chat-card__counters__circle">
                    {{lastMessageCount}}
                </div>
            {{/if}}
        </div>
    `;
  }
}
