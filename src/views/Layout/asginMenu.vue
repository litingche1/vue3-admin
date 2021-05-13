<template>
  <div id="asginmenu">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
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
          <a-sub-menu v-else :key="item.path">
            <template #title>
              <span>
                <span>{{ item.meta && item.meta.title }}</span>
              </span>
            </template>
            <template v-if="item.children.length > 0">
              <a-menu-item v-for="child in item.children" :key="child.path">{{
                child.meta && child.meta.title
              }}</a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "",
  setup(props) {
    const { options } = useRouter();
    // console.log(options.routes);
    const state = reactive({
      collapsed: false,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
      preOpenKeys: ["sub1"]
    });
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
