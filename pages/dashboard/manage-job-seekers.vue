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

      <p class="text-gray-500 font-medium">Manage Job Seekers</p>
    </div>
    <div class="flex justify-end my-5 items-center">
      <input
        type="search"
        id="search-dropdown"
        v-model="search"
        @keyup="searching"
        class="block p-2.5 z-20 w-60 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
        placeholder="Search job seekers..."
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
            <th scope="col" class="px-2 md:px-6 py-3">Contact Number</th>
            <th scope="col" class="px-2 md:px-6 py-3">Status</th>
            <th scope="col" class="px-2 md:px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="jobSeeker in jobSeekers.content"
            :key="jobSeeker.id"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ jobSeeker.jobSeekerId }}
            </th>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ jobSeeker.firstName }} {{ jobSeeker.lastName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ jobSeeker.email }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ jobSeeker.contactNumber }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ jobSeeker.isActive == 1 ? "Active" : "Inactive" }}
            </td>
            <td
              class="px-2 md:px-6 py-4 text-gray-900 text-right flex gap-x-4 items-center"
            >
              <div
                class="font-medium text-blue-600 cursor-pointer"
                style="background: transparent; color: rgb(37 99 235)"
                @click="editJobSeeker(jobSeeker)"
              >
                Edit
              </div>
              <i class="fa fa-trash text-red-500" aria-hidden="true"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="my-3 float-right mx-3"
        v-if="jobSeekers.content && jobSeekers.content.length > 3"
      >
        <pagination
          v-model="page"
          :records="[jobSeekers.totalElements]"
          :per-page="3"
          :data="{
            currentPage: jobSeekers.number + 1,
            totalPages: jobSeekers.totalPages,
          }"
          :text="{
            count: 'Showing page {page} out of {pages}',
          }"
          @paginate="loadAllJobSeekers"
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
    jobSeekers() {
      return { ...this.$store.getters["job-seeker/getAllJobSeekers"] };
    },
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
  },

  created() {
    this.loadAllJobSeekers();
  },

  mounted() {},

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const required_roles = ["ROLE_ADMIN", "ROLE_CONSULTANT", "ROLE_RECEPTIONIST"];
      let hasRole = false;
      required_roles.forEach((role) => {
        if (vm.loggedInUserRoles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        vm.$router.push({ path: "/" });
      } else {
        return true;
      }
    });
  },

  methods: {
    loadAllJobSeekers(page = 1) {
      this.$store
        .dispatch("job-seeker/loadAllJobSeekersWithPagination", page)
        .then((res) => {});
    },

    editJobSeeker({ ...jobSeeker }) {
      this.$router.push({
        path: "/dashboard/create-job-seeker",
        query: { id_: jobSeeker.jobSeekerId },
      });
    },

    searching: _.debounce(function () {
      this.$store
        .dispatch("job-seeker/searchJobSeekers", {
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
