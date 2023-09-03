<template>
  <div class="col-span-12 md:col-span-12 shadow rounded px-6 pt-5 pb-7 w-full">
    <!-- Product import modal start -->
    <div
      v-if="showProductImportModal"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-30"
    >
      <div class="relative p-4 mt-3 w-full max-w-xl h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header start -->
          <div class="flex px-2 py-2">
            <h2 class="px-3 py-3 uppercase font-medium text-gray-600">Product Import</h2>
            <button
              type="button"
              class="text-gray-400 bg-transparent float-right px-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              @click="closeProductImportModal"
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
                  @click="uploadProducts"
                >
                  Import
                </button>
                <button
                  type="button"
                  class="text-center bg-gray-400 border border-gray-400 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition text-xs md:text-sm"
                  @click="closeProductImportModal"
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
    <!-- Product import modal end -->
    <div class="flex justify-between my-5 items-center gap-x-2">
      <button
        class="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 font-medium text-sm md:text-sm rounded uppercase flex items-center gap-2 hover:bg-transparent transition"
        @click="openProductImportModal"
      >
        Import
      </button>
      <input
        type="search"
        id="search-dropdown"
        v-model="search"
        @keyup="searching"
        class="block p-2.5 z-20 w-48 md:w-60 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
        placeholder="Search product..."
        required=""
      />
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3">Product Code</th>
            <th scope="col" class="px-6 py-3">Product name</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="product in products.data"
            :key="product.id"
          >
            <td class="px-6 py-4">{{ product.no }}</td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ product.product_code }}
            </th>
            <td class="px-6 py-4">{{ product.product_name }}</td>
            <td class="px-6 py-4">{{ product.price | currency }}</td>
            <td class="px-6 py-4">{{ product.status == 1 ? "Active" : "Inactive" }}</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600"
                style="background: transparent; color: rgb(37 99 235)"
                @click="editProduct(product)"
                >Edit</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-3 float-right">
      <pagination
        align="right"
        :data="products"
        :limit="3"
        @pagination-change-page="loadAllProducts"
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
      showProductImportModal: false,
      products: {},
      product_import: "",
    };
  },

  created() {
    this.loadAllProducts();
  },

  methods: {
    loadAllProducts(page = 1) {
      if (this.search != "") {
        {
          this.$store
            .dispatch("products/searchProduct2", {
              department: this.selected_department,
              search_term: this.search,
              page,
            })
            .then((res) => {
              this.products = res;
            });
        }
      } else {
        this.$store.dispatch("products/loadAllProducts", page).then((res) => {
          let s_ = res.products.data.map((el, index) => {
            el.no = ++index;
            if (page != 1) {
              let o_page = page;
              el.no += --page * 10;
              page = o_page;
            }
            return el;
          });
          this.products = { ...res.products };
        });
      }
    },

    searching: _.debounce(function () {
      this.$store
        .dispatch("products/searchProduct2", {
          department: this.selected_department,
          search_term: this.search,
        })
        .then((res) => {
          this.products = res;
        });
    }, 1000),

    editProduct(product) {
      this.$store.dispatch("settings/changeSelectedMenu", 2); // 2 = menu id for "Manage Product" menu
      setTimeout(() => {
        this.$router.push({
          path: "/merchant/products/create-product",
          query: { id_: product.product_code },
        });
      }, 100);
    },

    openProductImportModal() {
      this.showProductImportModal = true;
    },

    changeFileImport(e) {
      const file = e.target.files[0];
      this.product_import = file;
    },

    closeProductImportModal() {
      this.showProductImportModal = false;
    },

    uploadProducts() {
      let formData = new FormData();
      formData.append("product_import", this.product_import);

      this.$store.dispatch("products/uploadProducts", formData).then((res) => {
        this.products = res.products;
        this.closeProductImportModal();
        swal("Success!", res.message, "success");
      });
    },

    downloadSampleProductExcelTemplate() {
      this.$store.dispatch("products/downloadSampleProductExcelTemplate");
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
