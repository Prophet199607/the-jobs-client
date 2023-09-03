export const state = () => ({
  homeData: [],
});

export const mutations = {
  ADD_HOME_DATA(state, data) {
    state.homeData = data;
  },
};

export const actions = {
  getHomeData({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/home");
      commit("ADD_HOME_DATA", data);
      resolve(data);
    });
  },

  loadAllBanners({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/home/banners/all");
      resolve(data);
    });
  },

  loadAllMobileBanners({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/home/banners/all/mobile");
      resolve(data);
    });
  },

  saveMainSliderImages({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/home/banners/main", payload);
      resolve(data);
    });
  },

  saveMainMobileSliderImages({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/home/banners/main/mobile",
        payload
      );
      resolve(data);
    });
  },

  saveBannerImage1({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/home/banner/image/1", payload);
      resolve(data);
    });
  },

  saveBannerImage2({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/home/banner/image/2", payload);
      resolve(data);
    });
  },

  saveMobileBannerImage1({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/home/banner/image/mobile/1",
        payload
      );
      resolve(data);
    });
  },

  saveMobileBannerImage2({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/home/banner/image/mobile/2",
        payload
      );
      resolve(data);
    });
  },

  removeSliderImage({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/home/banners/main/remove",
        payload
      );
      resolve(data);
    });
  },

  removeMobileSliderImage({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/home/banners/main/mobile/remove",
        payload
      );
      resolve(data);
    });
  },

  removeBannerImage({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(`/home/banners/remove`, payload);
      resolve(data);
    });
  },

  removeMobileBannerImage({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(`/home/banners/mobile/remove`, payload);
      resolve(data);
    });
  },
};
