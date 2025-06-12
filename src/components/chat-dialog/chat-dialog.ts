import Block from '@/core/Block';
import { Avatar, DropButton, InputMessage } from '@/components';

interface ChatDialogProps {
  nickName: string;
  avatarUrl: string;
  isOnline: boolean;
  children: Block[];
}

export default class ChatDialog extends Block {
  constructor(props: ChatDialogProps) {
    const contentBlock = new (class extends Block {
      constructor() {
        super('div', {
          ...props,
          className: 'dialog__footer__content',
          events: {

          },
        });
      }

      render() {
        return `
          <div class="dialog__footer__content__item">
              <img src="/icons/plus.svg" alt="location">
              <div class="dialog__footer__content__label">Add friend</div>
          </div>
          <div class="dialog__footer__content__item">
              <img src="/icons/trash.svg" alt="location">
              <div class="dialog__footer__content__label">Delete friend</div>
          </div>
    `;
      }
    })();
    const contentInsertBlock = new (class extends Block {
      constructor() {
        super('div', {
          ...props,
          className: 'dialog__footer__content',
        });
      }

      render() {
        return `
          <div class="dialog__footer__content">
                  <div class="dialog__footer__content__item">
                      <img src="/icons/image-video.svg" alt="location">
                      <div class="dialog__footer__content__label">
                          Image or video
                      </div>
                  </div>
                  <div class="dialog__footer__content__item">
                      <img src="/icons/location.svg" alt="location">
                      <div class="dialog__footer__content__label">
                          Location
                      </div>
                  </div>
                  <div class="dialog__footer__content__item">
                      <img src="/icons/file.svg" alt="location">
                      <div class="dialog__footer__content__label">
                          File
                      </div>
                  </div>
              </div>
    `;
      }
    })();

    super('div', {
      ...props,
      className: 'dialog',
      Messages: props.children,
      Avatar: new Avatar({
        avatarUrl: props.avatarUrl,
        isOnline: props.isOnline,
      }),
      DropButtonSettings: new DropButton({
        position: 'bottom-left',
        type: 'outline',
        iconRight: 'three-dots',
        Content: contentBlock,
      }),
      DropButtonInsert: new DropButton({
        position: 'top-right',
        type: 'outline',
        iconRight: 'paper-clip',
        Content: contentInsertBlock,
      }),
      InputMessage: new InputMessage({}),
    });
  }

  componentDidUpdate(oldProps: ChatDialogProps, newProps: ChatDialogProps): boolean {
    if (
      oldProps.avatarUrl !== newProps.avatarUrl
      || oldProps.nickName !== newProps.nickName
      || oldProps.isOnline !== newProps.isOnline
    ) {
      this.children.Avatar.setProps(newProps);
    }

    if (oldProps.children !== newProps.children) {
      this.children.Messages = newProps.children;
    }

    return true;
  }

  render(): string {
    return `
      <header class="dialog__header">
        <div class="dialog__header__info">
            {{{Avatar}}}
            {{nickName}}
        </div>

        <div class="dialog__header__actions">
            {{{DropButtonSettings}}}
        </div>
      </header>
      <main class="dialog__content">
        <div class="message-list">
            {{{Messages}}}
        </div>
      </main>
      <footer class="dialog__footer">
          {{{DropButtonInsert}}}
          {{{InputMessage}}}
      </footer>
    `;
  }
}
