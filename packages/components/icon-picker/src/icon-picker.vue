<template>
  <a-popover title="Icon" trigger="click" v-model:popup-visible="visible">
    <template #>
      <div class="triggerArea">
        <div v-if="icon" class="display-icon">
          <component :is="icon" />
        </div>
        <div v-else>
          <slot name="defaultIcon"></slot>
          <a-button v-if="showDefaultBtn">pick</a-button>
        </div>
      </div>
    </template>
    <template #content>
      <div class="content">
        <a-row
          justify="space-between"
          v-show="!!icon"
        >
          <a-col :span="18">
            <a-row>
              <a-col :span="3"> <component :is="icon" /> </a-col>
              <a-col flex="1">{{ icon }}</a-col>
            </a-row>
          </a-col>
          <a-col flex="1">
            <div style="text-align: end">
              <span
                href=""
                style="color: blue; cursor: pointer"
                @click="icon = ''"
                >remove</span
              >
            </div>
          </a-col>
        </a-row>
        <a-input-search
          v-model="srh"
          placeholder="Please enter icon name"
          search-button
          @search="search"
          @press-enter="search"
        />
        <div class="layoutkit-flexbox">
          <div class="icon-wrapper">
            <div v-for="item in showIcons" @click="selectIcon(item)">
              <a-tooltip :content="item" position="top">
                <div class="icon-box">
                  <component :is="item" />
                </div>
              </a-tooltip>
            </div>
          </div>
        </div>
      </div>
    </template>
  </a-popover>
</template>

<script setup lang="ts">
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import { ref, useSlots } from "vue";
console.log("ArcoVueIcon :", ArcoVueIcon);
defineOptions({
  name: "zIconPicker",
});

const icon = defineModel();

const icons = Object.keys(ArcoVueIcon);
const showIcons = ref(icons);

const srh = ref("");
const search = () => {
  showIcons.value = icons.filter((e) => {
    return e.indexOf(srh.value) !== -1;
  });
};

const visible = ref(false);

const slots = useSlots();
console.log("slots :", slots);
const showDefaultBtn = ref(true);
if (slots && slots.defaultIcon && slots.defaultIcon()) {
  showDefaultBtn.value = false;
}

const selectIcon = (v) => {
  icon.value = v;
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.content {
  width: 216px;
  gap: 12px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
}

.triggerArea {
  cursor: pointer;
  display: inline-block;
  padding: 5px;

  & .display-icon {
    color: rgba(0, 0, 0, 0.45);
    &:hover {
      color: #0a0a0a !important;
    }

    &:active {
      scale: 0.8;
      color: #0a0a0a !important;
    }

    transition:
      color 600ms 100ms,
      scale 400ms 100ms,
      background-color 100ms 100ms;
  }

  & svg {
    font-size: 20px;
  }
}

.layoutkit-flexbox {
  overflow-y: scroll;
}
.icon-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.icon-box {
  height: 48px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow:
    1px 0 0 0 #dfdfdf,
    0 1px 0 0 #dfdfdf,
    1px 1px 0 0 #dfdfdf,
    1px 0 0 0 #dfdfdf inset,
    0 1px 0 0 #dfdfdf inset;
  background: #fff;

  cursor: pointer;

  font-size: 18px;
  //   color: ${token.colorTextSecondary};

  &:hover {
    border: 1px solid #aeaeae;
    box-shadow: none;
  }

  &:active {
    z-index: 5;
    border: 1px solid #000;
    border-radius: 2px;
    box-shadow: 0 1px 2px #000;
  }
}
</style>
