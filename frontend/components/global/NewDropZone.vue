<script setup lang="ts">
  import { ref, watch } from "vue";

  const refAttachmentInput = ref<HTMLInputElement>();
  const emit = defineEmits(["update:modelValue", "upload"]);
  const el = ref<HTMLDivElement>();

  const { isOverDropZone } = useDropZone(el, files => {
    if (!files) return;
    emit("upload", files[0]);
  });

  watch(isOverDropZone, () => {
    emit("update:modelValue", isOverDropZone.value);
  });

  function clickUpload() {
    if (!refAttachmentInput.value) {
      return;
    }
    refAttachmentInput.value.click();
  }

  function uploadImage(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || !files.item(0)) {
      return;
    }

    const first = files.item(0);
    if (!first) {
      return;
    }

    emit("upload", first);
  }
</script>

<template>
  <div
    ref="el"
    class="h-24 w-full border-2 border-primary border-dashed grid place-content-center"
    :class="isOverDropZone ? 'bg-primary bg-opacity-10' : ''"
    @click="clickUpload"
  >
    <input ref="refAttachmentInput" hidden type="file" @change="uploadImage" />
    <slot />
  </div>
</template>
