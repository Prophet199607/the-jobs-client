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
    <div class="flex justify-end my-5 items-center">
      <input
        type="search"
        id="search-dropdown"
        v-model="search"
        @keyup="searching"
        class="block p-2.5 z-20 w-60 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
        placeholder="Search consultants..."
        required=""
      />
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
            v-for="consultant in consultants.content"
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
            <td
              class="px-2 md:px-6 py-4 text-gray-900 text-right flex gap-x-4 items-center"
            >
              <div
                class="font-medium text-blue-600 cursor-pointer"
                style="background: transparent; color: rgb(37 99 235)"
                @click="editConsultant(consultant)"
              >
                Edit
              </div>
              <i
                class="fa fa-trash text-red-500 cursor-pointer"
                @click="deleteConsultant(consultant)"
                v-if="checkUserHasAccess(['ROLE_ADMIN'])"
                aria-hidden="true"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="my-3 float-right mx-3"
        v-if="consultants.content && consultants.content.length > 3"
      >
        <pagination
          v-model="page"
          :records="[consultants.totalElements]"
          :per-page="3"
          :data="{
            currentPage: consultants.number + 1,
            totalPages: consultants.totalPages,
          }"
          :text="{
            count: 'Showing page {page} out of {pages}',
          }"
          @paginate="loadAllConsultantsWithPagination"
        />
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
      search: "",
      page: 1,
    };
  },

  computed: {
    consultants() {
      return { ...this.$store.getters["consultant/getAllPaginatedConsultants"] };
    },
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
  },

  created() {
    this.loadAllConsultantsWithPagination();
  },

  mounted() {},

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
    checkUserHasAccess(required_roles) {
      let hasRole = false;
      required_roles.forEach((role) => {
        if (this.loggedInUserRoles.includes(role)) {
          hasRole = true;
        }
      });
      return hasRole;
    },

    loadAllConsultantsWithPagination(page = 1) {
      this.$store
        .dispatch("consultant/loadAllConsultantsWithPagination", page)
        .then((res) => {});
    },

    editConsultant({ ...consultant }) {
      this.$router.push({
        path: "/dashboard/create-consultant",
        query: { id_: consultant.consultantId },
      });
    },

    deleteConsultant(consultant) {
      swal({
        title: "Are you sure?",
        text: "Do you want to delete this consultant?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store
            .dispatch("consultant/deleteConsultant", consultant.consultantId)
            .then((res) => {
              this.loadAllConsultantsWithPagination();
              swal("Success!", "Consultant deleted successfully!", "success");
            })
            .catch((err) => {
              swal("Error!", "Cannot delete consultant!", "error");
            });
        }
      });
    },

    searching: _.debounce(function () {
      this.$store
        .dispatch("consultant/searchConsultants", {
          search_term: this.search,
          page: this.page,
        })
        .then((res) => {
          this.customers = res;
        });
    }, 1000),
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
  color: #e88c02;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
::v-deep .page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #e88c02;
  border-color: #e88c02;
}
::v-deep a:hover {
  color: #e88c02;
  text-decoration: none;
  background-color: #adadad83;
  color: #fff;
}
::v-deep .VuePagination__count {
  margin-top: 5px;
  font-size: 13px;
}
/* pagination styles end */
</style>
