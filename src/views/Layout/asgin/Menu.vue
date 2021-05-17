<template>
  <a-sub-menu :key="data.path">
    <template #title>
      <span>
        <span class="anticon">
          <SvgIcon :iconName="data.meta && data.meta.icon" class="aside-svg"></SvgIcon>
        </span>
        <span>{{ data.meta && data.meta.title }}</span>
      </span>
    </template>
    <template v-if="data.children.length > 0">
      <template v-for="child in data.children">
        <a-menu-item v-if="!child.children" :key="child.path">
          <router-link :to="child.path">
            <span class="anticon">
              <SvgIcon :iconName="child.meta && child.meta.icon" class="aside-svg"></SvgIcon>
              {{ child.meta && child.meta.title }}
            </span>
          </router-link>
        </a-menu-item>
        <Menu v-else :data="child" :key="child.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: "Menu",
  // components: {
  //   SvgIcon
  // },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props) {}
};
</script>

<style lang="scss"></style>
