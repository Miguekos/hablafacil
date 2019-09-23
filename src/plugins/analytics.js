import Vue from "vue";
import router from "../router";
import VueAnalytics from "vue-analytics";
const isProd = process.env.NODE_ENV === "production";

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS,
  router
});