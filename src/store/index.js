import Vue from "vue";
import Vuex from "vuex";
/* import md5 from "md5"; */
import createPersistedState from "vuex-persistedstate";
import incidencias from "./modules/incidencias";
import planAccion from "./modules/planAccion";
import users from "./modules/users";
import dashboard from "./modules/dashboard";


Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "_vuex_store_"
      /* paths: [""] */ //vuex state
    })
  ],
  modules: {
    incidencias,
    planAccion,
    users,
    dashboard
  }
});
export default store;
