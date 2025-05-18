// Tipos para o componente SelectPlus

/**
 * Interface para as opções do SelectPlus
 */
export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

// Extensão para o módulo Vue
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  
  interface SelectPlusProps {
    modelValue?: any;
    options?: SelectOption[];
    disabled?: boolean;
    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
    loading?: boolean;
  }

  const component: DefineComponent<SelectPlusProps>;
  export default component;
}

// Exportação para uso em outros arquivos
export {};
