import Block from '@/core/Block';
import { ErrorPagesComponent } from '@/components';

export default class NotFound extends Block {
  constructor(props: any) {
    super(
      'div',
      {
        ...props,
        className: 'container',
        Error: new ErrorPagesComponent({
          href: '#',
          title: '404',
        }),
      },
    );
  }

  render(): string {
    return `
     {{{Error}}}
    `;
  }
}
