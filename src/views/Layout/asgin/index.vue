<template>
  <div id="asginmenu">
    <h1 id="logo">
      <img :src="imgSrc" alt="手把手撸码前端 1371374684">
    </h1>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @openChange="menuOpenChange"
      @select="menuSelect"
    >
      <template v-for="item in options.routes">
        <template v-if="!item.hidden">
          <a-menu-item v-if="!item.children" :key="item.path">
            <SvgIcon :iconName="item.meta && item.meta.icon" className="aside-svg"></SvgIcon>
            <!-- <i class="icon-size-21 mb--5 mr6" :class="item.meta && item.meta.icon"></i> -->
            <span>{{ item.meta && item.meta.title }}</span>
          </a-menu-item>
          <Menu v-else :data="item" :key="item.path"></Menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { reactive, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import Menu from "./Menu";
import SvgIcon from '@/components/Svgicon'
export default {
  name: "",
  components: {
    Menu,
    SvgIcon
  },
  setup(props) {
    const { options } = useRouter();
    const state = reactive({
      collapsed: false,
      selectedKeys:localStorage.getItem('selectedKeys')? [localStorage.getItem('selectedKeys')] :[],
      openKeys:  localStorage.getItem('openKeys')?localStorage.getItem('openKeys').split(','):[],
      imgSrc:require('@/assets/img/logo.png')
    });
    //SubMenu 展开/关闭的回调
    const menuOpenChange = (openKeys) => {
      state.openKeys=openKeys
      localStorage.setItem('openKeys',openKeys)
    };
    //被选中时调用
    const menuSelect = ({ item, key, selectedKeys }) => {
      state.selectedKeys=selectedKeys
      localStorage.setItem('selectedKeys',selectedKeys)
    };
    return {
      ...toRefs(state),
      options,
      menuOpenChange,
      menuSelect
    };
  }
};
</script>
<style lang="scss">
#asginmenu {
  #logo {
    padding: 24px 0 20px;
    border-bottom: 1px solid #000;
    text-align: center;
    img { display: inline-block; }
}
}
</style>
