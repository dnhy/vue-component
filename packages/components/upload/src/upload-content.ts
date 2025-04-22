import { PropType } from "vue";
import { baseProps, UploadRawFile } from "./upload";
import { uploadProps } from "./upload";
const NOOP = () => { }

export const uploadContentProps = {
    ...baseProps,
    beforeUpload: uploadProps['beforeUpload'],
    onRemove: uploadProps['onRemove'],
    onStart: {
        type: Function as PropType<(file: UploadRawFile) => void>,
        default: NOOP
    }

}