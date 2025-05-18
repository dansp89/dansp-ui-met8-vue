<template>
  <div :class="formCheckClass">
    <input
      :id="inputId"
      :name="name"
      type="radio"
      class="form-check-input"
      :disabled="disabled"
      :required="required"
      :checked="modelValue === value"
      @change="onChange"
      :value="value"
    />
    <label v-if="label" class="form-check-label" :for="inputId">
      {{ label }}
    </label>
    <div class="form-text text-muted">{{ description }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: [String, Number, Boolean],
  label: String,
  value: [String, Number, Boolean],
  name: String,
  disabled: Boolean,
  required: Boolean,
  description: String,
  id: String,
  inline: Boolean,
  reverse: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const inputId = computed(
  () => props.id || `radio_${props.label?.replace(/\s+/g, "").toLowerCase()}`,
);
const formCheckClass = computed(() => {
  let base = "form-check";
  if (props.inline) base += " form-check-inline";
  if (props.reverse) base += " form-check-reverse";
  return base;
});
function onChange(e) {
  e.preventDefault(); // TODO:: verificar se é necessário
  emit("update:modelValue", props.value);
}
</script>
