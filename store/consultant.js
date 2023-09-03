export const state = () => ({
  consultants: [],
});

export const getters = {
  getAllConsultants: (state) => state.consultants,
};

export const mutations = {
  //   ADD_NEW_DEPARTMENT(state, department) {
  //     state.all_departments.data.unshift(department);
  //   },

  //   UPDATE_DEPARTMENT(state, department) {
  //     const index = state.all_departments.data.findIndex(
  //       (el) => el.id == department.id
  //     );
  //     state.all_departments.data.splice(index, 1, department);
  //   },

  //   SET_ACTIVE_DEPARTMENTS(state, departments) {
  //     state.active_departments = departments;
  //   },

  SET_ALL_CONSULTANTS(state, consultants) {
    state.consultants = consultants;
  },

  //   SET_SELECTED_DEPARTMENT(state, department) {
  //     state.getSelectedDepartment = department;
  //   },
};

export const actions = {
  //   saveDepartment({ commit }, payload) {
  //     return new Promise(async (resolve, reject) => {
  //       const data = await this.$axios.$post("/master/department", payload);
  //       commit("ADD_NEW_DEPARTMENT", data.department);
  //       resolve(data);
  //     });
  //   },

  //   updateDepartment({ commit }, payload) {
  //     return new Promise(async (resolve, reject) => {
  //       const data = await this.$axios.$post(
  //         "/master/department/update",
  //         payload
  //       );
  //       commit("UPDATE_DEPARTMENT", data.department);
  //       resolve(data);
  //     });
  //   },

  //   loadDepartmentDetails({ commit }, product_code) {
  //     return new Promise(async (resolve, reject) => {
  //       const data = await this.$axios.$get(`/master/department/${product_code}`);
  //       resolve(data);
  //     });
  //   },

  //   loadActiveDepartments({ commit }) {
  //     return new Promise(async (resolve, reject) => {
  //       const data = await this.$axios.$get(`/master/department/active`);
  //       commit("SET_ACTIVE_DEPARTMENTS", data.departments);
  //       resolve(data.departments);
  //     });
  //   },

  loadAllConsultants({ commit }, page) {
    let authToken = localStorage.getItem("authToken");
    return new Promise(async (resolve, reject) => {
      const data = await this.$axios.$get(`/consultant/all?page=${page}`, {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      });
      console.log(data);
      commit("SET_ALL_CONSULTANTS", data);
      resolve(data);
    });
  },

  //   uploadDepartments({ commit }, payload) {
  //     return new Promise(async (resolve, reject) => {
  //       const data = await this.$axios.$post(
  //         "/master/department/upload",
  //         payload
  //       );
  //       commit("SET_ALL_CONSULTANTS", data.data);
  //       resolve(data.data);
  //     });
  //   },

  //   downloadSampleDepartmentExcelTemplate({ commit }) {
  //     return new Promise(async (resolve, reject) => {
  //       this.$axios
  //         .$get("/master/department/template/download", {
  //           responseType: "arraybuffer",
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           let blob = new Blob([response], {
  //             type: "application/vnd.ms-excel",
  //           });
  //           let link = document.createElement("a");
  //           link.href = window.URL.createObjectURL(blob);
  //           link.download = "sample_department_import_template.xlsx";
  //           link.click();
  //         });
  //     });
  //   },

  //   setSelectedDepartment({ commit }, department) {
  //     commit("SET_SELECTED_DEPARTMENT", department);
  //   },
};
