import Block from '@/core/Block';

interface MessageProps {
  messageText: string,
  timestamp: string,
  incoming: boolean,
  outgoing: boolean,
  unread?: boolean,
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super('div', {
      ...props,
      className: `message message--${props.outgoing ? 'outgoing' : 'incoming'}`,
    });
  }

  render(): string {
    return `
      <div class="message__content">
        {{messageText}}
      </div>
      <div class="message__meta">
          <span class="message__time">{{timestamp}}</span>
          <svg class="message__status" viewBox="0 0 16 16">
              {{#if outgoing}}
                  <path d="M3 8l3 3 7-7" stroke="currentColor" fill="none"/>
                  <path d="M7 11l3 3 7-7" stroke="currentColor" fill="none"/>
                  {{else}}
                  <path d="M3 8l3 3 7-7" stroke="currentColor" fill="none"/>
              {{/if}}
          </svg>
      </div>
    `;
  }
}
