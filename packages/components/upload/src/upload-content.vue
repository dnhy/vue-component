<template>
    <div @click="handleClick" :class="[bem.b()]">
        <slot></slot>
        <input type="file" ref="inputRef" :name="name" :accept="accept" :multiple="multiple" @change="handleChange">
    </div>
</template>

<script setup lang="ts">
import { createNameSpace } from '@dnhy/utils/create';
import { ref } from 'vue';
import { genId, UploadRawFile } from './upload';
const bem = createNameSpace('upload');
import { uploadContentProps, uploadProgressEvent } from './upload-content'
import { httpRequest } from './ajax';

defineOptions({
    inheritAttrs: false
})

const inputRef = ref<HTMLInputElement>()

const props = defineProps(uploadContentProps)

const handleClick = () => {
    inputRef.value!.value = '';
    inputRef.value!.click();
}
async function upload(rawFile: UploadRawFile) {
    inputRef.value!.value = ''
    let result = await props.beforeUpload(rawFile);
    if (!result) return props.onRemove(rawFile);

    const { method, name, action, headers, data } = props;

    httpRequest({
        name,
        file: rawFile,
        method,
        headers,
        action,
        data,
        onProgress: (e: uploadProgressEvent) => {
            props.onProgress(e, rawFile);
        },
        onError: (err: any) => {
            props.onError(err, rawFile)
        },
        onSuccess: (res: any) => {
            props.onSuccess(res, rawFile)
        }
    })
}

function uploadFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
        const rawFile = files[i] as UploadRawFile;
        rawFile.uid = genId();
        props.onStart(rawFile)
        upload(rawFile)
    }
}

const handleChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files!
    uploadFiles(files);
}
</script>

<style lang="scss" scoped></style>