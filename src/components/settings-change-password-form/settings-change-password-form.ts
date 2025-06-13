import Block, { Props } from '@/core/Block';
import { Avatar, Button, Input } from '@/components';
import {
  validatePassword,
} from '@/utils/helpers/validators';

interface SettingsChangePasswordFormProps {
  avatarUrl: string;
}

export default class SettingsChangePasswordForm extends Block {
  protected passwordInput: Input;

  protected repeatInput: Input;

  protected buttonSubmit: Button;

  constructor(props: SettingsChangePasswordFormProps) {
    const passwordInput = new Input({
      placeholder: 'Enter your new password',
      value: '',
      type: 'password',
      id: 'password',
      label: 'New password',
      autocomplete: 'password',
      name: 'password',
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validatePassword(input.value);
        const { value } = input;

        this.setProps({
          formState: {
            ...this.props.formState,
            password: value,
          },
          errors: {
            ...this.props.errors,
            password: error,
          },
        });
      },
    });

    const repeatInput = new Input({
      placeholder: 'Repeat your password',
      value: '',
      type: 'password',
      id: 'password_repeat',
      label: 'New password',
      autocomplete: 'repeat password',
      name: 'password_repeat',
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const { value } = input;

        let error = '';

        if (value !== this.props.formState.password) {
          error = 'Passwords do not match';
        }

        this.setProps({
          formState: {
            ...this.props.formState,
            password_repeat: value,
          },
          errors: {
            ...this.props.errors,
            password_repeat: error,
          },
        });
      },
    });

    const buttonSubmit = new Button({
      type: 'submit',
      label: 'Save',
      disabled: true,
      onClick: (event: Event) => {
        event.preventDefault();

        const {
          password,
        } = this.props.formState;

        const formDataToSend = {
          password,
        };

        console.log('Send form:', formDataToSend);
      },
    });

    super('form', {
      ...props,
      formState: {
        password: '',
        password_repeat: '',
      },
      errors: {
        password: '',
        password_repeat: '',
      },
      className: 'account-details',
      Avatar: new Avatar({
        size: 'l',
        avatarUrl: props.avatarUrl,
      }),
      PasswordInput: passwordInput,
      RepeatPasswordInput: repeatInput,
      ButtonSubmit: buttonSubmit,
    });

    this.buttonSubmit = buttonSubmit;
    this.repeatInput = repeatInput;
    this.passwordInput = passwordInput;
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    this.passwordInput.setProps({
      value: _newProps.formState.password,
      error: _newProps.errors.password,
    });
    this.repeatInput.setProps({
      value: _newProps.formState.password_repeat,
      error: _newProps.errors.password_repeat,
    });

    const hasErrors = Object.values(_newProps.errors).some((error) => error !== '');
    const hasEmptyValues = Object.values(_newProps.formState).every((value) => value === '');

    this.buttonSubmit.setProps({ disabled: hasErrors || hasEmptyValues });

    return false;
  }

  render(): string {
    return `
        <div class="account-details__items">
          {{{PasswordInput}}}
          {{{RepeatPasswordInput}}}
          {{{ButtonSubmit}}}
        </div>
    `;
  }
}
