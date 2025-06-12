import Block from "@/core/Block.ts";
import { Button } from "@/components";
import {validateMessage} from "@/utils/helpers/validators.ts";

interface InputMessageProps {
  value?: string;
  onSend?: (message: string) => void;
}

export default class InputMessage extends Block {
  private message: string = '';
  private error: string = 'The message should not be empty';

  constructor(props: InputMessageProps) {
    super('form', {
      ...props,
      className: 'input-message',
      Button: new Button({
        iconLeft: 'arrow-right',
        label: 'Enter message',
        size: 'sm',
        disabled: true,
      }),
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          const error = validateMessage(this.message);
          if (!error) {
            props.onSend?.(this.message);
            console.log({ message: this.message });

            // Очистка
            this.message = '';
            this.error = 'The message should not be empty';
            this.setButtonState();

            const input = this.element?.querySelector<HTMLInputElement>('#input-message-field');
            if (input) input.value = '';
          }
        },
        input: (e: Event) => {
          const target = e.target as HTMLInputElement;
          this.message = target.value;
          this.error = validateMessage(this.message);
          this.setButtonState();
        },
      }
    });
  }

  private setButtonState() {
    const isDisabled = !!this.error || !this.message.trim();
    this.children.Button.setProps({ disabled: isDisabled });
  }

  render(): string {
    return `
      <input
        class="input"
        id="input-message-field"
        name="message"
        type="text"
        placeholder="Enter message"
      />
      {{{Button}}}
    `;
  };
};
