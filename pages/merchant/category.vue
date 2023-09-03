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

      <p class="text-gray-500 font-medium">Categories</p>
    </div>
    <!-- breadcrumbs end -->
    <!-- <div class="col-span-9 hidden md:grid grid-cols-3 gap-4"> -->
    <div class="col-span-12 md:col-span-12 shadow rounded px-2 md:px-6 pt-5 pb-7 w-full">
      <div class="flex col-span-12 gap-2">
        <div>
          <!-- create new category button start -->
          <button
            class="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 font-medium text-sm md:text-sm rounded uppercase flex items-center gap-2 hover:bg-transparent transition"
            @click="openCategoryModal"
          >
            New Category
          </button>
          <!-- create new category button end -->
        </div>
      </div>
    </div>
    <!-- category modal start -->
    <div
      v-if="showCategoryModal"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-30"
    >
      <div class="relative p-4 mt-3 w-full max-w-xl h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header start -->
          <div class="flex px-2 py-2">
            <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-if="!editMode">
              Create new category
            </h2>
            <h2 class="px-3 py-3 uppercase font-medium text-gray-600" v-else>
              Update category
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
          <div class="px-6 pb-6">
            <ValidationObserver v-slot="{ handleSubmit }" ref="categoryForm">
              <form @submit.prevent="handleSubmit(saveCategory)">
                <!-- form row start -->
                <div class="grid grid-rows-2 grid-cols-1 gap-4">
                  <div>
                    <label for="" class="text-gray-600 mb-2 block">Department</label>
                    <ValidationProvider v-slot="{ errors }" rules="select">
                      <select
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        v-model="category.department_id"
                      >
                        <option value="0">-- select --</option>
                        <option
                          v-for="(department, index) in departments"
                          :key="index"
                          :value="department.id"
                        >
                          {{ department.department_display_name }}
                        </option>
                      </select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <!-- single input end -->
                  <!-- single input start -->
                  <div>
                    <label for="" class="text-gray-600 mb-2 block">Category name</label>
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        class="block w-full border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter category name"
                        v-model="category.category_name"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <!-- single input end -->

                  <!-- category check box start -->
                  <div class="flex gap-x-5">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="Dominik"
                        class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                        v-model="category.status"
                      />
                      <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                        >Active</label
                      >
                    </div>
                  </div>
                  <!-- category check box end -->
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
                    Update category
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
          <!-- Modal body end-->
          <!-- Modal footer -->
        </div>
      </div>
    </div>
    <!-- category modal end -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 md:px-6 py-3"></th>
            <th scope="col" class="px-2 md:px-6 py-3">Category ID</th>
            <th scope="col" class="px-2 md:px-6 py-3">Category name</th>
            <th scope="col" class="px-2 md:px-6 py-3">Department</th>
            <th scope="col" class="px-2 md:px-6 py-3">Status</th>
            <th scope="col" class="px-2 md:px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="category in categories.data"
            :key="category.id"
          >
            <td class="px-2 md:px-6 py-4">{{ category.no }}</td>
            <th
              scope="row"
              class="px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ category.id }}
            </th>
            <td class="px-2 md:px-6 py-4 text-gray-900">{{ category.category_name }}</td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ category.department.department_display_name }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ category.status == 1 ? "Active" : "Inactive" }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900 text-right">
              <a
                href="#"
                class="font-medium text-blue-600"
                style="background: transparent; color: rgb(37 99 235)"
                @click="editCategory(category)"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my-3 float-right mx-3">
        <pagination
          align="right"
          :data="categories"
          :limit="3"
          @pagination-change-page="loadAllCategories"
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
      showCategoryModal: false,
      category: {
        id: "",
        department_id: 0,
        category_name: "",
        status: true,
      },
    };
  },

  computed: {
    categories() {
      return { ...this.$store.getters["categories/getAllCategories"] };
    },

    departments() {
      return this.$store.getters["departments/getActiveDepartments"];
    },
  },

  created() {},

  mounted() {
    if (!this.categories || !this.categories.data) {
      this.loadAllCategories();
    }

    if (!this.departments || this.departments.length == 0) {
      this.loadActiveDepartments();
    }
  },

  methods: {
    loadAllCategories(page = 1) {
      this.$store.dispatch("categories/loadAllCategories", page);
    },

    loadActiveDepartments() {
      this.$store.dispatch("departments/loadActiveDepartments");
    },

    openCategoryModal() {
      this.showCategoryModal = true;
    },

    closeCategoryModal() {
      this.showCategoryModal = false;
    },

    editCategory({ ...category }) {
      this.editMode = true;
      this.openCategoryModal();
      this.category = category;
    },

    saveCategory() {
      let storeAction = "categories/saveCategory";
      if (this.editMode) storeAction = "categories/updateCategory";

      let formData = new FormData();
      formData.append("id", this.category.id);
      formData.append("department_id", this.category.department_id);
      formData.append("category_name", this.category.category_name);
      formData.append("status", this.category.status == true ? 1 : 0);

      this.$store.dispatch(storeAction, formData).then((res) => {
        swal("Success!", res.message, "success");
        this.showCategoryModal = false;
        this.clearForm();
      });
    },

    clearForm() {
      this.showCategoryModal = false;
      this.editMode = false;
      this.$refs.categoryForm.reset();
      this.category = {
        id: "",
        department_id: 0,
        category_name: "",
        status: true,
      };
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
