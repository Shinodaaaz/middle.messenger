import Block, {Props} from "@/core/Block.ts";
import {Button, Input, LinkButton} from "@/components";
import AuthCard from "@/components/auth-card/auth-card.ts";
import {validateLogin, validatePassword} from "@/utils/helpers/validators.ts";

export default class SignInPage extends Block {
  protected loginInput: Input;
  protected passwordInput: Input;
  protected buttonSubmit: Button;

  constructor() {
    const loginInput = new Input({
      placeholder: "Enter login",
      value: "",
      type: "login",
      id: "login",
      label: "Login",
      autocomplete: "login",
      onClear: () => {
        this.loginInput.setProps({
          value: ''
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            login: '',
          },
          errors: {
            ...this.props.errors,
            login: '',
          }
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validateLogin(input.value);
        const value = input.value;

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
      }
    });

    const passwordInput = new Input({
      placeholder: "Enter password",
      value: "",
      type: "password",
      id: "password",
      label: "Password",
      autocomplete: "password",
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validatePassword(input.value);
        const value = input.value;

        this.setProps({
          formState: {
            ...this.props.formState,
            password: value,
          },
          errors: {
            ...this.props.errors,
            password: error,
          }
        });
      },
    });

    const buttonSubmit = new Button({
      iconRight: 'sign-in',
      type: "submit",
      label: 'Sign in',
      disabled: true,
      onClick: (event: Event) => {
        event.preventDefault();

        const {
          login,
          password
        } = this.props.formState;

        const formDataToSend = {
          login,
          password
        }
        console.log(formDataToSend)
      },
    });

    const buttonSignUp = new LinkButton({
      label: 'No account?',
      type: 'link',
      href: '#',
    });

    super("div",
      {
        formState: {
          login: "",
          password: "",
        },
        errors: {
          login: "",
          password: "",
        },
        className: "container",
        AuthCardTemplate: new AuthCard({
          title: "Sign in to your CHAT account",
          formId: 'sign-in-form',
          children: [
            loginInput,
            passwordInput,
            buttonSubmit,
            buttonSignUp,
          ]
        })
      });

    this.loginInput = loginInput;
    this.passwordInput = passwordInput;
    this.buttonSubmit = buttonSubmit;
  }
  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    const hasErrors = Object.values(_newProps.errors).some(error => error !== '');
    const hasEmptyValues = Object.values(_newProps.formState).some(value => value === '');

    this.buttonSubmit.setProps({ disabled: hasErrors || hasEmptyValues });

    this.loginInput.setProps({
      value: _newProps.formState.login,
      error: _newProps.errors.login,
    });

    this.passwordInput.setProps({
      value: _newProps.formState.password,
      error: _newProps.errors.password
    });

    return false;
  }

  render(): string {
    return `
      {{{AuthCardTemplate}}}
    `;
  };
};
