<template>
  <div class="form-floating">
    <textarea
      class="form-control"
      :placeholder="placeholder"
      :id="inputId"
      :style="{ height: height }"
      v-model="inputValue"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :step="step"
      :min="min"
      :max="max"
      :inputmode="inputmode"
      :pattern="pattern"
      :autocomplete="autocomplete"
      :class="validClass"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
    ></textarea>
    <label :for="inputId"
      >{{ label
      }}<span v-if="required" class="text-danger fw-bolder">*</span></label
    >
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

const inputId = computed(
  () => props.id || `input_${props.label.replace(/\s+/g, "").toLowerCase()}`,
);

const props = defineProps({
  label: { type: String, default: "Campo" },
  id: { type: String, default: null },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  maxlength: { type: [Number, String], default: undefined },
  minlength: { type: [Number, String], default: undefined },
  step: { type: [Number, String], default: undefined },
  min: { type: [Number, String], default: undefined },
  max: { type: [Number, String], default: undefined },
  inputmode: { type: String, default: undefined },
  height: { type: String, default: "100px" },
  pattern: { type: String, default: undefined },
  autocomplete: { type: String, default: undefined },
  valid: { type: [Boolean, String], default: null },
  validMessage: { type: String, default: "Válido" },
  invalidMessage: { type: String, default: "Inválido" },
  switch: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
  noLabel: { type: Boolean, default: false },
  name: { type: String, default: undefined },
  modelValue: [String, Number, Boolean, Object, Array],
});

const emit = defineEmits(["update:modelValue", "input", "blur", "keydown"]);
const inputValue = ref(props.modelValue ?? "");

watch(
  () => props.modelValue,
  (v) => {
    if (v !== inputValue.value) inputValue.value = v;
  },
);
const validClass = computed(() => {
  if (props.valid === true) return "is-valid";
  if (props.valid === false) return "is-invalid";
  return "";
});

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
  emit("input", e.target.value);
};
const onBlur = (e) => {
  emit("blur", e);
};
const onKeydown = (e) => {
  emit("keydown", e);
};
</script>
