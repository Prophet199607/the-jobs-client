export const state = () => ({
  customerData: [],
});

export const getters = {
  getCustomerData: (state) => state.customerData,
};

export const mutations = {
  SET_CUSTOMER_DATA(state, data) {
    state.customerData = data;
  },
};

export const actions = {
  loadCustomerData({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/customer");
      commit("SET_CUSTOMER_DATA", data.customer);
      resolve(data.customer);
    });
  },

  loadAllCustomers({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/customer/all");
      // commit("SET_CUSTOMER_DATA", data.customer);
      resolve(data);
    });
  },

  loadSelectedCustomerDetails({ commit }, customer_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/customer/${customer_id}`);
      // commit("SET_CUSTOMER_DATA", data.customer);
      resolve(data.customer);
    });
  },

  loadCustomerAddresses({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/customer/addresses");
      resolve(data.addresses);
    });
  },

  saveCustomerData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/customer", payload);
      commit("SET_CUSTOMER_DATA", data.customer);
      resolve(data);
    });
  },

  saveCustomerAddresses({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/customer/addresses/update",
        payload
      );
      resolve(data);
    });
  },

  saveProfileData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/customer/profile", payload);
      resolve(data);
    });
  },

  changePassword({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.$axios.$post(
          "/master/customer/profile/password",
          payload
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },

  verifyEmail({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/customer/verification",
        payload
      );
      resolve(data);
    });
  },

  resendVerificationEmail({ commit }, user_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/master/customer/verification/resend/${user_id}`
      );
      resolve(data);
    });
  },

  loadProvinces({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/provinces`);
      resolve(data);
    });
  },

  loadDistricts({ commit }, province_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/master/provinces/${province_id}/district`
      );
      resolve(data);
    });
  },

  loadCities({ commit }, district_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/master/provinces/district/${district_id}/city`
      );
      resolve(data);
    });
  },

  searchCustomers({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        `/master/customer/search/paginate?page=${payload.page}`,
        payload
      );
      // commit("SET_ACTIVE_PRODUCTS", data.results);
      resolve(data.results);
    });
  },
};
