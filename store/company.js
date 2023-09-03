export const state = () => ({
  companyData: [],
  allLocations: [],
  aboutUsData: [],
  privacyPolicy: "",
  termsAndConditions: "",
  returnPolicy: "",
  activeLocations: [],
});

export const getters = {
  getCompanyData: (state) => state.companyData,
  getAllLocations: (state) => state.allLocations,
  getAboutUsData: (state) => state.aboutUsData,
  getPrivacyPolicy: (state) => state.privacyPolicy,
  getTermsAndConditions: (state) => state.termsAndConditions,
  getReturnPolicy: (state) => state.returnPolicy,
  getActiveLocations: (state) => state.activeLocations,
};

export const mutations = {
  SET_COMPANY_DATA(state, data) {
    state.companyData = data;
  },

  SET_ALL_LOCATION_DATA(state, data) {
    state.allLocations = data;
  },

  SET_ABOUT_US_DATA(state, data) {
    state.aboutUsData = data;
  },

  SET_PRIVACY_POLICY_DATA(state, data) {
    state.privacyPolicy = data;
  },

  SET_TERMS_AND_CONDITION_DATA(state, data) {
    state.termsAndConditions = data;
  },

  SET_RETURN_POLICY_DATA(state, data) {
    state.returnPolicy = data;
  },

  SET_ACTIVE_LOCATION_DATA(state, data) {
    state.activeLocations = data;
  },
};

export const actions = {
  loadCompanyData({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/company");
      commit("SET_COMPANY_DATA", data.company);
      resolve(data.company);
    });
  },

  loadAllLocationData({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/company/locations/all");
      commit("SET_ALL_LOCATION_DATA", data.locations);
      resolve(data.locations);
    });
  },

  loadCompanyAboutUs({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/company/about-us");
      commit("SET_ABOUT_US_DATA", data.about_us);
      resolve(data.about_us);
    });
  },

  loadCompanyPrivacyPolicy({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/company/privacy-policy");
      commit("SET_PRIVACY_POLICY_DATA", data.privacy_policy);
      resolve(data.privacy_policy);
    });
  },

  loadCompanyTermsAndConditions({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        "/master/company/terms-and-conditions"
      );
      commit("SET_TERMS_AND_CONDITION_DATA", data.terms_and_conditions);
      resolve(data.terms_and_conditions);
    });
  },

  loadCompanyReturnPolicy({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/company/return-policy");
      commit("SET_RETURN_POLICY_DATA", data.return_policy);
      resolve(data.return_policy);
    });
  },

  loadActiveLocationData({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/company/locations/active");
      commit("SET_ACTIVE_LOCATION_DATA", data.locations);
      resolve(data.locations);
    });
  },

  saveCompanyData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/company", payload);
      commit("SET_COMPANY_DATA", data.company);
      resolve(data);
    });
  },

  saveLocationData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/company/locations",
        payload
      );
      commit("SET_ALL_LOCATION_DATA", data.locations);
      resolve(data);
    });
  },

  saveAboutUsData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/company/about-us", payload);
      commit("SET_ABOUT_US_DATA", data.about_us);
      resolve(data);
    });
  },

  savePrivacyPolicy({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/company/privacy-policy",
        payload
      );
      commit("SET_PRIVACY_POLICY_DATA", data.privacy_policy);
      resolve(data);
    });
  },

  saveTermsAndConditions({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/company/terms-and-conditions",
        payload
      );
      commit("SET_TERMS_AND_CONDITION_DATA", data.terms_and_conditions);
      resolve(data);
    });
  },

  saveReturnPolicy({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/company/return-policy",
        payload
      );
      commit("SET_RETURN_POLICY_DATA", data.return_policy);
      resolve(data);
    });
  },

  removeAboutUsImage({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/company/about-us/image/remove"
      );
      commit("SET_ABOUT_US_DATA", data.about_us);
      resolve(data);
    });
  },

  deleteLocationData({ commit }, location_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/company/locations/delete", {
        location_id,
      });
      commit("SET_ALL_LOCATION_DATA", data.locations);
      resolve(data);
    });
  },

  setCompanyData({ commit }, company) {
    commit("SET_COMPANY_DATA", company);
  },

  setPrivacyPolicy({ commit }, privacy_policy) {
    commit("SET_PRIVACY_POLICY_DATA", privacy_policy);
  },

  setTermsAndConditions({ commit }, terms_and_conditions) {
    commit("SET_TERMS_AND_CONDITION_DATA", terms_and_conditions);
  },

  setReturnPolicy({ commit }, return_policy) {
    commit("SET_RETURN_POLICY_DATA", return_policy);
  },
};
