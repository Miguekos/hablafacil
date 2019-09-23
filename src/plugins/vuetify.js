import Vue from "vue";
import Vuetify from "vuetify/lib";
import "../stylus/main.styl";
Vue.use(Vuetify, {
  theme: {
    primary: "#FF5722",
    secondary: "#005092"
  },
  customProperties: true,
  iconfont: "md"
});
