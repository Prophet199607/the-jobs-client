// export const actions = {
//   async nuxtServerInit({ commit, app }, { req }) {
//     let auth = null;
//     let cookie = app.$cookies.get("auth._token.laravelSanctum");
//     // if (req.headers.cookie) {
//     if (cookie) {
//       // cookie found
//       try {
//         // check data user login with cookie
//         const { data } = await this.$axios.get("/user");
//         // server return the data is cookie valid loggedIn is true
//         auth = data; // set the data auth
//       } catch (err) {
//         await this.$auth.logout();
//         // No valid cookie found
//         auth = null;
//       }
//     }
//     this.$auth.setUser(auth); // set state auth
//   },
// };

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
};

// export const actions = {
//   loadCompanyData({ commit }) {
//     return new Promise(async (resolve, reject) => {
//       const data = await this.$axios.$get("/master/company");
//       commit("SET_COMPANY_DATA", data.company);
//       resolve(data.company);
//     });
//   },
// };
