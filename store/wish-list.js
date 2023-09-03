export const state = () => ({
  wishListData: {},
});

export const getters = {
  getWishListData: (state) => state.wishListData,
};

export const mutations = {
  SET_WISH_LIST_DATA(state, cart_data) {
    state.wishListData = cart_data;
  },
};

export const actions = {
  saveWishList({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/transactions/wish-list", {
        product: payload,
      });
      commit("SET_WISH_LIST_DATA", data);
      resolve(data);
    });
  },

  removeItemFromWishList({ commit }, product_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/transactions/wish-list/remove", {
        product_id,
      });
      commit("SET_WISH_LIST_DATA", data);
      resolve(data);
    });
  },

  loadWishListData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/transactions/wish-list");
      commit("SET_WISH_LIST_DATA", data);
      resolve(data);
    });
  },
};
