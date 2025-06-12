import Block, { Props } from '@/core/Block';

export type InputProps = {
  placeholder: string;
  type: string;
  id: string;
  onBlur?: (e: Event) => void;
  onChange?: (e: Event) => void;
  value?: string;
  autocomplete?: string;
  error?: string;
  name?: string;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super(
      'input',
      {
        ...props,
        className: 'input__field',
        attrs: {
          placeholder: props.placeholder,
          autocomplete: props.autocomplete,
          value: props.value,
          type: props.type,
          name: props.name,
          id: props.id,
        },
        events: {
          blur: props.onBlur,
        },
      },
    );
  }

  componentDidUpdate(
    oldProps: Props,
    newProps: Props,
  ): boolean {
    const isErrorChanged = oldProps.error !== newProps.error;
    const isValueChanged = oldProps.value !== newProps.value;

    if (this.element && isErrorChanged) {
      this.element.className = newProps.error ? 'input__field errorField' : 'input__field';
    }

    if (this.element && isValueChanged) {
      (this.element as HTMLInputElement).value = newProps.value ?? '';
    }

    return false;
  }
}
