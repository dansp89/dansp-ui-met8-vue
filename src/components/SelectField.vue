<template>
  <div class="form-floating">
    <select
      class="form-select"
      :id="id"
      :aria-label="label"
      v-model="valueProxy"
      :disabled="disabled"
      :required="required"
      @change="onChange"
    >
      <option
        v-if="placeholder"
        disabled
        :selected="!modelValue"
        value=""
        hidden
      >
        {{ placeholder }}
      </option>
      <option
        v-for="opt in options"
        :key="opt.value ?? opt"
        :value="opt.value ?? opt"
        :disabled="opt.disabled"
      >
        {{ opt.label ?? opt }}
      </option>
    </select>
    <label v-if="label" :for="id">{{ label }}</label>
    <div v-if="description" class="form-text text-muted">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: [String, Number, Boolean],
  options: {
    type: Array,
    required: true,
    // [{ value: any, label: string, disabled?: boolean }] ou ["A", "B"]
  },
  label: String,
  description: String,
  id: String,
  disabled: Boolean,
  required: Boolean,
  placeholder: String,
});
const emit = defineEmits(["update:modelValue"]);
const valueProxy = ref(props.modelValue ?? "");
watch(
  () => props.modelValue,
  (v) => {
    if (v !== valueProxy.value) valueProxy.value = v;
  },
);
function onChange() {
  emit("update:modelValue", valueProxy.value);
}
</script>
