import Block from '@/core/Block';
import Input, { InputProps } from '@/components/input-field/Input';
import { ClearButton } from '@/components';

type InputFieldProps = InputProps & {
  label?: string;
  error?: string;
  iconLeft?: string;
  iconRight?: string;
  onClear?: () => void;
};

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    const { error, type } = props;
    const showClearButton = type !== 'password' && type !== 'tel';

    super('div', {
      ...props,
      className: 'input__container',
      Input: new Input({
        ...props,
        error,
      }),
      ClearButton: showClearButton ? new ClearButton({
        onClick: props.onClear,
      }) : null,
    });
  }

  componentDidUpdate(oldProps: InputFieldProps, newProps: InputFieldProps): boolean {
    const input = this.children.Input;

    if (input instanceof Block) {
      input.setProps({
        error: newProps.error,
        value: newProps.value,
      });
    }

    return true;
  }

  render(): string {
    return `
      {{#if iconLeft}}
        <img src="/icons/{{iconLeft}}.svg" class="input__icon input__icon--left" alt="icon" />
      {{/if}}

      {{{Input}}}

      {{#if label}}
        <label class="input__label" for="{{id}}">{{label}}</label>
      {{/if}}

      {{#if error}}
        <div class="input__description input__description--visible error-text">
          {{error}}
        </div>
      {{/if}}

      {{#if value }}
        {{{ClearButton}}}
      {{/if}}
    `;
  }
}
