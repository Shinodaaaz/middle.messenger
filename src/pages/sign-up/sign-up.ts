import Block, { Props } from '@/core/Block';
import { Button, Input, LinkButton } from '@/components';
import AuthCard from '@/components/auth-card/auth-card';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '@/utils/helpers/validators';

export default class SignUpPage extends Block {
  protected loginInput: Input;

  protected firstNameInput: Input;

  protected secondNameInput: Input;

  protected emailInput: Input;

  protected phoneInput: Input;

  protected passwordInput: Input;

  protected buttonSubmit: Button;

  protected buttonSignIn: Button;

  protected repeatInput: Input;

  constructor() {
    const firstNameInput = new Input({
      placeholder: 'Enter your first name',
      value: '',
      type: 'input',
      label: 'First name',
      id: 'first_name',
      autocomplete: 'first_name',
      name: 'first_name',
      onClear: () => {
        this.firstNameInput.setProps({
          value: '',
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            first_name: '',
          },
          errors: {
            ...this.props.errors,
          },
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const { value } = input;
        const error = validateName(input.value);

        this.setProps({
          formState: {
            ...this.props.formState,
            first_name: value,
          },
          errors: {
            ...this.props.errors,
            first_name: error,
          },
        });
      },
    });

    const secondNameInput = new Input({
      placeholder: 'Enter your second name',
      value: '',
      type: 'input',
      label: 'Second name',
      id: 'second_name',
      autocomplete: 'second_name',
      name: 'second_name',
      onClear: () => {
        this.secondNameInput.setProps({
          value: '',
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            second_name: '',
          },
          errors: {
            ...this.props.errors,
          },
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validateName(input.value);

        const { value } = input;

        this.setProps({
          formState: {
            ...this.props.formState,
            second_name: value,
          },
          errors: {
            ...this.props.errors,
            second_name: error,
          },
        });
      },
    });

    const emailInput = new Input({
      placeholder: 'Enter email',
      value: '',
      type: 'email',
      id: 'email',
      label: 'Email',
      autocomplete: 'email',
      name: 'email',
      onClear: () => {
        this.emailInput.setProps({
          value: '',
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            email: '',
          },
          errors: {
            ...this.props.errors,
            email: '',
          },
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validateEmail(input.value);
        const { value } = input;

        this.setProps({
          formState: {
            ...this.props.formState,
            email: value,
          },
          errors: {
            ...this.props.errors,
            email: error,
          },
        });
      },
    });

    const loginInput = new Input({
      placeholder: 'Enter login',
      value: '',
      type: 'login',
      id: 'login',
      label: 'Login',
      autocomplete: 'login',
      name: 'login',
      onClear: () => {
        this.loginInput.setProps({
          value: '',
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            login: '',
          },
          errors: {
            ...this.props.errors,
            login: '',
          },
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validateLogin(input.value);
        const { value } = input;

        this.setProps({
          formState: {
            ...this.props.formState,
            login: value,
          },
          errors: {
            ...this.props.errors,
            login: error,
          },
        });
      },
    });

    const phoneInput = new Input({
      placeholder: 'Enter phone number',
      value: '+',
      type: 'tel',
      id: 'phone',
      label: 'Phone number',
      autocomplete: 'phone',
      name: 'phone',
      onClear: () => {
        this.phoneInput.setProps({
          value: '',
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            phone: '',
          },
          errors: {
            ...this.props.errors,
            phone: '',
          },
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validatePhone(input.value);
        const { value } = input;

        this.setProps({
          formState: {
            ...this.props.formState,
            phone: value,
          },
          errors: {
            ...this.props.errors,
            phone: error,
          },
        });
      },
    });

    const passwordInput = new Input({
      placeholder: 'Enter password',
      value: '',
      type: 'password',
      id: 'password',
      label: 'Password',
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
      placeholder: 'Enter password',
      value: '',
      type: 'password',
      id: 'password_repeat',
      label: 'Repeat password',
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
      iconRight: 'sign-in',
      type: 'submit',
      label: 'Sign up',
      disabled: true,
      onClick: (event: Event) => {
        event.preventDefault();

        const {
          login,
          password,
          email,
          phone,
          first_name,
          second_name,
        } = this.props.formState;

        const formDataToSend = {
          first_name,
          second_name,
          login,
          email,
          phone,
          password,
        };

        console.log('Send form:', formDataToSend);
      },
    });

    const buttonSignIn = new LinkButton({
      label: 'Already have an account?',
      type: 'link',
    });

    super(
      'div',
      {
        formState: {
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          phone: '',
          password: '',
          password_repeat: '',
        },
        errors: {
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          phone: '',
          password: '',
          password_repeat: '',
        },
        className: 'container',
        AuthCardTemplate: new AuthCard({
          title: 'Create your CHAT account',
          formId: 'sign-up-form',
          children: [
            firstNameInput,
            secondNameInput,
            emailInput,
            loginInput,
            phoneInput,
            passwordInput,
            repeatInput,
            buttonSubmit,
            buttonSignIn,
          ],
        }),
      },
    );

    this.loginInput = loginInput;
    this.passwordInput = passwordInput;
    this.repeatInput = repeatInput;
    this.buttonSubmit = buttonSubmit;
    this.firstNameInput = firstNameInput;
    this.secondNameInput = secondNameInput;
    this.emailInput = emailInput;
    this.phoneInput = phoneInput;
    this.buttonSignIn = buttonSignIn;
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    const hasErrors = Object.values(_newProps.errors).some((error) => error !== '');
    const hasEmptyValues = Object.values(_newProps.formState).some((value) => value === '');

    this.buttonSubmit.setProps({ disabled: hasErrors || hasEmptyValues });

    this.buttonSignIn.setProps({ disabled: false });

    this.firstNameInput.setProps({
      value: _newProps.formState.first_name,
      error: _newProps.errors.first_name,
    });

    this.secondNameInput.setProps({
      value: _newProps.formState.second_name,
      error: _newProps.errors.second_name,
    });

    this.loginInput.setProps({
      value: _newProps.formState.login,
      error: _newProps.errors.login,
    });

    this.emailInput.setProps({
      value: _newProps.formState.email,
      error: _newProps.errors.email,
    });

    const phoneValue = _newProps.formState.phone === '' ? '+' : _newProps.formState.phone;

    this.phoneInput.setProps({
      value: phoneValue,
      error: _newProps.errors.phone,
    });

    this.passwordInput.setProps({
      value: _newProps.formState.password,
      error: _newProps.errors.password,
    });

    this.repeatInput.setProps({
      value: _newProps.formState.password_repeat,
      error: _newProps.errors.password_repeat,
    });

    return false;
  }

  render(): string {
    return `
      {{{AuthCardTemplate}}}
    `;
  }
}
