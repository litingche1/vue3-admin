<template>
  <div id="asginmenu">
    <h1 id="logo">
      <img v-if="collapsed" :src="imgMinsrc" alt="手把手撸码前端" />
      <img v-else :src="imgSrc" alt="手把手撸码前端 1371374684" />
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
          <!-- <a-menu-item v-if="!item.children" :key="item.path"> -->
                 <a-menu-item v-if="haschildren(item)" :key="item.path">
            <router-link :to="item.children[0].path">
                 <span class="anticon">
              <SvgIcon :iconName="item.meta && item.meta.icon" class="aside-svg"></SvgIcon>
            </span>
            <span>{{ item.children[0].meta && item.children[0].meta.title }}</span>
            </router-link>
         
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
export default {
  name: "",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Menu
  },
  setup(props) {
    const { options } = useRouter();
    const state = reactive({
      collapsed: false,
      selectedKeys: localStorage.getItem("selectedKeys")
        ? [localStorage.getItem("selectedKeys")]
        : [],
      openKeys: localStorage.getItem("openKeys")
        ? localStorage.getItem("openKeys").split(",")
        : [],
      imgSrc: require("@/assets/img/logo.png"),
      imgMinsrc: require("@/assets/img/logo-min.png")
    });
    //SubMenu 展开/关闭的回调
    const menuOpenChange = openKeys => {
      state.openKeys = openKeys;
      localStorage.setItem("openKeys", openKeys);
    };
    //被选中时调用
    const menuSelect = ({ item, key, selectedKeys }) => {
      state.selectedKeys = selectedKeys;
      localStorage.setItem("selectedKeys", selectedKeys);
    };
    //监听collapsed
    watch(
      () => {
        return props.collapsed;
      },
      (nexw, old) => {
        // console.log(nexw,old)
      }
    );
    //
    const haschildren=(data)=>{
           // 不存在子级的情况
            if(!data.children) { return false; }
            console.log(data.children)
            // 过滤隐藏的子级路由
            const routers = data.children.filter(item => item.hidden ? false : true);
            // 判断最终结果 
            if(routers.length === 1) { return true; }
            return false;

 console.log(data)
    }
    return {
      ...toRefs(state),
      options,
      menuOpenChange,
      menuSelect,
      haschildren
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
    img {
      display: inline-block;
    }
  }
}
</style>
