<template>
  <div id="asginmenu">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in options.routes">
        <template v-if="!item.hidden">
          <a-menu-item v-if="!item.children" :key="item.path">
            <!-- <PieChartOutlined /> -->
            <span>{{ item.meta && item.meta.title }}</span>
          </a-menu-item>
                 <Menu v-else :data="item"></Menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import Menu from "./Menu"
export default {
  name: "",
   components: {
    Menu,
  },
  setup(props) {
    const { options } = useRouter();
    // console.log(options.routes);
    const state = reactive({
      collapsed: false,
      selectedKeys: ["2"],
      openKeys: ["/managementDesk"],
    //   preOpenKeys: ["sub1"]
    });

       watch(
      () => state.openKeys,
      (val, oldVal) => {
        state.preOpenKeys = oldVal;
      },
    );
    return {
      ...toRefs(state),
      options
    };
  }
};
</script>
<style lang="scss">
#asginmenu {
}
</style>
