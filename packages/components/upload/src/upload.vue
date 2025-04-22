<template>
    <UploadContent v-bind="uploadContentProps">
        <slot></slot>
    </UploadContent>
    {{ files }}
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, UploadFile, UploadFiles, uploadProps, UploadRawFile } from './upload';
import UploadContent from './upload-content.vue';

defineOptions({
    name: 'z-upload'
})

const props = defineProps(uploadProps);
const emit = defineEmits({})

const files = ref<UploadFiles>(props.FileList);

watch(files, (newVal) => {
    emit('onUpdate:file-list', newVal);
})

const uploadContentProps = computed(() => ({
    ...props,
    onStart: (rawFile: UploadRawFile) => {
        const uploadFile: UploadFile = {
            uid: rawFile.uid,
            name: rawFile.name,
            raw: rawFile,
            percentage: 0,
            size: rawFile.size,
            status: 'start'
        }

        uploadFile.url = URL.createObjectURL(rawFile)
        files.value = [...files.value, uploadFile]
        props.onChange(uploadFile)
    }
}))
</script>

<style lang="scss" scoped></style>