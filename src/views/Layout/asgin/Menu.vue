<template>
  <div id="comMenu">
  <a-sub-menu :key="data.path">
    <template #title>
      <span>
        <i class="icon-size-21 mb--5 mr6" :class="data.meta && data.meta.icon"></i>
        <span>{{ data.meta && data.meta.title }}</span>
      </span>
    </template>
    <template v-if="data.children.length > 0">
      <template v-for="child in data.children">
        <a-menu-item v-if="!child.children" :key="child.path">
          <i class="icon-size-21 mb--5 mr6" :class="child.meta && child.meta.icon"></i>
          {{
          child.meta && child.meta.title
        }}</a-menu-item>
        <Menu v-else :data="child" :key="child.path" />
      </template>
    </template>
  </a-sub-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props) {
    // console.log(props.data);
  }
};
</script>

<style lang="scss">
#comMenu {
}
</style>
