<template>
  <!-- Checkbox, Radio, Switch -->
  <div v-if="isCheckable" :class="formCheckClass">
    <input
      :key="inputId"
      :type="inputType"
      class="form-check-input mb-3"
      :id="inputId"
      :name="name"
      :disabled="disabled"
      :required="required"
      :checked="
        inputType === 'radio' ? inputValue === value : isSwitchOrCheckboxChecked
      "
      v-model="inputValueProxy"
      @change="onInput"
      :aria-label="noLabel ? label : undefined"
      v-if="isSwitch"
      role="switch"
    />
    <input
      v-else
      :key="inputId"
      :type="inputType"
      class="form-check-input"
      :id="inputId"
      :name="name"
      :disabled="disabled"
      :required="required"
      :checked="
        inputType === 'radio' ? inputValue === value : isSwitchOrCheckboxChecked
      "
      v-model="inputValueProxy"
      @change="onInput"
      :aria-label="noLabel ? label : undefined"
    />
    <label
      v-if="!noLabel || inputType === 'hidden'"
      class="form-check-label"
      :for="inputId"
    >
      {{ label }}
      <span v-if="required" class="text-danger fw-bold">*</span>
    </label>
    <div class="form-text text-muted" v-html="description"></div>
  </div>
  <!-- Outros tipos -->
  <div
    v-else
    :class="{
      'form-floating': !['range'].includes(inputType),
    }"
  >
    <label
      :for="inputId"
      v-if="['range'].includes(inputType)"
      :class="{
        'text-muted': ['range'].includes(inputType),
      }"
      >{{ label }}: {{ inputValue }}
      <span
        v-if="required && !['range'].includes(inputType)"
        class="text-danger fw-bold"
        >*</span
      >
      <span v-if="showInvalidFeedback" class="text-danger">
        {{ invalidMessage }}
      </span>
      <span v-if="showValidFeedback" class="text-success">
        {{ validMessage }}
      </span>
    </label>
    <!-- File -->
    <input
      v-if="inputType === 'file'"
      :key="inputId"
      type="file"
      class="form-control"
      :id="inputId"
      :disabled="disabled"
      :required="required"
      @change="onFileChange"
    />
    <!-- Range -->
    <input
      v-else-if="inputType === 'range'"
      :key="inputId"
      type="range"
      class="form-range"
      :id="inputId"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :required="required"
      v-model="inputValue"
      @input="onInput"
    />
    <!-- Color -->
    <input
      v-if="inputType === 'color'"
      :key="inputId"
      type="color"
      class="form-control form-control-color p-0 w-100"
      :id="inputId"
      :disabled="disabled"
      :required="required"
      v-model="inputValue"
      @input="onInput"
    />
    <!-- Textual: com máscara -->
    <input
      v-else-if="maskToUse"
      :key="inputId"
      :type="inputType"
      class="form-control"
      :id="inputId"
      :placeholder="placeholder || label"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :required="required"
      :step="step"
      :min="min"
      :max="max"
      :pattern="patternComputed"
      :inputmode="inputmode"
      :autocomplete="autocompleteComputed"
      :class="validClass"
      v-model="inputValue"
      v-mask="maskToUse"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
    />
    <!-- Textual: sem máscara -->
    <input
      v-else-if="!['file', 'hidden', 'range'].includes(inputType)"
      :key="inputId"
      :type="inputType"
      class="form-control"
      :id="inputId"
      :placeholder="placeholder || label"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :required="required"
      :step="step"
      :min="min"
      :max="max"
      :pattern="patternComputed"
      :inputmode="inputmode"
      :autocomplete="autocompleteComputed"
      :class="validClass"
      v-model="inputValue"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
    />
    <label
      :for="inputId"
      class="text-stroke-none"
      v-if="
        !noLabel &&
        !['checkbox', 'radio', 'switch', 'hidden', 'range'].includes(inputType)
      "
    >
      {{ label }}
      <span v-if="required" class="text-danger fw-bold">*</span>
      &nbsp;
      <span v-if="showInvalidFeedback" class="text-danger">
        {{ invalidMessage }}
      </span>
      <span v-if="showValidFeedback" class="text-success">
        {{ validMessage }}
      </span>
    </label>
    <div
      class="form-text text-muted fst-italic fs-8"
      v-if="description && !['hidden'].includes(inputType)"
      v-html="description"
    ></div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import * as EmailValidator from "email-validator";
import { cpf, cnpj } from "cpf-cnpj-validator";
import cnpjPromise from "cnpj-promise";

const props = defineProps({
  modelValue: [String, Number, Boolean, Object],
  label: { type: String, default: "Campo" },
  type: { type: String, default: "text" },
  id: { type: String, default: null },
  placeholder: { type: String, default: "" },
  valid: { type: [Boolean, String], default: null },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  maxlength: { type: [Number, String], default: undefined },
  minlength: { type: [Number, String], default: undefined },
  step: { type: [Number, String], default: undefined },
  min: { type: [Number, String], default: undefined },
  max: { type: [Number, String], default: undefined },
  inputmode: { type: String, default: undefined },
  pattern: { type: String, default: undefined },
  autocomplete: { type: String, default: undefined },
  mask: { type: [String, Array], default: undefined }, // para cpf/cnpj
  description: { type: String, default: "" },
  validMessage: { type: String, default: "Válido" },
  invalidMessage: { type: String, default: "Inválido" },
  switch: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
  noLabel: { type: Boolean, default: false },
  name: { type: String, default: undefined },
  value: { type: [String, Number, Boolean], default: undefined },
  switchValueOn: { type: [String, Number, Boolean], default: true },
  switchValueOff: { type: [String, Number, Boolean], default: false },
  isSwitch: Boolean,
});

