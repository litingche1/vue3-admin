<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <Menu v-model:collapsed="collapsed"></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <Header @setCollapsed="closedCollapsed"></Header>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <Content></Content>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Content from "@/views/Layout/main";
import Header from "@/views/Layout/header";
import Menu from "@/views/Layout/asgin/index";
import { defineComponent, ref, toRefs,reactive } from "vue";
export default defineComponent({
  components: {
    Content,
    Header,
    Menu
  },
  setup() {
    const data = reactive({
      selectedKeys: ["1"],
      collapsed: JSON.parse(localStorage.getItem("collapsed"))
    });
    const closedCollapsed = value => {
      data.collapsed = !data.collapsed;
      localStorage.setItem("collapsed", data.collapsed);
    };
    return {
      ...toRefs(data),
      closedCollapsed
    };
  }
});
</script>
<style lang="scss">
.ant-layout {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
