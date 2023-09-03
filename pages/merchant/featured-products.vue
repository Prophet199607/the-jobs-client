<template>
  <div
    class="col-span-12 md:col-span-12 shadow rounded px-6 pt-5 pb-7 w-full grid grid-cols-1 md:grid-cols-2 gap-x-4"
  >
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      <div class="flex justify-center gap-x-2">
        <input
          type="search"
          id="search-dropdown"
          v-model="search"
          @keyup="searching"
          class="block p-2.5 z-20 mx-5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
          placeholder="Search product..."
          required=""
        />
      </div>
      <client-only>
        <draggable
          class="list-group w-full mt-3 h-96 overflow-auto space-y-3"
          :list="products"
          group="people"
          :options="{ disabled: processing }"
        >
          <!-- @end="storeFeaturedproducts" -->
          <div
            class="flex justify-between items-center list-group-item px-4 py-2 shadow rounded-md text-gray-500 mb-2 cursor-pointer"
            v-for="product in products"
            :key="product.id"
          >
            <div class="text-base">{{ product.product_name }}</div>
            <img
              :src="getImageUrl(product.thumbnail_path)"
              alt=""
              class="w-10 h-10 rounded-full"
            />
          </div>
        </draggable>
      </client-only>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      <div class="flex justify-center gap-x-2">
        <h3 class="text-base text-gray-800">Featured Products</h3>
      </div>
      <client-only>
        <draggable
          class="list-group w-full mt-3 h-96 overflow-auto space-y-3"
          :list="featured_products"
          @sort="storeFeaturedproducts"
          group="people"
        >
          <div
            class="flex justify-between items-center list-group-item px-4 py-1 shadow rounded-md text-gray-500 mb-2 cursor-pointer"
            v-for="(product, index) in featured_products"
            :key="product.id"
          >
            <div class="text-base">{{ product.product_name }}</div>
            <img
              :src="getImageUrl(product.thumbnail_path)"
              alt=""
              class="w-10 h-10 rounded-full mx-3"
            />
            <button
              type="button"
              class="text-gray-400 bg-transparent float-right px-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              @click="removeFeaturedProduct(index)"
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
        </draggable>
      </client-only>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },

  data() {
    return {
      search: "",
      processing: false,
      products: [],
      featured_products: [],
    };
  },

  created() {
    this.loadProductListForFeaturedProducts();
    this.getFeaturedproducts();
  },

  methods: {
    loadProductListForFeaturedProducts() {
      this.$store.dispatch("products/loadProductListForFeaturedProducts").then((res) => {
        this.products = [...res];
      });
    },

    getFeaturedproducts() {
      this.$store.dispatch("products/getFeaturedproducts").then((res) => {
        this.featured_products = [...res];
      });
    },

    editProduct(product) {
      this.$store.dispatch("settings/changeSelectedMenu", 2); // 2 = menu id for "Manage Product" menu
      setTimeout(() => {
        this.$router.push({
          path: "/merchant/products/create-product",
          query: { id_: product.product_code },
        });
      }, 100);
    },

    removeFeaturedProduct(index) {
      this.featured_products.splice(index, 1);
      this.storeFeaturedproducts();
      this.loadProductListForFeaturedProducts();
    },

    storeFeaturedproducts() {
      this.processing = true;
      this.$store
        .dispatch("products/storeFeaturedproducts", {
          products: this.featured_products,
        })
        .then((res) => {
          this.processing = false;
        });
    },

    searching: _.debounce(function () {
      if (this.search == "") {
        this.products = [];
        return;
      }
      this.$store
        .dispatch("products/searchProduct", {
          department: this.selected_department,
          search_term: this.search,
        })
        .then((res) => {
          this.products = [...res];
        });
    }, 1000),

    getImageUrl(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
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
