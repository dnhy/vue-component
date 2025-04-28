import type { updateRangeType, VirtualOptions } from "./prop";

export const initVirtual = (
  params: VirtualOptions,
  update: updateRangeType,
) => {
  const sizes = new Map<string | number, number>();

  let fixedSizeVal = 0;
  let offsetValue = 0;

  const range = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0,
  };

  const getEstimateSize = () => {
    return params.estimizeSize;
  };
  const getScrollOvers = () => {
    return Math.floor(offsetValue / getEstimateSize());
  };

  const getEndByStart = (start: number) => {
    const computeEnd = start + params.keeps - 1;
    const end = Math.min(computeEnd, params.uniqueIds.length - 1);

    return end;
  };

  const handleFront = () => {
    const overs = getScrollOvers();
    if (overs > range.start) {
      return;
    }

    const start = Math.max(overs - params.buffer, 0);
    checkRange(start, getEndByStart(start));
  };

  const handleBehind = () => {
    const overs = getScrollOvers();
    if (overs < range.start + params.buffer) {
      return;
    }

    checkRange(overs, getEndByStart(overs));
  };

  const handleScroll = (offset: number) => {
    const direction = offset < offsetValue ? "FRONT" : "BEHIND";
    offsetValue = offset;
    if (direction === "FRONT") {
      handleFront();
    } else if (direction === "BEHIND") {
      handleBehind();
    }
  };
  const saveSize = (id: string | number, size: number) => {
    sizes.set(id, size);

    fixedSizeVal = size;
  };

  function checkRange(start: number, end: number) {
    const total = params.uniqueIds.length;
    const keeps = params.keeps;
    if (total < keeps) {
      start = 0;
      end = total - 1;
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1;
    }

    updateRange(start, end);
  }

  const getPadFront = () => {
    return getEstimateSize() * range.start;
  };
  const getPadBehind = () => {
    const lastIndex = params.uniqueIds.length - 1;

    return (lastIndex - range.end) * getEstimateSize();
  };

  function updateRange(start: number, end: number) {
    range.start = start;
    range.end = end;
    range.padFront = getPadFront();
    range.padBehind = getPadBehind();

    update({ ...range });
  }

  checkRange(0, params.keeps - 1);
  return {
    saveSize,
    handleScroll,
  };
};
