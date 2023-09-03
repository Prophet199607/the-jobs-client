export const state = () => ({
  products: [],
  active_products: {},
});

export const getters = {
  getActiveProducts: (state) => state.active_products,
};

export const mutations = {
  ADD_NEW_PRODUCT(state, product) {
    state.products.push(product);
  },

  SET_ACTIVE_PRODUCTS(state, products) {
    state.active_products = products;
  },
};

export const actions = {
  saveProduct({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/product", payload);
      commit("ADD_NEW_PRODUCT", data);
      resolve(data);
    });
  },

  uploadProducts({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/product/upload", payload);
      resolve(data);
    });
  },

  downloadSampleProductExcelTemplate({ commit }) {
    return new Promise(async (resolve, reject) => {
      this.$axios
        .$get("/master/product/template/download", {
          responseType: "arraybuffer",
        })
        .then((response) => {
          let blob = new Blob([response], {
            type: "application/vnd.ms-excel",
          });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "sample_product_import_template.xlsx";
          link.click();
        });
    });
  },

  updateProduct({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/product/update", payload);
      // commit("ADD_NEW_PRODUCT", data);
      resolve(data);
    });
  },

  getProductDetails({ commit }, product_code) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/product/${product_code}`);
      resolve(data);
    });
  },

  removeRelatedImage({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        "/master/product/images/related/remove",
        payload
      );
      resolve(data);
    });
  },

  loadBuyNowProductDetails({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/master/product/${payload.product_code}`
      );
      let buy_now = {};

      let product = {
        product_id: data.product.id,
        product_code: data.product.product_code,
        product_name: data.product.product_name,
        price: data.product.price,
        qty: payload.qty,
        image: data.product.thumbnail_path,
        filter: null,
      };

      if (payload.filter != 0) {
        const filter = data.product.filters.find(
          (el) => el.id == payload.filter
        );
        product.filter = filter.filter_name;
        product.price = filter.filter_price;

        let splitted_image_path = filter.filter_image.split("/");
        product.image = `products/related/${
          splitted_image_path[splitted_image_path.length - 1]
        }`;
      }

      buy_now.item_count = 1;
      buy_now.total_amount = product.price * payload.qty;

      buy_now.products = [product];

      commit("cart/SET_BUY_NOW_PRODUCT", buy_now, { root: true });

      resolve(data);
    });
  },

  storeReview({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/product/review", payload);
      // commit("ADD_NEW_PRODUCT", data);
      resolve(data);
    });
  },

  storeFilters({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/product/filters", payload);
      // commit("ADD_NEW_PRODUCT", data);
      resolve(data);
    });
  },

  loadProductListForFeaturedProducts({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/product/except/featured");
      resolve(data.products);
    });
  },

  getFeaturedproducts({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get("/master/product/featured/all");
      // commit("ADD_NEW_PRODUCT", data);
      resolve(data.featured_products);
    });
  },

  storeFeaturedproducts({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/product/featured", payload);
      // commit("ADD_NEW_PRODUCT", data);
      resolve(data);
    });
  },

  loadAllReviewsForSelectedProduct({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(
        `/master/product/${payload.product_code}/reviews/all?page=${payload.page}`
      );
      resolve(data.reviews);
    });
  },

  loadActiveProducts({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        `/master/product/filter?page=${payload.page}`,
        payload
      );
      commit("SET_ACTIVE_PRODUCTS", data.products);
      resolve(data);
    });
  },

  searchProduct({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(`/master/product/search`, payload);
      commit("SET_ACTIVE_PRODUCTS", data.results);
      resolve(data.results);
    });
  },

  searchProduct2({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post(
        `/master/product/search/paginate?page=${payload.page}`,
        payload
      );
      commit("SET_ACTIVE_PRODUCTS", data.results);
      resolve(data.results);
    });
  },

  loadAllProducts({ commit }, page) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/product/all?page=${page}`);
      resolve(data);
    });
  },
};
