<template>
  <!-- <div id="comMenu"> -->
         <a-sub-menu  :key="data.path">
            <template #title>
              <span>
                <span>{{ data.meta && data.path }}</span>
              </span>
            </template>
            <template v-if="data.children.length > 0">
                <template v-for="child in data.children">
                    <a-menu-item v-if="!child.children"  :key="child.path">{{
                       child.meta && child.meta.title
              }}</a-menu-item>
              <Menu v-else :data="child" :key="child.path"/>
            </template>    
              
            </template>
          </a-sub-menu>
  <!-- </div> -->
</template>

<script>
export default {
    name:'Menu',
    props:{
        data:{
            type:Object,
            default:()=>({})
        }
    },
    
  setup(props){
console.log(props.data)
  }
}
</script>

<style lang="scss">
#comMenu{

}
</style>