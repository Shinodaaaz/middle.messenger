import Block, { Props } from '@/core/Block';

export type InputProps = {
  type: string;
  id: string;
  name: string;
  onBlur?: (e: Event) => void;
  onChange?: (e: Event) => void;
  value?: string;
  autocomplete?: string;
  error?: string;
  placeholder?: string;
  accept?: string;
  hidden?: boolean;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super(
      'input',
      {
        ...props,
        className: props.error ? 'input__field errorField' : 'input__field',
        attrs: {
          placeholder: props.placeholder,
          autocomplete: props.autocomplete,
          value: props.value,
          type: props.type,
          name: props.name,
          id: props.id,
          accept: props.accept,
          ...(props.hidden ? { hidden: true } : {}),
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

    if (this.element && isErrorChanged) {
      this.element.className = newProps.error ? 'input__field errorField' : 'input__field';
    }

    // Всё равно вызывай также:
    if (this.element) {
      (this.element as HTMLInputElement).value = newProps.value ?? '';
    }

    return false;
  }
}
