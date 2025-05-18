<template>
  <div class="input-group mb-3">
    <span class="input-group-text p-0 m-0">
      <input
        :key="id"
        :id="id"
        type="color"
        class="form-control form-control-color border-0 p-0 m-0 bg-transparent rounded-0"
        :disabled="disabled"
        :required="required"
        v-model="colorProxy"
        @input="onInput"
        tabindex="-1"
        aria-label="Selecionar cor"
      />
    </span>
    <div class="form-floating flex-grow-1">
      <input
        :key="id"
        type="text"
        class="form-control"
        :id="id ? `${id}_text` : undefined"
        :placeholder="label || 'Cor'"
        :disabled="disabled"
        :required="required"
        v-model="colorProxy"
        @input="onInput"
      />
      <label v-if="label" :for="id ? `${id}_text` : undefined">{{
        label
      }}</label>
    </div>
  </div>
  <div v-if="description" class="form-text text-muted">{{ description }}</div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: String,
  label: String,
  description: String,
  id: String,
  disabled: Boolean,
  required: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const colorProxy = ref(props.modelValue ?? "#000000");
watch(
  () => props.modelValue,
  (v) => {
    if (v !== colorProxy.value) colorProxy.value = v;
  },
);
function onInput() {
  emit("update:modelValue", colorProxy.value);
}
</script>
