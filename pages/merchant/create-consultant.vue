<template>
  <div class="col-span-12 md:col-span-9 shadow rounded px-6 pt-5 pb-7 w-full">
    <h4 class="text-base font-medium capitalize mb-4">
      {{ editMode ? "Update Consultant" : "Create New Consultant" }}
    </h4>
    <div class="space-y-4 text-sm md:text-sm">
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveProduct)">
          <!-- form row start -->
          <div class="grid grid-rows-1 md:grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4">
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Country</label>
              <ValidationProvider v-slot="{ errors }" rules="select">
                <select
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  v-model="product.department_id"
                  @change="loadDepartmentCategories"
                >
                  <option value="0">-- select --</option>
                  <option
                    v-for="(country, index) in countries"
                    :key="index"
                    :value="country.countryId"
                  >
                    {{ country.countryName }}
                  </option>
                </select>
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div class="row-span-4 flex flex-col items-center justify-start gap-2">
              <label for="" class="text-gray-600 block">Product Image</label>
              <img
                :src="image_prev"
                class="cursor-pointer pb-3 product-image"
                alt=""
                for="product_image"
              />
              <input
                type="file"
                @change="changeImage"
                id="product_image"
                class="block w-full"
                placeholder="Enter product name"
                hidden
              />
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Category</label>
              <select
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                v-model="product.category_id"
              >
                <option value="0">-- select --</option>
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.id"
                >
                  {{ category.category_name }}
                </option>
              </select>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Product name</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter product name"
                  v-model="product.product_name"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->

            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Unit</label>
              <ValidationProvider v-slot="{ errors }" rules="select">
                <select
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  v-model="product.unit"
                >
                  <option value="0">-- select --</option>
                  <option v-for="(unit, index) in units" :key="index" :value="unit.id">
                    {{ unit.unit_name }}
                  </option>
                </select>
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <ValidationProvider v-slot="{ errors }" rules="required">
              <label for="" class="text-gray-600 mb-2 block">Selling Price</label>
              <vue-numeric
                class="block w-full text-base border text-right border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                id="purchase_price"
                seperator=","
                :precision="2"
                currency="Rs."
                v-model="product.price"
              ></vue-numeric>
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Marked Price</label>
              <vue-numeric
                class="block w-full text-base border text-right border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                id="purchase_price"
                seperator=","
                :precision="2"
                currency="Rs."
                v-model="product.marked_price"
              ></vue-numeric>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Description</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <!-- <client-only>
                  <vue-editor
                    v-model="product.product_description"
                    class="block w-full border-gray-300 relative text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  ></vue-editor>
                </client-only> -->
                <textarea
                  type="text"
                  rows="5"
                  class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter product description"
                  v-model="product.product_description"
                ></textarea>
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">More Details</label>
              <!-- <vue-editor
                v-model="product.more_details"
                class="block w-full border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              ></vue-editor> -->
              <textarea
                type="text"
                rows="5"
                class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter more details"
                v-model="product.more_details"
              ></textarea>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Product Code</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter product code"
                  v-model="product.product_code"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->

            <!-- product check box start -->
            <div class="flex gap-x-5">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="Dominik"
                  class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  v-model="product.status"
                />
                <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                  >Active</label
                >
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="Dominik"
                  class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  v-model="product.out_of_stock"
                />
                <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                  >Out of stocks</label
                >
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="Dominik"
                  class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                  v-model="product.is_best_selling"
                />
                <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                  >Best Selling</label
                >
              </div>
            </div>
            <!-- product check box end -->
          </div>
          <!-- product check box start -->
          <div class="mt-5">
            <label for="" class="text-gray-600 mb-2 block"
              >Related Images (optional)</label
            >
            <div
              v-if="related_images_prev.length == 0"
              class="text-gray-400 my-8 text-center"
            >
              No related images found!
            </div>
            <div class="flex gap-x-5 m-5" v-else>
              <div class="flex justify-between gap-7">
                <div
                  v-for="(image, index) in related_images_prev"
                  :key="index"
                  class="group"
                >
                  <img
                    :src="image.image_path"
                    class="cursor-pointer w-28 transition hover:scale-110"
                    alt=""
                    for="product_image"
                  />
                  <button
                    type="button"
                    class="relative -top-32 -right-8 opacity-0 group-hover:opacity-100 text-gray-400 bg-transparent float-right px-3 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    @click="removeRelatedImage(image.id, image.source)"
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
              </div>
            </div>
            <input
              type="file"
              @change="changeRelatedImages"
              id="product_image"
              multiple
              class="block w-full"
              hidden
            />
          </div>
          <div class="my-5" v-if="editMode">
            <span v-if="added_filters_db.length > 0"
              >{{ added_filters_db.length }} filter<span
                v-if="added_filters_db.length > 1"
                >s</span
              >
              added.</span
            >
            <span v-else class="text-gray-400">No filters have added yet!</span>
            click
            <a
              href="#"
              @click.prevent="showProductFilterModal = true"
              class="text-blue-500 underline"
              >here</a
            >
            to manage filters
          </div>
          <!-- product check box end -->
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
              Update product
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
      units: [
        { id: 1, unit_name: "NOS" },
        { id: 2, unit_name: "Kg" },
        { id: 1, unit_name: "g" },
        { id: 4, unit_name: "L" },
        { id: 5, unit_name: "ml" },
      ],
      showProductFilterModal: false,
      editMode: false,
      filterEditMode: false,
      categories: [],
      product: {
        id: "",
        department_id: 0,
        category_id: 0,
        product_code: "",
        product_name: "",
        product_description: "",
        more_details: "",
        unit: 0,
        price: 0,
        marked_price: 0,
        out_of_stock: 0,
        is_best_selling: 0,
        product_image: "",
        related_product_images: [],
        status: 1,
      },

      added_filters_db: [],
      added_filters: [],
      filter_image_prev: `${process.env.API_IMAGE_BASE_URL}products/default.webp`,
      image_prev: `${process.env.API_IMAGE_BASE_URL}products/default.webp`,
      related_images_prev: [],

      editFilterId: null,
    };
  },

  computed: {
    countries() {
      return this.$store.getters["country/getAllCountries"];
    },
    departments() {
      return this.$store.getters["departments/getActiveDepartments"];
    },

    filter: {
      get() {
        return {
          filter_name: "",
          filter_price: this.product.price,
          filter_image: "",
          status: 1,
        };
      },
      set(newVal) {
        this.filter.filter_name = newVal.filter_name;
        this.filter.filter_price = newVal.filter_price;
        this.filter.filter_image = newVal.filter_image;
        this.filter.status = newVal.status;
      },
    },

    // categories() {
    //   return this.$store.getters["categories/getActiveCategories"];
    // },
  },

  created() {
    // const prod_code = this.$route.query.id_;
    // this.related_images_prev = [];
    // if (prod_code && prod_code != null) {
    //   this.editMode = true;
    //   this.loadProductDetails(prod_code);
    // } else this.editMode = false;
  },

  mounted() {
    if (!this.departments || this.departments.length == 0) {
      this.loadActiveDepartments();
    }

    this.loadAllCountries();

    // if (!this.categories || this.categories.length == 0) {
    //   this.loadActiveCategories();
    // }
  },

  methods: {
    loadAllCountries() {
      this.$store.dispatch("country/loadAllCountries");
    },
    loadActiveDepartments() {
      this.$store.dispatch("departments/loadActiveDepartments");
    },

    // loadActiveCategories() {
    //   this.$store.dispatch("categories/loadActiveCategories");
    // },

    loadDepartmentCategories() {
      this.$store
        .dispatch("categories/loadDepartmentCategories", this.product.department_id)
        .then((res) => {
          this.categories = res;
          if (this.categories.length == 0) {
            this.product.category_id = 0;
          }
        });
    },

    changeImage(e) {
      const file = e.target.files[0];
      this.image_prev = URL.createObjectURL(file);
      this.product.product_image = file;
    },

    changeRelatedImages(e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let related_image_count = this.related_images_prev.length;
        this.related_images_prev.push({
          id: ++related_image_count,
          image_path: URL.createObjectURL(files[i]),
          source: "local",
        });
        this.product.related_product_images.push(files[i]);
      }
    },

    loadProductDetails(product_code) {
      this.$store.dispatch("products/getProductDetails", product_code).then((res) => {
        this.product = res.product;
        this.product.product_image = "";
        this.product.related_product_images = [];
        this.loadDepartmentCategories();
        this.image_prev = process.env.API_IMAGE_BASE_URL + res.product.image_path;
        this.added_filters_db = [...res.product.filters];
        this.added_filters = res.product.filters;
        this.related_images_prev = res.product.related_images
          .map((el, index) => {
            return {
              id: el.id,
              image_path: process.env.API_IMAGE_BASE_URL + el.thumbnail_path,
              source: "db",
            };
          })
          .reverse();
        // .filter((el, index) => index != 0);
      });
    },

    saveProduct() {
      let storeAction = "products/saveProduct";
      if (this.editMode) storeAction = "products/updateProduct";

      let formData = new FormData();
      formData.append("id", this.product.id);
      formData.append("department_id", this.product.department_id);
      formData.append("category_id", this.product.category_id);
      formData.append("product_code", this.product.product_code);
      formData.append("product_name", this.product.product_name);
      formData.append("product_description", this.product.product_description);
      formData.append("more_details", this.product.more_details);
      formData.append("unit", this.product.unit);
      formData.append("price", this.product.price);
      formData.append("marked_price", this.product.marked_price);
      formData.append("out_of_stock", this.product.out_of_stock == true ? 1 : 0);
      formData.append("is_best_selling", this.product.is_best_selling == true ? 1 : 0);
      formData.append("product_image", this.product.product_image);
      for (let i = 0; i < this.product.related_product_images.length; i++) {
        formData.append(
          "related_product_images[]",
          this.product.related_product_images[i]
        );
      }
      formData.append("status", this.product.status == true ? 1 : 0);

      this.$store.dispatch(storeAction, formData).then((res) => {
        this.product = res.product;
        this.product.related_product_images = [];
        this.related_images_prev = res.product.related_images.map((el, index) => {
          return {
            id: el.id,
            image_path: process.env.API_IMAGE_BASE_URL + el.thumbnail_path,
            source: "db",
          };
        });
        if (this.editMode) {
          swal("Success!", res.message, "success");
          return;
        }

        swal({
          title: "Product Saved!",
          text: "Do you want to add fillters for this product?",
          icon: "success",
          buttons: true,
          dangerMode: false,
          buttons: {
            cancel: "No",
            catch: {
              text: "Yes!",
              value: "catch",
            },
          },
        }).then((value) => {
          switch (value) {
            case "catch":
              setTimeout(() => {
                this.showProductFilterModal = true;
              }, 1000);
              break;

            default:
              if (this.editMode) {
                this.$router.push({
                  path: "/merchant/products",
                });
              }
              this.clearForm();
          }
        });
      });
    },

    removeRelatedImage(id, source = "local") {
      const index = this.related_images_prev.findIndex((el) => el.id == id);
      if (source == "db") {
        this.$store.dispatch("products/removeRelatedImage", { related_image_id: id });
      } else {
        this.product.related_product_images.splice(index, 1);
      }
      this.related_images_prev.splice(index, 1);
    },

    saveFilter() {
      this.filter.filter_image = this.filter_image_prev;
      if (this.filterEditMode) {
        const index = this.added_filters.findIndex((el) => el.id == this.editFilterId);
        this.added_filters.splice(index, 1, { ...this.filter });
      } else {
        this.added_filters.push({ ...this.filter });
      }
      this.clearFilterForm();
    },

    storeFilters() {
      this.$store
        .dispatch("products/storeFilters", {
          product_id: this.product.id,
          filters: this.added_filters,
        })
        .then((res) => {
          this.added_filters_db = [...res.filters];
          this.added_filters = res.filters;
          this.closeFilterModal();
          swal("Success!", res.message, "success");
        });
    },

    getFilterImageFortheTable(image) {
      if (!image || image == "") {
        return `${process.env.API_IMAGE_BASE_URL}products/default.webp`;
      }
      return image;
    },

    clearFilterForm() {
      this.filter = {
        filter_name: "",
        filter_price: this.product.price,
        filter_image: "",
        status: 1,
      };
      this.filterEditMode = false;
      this.editFilterId = null;
      this.filter_image_prev = `${process.env.API_IMAGE_BASE_URL}products/default.webp`;
    },

    setFilterImage(index) {
      this.filter_image_prev = this.related_images_prev[index].image_path;
    },

    editFilterData(filter) {
      this.filterEditMode = true;
      this.editFilterId = filter.id;
      this.filter_image_prev = filter.filter_image;
      this.filter = filter;
    },

    deleteFilterData(filter) {
      const index = this.added_filters_db.findIndex((el) => el.id == filter.id);
      this.added_filters_db.splice(index, 1);
    },

    closeFilterModal() {
      this.added_filters = [...this.added_filters_db];
      this.showProductFilterModal = false;
    },

    clearForm() {
      this.editMode = false;
      this.$refs.form.reset();
      this.product = {
        id: "",
        department_id: 0,
        category_id: 0,
        product_code: "",
        product_name: "",
        product_description: "",
        more_details: "",
        unit: "",
        price: "",
        marked_price: 0,
        out_of_stock: 0,
        is_best_selling: 0,
        product_image: "",
        related_product_images: [],
        status: 1,
      };
      this.image_prev = `${process.env.API_IMAGE_BASE_URL}products/default.webp`;
      this.categories = [];
      this.related_images_prev = [];
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 300px;
  height: 300px;
}
</style>
