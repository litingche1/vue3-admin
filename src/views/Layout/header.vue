<template>
  <div id="header">
    <SvgIcon
      iconName="collapsed"
      className="aside-svg"
      class="collapse"
      @click="setUpCollapsed"
    ></SvgIcon>

    <div class="avatar">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <img src="../../assets/img/tx.jpg" alt="" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">
                <SvgIcon iconName="member" className="aside-svg"></SvgIcon>
                用户名</a
              >
            </a-menu-item>
            <a-menu-item class="language">
              <a href="javascript:;">
                <span
                  v-for="(item, idx) in language.data"
                  key="item.id"
                  :class="{ mr8: idx === 0 }"
                  @click="changLanguage(item.id)"
                >
                  <SvgIcon
                    :iconName="item.icon"
                    className="aside-svg"
                  ></SvgIcon>
                  <span>{{ item.label }}</span>
                </span>
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">
                <SvgIcon iconName="exit" className="aside-svg"></SvgIcon>
                {{ $t("header_menu.logout") }}</a
              >
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { reactive, getCurrentInstance } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
export default {
  name: "",
  components: {
    DownOutlined
  },
  setup(props) {
    const { locale } = useI18n({ useScope: "global" });
    const { emit } = getCurrentInstance();
    const language = reactive({
      data: [
        { label: "中文", id: "ch", icon: "lang" },
        { label: "英文", id: "eh", icon: "lang" }
      ],
      current: ""
    });
    const changLanguage = value => {
      locale.value = value;
      language.current = value;
    };
    const setUpCollapsed = () => {
      emit("setCollapsed");
    };
    return {
      language,
      changLanguage,
      setUpCollapsed
    };
  }
};
</script>
<style lang="scss">
#header {
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  .collapse {
    cursor: pointer;
  }
  .avatar {
    width: 50px;
    height: 50px;
    float: right;
    margin-top: 10px;
    box-sizing: border-box;
    color: #888;
    border-radius: 50% !important;

    img {
      width: 100%;
    }
    .ant-dropdown-menu {
      padding: 4px 10px;
      text-align: center;
    }
    .ant-dropdown-menu-item {
      color: "#333" !important;
    }
    .language {
    }
  }
}
</style>
