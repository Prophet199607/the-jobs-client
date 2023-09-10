export const state = () => ({
  consultants: [],
  paginatedConsultants: [],
});

export const getters = {
  getAllPaginatedConsultants: (state) => state.paginatedConsultants,
  getAllConsultants: (state) => state.consultants,
};

export const mutations = {
  //   UPDATE_DEPARTMENT(state, department) {
  //     const index = state.all_departments.data.findIndex(
  //       (el) => el.id == department.id
  //     );
  //     state.all_departments.data.splice(index, 1, department);
  //   },

  //   SET_ACTIVE_DEPARTMENTS(state, departments) {
  //     state.active_departments = departments;
  //   },

  SET_ALL_CONSULTANTS(state, consultants) {
    state.consultants = consultants;
  },

  SET_ALL_PAGINATED_CONSULTANTS(state, paginatedConsultants) {
    state.paginatedConsultants = paginatedConsultants;
  },

  //   SET_SELECTED_DEPARTMENT(state, department) {
  //     state.getSelectedDepartment = department;
  //   },
};

export const actions = {
  saveTimeSlot({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post("/schedule", payload.schedule, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  deleteTimeSlot({ commit }, scheduleId) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$delete(`/schedule/${scheduleId}`, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  saveConsultant({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post(
          "/consultant",
          payload.consultant,
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

  updateConsultant({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$put(
        `/consultant/${payload.consultant.consultantId}`,
        payload.consultant,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  deleteConsultant({ commit }, consultantId) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$delete(`/consultant/${consultantId}`, {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  getConsultantDetails({ commit }, consultantId) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/consultant/findById/${consultantId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  searchConsultants({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/consultant?keyword=${payload.search_term}&page=${payload.page}&size=3`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      commit("SET_ALL_PAGINATED_CONSULTANTS", data);
      resolve(data);
    });
  },

  loadAllConsultants({ commit }) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(`/consultant/all`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      commit("SET_ALL_CONSULTANTS", data);
      resolve(data);
    });
  },

  loadAllConsultantsWithPagination({ commit }, page) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/consultant/all/paginate?page=${page}&size=3`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      commit("SET_ALL_PAGINATED_CONSULTANTS", data);
      resolve(data);
    });
  },

  loadAllConsultantsByJobTypeAndCountry({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/consultant/job-type/${payload.jobTypeId}/country/${payload.countryId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  loadSchedulesByConsultant({ commit }, consultantId) {
    let authToken = localStorage.getItem("authToken");

    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/schedule/all/consultant/${consultantId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  loadAvailableSchedulesByConsultant({ commit }, consultantId) {
    let authToken = localStorage.getItem("authToken");

    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/schedule/available/consultant/${consultantId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },
};
