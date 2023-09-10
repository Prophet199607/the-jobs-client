export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  loadAdminDashboardFigures({ commit }) {
    const authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get("/dashboard/admin", {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      resolve(data);
    });
  },

  loadConsultantDashboardFigures({ commit }) {
    const authToken = localStorage.getItem("authToken");
    const consultantId = localStorage.getItem("loggedUserId");
    return new Promise(async (resolve, reject) => {
      const { data } = await this.$axios.$get(
        `/dashboard/consultant/${consultantId}`,
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
