import Vue from "vue";
import "./plugins/axios";
import router from "./router";
import store from "./store";
import "./plugins/vuetify";
/* import "./plugins/analytics"; */
import "./plugins/veelidate";
import MultiFiltersPlugin from "./plugins/MultiFilters";

import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(MultiFiltersPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
