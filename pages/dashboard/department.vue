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

      <p class="text-gray-500 font-medium">Department</p>
    </div>
    <!-- breadcrumbs end -->
    <!-- <div class="col-span-9 hidden md:grid grid-cols-3 gap-4"> -->
    <div class="col-span-12 md:col-span-12 shadow rounded px-2 md:px-6 pt-5 pb-7 w-full">
      <div class="flex justify-between col-span-12 gap-2">
        <div>
          <!-- create new department button start -->
          <button
            class="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 font-medium text-sm md:text-sm rounded uppercase flex items-center gap-2 hover:bg-transparent transition"
            @click="openDepartmentModal"
          >
            New Department
          </button>

          <!-- create new department button end -->
        </div>
        <button
          class="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 font-medium text-sm md:text-sm rounded uppercase flex items-center gap-2 hover:bg-transparent transition"
          @click="openProductImportModal"
        >
          Import
        </button>
      </div>
    </div>
    <!-- department modal start -->
    <div
      v-if="showDepartmentModal"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-30"
    >
      <div class="relative p-4 mt-3 w-full max-w-3xl h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header start -->
          <div class="flex px-2 py-2">
            <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-if="!editMode">
              Create new department
            </h2>
            <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-else>
              Update department
            </h2>
            <button
              type="button"
              class="text-gray-400 bg-transparent float-right px-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              @click="clearForm"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal header end -->

          <!-- Modal body start-->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="relative flex flex-col items-center justify-start gap-5 px-6">
              <label for="" class="text-gray-600 block">Department Image</label>
              <img
                :src="image_prev"
                class="cursor-pointer pb-3 product-image h-36 w-36"
                alt=""
                for="product_image"
              />
              <button
                type="button"
                class="absolute top-5 right-10 z-100 opacity-100 group-hover:opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
                @click="removeDepartmentImage"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
              <input
                type="file"
                @change="changeImage"
                id="product_image"
                class="block w-full text-sm"
                placeholder="Enter product name"
                hidden
              />
            </div>
            <div class="px-6 pb-6">
              <ValidationObserver v-slot="{ handleSubmit }" ref="departmentForm">
                <form @submit.prevent="handleSubmit(saveDepartment)">
                  <!-- form row start -->
                  <div class="grid grid-rows-2 grid-cols-1 gap-4">
                    <!-- single input start -->
                    <div>
                      <label for="" class="text-gray-600 mb-2 block"
                        >Department name</label
                      >
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input
                          type="text"
                          class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                          placeholder="Enter department name"
                          v-model="department.department_name"
                        />
                        <span class="input-invalid-message text-red-500 text-xs">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                    <!-- single input end -->
                    <!-- single input start -->
                    <div>
                      <label for="" class="text-gray-600 mb-2 block"
                        >Department Title</label
                      >
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input
                          type="text"
                          class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                          placeholder="Enter department title"
                          v-model="department.department_display_name"
                        />
                        <span class="input-invalid-message text-red-500 text-xs">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                    <!-- single input end -->

                    <!-- department check box start -->
                    <div class="flex gap-x-5">
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          id="Dominik"
                          class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                          v-model="department.status"
                        />
                        <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                          >Active</label
                        >
                      </div>
                    </div>
                    <!-- department check box end -->
                  </div>
                  <!-- form row end -->
                  <div class="mt-4 text-right">
                    <button
                      v-if="!editMode"
                      type="submit"
                      class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
                    >
                      save changes
                    </button>
                    <button
                      v-else
                      type="submit"
                      class="text-center bg-green-500 border border-green-500 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-green-500 transition uppercase text-xs md:text-sm"
                    >
                      Update department
                    </button>
                    <button
                      type="button"
                      class="text-center bg-gray-400 border border-gray-400 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
                      @click="clearForm"
                    >
                      cancel
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
          <!-- Modal body end-->
          <!-- Modal footer -->
        </div>
      </div>
    </div>
    <!-- department modal end -->
    <!-- department import modal start -->
    <div
      v-if="showDepartmentImportModal"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-30"
    >
      <div class="relative p-4 mt-3 w-full max-w-xl h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header start -->
          <div class="flex px-2 py-2">
            <h2 class="px-3 py-3 uppercase font-medium text-gray-600">
              Department Import
            </h2>
            <button
              type="button"
              class="text-gray-400 bg-transparent float-right px-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              @click="closeDepartmentImportModal"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal header end -->

          <!-- Modal body start-->
          <div class="grid grid-cols-1">
            <div class="relative flex flex-col items-center justify-start gap-5 px-6">
              <!-- <label for="" class="text-gray-600 block">File</label> -->
              <input
                type="file"
                @change="changeFileImport"
                id="product_image"
                class="block w-full text-sm"
                placeholder="Enter product name"
                hidden
              />
            </div>
            <div
              class="px-6 pb-6 flex mt-5 flex-col md:flex-row md:justify-between items-end md:items-center gap-y-2"
            >
              <button
                type="button"
                class="text-center bg-green-700 border border-green-700 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-green-700 transition text-xs md:text-sm"
                @click="downloadSampleProductExcelTemplate"
              >
                <i class="fa fa-download mr-2" aria-hidden="true"></i> Download Sample
                Template
              </button>
              <div class="text-right">
                <button
                  type="button"
                  class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-sm"
                  @click="uploadDepartments"
                >
                  Import
                </button>
                <button
                  type="button"
                  class="text-center bg-gray-400 border border-gray-400 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-sm"
                  @click="closeDepartmentImportModal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <!-- Modal body end-->
          <!-- Modal footer -->
        </div>
      </div>
    </div>
    <!-- department import modal end -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 md:px-6 py-3"></th>
            <th scope="col" class="px-2 md:px-6 py-3">Department ID</th>
            <th scope="col" class="px-2 md:px-6 py-3">Department name</th>
            <th scope="col" class="px-2 md:px-6 py-3">Status</th>
            <th scope="col" class="px-2 md:px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="department in departments.data"
            :key="department.id"
          >
            <td class="px-2 md:px-6 py-4">{{ department.no }}</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ department.id }}
            </th>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ department.department_name }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ department.status == 1 ? "Active" : "Inactive" }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900 text-right">
              <a
                href="#"
                class="font-medium text-blue-600"
                style="background: transparent; color: rgb(37 99 235)"
                @click="editDepartment(department)"
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
    departments() {
      return { ...this.$store.getters["departments/getAllDepartments"] };
    },
  },

  created() {},

  mounted() {
    if (!this.departments || !this.departments.data) {
      this.loadAllDepartments();
    }
  },

  methods: {
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
