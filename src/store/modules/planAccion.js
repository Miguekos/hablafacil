import { format } from "date-fns";
import { defaultPlan } from "../../utils/default.js";
const state = {
  areas: [],
  gerencias: [],
  locales: [{ id: 1, text: "PORVENIR-PASCO" }],
  personal: [],
  datos: defaultPlan,
  listaPlanAccion: [],
  classRiesgo: 1
};

const mutations = {
  SET_AREAS(state, payload) {
    state.areas = payload;
  },
  SET_GERENCIAS(state, payload) {
    state.gerencias = payload;
  },
  UPDATE_DATOS(state, payload) {
    state.datos = { ...state.datos, ...payload };
  },
  SET_PERSONAL_ATS(state, payload) {
    state.personal = payload;
  },
  SET_LISTA_PLAN(state, payload) {
    state.listaPlanAccion = payload;
  },
  RESET_DATOS(state, payload) {
    console.log("reset");
    state.datos = { ...defaultPlan };
  }
};
const actions = {
  async getPlanAccion({ commit, state }, payload) {
    try {
      const response = await axios({
        url: "/tb_plan_accions",
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });
      console.log(response.data);
      commit("SET_LISTA_PLAN", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async postPlan({ commit, state }, payload) {
    try {
      console.log("datos");
      console.log(state.datos);
      const response = await axios({
        url: "/tb_plan_accions",
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        },
        data: state.datos
      });
      console.log(response.data);
      commit("UPDATE_DATOS", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async updatePlan({ commit, state }, payload) {
    try {
      console.log("update-datos");
      console.log(state.datos);
      const response = await axios({
        url: `/tb_plan_accions/${state.datos.id}`,
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        },
        data: state.datos
      });
      console.log(response.data);
      commit("UPDATE_DATOS", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async getOnePlan({ commit, state }, payload) {
    try {
      const response = await axios({
        url: `/tb_plan_accions/${payload.id}`,
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });
      console.log(response.data);
      const data = response.data;
      commit("UPDATE_DATOS", {
        ...data,
        ugb: parseInt(data.ugb),
        responsable_registro: parseInt(data.responsable_registro)
      });
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
