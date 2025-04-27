import type { updateRangeType, VirtualOptions } from "./prop";

export const initVirtual = (params: VirtualOptions, update: updateRangeType) => {
    const sizes = new Map<string | number, number>();

    let fixedSizeVal = 0;
    const saveSize = (id: string | number, size: number) => {
        sizes.set(id, size);

        fixedSizeVal = size;
    }

    let start = 0;
    let end = params.keeps - 1;
    const range = {
        start: 0,
        end: 0,
        padFront: 0,
        padBehind: 0
    }

    const total = params.uniqueIds.length;
    const keeps = params.keeps;
    if (total < keeps) {
        start = 0;
        end = total - 1
    }

    const getPadFront = () => {
        return fixedSizeVal * range.start;
    }
    const getPadBehind = () => {
        const lastIndex = params.uniqueIds.length - 1;
        return (lastIndex - range.end) * fixedSizeVal;
    }

    range.start = start;
    range.end = end;
    range.padFront = getPadFront();
    range.padBehind = getPadBehind();

    update({ ...range })

    return {
        saveSize
    }
}