import Block from '@/core/Block';
import { Button, Popup } from '@/components';

interface SettingsLayoutProps {
  children: Block,
  mainHeaderIcon: string;
  accountSettingsActive: boolean;
  securitySettingsActive: boolean;
}
export default class SettingsLayout extends Block {
  constructor(props: SettingsLayoutProps) {
    const contentBlock = new (class extends Block {
      constructor() {
        super('div', {
          ...props,
          Button: new Button({
            label: 'Change',
            fullwidth: true,
          }),
          events: {

          },
        });
      }

      render() {
        return `
          <div class="change-avatar">
                  <div class="change-avatar__main">
                      pic.jpg
                  </div>
                  {{{Button}}}
                  {{#if errorText}}
                      <div class="change-avatar__error">
                          You need to select a file
                      </div>
                  {{/if}}
          </div>
    `;
      }
    })();
    const contentDownload = new (class extends Block {
      constructor() {
        super('div', {
          ...props,
          ButtonOutline: new Button({
            type: 'outline',
            label: 'Select a file on your computer',
          }),
          Button: new Button({
            label: 'Change',
            fullwidth: true,
          }),
          events: {

          },
        });
      }

      render() {
        return `
             <div class="change-avatar">
                              <div class="change-avatar__main">
                                  {{{ButtonOutline}}}
                              </div>
                              {{{Button}}}
                          </div>
    `;
      }
    })();

    super('div', {
      ...props,
      popupIsActive: false,
      popupIsUploadActive: false,
      PopupUpload: new Popup({
        title: 'File is uploaded',
        children: contentBlock,
      }),
      PopupDownload: new Popup({
        title: 'Download file',
        children: contentDownload,
      }),
    });
  }

  render(): string {
    return `
        <div class="profile">
              <aside class="profile__aside">
                  <div class="profile__aside__header">
                      <img src="/icons/logo.svg" alt="logo">
                      <div>
                          Settings
                      </div>
                  </div>
                  <div class="profile__aside__nav-item-container">
                      <div class="profile__aside__nav-item">
                          <div class="profile__aside__nav-item{{#if accountSettingsActive}}__active{{/if}}"></div>
                          <div class="profile__aside__nav-item__card {{#if accountSettingsActive}}active-nav-item{{/if}}">
                              <img src="/icons/user-avatar.svg" alt="user-avatar" width="20px" height="20px">
                              <div>
                                  Account
                              </div>
                          </div>
                      </div>
                      <div class="profile__aside__nav-item">
                          <div class="profile__aside__nav-item{{#if securitySettingsActive}}__active{{/if}}"></div>
                          <div class="profile__aside__nav-item__card {{#if securitySettingsActive}}active-nav-item{{/if}}">
                              <img src="/icons/security.svg" alt="user-avatar" width="20px" height="20px">
                              <div>
                                  Security
                              </div>
                          </div>
                      </div>
                  </div>
              </aside>
              <main class="profile__main">
                  <div class="profile__main__header">
                      <div class="profile__main__header-icon">
                          <img src="/icons/{{mainHeaderIcon}}.svg" alt="main-header-icon" width="20px" height="20px">
                      </div>
                      <div>
                          {{title}}
                      </div>
                      <img src="/icons/close.svg" alt="close" width="20px" height="20px">
                  </div>
                  <div class="profile__main__info">
                       {{{children}}}
                  </div>
              </main>
              {{#if popupIsActive}}
                      {{{PopupUpload}}}
              {{/if}}
              {{#if popupIsUploadActive}}
                      {{{PopupDownload}}}
              {{/if}}
        </div>
    `;
  }
}
