<template>
  <div class="col-span-12 md:col-span-12 shadow rounded px-6 pt-5 pb-7 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Customers</p>
    </div>
    <!-- breadcrumbs end -->

    <div class="flex justify-between my-5 items-center">
      <input
        type="search"
        id="search-dropdown"
        v-model="search"
        @keyup="searching"
        class="block p-2.5 z-20 w-60 mt-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
        placeholder="Search product..."
        required=""
      />
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3">First Name</th>
            <th scope="col" class="px-6 py-3">Last Name</th>
            <th scope="col" class="px-6 py-3">Contact No</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="customer in customers.data"
            :key="customer.id"
          >
            <td class="px-6 py-4">{{ customer.no }}</td>
            <td class="px-6 py-4">{{ customer.first_name }}</td>
            <td class="px-6 py-4">{{ customer.last_name }}</td>
            <td class="px-6 py-4">{{ customer.phone_number }}</td>
            <td class="px-6 py-4">{{ customer.email }}</td>
            <td class="px-6 py-4">{{ customer.status == 1 ? "Active" : "Inactive" }}</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600"
                style="background: transparent; color: rgb(37 99 235)"
                @click="viewCustomer(customer)"
                >View</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-3 float-right">
      <pagination
        align="right"
        :data="customers"
        :limit="3"
        @pagination-change-page="loadAllCustomers"
      ></pagination>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
// import pagination from "laravel-vue-pagination";
export default {
  // components: {
  //   pagination,
  // },

  data() {
    return {
      search: "",
      customers: {},
    };
  },

  created() {
    this.loadAllCustomers();
  },

  methods: {
    loadAllCustomers(page = 1) {
      if (this.search != "") {
        {
          this.$store
            .dispatch("customer/searchCustomers", {
              search_term: this.search,
              page,
            })
            .then((res) => {
              this.customers = res;
            });
        }
      } else {
        this.$store.dispatch("customer/loadAllCustomers", page).then((res) => {
          let s_ = res.customers.data.map((el, index) => {
            el.no = ++index;
            if (page != 1) {
              let o_page = page;
              el.no += --page * 10;
              page = o_page;
            }
            return el;
          });
          console.log(res);
          this.customers = { ...res.customers };
        });
      }
    },

    searching: _.debounce(function () {
      this.$store
        .dispatch("customer/searchCustomers", {
          search_term: this.search,
        })
        .then((res) => {
          this.customers = res;
        });
    }, 1000),

    viewCustomer(customer) {
      this.$router.push({ path: `/merchant/customers/${customer.id}` });
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
