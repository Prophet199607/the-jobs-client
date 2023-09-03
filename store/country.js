export const state = () => ({
  countries: [],
});

export const getters = {
  getAllCountries: (state) => state.countries,
};

export const mutations = {
  SET_ALL_COUNTRIES(state, countries) {
    state.countries = countries;
  },
};

export const actions = {
  loadAllCountries({ commit }, page) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get("/country/all", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      commit("SET_ALL_COUNTRIES", data);
      resolve(data);
    });
  },
};
