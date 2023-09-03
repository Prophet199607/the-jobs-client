export const state = () => ({
  isLoading: false,
  isVerifiedEmailSent: false,
  selected_product_menu: 1,
  selectedFilters: [],
});

export const getters = {
  getSelectedProductMenu: (state) => state.selected_product_menu,
  getLoadingState: (state) => state.isLoading,
  getVerifiedEmailSendStatus: (state) => state.isVerifiedEmailSent,
  getSelectedFilters: (state) => state.selectedFilters,
};

export const mutations = {
  CHANGE_SELECED_PRODUCT_MENU(state, data) {
    state.selected_product_menu = data;
  },

  TOGGLE_LOADING_STATE(state, status) {
    state.isLoading = status;
  },

  CHANGE_VERIFIED_EMAIL_SEND_STATUS(state, status) {
    state.isVerifiedEmailSent = status;
  },

  SET_SELECTED_FILTERS(state, filter) {
    if (filter.type == "department") {
      const index = state.selectedFilters.findIndex(
        (el) => el.type == "department"
      );

      if (index != -1) {
        state.selectedFilters.splice(index, 1, filter);
      } else {
        state.selectedFilters.push(filter);
      }
    } else if (filter.type == "category") {
      const index = state.selectedFilters.findIndex(
        (el) => el.type == "category"
      );

      if (index != -1) {
        state.selectedFilters.splice(index, 1, filter);
      } else {
        state.selectedFilters.push(filter);
      }
    } else if (filter.type == "clear") {
      state.selectedFilters = [];
    }
  },
};

export const actions = {
  changeSelectedMenu({ commit }, menu) {
    commit("CHANGE_SELECED_PRODUCT_MENU", menu);
  },

  toggleLoadingState({ commit }, status) {
    commit("TOGGLE_LOADING_STATE", status);
  },

  changVerifiedEmailSentStatus({ commit }, status) {
    commit("CHANGE_VERIFIED_EMAIL_SEND_STATUS", status);
  },

  setSelectedFilters({ commit }, filter) {
    commit("SET_SELECTED_FILTERS", filter);
  },
};
