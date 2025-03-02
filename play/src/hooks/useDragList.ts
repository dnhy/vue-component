export const useDragList = (data: []) => {
  let dragIndex = 0;

  //   元素开始被拖拽
  function dragstart(e: any, index: number) {
    e.stopPropagation();
    dragIndex = index;
    setTimeout(() => {
      e.target.classList.add("moving");
    }, 0);
  }

  //   元素松开拖拽
  function dragend(e: any) {
    e.target.classList.remove("moving");
  }

  //   进入目标元素
  function dragenter(e: any, index: number) {
    e.preventDefault();
    // 拖拽到原位置时不触发
    if (dragIndex !== index) {
      const source = data[dragIndex];
      //   交换两个数组元素
      //   删除原位置拖拽元素
      data.splice(dragIndex, 1);
      //   目标位置新增拖拽元素
      data.splice(index, 0, source);

      // 更新当前拖拽的节点
      dragIndex = index;
    }
  }
  //   悬浮在目标元素上
  function dragover(e: any) {
    console.log("dragover");
    // 阻止拖拽回弹的默认事件
    e.preventDefault();
    // 元素拖拽的视觉效果
    e.dataTransfer.dropEffect = "move";
  }

  return {
    dragstart,
    dragend,
    dragenter,
    dragover,
  };
};
