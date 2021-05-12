import { createI18n } from "vue-i18n";

const i18n = createI18n({
    // something vue-i18n options here ...
    locale: 'en',
    messages: {
        en: require("./eh"),
        ch: require("./ch")
    }

});

export default i18n;
