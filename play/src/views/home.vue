<template>
  <div class="home col">
    <clam-view :res="response" v-slot="{ data }" :empty-data="emptyData">
      <p>
        <span>{{ data.name }}</span>
      </p>
      <p>Home</p>
      <router-link to="/about">{{ data.route }}</router-link>
    </clam-view>
  </div>
</template>

<script lang="ts">
import { ResponseBean } from "bdjf_http";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { RouterLink } from "vue-router";
import ClamView from "../components/ClamView/ClamView";

export default defineComponent({
  name: "Home",
  components: {
    ClamView,
    RouterLink,
  },
  setup() {
    const state = reactive({
      response: new ResponseBean().loading(),
    });

    onMounted(() => {
      setTimeout(() => {
        state.response = new ResponseBean(0, "", {
          name: "Home",
          route: "About",
        });
      }, 2500);
    });

    const emptyData = {
      name: "站位文字",
      route: "站位文字",
    };

    return {
      ...toRefs(state),
      emptyData,
    };
  },
});
</script>

<style lang="scss" scoped></style>
