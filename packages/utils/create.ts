//z-icon-block__element--disabled
export function createNameSpace(name: string) {
  const prefixName = `z-${name}`;
  return createBem(prefixName);
}

function createBem(prefixName: string) {
  const b = (blockName: string = "") => _bem(prefixName, blockName, "", "");
  const e = (element: string = "") => _bem(prefixName, "", element, "");
  const m = (modifier: string = "") => _bem(prefixName, "", "", modifier);
  const be = (blockName: string = "", element: string = "") =>
    _bem(prefixName, blockName, element, "");
  const bm = (blockName: string = "", modifier: string = "") =>
    _bem(prefixName, blockName, "", modifier);
  const em = (element: string = "", modifier: string = "") =>
    _bem(prefixName, "", element, modifier);
  const bem = (
    blockName: string = "",
    element: string = "",
    modifier: string = "",
  ) => _bem(prefixName, blockName, element, modifier);
  const is = (name: string = "", state: boolean | string) =>
    state ? `is-${name}` : "";
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
}

function _bem(
  prefixName: string,
  blockName: string,
  element: string,
  modifier: string,
) {
  if (blockName) {
    prefixName += `-${blockName}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `-${modifier}`;
  }

  return prefixName;
}

// 测试用例
// const bem = createNameSpace("icon");
// console.log(bem.b("box"));
// console.log(bem.e("span"));
// console.log(bem.m("disabled"));
// console.log(bem.be("box", "span"));
// console.log(bem.bm("box", "disabled"));
// console.log(bem.em("span", "disabled"));
// console.log(bem.bem("box", "span", "disabled"));
// console.log(bem.is("active", true));
