<template>
  <div id="header">
    <div class="avatar">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <!-- Hover me -->
          <!-- <DownOutlined /> -->
          <img src="../../assets/img/tx.jpg" alt="" />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">用户名</a>
            </a-menu-item>
            <a-menu-item class="language">
              <a href="javascript:;">
                <span
                  v-for="(item, idx) in language.data"
                  key="item.id"
                  :class="{ mr8: idx === 0 }"
                  @click="changLanguage(item.id)"
                  >{{ item.label }}</span
                >
              </a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">{{ $t("header_menu.logout") }}</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
export default {
  name: "",
  components: {
    DownOutlined
  },
  setup(props) {
    const { locale } = useI18n({ useScope: "global" });
    const language = reactive({
      data: [
        { label: "中文", id: "ch" },
        { label: "英文", id: "eh" }
      ],
      current: ""
    });
    const changLanguage = value => {
      locale.value = value;
      language.current = value;
    };
    return {
      language,
      changLanguage
    };
  }
};
</script>
<style lang="scss">
#header {
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  .avatar {
    width: 50px;
    height: 50px;
    float: right;
    margin-top: 10px;
    box-sizing: border-box;
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
