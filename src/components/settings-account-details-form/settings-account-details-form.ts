import Block, {Props} from "@/core/Block.ts";
import {Avatar, Button, Input} from "@/components";
import {validateEmail, validateLogin, validateName, validatePhone} from "@/utils/helpers/validators.ts";

interface SettingsAccountDetailsFormProps {
  avatarUrl: string;
}

export default class SettingsAccountDetailsForm extends Block {
  protected loginInput: Input;
  protected firstNameInput: Input;
  protected secondNameInput: Input;
  protected emailInput: Input;
  protected phoneInput: Input;
  protected buttonSubmit: Button;

  constructor(props: SettingsAccountDetailsFormProps) {
    const firstNameInput = new Input({
      placeholder: 'Enter your first name',
      value: '',
      type: 'input',
      label: 'First name',
      id: 'first_name',
      autocomplete: 'first_name',
      onClear: () => {
        this.firstNameInput.setProps({
          value: ''
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            first_name: '',
          },
          errors: {
            ...this.props.errors,
          }
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        const error = validateName(input.value, false);

        this.setProps({
          formState: {
            ...this.props.formState,
            first_name: value,
          },
          errors: {
            ...this.props.errors,
            first_name: error,
          }
        });
      }
    });

    const secondNameInput = new Input({
      placeholder: 'Enter your second name',
      value: '',
      type: 'input',
      label: 'Second name',
      id: 'second_name',
      autocomplete: 'second_name',
      onClear: () => {
        this.secondNameInput.setProps({
          value: ''
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            second_name: '',
          },
          errors: {
            ...this.props.errors,
          }
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validateName(input.value, false);

        const value = input.value;

        this.setProps({
          formState: {
            ...this.props.formState,
            second_name: value,
          },
          errors: {
            ...this.props.errors,
            error,
          },
        });
      }
    });

    const emailInput = new Input({
      placeholder: "Enter email",
      value: "",
      type: "email",
      id: "email",
      label: "Email",
      autocomplete: "email",
      onClear: () => {

        this.emailInput.setProps({
          value: ''
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            email: '',
          },
          errors: {
            ...this.props.errors,
            email: '',
          }
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validateEmail(input.value, false);
        const value = input.value;

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
      }
    });

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
        const error = validateLogin(input.value, false);
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

    const phoneInput = new Input({
      placeholder: "Enter phone number",
      value: "+",
      type: "tel",
      id: "phone",
      label: "Phone number",
      autocomplete: "phone",
      onClear: () => {
        this.phoneInput.setProps({
          value: ''
        });

        this.setProps({
          formState: {
            ...this.props.formState,
            phone: '',
          },
          errors: {
            ...this.props.errors,
            phone: '',
          }
        });
      },
      onBlur: (event: Event) => {
        const input = event.target as HTMLInputElement;
        const error = validatePhone(input.value, false);
        const value = input.value;

        this.setProps({
          formState: {
            ...this.props.formState,
            phone: value,
          },
          errors: {
            ...this.props.errors,
            phone: error,
          }
        });
      }
    });

    const buttonSubmit = new Button({
      type: "submit",
      label: 'Save',
      disabled: true,
      onClick: (event: Event) => {
        event.preventDefault();

        const {
          login,
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
        };

        console.log("Send form:", formDataToSend);
      }
    });

    super('form', {
      ...props,
      formState: {
        first_name: "",
        second_name: "",
        login: "",
        email: "",
        phone: "",
      },
      errors: {
        first_name: "",
        second_name: "",
        login: "",
        email: "",
        phone: "",
      },
      className: 'account-details',
      Avatar: new Avatar({
        size: 'l',
        avatarUrl: props.avatarUrl,
      }),
      FirstNameInput: firstNameInput,
      SecondNameInput: secondNameInput,
      EmailInput: emailInput,
      LoginInput: loginInput,
      PhoneInput: phoneInput,
      ButtonSubmit: buttonSubmit,
    });

    this.loginInput = loginInput;
    this.buttonSubmit = buttonSubmit;
    this.firstNameInput = firstNameInput;
    this.secondNameInput = secondNameInput;
    this.emailInput = emailInput;
    this.phoneInput = phoneInput;
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    this.firstNameInput.setProps({
      value: _newProps.formState.first_name,
      error: _newProps.errors.first_name
    });
    this.secondNameInput.setProps({
      value: _newProps.formState.second_name,
      error: _newProps.errors.second_name
    });
    this.loginInput.setProps({
      value: _newProps.formState.login,
      error: _newProps.errors.login
    });
    this.emailInput.setProps({
      value: _newProps.formState.email,
      error: _newProps.errors.email
    });

    const phoneValue = _newProps.formState.phone === '' ? '+' : _newProps.formState.phone;

    this.phoneInput.setProps({
      value: phoneValue,
      error: _newProps.errors.phone
    });


    const hasErrors = Object.values(_newProps.errors).some(error => error !== '');
    const hasEmptyValues = Object.values(_newProps.formState).every(value => value === '');

    this.buttonSubmit.setProps({ disabled: hasErrors || hasEmptyValues });

    return false;
  }

  render(): string {
    return `
        <div class="account-details__avatar">
            {{{Avatar}}}
            <label class="account-details__avatar__mask" for="avatar">
                Change avatar
            </label>
            <input id="avatar" name="avatar" type="file" accept="image/*" hidden />
        </div>
        <div class="account-details__items">
          {{{FirstNameInput}}}
          {{{SecondNameInput}}}
          {{{EmailInput}}}
          {{{LoginInput}}}
          {{{PhoneInput}}}
          {{{ButtonSubmit}}}
        </div>
    `;
  };
};
