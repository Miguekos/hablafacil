import { format } from "date-fns";
import { defaultIncidente } from "../../utils/default.js";
const user_hablafacil = JSON.parse(localStorage.getItem("user_nexa"))
console.log("###################################")
console.log(user_hablafacil.id)
console.log("###################################")
const state = {
  areas: [],
  gerencias: [],
  locales: [{ id: 1, text: "PORVENIR-PASCO" }],
  personal: [],
  datos: defaultIncidente,
  listaIncidencias: []
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
  SET_LISTA_INCIDENCIAS(state, payload) {
    state.listaIncidencias = payload;
  },
  RESET_DATOS(state, payload) {
    console.log("reset");
    state.datos = { ...defaultIncidente };
  }
};
const actions = {
  async getAreas({ commit }, payload) {
    try {
      const response = await axios({
        url: "/tb_areas",
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });

      commit("SET_AREAS", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async getGerencias({ commit }, payload) {
    try {
      const response = await axios({
        url: "/tb_gerencias",
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });

      commit("SET_GERENCIAS", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async getPersonal({ commit }, payload) {
    try {
      const response = await axios({
        url: "/tb_personal_ats",
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });

      commit("SET_PERSONAL_ATS", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async getIncidencias({ commit, state }, payload) {
    try {
      const response = await axios({
        // url: "/tb_incidencias",
        url: `/tb_incidencias?filter={"where":{"responsable_del_registro":"${
          user_hablafacil.id
        }"}}`,
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        }
      });

      commit("SET_LISTA_INCIDENCIAS", response.data);
    } catch (e) {
      console.log(e);
    }
  },
  async postIncidencias({ commit, state }, payload) {
    try {
      console.log("datos");
      console.log(state.datos);
      const response = await axios({
        // url: "/tb_incidencias",
        url: `/tb_incidencias?filter={"where":{"responsable_del_registro":"${
          user_hablafacil.id
        }"}}`,
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        },
        data: state.datos
      });
      const id = response.data.id;
      //GET THE ID
      console.log("here-1");
      const responseUp = await axios({
        url: `/tb_incidencias/${id}`,
        baseURL: process.env.VUE_APP_WEB_SERVER,
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic YXBpYWNjYWNjOlZWMWc4SnZrN3A0djVoVFBSNFZj"
        },
        data: { ...state.datos, numero: id }
      });
      console.log(response.data);
      commit("UPDATE_DATOS", responseUp.data);
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
