import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import i18n from './language/index';
import SvgIcon from '@/components/Svgicon/index'
import '@/unitls/svg'
createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
    .use(i18n)
    .component('SvgIcon', SvgIcon)
    .mount("#app");
