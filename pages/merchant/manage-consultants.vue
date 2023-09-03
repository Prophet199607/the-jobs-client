<template>
  <!-- <div class="col-span-9 hidden md:grid grid-cols-1 gap-4"> -->
  <div class="col-span-12 md:col-span-12 shadow rounded px-2 md:px-6 pt-5 pb-7 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Manage Consultants</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 md:px-6 py-3">ID</th>
            <th scope="col" class="px-2 md:px-6 py-3">Name</th>
            <th scope="col" class="px-2 md:px-6 py-3">Email</th>
            <th scope="col" class="px-2 md:px-6 py-3">Status</th>
            <th scope="col" class="px-2 md:px-6 py-3">Country</th>
            <th scope="col" class="px-2 md:px-6 py-3">Job Type</th>
            <th scope="col" class="px-2 md:px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="consultant in consultants.data"
            :key="consultant.id"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ consultant.consultantId }}
            </th>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ consultant.firstName }} {{ consultant.lastName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ consultant.email }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ consultant.isAvailable == 1 ? "Available" : "Unavailable" }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ consultant.country.countryName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ consultant.jobType.jobType }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900 text-right">
              <a
                href="#"
                class="font-medium text-blue-600"
                style="background: transparent; color: rgb(37 99 235)"
                @click="editDepartment(consultant)"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my-3 float-right mx-3">
        <pagination
          align="right"
          :data="departments"
          :limit="3"
          @pagination-change-page="loadAllDepartments"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      editMode: false,
      showDepartmentModal: false,
      showDepartmentImportModal: false,
      department: {
        id: "",
        department_name: "",
        department_display_name: "",
        department_image: "",
        status: true,
      },
      image_prev: `${process.env.API_IMAGE_BASE_URL}departments/default.webp`,
      remove_image: false,
      department_import: "",
    };
  },

  computed: {
    consultants() {
      return { ...this.$store.getters["consultant/getAllConsultants"] };
    },
    departments() {
      return { ...this.$store.getters["departments/getAllDepartments"] };
    },
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
  },

  created() {
    this.loadAllConsultants();
  },

  mounted() {
    // if (!this.departments || !this.departments.data) {
    //   this.loadAllDepartments();
    // }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.loggedInUserRoles.includes("ROLE_ADMIN")) {
        vm.$router.push({ path: "/" });
      } else {
        return true;
      }
    });
  },

  methods: {
    loadAllConsultants(page = 1) {
      this.$store.dispatch("consultant/loadAllConsultants", page).then((res) => {});
    },

    loadAllDepartments(page = 1) {
      this.$store.dispatch("departments/loadAllDepartments", page);
    },

    openDepartmentModal() {
      this.showDepartmentModal = true;
    },

    closeDepartmentModal() {
      this.showDepartmentModal = false;
    },

    editDepartment({ ...department }) {
      this.editMode = true;
      this.openDepartmentModal();
      this.department = department;
      this.image_prev = process.env.API_IMAGE_BASE_URL + department.department_image;
    },

    saveDepartment() {
      let storeAction = "departments/saveDepartment";
      if (this.editMode) storeAction = "departments/updateDepartment";

      let formData = new FormData();
      formData.append("id", this.department.id);
      formData.append("department_name", this.department.department_name);
      formData.append("department_display_name", this.department.department_display_name);
      formData.append("department_image", this.department.department_image);
      formData.append("remove_image", this.remove_image);
      formData.append("status", this.department.status == true ? 1 : 0);

      this.$store.dispatch(storeAction, formData).then((res) => {
        swal("Success!", res.message, "success");
        this.showDepartmentModal = false;
        this.clearForm();
      });
    },

    openProductImportModal() {
      this.showDepartmentImportModal = true;
    },

    changeFileImport(e) {
      const file = e.target.files[0];
      this.department_import = file;
    },

    downloadSampleProductExcelTemplate() {
      this.$store.dispatch("departments/downloadSampleDepartmentExcelTemplate");
    },

    uploadDepartments() {
      let formData = new FormData();
      formData.append("department_import", this.department_import);

      this.$store.dispatch("departments/uploadDepartments", formData).then((res) => {
        this.closeDepartmentImportModal();
        swal("Success!", res.message, "success");
      });
    },

    closeDepartmentImportModal() {
      this.showDepartmentImportModal = false;
    },

    removeDepartmentImage() {
      this.remove_image = true;
      this.department.department_image = "";
      this.image_prev = `${process.env.API_IMAGE_BASE_URL}departments/default.webp`;
    },

    changeImage(e) {
      const file = e.target.files[0];
      this.image_prev = URL.createObjectURL(file);
      this.department.department_image = file;
    },

    clearForm() {
      this.showDepartmentModal = false;
      this.editMode = false;
      this.$refs.departmentForm.reset();
      this.department = {
        id: "",
        department_name: "",
        department_display_name: "",
        department_image: "",
        status: true,
      };
      this.image_prev = `${process.env.API_IMAGE_BASE_URL}departments/default.webp`;
    },
  },
};
</script>

<style scoped>
/* pagination styles start */
::v-deep .pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}
::v-deep .page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #fd3d57;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
::v-deep .page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #fd3d57;
  border-color: #fd3d57;
}
::v-deep a:hover {
  color: #fd3d57;
  text-decoration: none;
  background-color: #adadad83;
  color: #fff;
}
/* pagination styles end */
</style>
