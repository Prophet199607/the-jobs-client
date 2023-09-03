<template>
  <div class="mx-4 md:mx-24">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3">
      <NuxtLink to="/" class="text-primary text-base">
        <i class="fa fa-home" aria-hidden="true"></i>
      </NuxtLink>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">Shop</p>
    </div>
    <!-- breadcrumbs end -->

    <!--shop wrapper-->
    <div class="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
      <!--sidebar-->
      <div
        class="col-span-12 md:col-span-1 bg-white px-4 pb-6 shadow rounded absolute md:relative z-10 top-60 md:top-0 left-3 right-3 overflow-hidden"
        :class="loadFilterMenuClasses()"
      >
        <div class="relative flex justify-between md:hidden mt-3">
          <div>
            <h3 class="text-base md:text-lg text-gray-800 mb-3 uppercase font-medium">
              Sort by
            </h3>
            <select
              class="block md:hidden w-44 text-sm text-gray-600 px-4 py-2 md:py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
              v-model="selected_sorting"
              @change="sortProductList"
            >
              <option v-for="(soring, index) in sortings" :key="index" :value="soring.id">
                {{ soring.filter }}
              </option>
            </select>
          </div>
          <!-- <div class="text-primary text-2xl cursor-pointer" @click="closeFiltersMenu">
            <i class="fa fa-times" aria-hidden="true"></i>
          </div> -->
        </div>
        <div class="divide-y divide-gray-200 space-y-5 mt-5 md:mt-0">
          <!--department filter-->
          <div>
            <h3 class="text-base md:text-lg text-gray-800 mb-3 uppercase font-medium">
              DEPARTMENTS
            </h3>
            <div class="space-y-0 md:space-y-1">
              <div
                class="flex items-center"
                v-for="(department, index) in departments"
                :key="index"
              >
                <!--single department-->
                <div>
                  <input
                    type="checkbox"
                    :id="'d-' + department.id"
                    @click="setDepartmentFilter(true, department.id)"
                    class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label for="Bedroom" class="text-gray-600 ml-2 text-sm md:text-base">{{
                    department.department_display_name
                  }}</label>
                </div>
                <div class="ml-2 text-gray-600 text-xs">
                  ({{ department.active_products_count }})
                </div>
                <!--single department end-->
              </div>
            </div>
          </div>
          <!-- department filter end-->

          <!-- category filter -->
          <div v-if="categories.length != 0" class="mt-3">
            <h3 class="text-base md:text-lg text-gray-800 mb-3 uppercase font-medium">
              Categories
            </h3>
            <div class="space-y-0 md:space-y-1">
              <div
                class="flex items-center"
                v-for="(category, index) in categories"
                :key="index"
              >
                <!--single category -->
                <div>
                  <input
                    type="checkbox"
                    :id="'c-' + category.id"
                    @click="setCategoryFilter(true, category.id)"
                    class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  />
                  <label for="Bedroom" class="text-gray-600 ml-2 text-sm md:text-base">{{
                    category.category_name
                  }}</label>
                </div>
                <div class="ml-2 text-gray-600 text-xs">
                  ({{ category.active_products_count }})
                </div>
                <!--single category end-->
              </div>
            </div>
          </div>
          <!-- category filter end -->

          <!--price filter-->
          <!-- <div class="pt-4">
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
            <div class="mt-4 flex items-center">
              <input
                type="text"
                class="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                placeholder="min"
              />
              <span class="mx-3 text-gray-500">-</span>
              <input
                type="text"
                class="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                placeholder="max"
              />
            </div>
          </div> -->
          <!--price filter end-->
          <!--size filter-->
          <!-- <div class="pt-4">
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Size</h3>
            <div class="flex items-center gap-2">
              <div class="size-selector">
                <input type="radio" name="size" class="hidden" id="size-xs" />
                <label
                  for="size-xs"
                  class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >XS</label
                >
              </div>
              <div class="size-selector">
                <input type="radio" name="size" class="hidden" id="size-s" />
                <label
                  for="size-s"
                  class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >S</label
                >
              </div>
              <div class="size-selector">
                <input type="radio" name="size" class="hidden" id="size-m" />
                <label
                  for="size-m"
                  class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >M</label
                >
              </div>
              <div class="size-selector">
                <input type="radio" name="size" class="hidden" id="size-l" />
                <label
                  for="size-l"
                  class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >L</label
                >
              </div>
              <div class="size-selector">
                <input type="radio" name="size" class="hidden" id="size-xl" />
                <label
                  for="size-xl"
                  class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >XL</label
                >
              </div>
            </div>
          </div> -->
          <!--size filter end-->
          <!--color filter-->
          <!-- <div class="pt-4">
            <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
            <div class="flex items-center gap-2">
              <div class="color-selector">
                <input type="radio" name="color" class="hidden" id="color-red" />
                <label
                  for="color-red"
                  class="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                  style="background-color: #fc3d57"
                ></label>
              </div>
              <div class="color-selector">
                <input type="radio" name="color" class="hidden" id="color-white" />
                <label
                  for="color-white"
                  class="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                  style="background-color: #fff"
                ></label>
              </div>
              <div class="color-selector">
                <input type="radio" name="color" class="hidden" id="color-black" />
                <label
                  for="color-black"
                  class="border border-gray-200 rounded-sm h-5 w-5 cursor-pointer shadow-sm block"
                  style="background-color: #000"
                ></label>
              </div>
            </div>
          </div> -->
          <!--color filter end-->
        </div>
        <div class="flex gap-2 mt-10">
          <div
            class="bg-primary cursor-pointer transition-all hover:bg-white hover:text-primary border border-primary text-xs text-center text-white w-full px-3 py-2 rounded-md"
            @click="applyFilters"
          >
            Apply
          </div>
          <div
            class="bg-transparent cursor-pointer transition-all text-xs text-center border w-full border-primary text-primary px-3 py-2 rounded-md"
            @click="toggleFilterMenu"
          >
            Cancel
          </div>
        </div>
      </div>

      <!--sidebar end-->
      <!--products-->
      <div class="col-span-12 md:col-span-3">
        <!-- sorting -->
        <div class="flex items-center justify-between mb-10">
          <select
            class="hidden md:block w-44 text-base text-gray-600 px-4 py-2.5 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            v-model="selected_sorting"
            @change="sortProductList"
          >
            <option v-for="(soring, index) in sortings" :key="index" :value="soring.id">
              {{ soring.filter }}
            </option>
          </select>
          <div
            @click="toggleFilterMenu"
            class="block md:hidden px-2 py-2 text-base text-center text-gray-800 transition"
          >
            <i class="fa fa-filter" aria-hidden="true"></i>
            Filter
            <i
              class="fa fa-caret-down ml-2"
              v-if="!showFilterMenu"
              aria-hidden="true"
            ></i>
            <i class="fa fa-caret-up ml-2" v-else aria-hidden="true"></i>
          </div>
          <div class="flex gap-2 ml-auto">
            <div
              @click="changeProductsView('grid')"
              class="border w-10 h-9 flex items-center justify-center rounded cursor-pointer"
              :class="loadProductGridViewbuttonClasses()"
            >
              <i class="fa fa-th"></i>
            </div>
            <div
              @click="changeProductsView('list')"
              class="border w-10 h-9 flex items-center justify-center rounded cursor-pointer"
              :class="loadProductListViewbuttonClasses()"
            >
              <i class="fa fa-list"></i>
            </div>
          </div>
        </div>
        <!-- sorting end -->

        <!-- added filters start -->
        <div class="mb-5 flex flex-wrap gap-2">
          <div
            class="px-3 py-2 text-xs inline-block font-medium bg-primary text-white rounded-full"
            v-for="(filter, index) in selected_filters"
            :key="index"
          >
            <i class="fa fa-times mr-1 cursor-pointer" aria-hidden="true"></i>
            {{ filter.filter_name }}
          </div>
          <div
            v-if="selected_filters.length > 0"
            class="px-3 py-2 text-xs inline-block font-medium bg-gray-900 cursor-pointer text-white rounded-full"
            @click="clearAllFilters"
          >
            Clear All Filters
          </div>
        </div>
        <!-- added filters end -->

        <div v-if="products.data && products.data.length == 0">
          <p class="text-center my-40 text-gray-500 text-base">No Products Found!</p>
        </div>

        <div>
          <!--  product list start -->
          <div v-if="productView == 'list'">
            <div
              class="grid grid-cols-12 gap-6 my-4 p-4 md:p-0 bg-white shadow rounded overflow-hidden group"
              v-for="product in products.data"
              :key="product.id"
            >
              <div class="col-span-12 md:col-span-3 flex justify-center items-center">
                <!-- product image start -->
                <div class="relative">
                  <nuxt-img
                    sizes="sm:200px md:400px lg:800px"
                    loading="lazy"
                    width="100"
                    height="100"
                    quality="100"
                    :src="getProductImage(product.thumbnail_path)"
                    alt="image"
                    class="w-40"
                  />
                </div>
                <!-- product image end -->
              </div>
              <div class="col-span-12 md:col-span-9">
                <!-- product content start -->
                <div class="">
                  <a href="#">
                    <h4
                      class="uppercase font-medium text-base text-gray-800 hover:text-primary transition cursor-pointer"
                      @click="showSingleProduct(product)"
                    >
                      {{ product.product_name }}
                    </h4>
                  </a>
                  <div class="flex items-baseline mb-1 space-x-2">
                    <p class="text-lg text-primary font-medium">
                      {{ product.price | currency }}
                    </p>
                    <p
                      class="text-base text-gray-400 line-through"
                      v-if="product.marked_price != 0"
                    >
                      {{ product.marked_price | currency }}
                    </p>
                  </div>
                  <div class="flex items-center">
                    <client-only>
                      <star-rating
                        :rating="product.rating"
                        :show-rating="false"
                        :padding="5"
                        :read-only="true"
                        :star-size="16"
                        active-color="#ffb303"
                        :rounded-corners="true"
                      ></star-rating>
                    </client-only>
                    <div class="text-xs text-gray-500 ml-3">
                      ({{ product.rating_count }})
                    </div>
                  </div>
                  <div class="mb-2">
                    <p class="text-gray-600 text-sm">
                      {{ product.product_description | limitText(150) }}
                    </p>
                  </div>
                  <div class="py-5 flex gap-2">
                    <button
                      class="border text-white px-4 py-1 font-medium text-xs md:text-sm rounded flex items-center gap-2 transition"
                      :class="[
                        product.out_of_stock == 0 && getAvailablity()
                          ? ' bg-green-500 border border-green-500 rounded hover:bg-transparent hover:text-green-500 '
                          : 'cursor-not-allowed  bg-green-400   border-green-400 ',
                      ]"
                      @click="addToCart(product)"
                    >
                      Buy Now
                    </button>
                    <button
                      class="rounded transition font-roboto font-medium px-5 py-1 text-center text-sm text-white border"
                      :class="[
                        product.out_of_stock == 0 && getAvailablity()
                          ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                          : 'cursor-not-allowed  bg-red-400   border-red-400',
                      ]"
                      @click="addToCart(product)"
                    >
                      <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Add to
                      cart
                    </button>
                    <!-- border border-gray-300 text-gray-600 px-8 py-2 font-medium text-sm md:text-base rounded uppercase flex items-center gap-2 hover:text-primary transition -->
                    <!-- <button
                      class="border border-gray-300 text-gray-600 px-2 text-sm text-center bg-white rounded hover:bg-transparent hover:text-primary transition duration-400"
                    >
                      <i
                        class="far fa-heart"
                        aria-hidden="true"
                        @click="addToWishList(product)"
                      ></i>
                    </button> -->
                  </div>
                </div>
                <!-- product content end -->
              </div>
            </div>
          </div>
          <!-- product list end -->

          <!-- product grid start -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6" v-else>
            <!-- single product start -->
            <div
              v-for="product in products.data"
              :key="product.id"
              class="bg-white shadow-xl rounded overflow-hidden relative h-76 md:h-auto"
            >
              <!-- product image start -->
              <div
                class="relative cursor-pointer flex justify-center p-0 md:p-3"
                @click="showSingleProduct(product)"
              >
                <!-- best selling badge start -->
                <div
                  v-if="product.is_best_selling"
                  class="bg-green-500 rounded-sm absolute top-0 left-0 px-2 md:px-3 py-1 w-20 md:w-24 z-100 text-white text-xs"
                >
                  <span class="">Best Selling</span>
                </div>
                <!-- best selling badge end -->

                <nuxt-img
                  :src="getProductImage(product.thumbnail_path)"
                  quality="10"
                  alt="image"
                  class="w-40 md:w-full transition duration-500"
                />
              </div>
              <!-- product image end -->

              <!-- product content start -->
              <div class="pt-0 pb-3 px-4 bg-white">
                <h4
                  class="block md:hidden uppercase font-medium mb-2 text-gray-800 hover:text-primary transition cursor-pointer"
                  @click="showSingleProduct(product)"
                  :class="resizeProductTitleMobile(product.product_name)"
                >
                  {{ product.product_name | limitText(36) }}
                </h4>
                <h4
                  class="hidden md:block h-8 uppercase font-medium mb-2 text-gray-800 hover:text-primary transition cursor-pointer"
                  @click="showSingleProduct(product)"
                  :class="resizeProductTitle(product.product_name)"
                >
                  {{ product.product_name }}
                </h4>
                <div class="flex flex-col md:flex-row items-baseline mb-1 md:space-x-2">
                  <p class="text-lg text-primary font-medium">
                    {{ product.price | currency }}
                  </p>
                  <p
                    class="text-sm text-gray-400 line-through -mt-1 md:mt-0"
                    v-if="product.marked_price != 0"
                  >
                    {{ product.marked_price | currency }}
                  </p>
                </div>
                <div
                  class="w-auto md:w-full left-2 md:left-0 right-2 md:right-0 absolute md:relative bottom-3 md:bottom-0"
                >
                  <div class="flex items-center">
                    <client-only>
                      <star-rating
                        :rating="product.rating"
                        :show-rating="false"
                        :padding="5"
                        :read-only="true"
                        :star-size="16"
                        active-color="#ffb303"
                        :rounded-corners="true"
                      ></star-rating>
                    </client-only>
                    <div class="text-xs text-gray-500 ml-3">
                      ({{ product.rating_count }})
                    </div>
                  </div>
                  <button
                    v-if="!product.has_filters"
                    class="rounded w-full transition font-roboto font-medium px-6 py-1 text-center text-sm text-white border"
                    :class="[
                      product.out_of_stock == 0 && getAvailablity()
                        ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                        : 'cursor-not-allowed  bg-red-400   border-red-400',
                    ]"
                    @click="addToCart(product)"
                  >
                    Add to cart
                  </button>
                  <button
                    v-else
                    class="rounded w-full transition font-roboto font-medium px-6 py-1 text-center text-sm text-white border"
                    :class="[
                      product.out_of_stock == 0
                        ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                        : 'cursor-not-allowed  bg-red-400   border-red-400',
                    ]"
                    @click="showSingleProduct(product)"
                  >
                    View Product
                  </button>
                </div>
              </div>
              <!-- product content end -->
            </div>
            <!-- single product end -->
          </div>
          <!-- product grid end -->
          <div class="my-8 mt-10 flex justify-center">
            <pagination
              align="right"
              :data="products"
              :limit="3"
              @pagination-change-page="loadActiveProducts"
            ></pagination>
          </div>
        </div>
      </div>

      <!--product wrap-->
    </div>
    <!--end shop wrapper-->
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  auth: false,
  data() {
    return {
      productView: "grid",
      showFilterMenu: false,
      sortings: [
        { id: 1, filter: "Default Sorting" },
        { id: 2, filter: "Price low-high" },
        { id: 3, filter: "Price high-low" },
        { id: 4, filter: "Latest Product" },
      ],
      selected_sorting: 1,
    };
  },

  head() {
    return {
      title: "Shop",
      meta: [
        {
          hid: "shop",
          name: "shop",
          content: process.env.META_SHOP_PAGE,
        },
      ],
    };
  },

  computed: {
    selected_filters: {
      get: function () {
        return this.$store.getters["settings/getSelectedFilters"];
      },
      set: function (filter) {
        this.$store.dispatch("settings/setSelectedFilters", filter);
      },
    },

    selected_department: {
      get: function () {
        return this.$store.getters["departments/getSelectedDepartment"];
      },
      set: function (department) {
        this.$store.dispatch("departments/setSelectedDepartment", department);
      },
    },

    selected_category: {
      get: function () {
        return this.$store.getters["categories/getSelectedCategory"];
      },
      set: function (category) {
        this.$store.dispatch("categories/setSelectedCategory", category);
      },
    },

    departments() {
      return this.$store.getters["departments/getActiveDepartments"];
    },

    categories() {
      return this.$store.getters["categories/getActiveCategories"];
    },

    products() {
      return this.$store.getters["products/getActiveProducts"];
    },

    cart() {
      return this.$store.getters["cart/getCartData"];
    },

    wishList() {
      return this.$store.getters["wish-list/getWishListData"];
    },
  },

  created() {
    let department_id = this.$route.query.d_;
    if (department_id) {
      this.$store.dispatch("departments/loadActiveDepartments").then((res) => {
        this.selected_department = department_id;
        this.setDepartmentFilter(true, this.selected_department);
        this.loadActiveProducts();
      });
    }
  },

  mounted() {
    this.setDepartmentFilter(false, this.selected_department);
    // this.setCategoryFilter(false, this.selected_category);

    if (!this.departments || this.departments.length == 0) {
      this.loadActiveDepartments();
    }

    if (!this.categories || this.categories.length == 0) {
      this.loadDepartmentCategories();
    }

    if (!this.products.data) {
      this.loadActiveProducts();
    }
  },

  methods: {
    loadActiveProducts(page = 1) {
      this.$store.dispatch("products/loadActiveProducts", {
        page,
        department_id: this.selected_department,
        category_id: this.selected_category,
        sorting: this.selected_sorting,
      });
    },

    loadActiveDepartments() {
      this.$store.dispatch("departments/loadActiveDepartments");
    },

    loadDepartmentCategories() {
      this.$store.dispatch(
        "categories/loadDepartmentCategories",
        this.selected_department
      );
      this.setCategoryFilter(false, this.selected_category);
    },

    showSingleProduct(product) {
      this.$router.push({ path: `/shop/product/${product.product_code}` });
    },

    changeProductsView(view) {
      this.productView = view;
    },

    setDepartmentFilter(load, department_id) {
      if (department_id != 0) {
        this.selected_category = 0;
        this.selected_department = department_id;
        this.loadDepartmentCategories();
        this.$router
          .replace({ query: { d_: department_id, c_: this.selected_category } })
          .catch(() => {});
        let filter_name = "";
        this.departments.forEach((element) => {
          if (element.id == department_id) {
            filter_name = element.department_display_name;
          }
          document.getElementById("d-" + element.id).checked = false;
        });
        document.getElementById("d-" + this.selected_department).checked = true;
        // if (load) {
        //   this.loadActiveProducts();
        // }
        this.selected_filters = { type: "department", filter_name };
      }
    },

    setCategoryFilter(load, category_id) {
      if (category_id != 0) {
        this.selected_category = category_id;
        this.$router
          .replace({ query: { d_: this.selected_department, c_: category_id } })
          .catch(() => {});
        let filter_name = "";
        this.categories.forEach((element) => {
          if (element.id == category_id) {
            filter_name = element.category_name;
          }
          document.getElementById("c-" + element.id).checked = false;
        });
        document.getElementById("c-" + this.selected_category).checked = true;
        // if (load) {
        //   this.loadActiveProducts();
        // }
        this.selected_filters = { type: "category", filter_name };
      } else {
        this.categories.forEach((element) => {
          document.getElementById("c-" + element.id).checked = false;
        });
      }
    },

    applyFilters() {
      this.loadActiveProducts();
      this.showFilterMenu = !this.showFilterMenu;
    },

    clearAllFilters() {
      this.$router.replace({ path: "/shop" }).catch(() => {});
      this.selected_filters = { type: "clear" };
      document.getElementById("d-" + this.selected_department).checked = false;
      this.selected_department = 0;
      if (this.selected_category != 0) {
        document.getElementById("c-" + this.selected_category).checked = false;
        this.selected_category = 0;
      }
      this.loadActiveProducts();
    },

    getAvailablity() {
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) {
        return false;
      }
      return true;
    },

    sortProductList() {
      this.loadActiveProducts();
    },

    async addToCart(product) {
      // only users can add products to the cart
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) return;

      // if the product is out of stock user can't add the product to the cart
      if (product.out_of_stock == 1) return;

      let products = this.cart ? [...this.cart.products] : [];

      let cart_item = {
        product_id: product.id,
        product_code: product.product_code,
        product_name: product.product_name,
        price: product.price,
        qty: 1,
        image: product.thumbnail_path,
        filter: null,
      };

      if (products.length > 0) {
        const index = products.findIndex((el) => el.product_id == cart_item.product_id);

        if (index != -1) {
          let $p_ = { ...products[index] };
          $p_.qty = $p_.qty + 1;
          products.splice(index, 1, $p_);
        } else {
          products.push(cart_item);
        }
      } else {
        products.push(cart_item);
      }

      await this.$store.dispatch("cart/saveCart", products).then((res) => {
        this.$toast.show("Cart updated", {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 5000,
        });
      });
    },

    async addToWishList(product) {
      console.log(product);
      let wish_list_item = {
        product_id: product.id,
        product_code: product.product_code,
        product_name: product.product_name,
        price: product.price,
        image: product.thumbnail_path,
      };

      let isWishListItem = false;
      const index = this.wishList.findIndex((el) => el.product_id == product.id);
      if (index != -1) {
        isWishListItem = true;
      } else {
        isWishListItem = false;
      }

      if (!isWishListItem) {
        await this.$store.dispatch("wish-list/saveWishList", wish_list_item);
      } else {
        await this.$store.dispatch("wish-list/removeItemFromWishList", this.product.id);
      }
    },

    loadProductGridViewbuttonClasses() {
      if (this.productView == "grid") {
        return "text-white bg-primary border-primary";
      } else {
        return "text-gray-800 border-gray-300";
      }
    },

    loadProductListViewbuttonClasses() {
      if (this.productView == "list") {
        return "text-white bg-primary border-primary";
      } else {
        return "text-gray-800 border-gray-300";
      }
    },

    toggleFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu;
    },

    closeFiltersMenu() {
      this.showFilterMenu = false;
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    resizeProductTitleMobile(title) {
      if (title.length > 25) {
        return "text-xs";
      } else if (title.length > 15) {
        return "text-sm";
      }
      return "text-base";
    },

    resizeProductTitle(title) {
      if (title.length > 15) {
        return "text-sm";
      }
      return "text-base";
    },

    loadFilterMenuClasses() {
      if (this.showFilterMenu) {
        return "show-menu open";
      } else {
        return "show-menu close";
      }
    },
  },
};
</script>

<style scoped>
.show-menu {
  display: block;
}

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

@media only screen and (max-width: 800px) {
  .show-menu {
    display: none;
  }
  .show-menu.open {
    display: block;
  }
  .show-menu.close {
    display: none;
  }
}
</style>
