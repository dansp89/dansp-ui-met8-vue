<template>
  <div>
    <div :id="editorId" ref="editorRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Digite aqui..." },
  readOnly: { type: Boolean, default: false },
  theme: { type: String, default: "snow" },
  toolbar: {
    type: [Array, Boolean],
    default: () => [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
  formats: { type: Array, default: () => [] },
  height: { type: [String, Number], default: 200 },
  id: { type: String, default: undefined },
});

const emit = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "blur",
  "focus",
]);

const editorRef = ref(null);
let quill = null;

const editorId = computed(
  () => props.id || `quill-editor-${Math.random().toString(36).substr(2, 9)}`,
);

onMounted(() => {
  quill = new Quill(editorRef.value, {
    theme: props.theme,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    modules: {
      toolbar: props.toolbar,
    },
    formats: props.formats.length ? props.formats : undefined,
  });
  quill.root.style.height =
    typeof props.height === "number" ? `${props.height}px` : props.height;
  quill.root.innerHTML = props.modelValue || "";

  quill.on("text-change", () => {
    const html = quill.root.innerHTML;
    emit("update:modelValue", html);
    emit("input", html);
    emit("change", html);
  });
  quill.on("selection-change", (range, oldRange) => {
    if (range === null && oldRange !== null) emit("blur");
    if (range !== null && oldRange === null) emit("focus");
  });
});

watch(
  () => props.modelValue,
  (val) => {
    if (quill && quill.root.innerHTML !== val) {
      const sel = quill.getSelection();
      quill.root.innerHTML = val || "";
      if (sel) quill.setSelection(sel);
    }
  },
);

watch(
  () => props.readOnly,
  (val) => {
    if (quill) quill.enable(!val);
  },
);

onBeforeUnmount(() => {
  if (quill) {
    quill.off("text-change");
    quill.off("selection-change");
    quill = null;
  }
});
</script>

<style scoped>
#quill-editor,
[class^="quill-editor"] {
  width: 100%;
}
</style>
