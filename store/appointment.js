export const state = () => ({
  consultants: [],
  paginatedConsultants: [],
});

export const getters = {
  getAllPaginatedConsultants: (state) => state.paginatedConsultants,
  getAllConsultants: (state) => state.consultants,
};

export const mutations = {
  SET_ALL_CONSULTANTS(state, consultants) {
    state.consultants = consultants;
  },

  SET_ALL_PAGINATED_CONSULTANTS(state, paginatedConsultants) {
    state.paginatedConsultants = paginatedConsultants;
  },
};

export const actions = {
  saveAppointment({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post(
          "/appointment",
          payload.appointment,
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

  saveAppointmentWithUser({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post(
          "/appointment/new/job-seeker",
          payload.appointment,
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

  changeStatusOfAppointment({ commit }, payload) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$get(
          `/appointment/change-status/${payload.appointmentId}?status=${payload.status}&isAccepted=${payload.isAccepted}`,
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

  loadMyAppointments({ commit }) {
    const authToken = localStorage.getItem("authToken");
    const jobSeekerId = localStorage.getItem("loggedUserId");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/appointment/job-seeker/${jobSeekerId}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      resolve(data);
    });
  },

  loadConsultantsAppointments({ commit }, selectedStatus) {
    const authToken = localStorage.getItem("authToken");
    const consultantId = localStorage.getItem("loggedUserId");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/appointment/consultant/${consultantId}/status/${selectedStatus}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
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

  canceledAppointment({ commit }, appointmentId) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$delete(
          `/appointment/${appointmentId}`,
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
};
