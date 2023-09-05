export const state = () => ({
  jobTypes: [],
});

export const getters = {
  getAllJobTypes: (state) => state.jobTypes,
};

export const mutations = {
  SET_ALL_JOBTYPES(state, jobTypes) {
    state.jobTypes = jobTypes;
  },
};

export const actions = {
  loadAllJobTypes({ commit }, page) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get("/job-type/all", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      commit("SET_ALL_JOBTYPES", data);
      resolve(data);
    });
  },
};
