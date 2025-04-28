<template>
  <UploadContent v-bind="uploadContentProps">
    <slot></slot>
  </UploadContent>
  {{ files }}
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { UploadFile, UploadFiles, uploadProps, UploadRawFile } from "./upload";
import type { UploadContentProps, uploadProgressEvent } from "./upload-content";
import UploadContent from "./upload-content.vue";

defineOptions({
  name: "z-upload",
});

const props = defineProps(uploadProps);
const emit = defineEmits({});

const files = ref<UploadFiles>(props.FileList);

watch(files, (newVal) => {
  emit("onUpdate:file-list", newVal);
});

const uploadContentProps = computed<UploadContentProps>(() => ({
  ...props,
  onStart: (rawFile: UploadRawFile) => {
    const uploadFile: UploadFile = {
      uid: rawFile.uid,
      name: rawFile.name,
      raw: rawFile,
      percentage: 0,
      size: rawFile.size,
      status: "start",
    };

    uploadFile.url = URL.createObjectURL(rawFile);
    files.value = [...files.value, uploadFile];
    props.onChange(uploadFile);
  },
  onSuccess: (res: any, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!;
    uploadFile.status = "success";

    props.onSuccess(res, uploadFile, files.value);
  },
  onError: (error: any, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!;
    uploadFile.status = "error";
    files.value.splice(files.value.indexOf(uploadFile), 1);
    props.onError(error, uploadFile, files.value);
  },
  onProgress: (e: uploadProgressEvent, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!;
    uploadFile.status = "uploading";
    uploadFile.percentage = e.percantage;
    props.onProgress(e, files.value);
  },
  onRemove: async (rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!;

    const r = await props.beforeRemove(uploadFile, files.value);
    if (!r) {
      files.value.splice(files.value.indexOf(uploadFile), 1);
      props.onRemove(uploadFile, files.value);
    }
  },
}));

function findFile(rawFile: UploadRawFile) {
  return files.value.find((f) => f.uid === rawFile.uid);
}
</script>

<style lang="scss" scoped></style>
