export interface OptionType {
  value: string | number | boolean | object;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export interface SelectPlusProps {
  modelValue: string | number | boolean | object | Array<string | number | boolean | object>;
  options: OptionType[];
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  multiple?: boolean;
  multipleLimit?: number;
  placeholder?: string;
  loading?: boolean;
  remote?: boolean;
  noDataText?: string;
  noMatchText?: string;
  popperClass?: string;
  reserveKeyword?: boolean;
  collapseTags?: boolean;
  collapseTagsTooltip?: boolean;
  automaticDropdown?: boolean;
  clearIcon?: string;
  fitInputWidth?: boolean;
  suffixIcon?: string;
  tagType?: 'success' | 'info' | 'warning' | 'danger' | '';
  validateEvent?: boolean;
  placement?: Placement;
  loadingText?: string;
}

export interface SelectPlusEmits {
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'remove-tag', tag: any): void;
  (e: 'clear'): void;
  (e: 'blur', event: Event): void;
  (e: 'focus', event: Event): void;
  (e: 'remote-method', query: string): void;
}