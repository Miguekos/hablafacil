import { log } from "util";

const state = {
  Concluidas: "",
  Andamento: "",
  Atrasadas: ""
};

const getters = {};

const mutations = {};

const actions = {
  async conAndAtr() {
    const response = await axios({
      url: "/utils/dashboard",
      baseURL: process.env.VUE_APP_WEB_SERVER,
      method: "get"
    });
    const respuesta = response.data;
    log(respuesta);
    log(typeof respuesta);
    return respuesta;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
