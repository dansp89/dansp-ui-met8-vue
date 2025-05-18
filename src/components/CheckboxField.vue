<template>
  <div :class="formCheckClass">
    <input
      :id="inputId"
      :name="name"
      type="checkbox"
      class="form-check-input"
      :disabled="disabled"
      :required="required"
      :checked="isChecked"
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
  modelValue: [Boolean, String, Number, Array],
  label: String,
  value: { type: [String, Number, Boolean], default: true },
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
  () =>
    props.id || `checkbox_${props.label?.replace(/\s+/g, "").toLowerCase()}`,
);
const formCheckClass = computed(() => {
  let base = "form-check";
  if (props.inline) base += " form-check-inline";
  if (props.reverse) base += " form-check-reverse";
  return base;
});
const isChecked = computed(() => {
  if (Array.isArray(props.modelValue))
    return props.modelValue.includes(props.value);
  return props.modelValue === true || props.modelValue === props.value;
});
function onChange(e) {
  let val;
  if (Array.isArray(props.modelValue)) {
    val = [...props.modelValue];
    if (e.target.checked) {
      if (!val.includes(props.value)) val.push(props.value);
    } else {
      val = val.filter((v) => v !== props.value);
    }
  } else {
    val = e.target.checked ? props.value : false;
  }
  emit("update:modelValue", val);
}
</script>
