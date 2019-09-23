const state = {
  user: {
    nombres: null,
    apellidos: null,
    email: null,
    password: null,
    role: 0,
    id: null,
    isAuth: false
  }
};

const getters = {};

const mutations = {
  UPDATE_USER(state, payload) {
    state.user = payload;
  }
};

const actions = {
  async postUser({ rootState }, payload) {
    const data = {
      id_sede: rootState.users.user.id_sede,
      ...payload,
      usuario: payload.documento
    };

    const response = await axios({
      url: "/tb_users",
      baseURL: process.env.VUE_APP_WEB_SERVER,
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.VUE_APP_AUTHORIZATION
      },
      data
    });
  },
  async delUser({}, payload) {
    ////console.log(payload);
    const response = await axios({
      url: `/tb_users/${payload.id}`,
      baseURL: process.env.VUE_APP_WEB_SERVER,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.VUE_APP_AUTHORIZATION
      }
    });
    // ////console.log(response.data);
    return response.data;
  },
  async updateUser({}, payload) {
    console.log("up");
    console.log(payload);
    await axios({
      url: `/tb_users/${payload.id}`,
      baseURL: process.env.VUE_APP_WEB_SERVER,
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.VUE_APP_AUTHORIZATION
      },
      data: {
        ...payload
      }
    });
    ////console.log("getlista");
    ////console.log(response.data);
  },
  async goLogin({ commit }, payload) {
    //console.log(payload);
    const response = await axios({
      url: `/tb_users?filter={"where":{"and":[{"email":"${
        payload.usuario
      }"},{"password":"${payload.password}"}]}}`,
      baseURL: process.env.VUE_APP_WEB_SERVER,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: process.env.VUE_APP_AUTHORIZATION
      }
    });
    console.log(response.data[0]);
    localStorage.setItem("user_nexa", JSON.stringify(response.data[0]));
    return response.data[0];
    // return payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
