<template>
  <div :class="formCheckClass">
    <input
      :id="inputId"
      :name="name"
      type="checkbox"
      class="form-check-input"
      role="switch"
      :disabled="disabled"
      :required="required"
      :checked="modelValue === valueOn"
      @change="onChange"
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
  modelValue: [Boolean, String, Number],
  label: String,
  valueOn: { type: [String, Number, Boolean], default: true },
  valueOff: { type: [String, Number, Boolean], default: false },
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
  () => props.id || `switch_${props.label?.replace(/\s+/g, "").toLowerCase()}`,
);
const formCheckClass = computed(() => {
  let base = "form-check form-switch";
  if (props.inline) base += " form-check-inline";
  if (props.reverse) base += " form-check-reverse";
  return base;
});
function onChange(e) {
  emit("update:modelValue", e.target.checked ? props.valueOn : props.valueOff);
}
</script>
