export const state = () => ({
  appointmentsReport: [],
});

export const getters = {
  getAppointmentsReport: (state) => state.appointmentsReport,
};

export const mutations = {
  SET_ALL_APPOINTMENT_REPORT(state, appointmentsReport) {
    state.appointmentsReport = appointmentsReport;
  },
};

export const actions = {
  loadAppointmentReport({ commit }, payload) {
    const authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/appointment/all?startDate=${payload.dateFrom}&endDate=${payload.dateTo}`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
      );
      commit("SET_ALL_APPOINTMENT_REPORT", data);
      resolve(data);
    });
  },
};
