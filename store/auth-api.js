export const state = () => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
  authToken: localStorage.getItem("authToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  roles: JSON.parse(localStorage.getItem("roles")) || null,
});

export const getters = {
  getAuthenticatedState: (state) => state.isAuthenticated,
  getLoggedInUserDetails: (state) => state.user,
  getLoggedInUserRoles: (state) => state.roles,
};

export const mutations = {
  SET_AUTH_TOKEN(state, token) {
    state.authToken = token;
  },
  SET_AUTHENTICATION(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
};

export const actions = {
  login({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post("/auth/authenticate", payload);
        commit("SET_AUTH_TOKEN", data);
        commit("SET_AUTHENTICATION", true);
        commit("SET_USER", data.user);
        commit("SET_ROLES", data.roles);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("roles", JSON.stringify(data.roles));
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  logout({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      // const data = await this.$axios.$post("/auth/authenticate", payload);
      commit("SET_AUTH_TOKEN", null);
      commit("SET_AUTHENTICATION", false);
      commit("SET_USER", null);
      commit("SET_ROLES", null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      resolve();
    });
  },
};
