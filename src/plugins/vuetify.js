import Vue from "vue";
import Vuetify from "vuetify/lib";
import "../stylus/main.styl";
Vue.use(Vuetify, {
  theme: {
    primary: "#314caa",
    secondary: "#005092"
  },
  customProperties: true,
  iconfont: "md"
});
