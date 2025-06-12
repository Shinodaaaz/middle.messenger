import Block from "@/core/Block.ts";
import {SettingsAccountDetailsForm, SettingsLayout} from "@/components";

interface SettingsAccountDetailsPageProps {
  avatarUrl: string;
}

export default class SettingsAccountDetailsPage extends Block {
  constructor(props: SettingsAccountDetailsPageProps) {

    super('div', {
      ...props,
      Settings: new SettingsLayout({
        children: new SettingsAccountDetailsForm({
          avatarUrl: props.avatarUrl,
        }),
        mainHeaderIcon: 'user-avatar',
        accountSettingsActive: true,
        securitySettingsActive: false,
      })
    });
  }

  render(): string {
    return `
     {{{Settings}}}
    `;
  };
};
