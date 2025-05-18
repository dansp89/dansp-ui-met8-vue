<template>
    <div class="container my-5">
      <h2>Testes de InputField</h2>
      <div class="row gy-10">
        <div class="col-md-4">
          <InputField
            v-model="fields.text"
            label="Texto"
            description="Campo texto simples"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.username"
            label="Username"
            type="username"
            description="Somente letras, números, ponto e underscore"
            required
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.email"
            label="E-mail"
            type="email"
            description="Validação automática de e-mail"
            :valid="valid.email"
            @email-valid="valid.email = $event"
            required
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            description="Campo senha"
            required
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.cpf"
            label="CPF"
            type="cpf"
            description="Apenas números, máscara automática"
            :valid="valid.cpf"
            @cpf-valid="valid.cpf = $event"
            required
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.cnpj"
            label="CNPJ"
            type="cnpj"
            description="Busca dados automáticos"
            :valid="valid.cnpj"
            @cnpj-valid="valid.cnpj = $event"
            @cnpjData="onCnpjData"
            required
          />
          <div v-if="cnpjData" class="small mt-1 text-success">
            Razão Social: {{ cnpjData.razao_social || cnpjData.nome || "-" }}
          </div>
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.number"
            label="Número"
            type="number"
            min="0"
            max="100"
            step="1"
            description="Campo numérico de 0 a 100"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.readonly"
            label="Readonly"
            :readonly="true"
            description="Campo somente leitura"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.disabled"
            label="Disabled"
            :disabled="true"
            description="Campo desabilitado"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.masked"
            label="Telefone"
            :mask="['(##) #####-####', '(##) ####-####']"
            description="Máscara customizada para telefone"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.autocomplete"
            label="Autocomplete"
            autocomplete="on"
            placeholder="Digite algo"
            description="Campo com autocomplete"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.minmax"
            label="Min/Max"
            minlength="5"
            maxlength="10"
            description="Min 5, Max 10 caracteres (letras, números, etc)"
          />
        </div>
      </div>
      <hr class="my-4" />
      <h4>Testes de outros tipos de input</h4>
      <div class="row g-3">
        <div class="col-md-4">
          <InputField
            v-model="fields.tel"
            label="Telefone (tel)"
            type="tel"
            description="Input tipo tel"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.url"
            label="URL"
            type="url"
            description="Input tipo url"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.search"
            label="Search"
            type="search"
            description="Input tipo search"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.date"
            label="Data"
            type="date"
            description="Input tipo date"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.datetime"
            label="Data/Hora Local"
            type="datetime-local"
            description="Input tipo datetime-local"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.month"
            label="Mês"
            type="month"
            description="Input tipo month"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.week"
            label="Semana"
            type="week"
            description="Input tipo week"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.time"
            label="Hora"
            type="time"
            description="Input tipo time"
          />
        </div>
        <div class="col-md-4">
          <InputField
            v-model="fields.color"
            label="Cor"
            type="color"
            description="Input tipo color"
          />
        </div>
        <div class="col-md-4">
          <CheckboxField
            v-model="fields.checkbox"
            label="Checkbox padrão (bool)"
            description="Input tipo checkbox"
          />
        </div>
        <div class="col-md-4">
          <SelectField
            v-model="fields.select"
            :options="selectOptions"
            label="Selecione uma opção"
            placeholder="Escolha..."
            description="Exemplo de select customizado com label flutuante."
          />
        </div>
        <div class="col-md-4">
          <ColorField
            v-model="fields.color"
            label="Cor personalizada"
            description="Escolha uma cor ou digite o valor hexadecimal"
          />
        </div>
        <div class="col-md-4">
          <SwitchField
            v-model="fields.switchOnOff"
            label="Switch ON/OFF"
            :valueOn="'on'"
            :valueOff="'off'"
            description="Switch com valores customizados (on/off)"
          />
          <SwitchField
            v-model="fields.switchBool"
            label="Switch bool"
            description="Switch booleano padrão"
          />
        </div>
        <div class="col-md-4">
          <RadioField
            v-model="fields.radio"
            label="Radio 1"
            name="radio"
            :value="'opcao1'"
          />
          <RadioField
            v-model="fields.radio"
            label="Radio 2"
            name="radio"
            :value="'opcao2'"
          />
        </div>
        <div class="col-12 mt-4">
          <pre>{{ fields }}</pre>
        </div>
        <div class="col-md-6 mb-3">
          <InputField
            v-model="fields.file"
            label="Arquivo"
            type="file"
            description="Input tipo file"
          />
        </div>
        <div class="col-md-6 mb-3">
          <InputField
            v-model="fields.range"
            label="Range"
            type="range"
            min="0"
            max="100"
            step="1"
            required
            description="Input tipo range"
          />
        </div>
        <div class="col-12 mb-3">
          <InputField
            v-model="fields.hidden"
            label="&nbsp;"
            type="hidden"
            description="Input tipo hidden (não aparece)"
          />
        </div>
        <div class="col-md-6 mb-3">
          <TextareaField
            v-model="fields.textarea"
            label="Textarea"
            description="Input tipo textarea"
            height="268px"
          />
        </div>
        <div class="col-md-6">
          <EditorField
            v-model="fields.editor"
            label="Editor"
            description="Input tipo editor"
          />
        </div>
  
        <!-- begin:: custom fields -->
        <div class="col-md-6 mb-3 selectplus">
          <SelectPlus
            v-model="fields.selectPlus"
            :options="selectOptions"
            @change="handleChange"
            filterable
            multiple
          />
        </div>
        <!-- end:: custom fields -->
        <hr class="h-100px" />
      </div>
      <pre class="mt-4 bg-light p-2 border">{{ fields }}</pre>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import SelectPlus from "@dansp/ui-met8-vue";
  
  export default defineComponent({
    name: "dashboard-main",
    components: { SelectPlus },
    setup() {
      const fields = reactive({
        color: "#ff0000",
        textarea: "",
        select: "",
        editor: "",
        selectPlus: "",
      });
  
      const selectOptions = [
        { value: "", label: "Escolha..." },
        { value: "1", label: "Opção 1" },
        { value: "2", label: "Opção 2" },
        { value: "3", label: "Opção 3", disabled: false },
        { value: "4", label: "Desabilitada", disabled: true },
      ];
  
      const valid = reactive({
        email: null,
        cpf: null,
        cnpj: null,
      });
  
      const cnpjData = ref<any>(null);
  
      function onCnpjData(data: any) {
        cnpjData.value = data;
        console.log(JSON.stringify(cnpjData.value, null, 2));
      }
  
      function handleChange(value: any) {
        console.log("Valor selecionado:", value);
        // Adicione aqui qualquer lógica adicional que você queira executar quando o valor mudar
      }
  
      return {
        fields,
        valid,
        cnpjData,
        onCnpjData,
        selectOptions,
        handleChange,
      };
    },
    data() {
      return {
        text: "",
        username: "",
        email: "",
        password: "",
        cpf: "",
        cnpj: "",
        number: "",
        readonly: "Somente leitura",
        disabled: "Desabilitado",
        masked: "",
        autocomplete: "",
        minmax: "",
        tel: "",
        url: "",
        search: "",
        date: "",
        datetime: "",
        month: "",
        week: "",
        time: "",
        color: "#000000",
        checkbox: false,
        radio: "",
        file: null,
        range: 50,
        hidden: "",
      };
    },
  });
  </script>
  