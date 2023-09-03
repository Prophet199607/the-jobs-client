export const state = () => ({
  cartData: {},
  buyNowProduct: {},
});

export const getters = {
  getCartData: (state) => state.cartData,
  getbuyNowProductData: (state) => state.buyNowProduct,
};

export const mutations = {
  SET_CART_DATA(state, cart_data) {
    state.cartData = cart_data;
  },

  SET_BUY_NOW_PRODUCT(state, product) {
    state.buyNowProduct = product;
  },
};

export const actions = {
  saveCart({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/transactions/cart", {
        products: payload,
      });
      commit("SET_CART_DATA", data);
      resolve(data);
    });
  },

  setBuyNowProduct({ commit }, payload) {
    commit("SET_BUY_NOW_PRODUCT", payload);
  },

  removeItemFromCart({ commit }, cart_item_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/transactions/cart/remove", {
        cart_item_id,
      });
      commit("SET_CART_DATA", data);
      resolve(data);
    });
  },

  loadCartData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/transactions/cart");
      commit("SET_CART_DATA", data);
      resolve(data);
    });
  },

  clearCartData({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/transactions/cart/clear");
      commit("SET_CART_DATA", null);
      resolve(data);
    });
  },
};
