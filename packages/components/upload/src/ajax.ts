import { uploadOptions, uploadProgressEvent } from "./upload-content.js";

export function httpRequest(options: uploadOptions) {
    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.action);

    xhr.upload.onprogress = (e: ProgressEvent) => {
        const percantage = e.total > 0 ? (e.loaded / e.total) * 100 : 0;

        const processEvents: uploadProgressEvent = { ...e, percantage };

        options.onProgress(processEvents);
    }

    xhr.onload = (e: ProgressEvent) => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                options.onSuccess(xhr.response)
            } else {
                options.onError({ status: xhr.status })
            }
        }
    }

    xhr.onerror = (e) => {
        options.onError(e)
    }

    for (const [key, value] of Object.entries(options.headers)) {
        xhr.setRequestHeader(key, value);
    }

    const formData = new FormData();
    formData.append(options.name, options.file);

    for (const [key, value] of Object.entries(options.data)) {
        formData.append(key, value);
    }

    xhr.send(formData);

    return xhr;
}