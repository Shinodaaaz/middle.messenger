import Block from '@/core/Block';

interface AvatarProps {
  size?: string;
  avatarUrl?: string;
  nickName?: string;
  isOnline?: boolean;
}

export default class Avatar extends Block {
  constructor(props: AvatarProps) {
    const { size } = props;

    super(
      'div',
      {
        ...props,
        className: `avatar avatar${size ? `--${size}` : ''}`,
      },
    );
  }

  componentDidUpdate(oldProps: AvatarProps, newProps: AvatarProps): boolean {
    return oldProps.avatarUrl !== newProps.avatarUrl || oldProps.isOnline !== newProps.isOnline;
  }

  render(): string {
    return `
          {{#if avatarUrl}}
                <div class="avatar-image {{#unless (isEqual size "l")}}with-mask{{/unless}}"
                                style="background-image: url('{{avatarUrl}}')"></div>
          {{else}}
              <div class="avatar-default {{#unless (isEqual size "l")}}with-mask{{/unless}}">
            {{#if userName}}
                {{firstLetter nickName}}
            {{else}}
                <img src="/icons/user-avatar.svg" alt="avatar">
            {{/if}}
               </div>
          {{/if}}
          {{#unless (isEqual size "l")}}
              <div class="status-indicator {{#if isOnline}}status-indicator--online{{/if}}"></div>
          {{/unless}}
    `;
  }
}
