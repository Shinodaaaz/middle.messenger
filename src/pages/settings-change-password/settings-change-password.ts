import Block from '@/core/Block';
import { SettingsChangePasswordForm, SettingsLayout } from '@/components';

interface SettingsChangePasswordProps {
  avatarUrl: string;
}

export default class SettingsChangePassword extends Block {
  constructor(props: SettingsChangePasswordProps) {
    super('div', {
      ...props,
      Settings: new SettingsLayout({
        children: new SettingsChangePasswordForm({
          avatarUrl: props.avatarUrl,
        }),
        mainHeaderIcon: 'security',
        accountSettingsActive: false,
        securitySettingsActive: true,
      }),
    });
  }

  render(): string {
    return `
        {{{Settings}}}
    `;
  }
}
