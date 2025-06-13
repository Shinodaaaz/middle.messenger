import Block from '@/core/Block';
import { ClearButton } from '@/components';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onClear: () => void;
}
export default class SearchInput extends Block {
  constructor(props: SearchInputProps) {
    super('div', {
      ...props,
      className: 'search-input',
      ClearButton: new ClearButton({
        onClick: props.onClear,
      }),
    });
  }

  render(): string {
    return `
      <img src="/icons/search.svg" alt="search" class="search-input__icon search-input__icon--left" />
      {{{Input}}}
      <input
              type="text"
              class="search-input__field"
              placeholder="{{placeholder}}"
              value="{{value}}"
      />
      {{#if value }}
        {{{ClearButton}}}
      {{/if}}
    `;
  }
}
