export const state = () => ({
  getSelectedCategory: 0,
  active_categories: [],
  all_categories: [],
});

export const getters = {
  getSelectedCategory: (state) => state.getSelectedCategory,
  getActiveCategories: (state) => state.active_categories,
  getAllCategories: (state) => state.all_categories,
};

export const mutations = {
  ADD_NEW_CATEGORY(state, category) {
    state.all_categories.data.push(category);
  },

  UPDATE_CATEGORY(state, category) {
    const index = state.all_categories.data.findIndex(
      (el) => el.id == category.id
    );
    state.all_categories.data.splice(index, 1, category);
  },

  SET_ACTIVE_CATEGORIES(state, categories) {
    state.active_categories = categories;
  },

  SET_ALL_CATEGORIES(state, categories) {
    state.all_categories = categories;
  },

  SET_SELECTED_CATEGORY(state, category) {
    state.getSelectedCategory = category;
  },
};

export const actions = {
  saveCategory({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/category", payload);
      commit("ADD_NEW_CATEGORY", data.category);
      resolve(data);
    });
  },

  updateCategory({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$post("/master/category/update", payload);
      commit("UPDATE_CATEGORY", data.category);
      resolve(data);
    });
  },

  loadCategoryDetails({ commit }, product_code) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/category/${product_code}`);
      resolve(data);
    });
  },

  loadActiveCategories({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/category/active`);
      commit("SET_ACTIVE_CATEGORIES", data.categories);
      resolve(data.categories);
    });
  },

  loadDepartmentCategories({ commit }, department_id) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/category/${department_id}`);
      commit("SET_ACTIVE_CATEGORIES", data.categories);
      resolve(data.categories);
    });
  },

  loadAllCategories({ commit }, page) {
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/master/category/all?page=${page}`);
      commit("SET_ALL_CATEGORIES", data.categories);
      resolve(data);
    });
  },

  setSelectedCategory({ commit }, category) {
    commit("SET_SELECTED_CATEGORY", category);
  },
};