const emit = defineEmits([
  "update:modelValue",
  "input",
  "blur",
  "change",
  "email-valid",
  "cpf-valid",
  "cnpj-valid",
  "cnpjData",
]);

const inputId = computed(
  () => props.id || `input_${props.label.replace(/\s+/g, "").toLowerCase()}`,
);

const isCheckable = computed(() =>
  ["checkbox", "radio"].includes(inputType.value),
);
const formCheckClass = computed(() => {
  let base = "form-check";
  if (props.switch) base += " form-switch";
  if (props.inline) base += " form-check-inline";
  if (props.reverse) base += " form-check-reverse";
  return base;
});
const allowedInputTypes = [
  "text",
  "password",
  "email",
  "number",
  "tel",
  "url",
  "search",
  "date",
  "datetime-local",
  "month",
  "week",
  "time",
  "color",
  "checkbox",
  "radio",
  "file",
  "hidden",
  "range",
  "username",
  "cpf",
  "cnpj",
];
const inputType = computed(() => {
  // username, cpf, cnpj continuam como text
  if (
    props.type === "username" ||
    props.type === "cpf" ||
    props.type === "cnpj"
  )
    return "text";
  if (allowedInputTypes.includes(props.type)) return props.type;
  return "text";
});

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    inputValue.value = val;
  },
);

// Proxy para checkbox/switch com valores customizados (on/off)
const inputValueProxy = computed({
  get() {
    if (isCheckable.value && props.switch) {
      return props.modelValue === props.switchValueOn;
    }
    return props.modelValue;
  },
  set(val) {
    if (isCheckable.value && props.switch) {
      emit(
        "update:modelValue",
        val ? props.switchValueOn : props.switchValueOff,
      );
      emit("input", val ? props.switchValueOn : props.switchValueOff);
    } else {
      emit("update:modelValue", val);
      emit("input", val);
    }
  },
});

// Para checked manual em checkbox/radio
const isSwitchOrCheckboxChecked = computed(() => {
  if (inputType.value === "checkbox" && props.switch) {
    return props.modelValue === props.switchValueOn;
  }
  if (inputType.value === "checkbox") {
    return !!props.modelValue;
  }
  return undefined;
});

// Arquivo (file input)
function onFileChange(e) {
  const files = e.target.files;
  emit("update:modelValue", files && files.length === 1 ? files[0] : files);
  emit("input", files && files.length === 1 ? files[0] : files);
}

// Máscara automática para CPF/CNPJ
const maskToUse = computed(() => {
  if (props.mask) {
    if (Array.isArray(props.mask)) return props.mask;
    if (typeof props.mask === "string") return [props.mask];
  }
  if (props.type === "cpf") return ["###.###.###-##"];
  if (props.type === "cnpj") return ["##.###.###/####-##"];
  // vue-the-mask espera string, array ou null, nunca undefined
  return null;
});

function usernameSanitize(val) {
  return (val || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._]/g, "");
}

function emailSanitize(val) {
  return (val || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._@]/g, "");
}

function emailValidator(val) {
  if (!val) return false;
  return EmailValidator.validate(val);
}

const validClass = computed(() => {
  if (props.valid === true) return "is-valid";
  if (props.valid === false) return "is-invalid";
  return "";
});

const showInvalidFeedback = computed(() => props.valid === false);
const showValidFeedback = computed(() => props.valid === true);

const patternComputed = computed(() => {
  if (props.pattern) return props.pattern;
  if (props.type === "username") return "^[a-z0-9._]+$";
  if (props.type === "email") return undefined; // handled by browser
  if (props.type === "cpf") return "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}";
  if (props.type === "cnpj") return "\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}";
  return undefined;
});

const autocompleteComputed = computed(() => {
  if (props.autocomplete) return props.autocomplete;
  if (props.id) return undefined;
  if (props.type === "email") return "email";
  if (props.type === "username") return "username";
  if (props.type === "password") return "current-password";
  return inputId.value;
});

async function onInput(e) {
  let val = e.target.value;
  // Garante que o valor é sempre string
  val = typeof val === "string" ? val : String(val ?? "");
  if (props.type === "username") {
    val = usernameSanitize(val);
    e.target.value = val;
  }
  // CPF
  if (props.type === "cpf") {
    const isValidCpf = cpf.isValid(val);
    emit("cpf-valid", isValidCpf);
  }
  // CNPJ
  if (props.type === "cnpj") {
    const isValidCnpj = cnpj.isValid(val);
    emit("cnpj-valid", isValidCnpj);
    if (isValidCnpj && val.replace(/\D/g, "").length === 14) {
      try {
        const data = await cnpjPromise(val.replace(/\D/g, ""));
        emit("cnpjData", data);
      } catch (err) {
        emit("cnpjData", null);
      }
    }
  }
  // Email
  if (props.type === "email") {
    val = emailSanitize(val);
    console.log("Email::", val);
    const isValidEmail = emailValidator(val);
    emit("email-valid", isValidEmail);
  }
  inputValue.value = val;
  emit("update:modelValue", val);
  emit("input", val);
}

function onBlur(e) {
  emit("blur", e.target.value);
}
function onKeydown(e) {
  // Impede espaços em username
  if (props.type === "username" && e.key === " ") e.preventDefault();
  // Impede caracteres inválidos em email
  if (props.type === "email" && !/^[a-zA-Z0-9._@]/.test(e.key))
    e.preventDefault();
}
</script>

<style scoped>
.text-stroke {
  -webkit-text-stroke: 1px #343a40 !important;
}
</style>
