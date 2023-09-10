export const state = () => ({
  jobSeekers: [],
});

export const getters = {
  getAllJobSeekers: (state) => state.jobSeekers,
};

export const mutations = {
  SET_ALL_JOB_SEEKERS(state, jobSeekers) {
    state.jobSeekers = jobSeekers;
  },
};

export const actions = {
  saveJobSeeker({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post(
          "/job-seeker",
          payload.job_seeker,
          {
            headers: {
              Authorization: "Bearer " + authToken,
            },
          }
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  register({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post("/register", payload.job_seeker);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateJobSeeker({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$put(
        `/job-seeker/${payload.job_seeker.jobSeekerId}`,
        payload.job_seeker,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  getJobSeekerDetails({ commit }, job_seekerId) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/job-seeker/findById/${job_seekerId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  searchJobSeekers({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/job-seeker?keyword=${payload.search_term}&page=${payload.page}&size=3`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      commit("SET_ALL_JOB_SEEKERS", data);
      resolve(data);
    });
  },

  loadAllJobSeekers({ commit }) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/job-seeker/all`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      commit("SET_ALL_JOB_SEEKERS", data);
      resolve(data);
    });
  },

  loadAllJobSeekersWithPagination({ commit }, page) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/job-seeker/all/paginate?page=${page}&size=3`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      commit("SET_ALL_JOB_SEEKERS", data);
      resolve(data);
    });
  },

  deleteJobSeeker({ commit }, jobSeekerId) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$delete(`/job-seeker/${jobSeekerId}`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      commit("SET_ALL_JOB_SEEKERS", data);
      resolve(data);
    });
  },
};
