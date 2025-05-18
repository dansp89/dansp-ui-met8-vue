// Importar tipos do Vue
import type { App, Plugin } from 'vue';

// Importar componentes
import InputField from './components/InputField.vue';
import CheckboxField from './components/CheckboxField.vue';
import ColorField from './components/ColorField.vue';
import EditorField from './components/EditorField.vue';
import RadioField from './components/RadioField.vue';
import SelectField from './components/SelectField.vue';
import SwitchField from './components/SwitchField.vue';
import TextareaField from './components/TextareaField.vue';

// Lista de todos os componentes
const components = {
  InputField,
  CheckboxField,
  ColorField,
  EditorField,
  RadioField,
  SelectField,
  SwitchField,
  TextareaField,
};

// Instalar o plugin
const install: Plugin['install'] = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};

// Exportar o plugin
const DanspUiMet8Vue = { install };

// Exportar componentes individuais
export {
  InputField,
  CheckboxField,
  ColorField,
  EditorField,
  RadioField,
  SelectField,
  SwitchField,
  TextareaField,
};

// Exportar plugin por padrão
export default DanspUiMet8Vue;