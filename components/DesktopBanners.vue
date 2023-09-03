<template>
  <div class="relative text-base">
    <!-- main slider edit section start -->
    <div class="mt-5 grid grid-cols-1 shadow-md p-5">
      <!-- slider images preview start -->
      <div>
        <label for="" class="text-gray-600 mb-2 block">Desktop Main Slider Images</label>
        <no-ssr>
          <div class="mx-8 text-center mt-2" v-if="main_slider_images_db.length > 0">
            <carousel
              :autoplay="true"
              :items="4"
              :nav="false"
              :responsive="{
                0: { items: 1, nav: false },
                600: { items: 1, nav: false },
              }"
            >
              <div v-for="(image, index) in main_slider_images_db" :key="index">
                <div>
                  <img
                    :src="getImageUrl(image.image_path)"
                    class="w-100 h-100 transition"
                    alt=""
                    for="product_image"
                  />
                  <button
                    type="button"
                    class="absolute top-5 right-5 z-100 opacity-100 group-hover:opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
                    @click="removeSliderImages(image.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </carousel>
          </div>
        </no-ssr>
      </div>
      <!-- slider images preview end -->

      <!-- slider images add area start -->
      <div class="mt-5">
        <div
          v-if="main_slider_images_preview.length == 0"
          class="text-gray-400 my-8 text-center text-sm md:text-base"
        >
          You don't have any selected slider images!
        </div>
        <div class="flex gap-x-5 m-5" v-else>
          <div class="flex justify-between items-center gap-7">
            <div
              v-for="(image, index) in main_slider_images_preview"
              :key="index"
              class="group"
            >
              <img
                :src="image.image_path"
                class="cursor-pointer w-32 transition hover:scale-110"
                alt=""
                for="product_image"
              />
              <button
                type="button"
                class="relative -top-18 -right-28 opacity-0 group-hover:opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
                @click="removeSelectedSliderImages(index)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <input
            type="file"
            @change="changeRelatedImages"
            id="product_image"
            multiple
            class="inline-block text-xs md:text-sm w-full"
            hidden
          />
          <button
            type=""
            :disabled="main_slider_images_preview.length == 0"
            class="text-center px-4 py-2 w-52 text-white font-medium rounded-md transition uppercase text-xs md:text-sm"
            :class="[
              main_slider_images_preview.length == 0
                ? 'cursor-not-allowed  bg-red-400   border-red-400'
                : 'bg-primary border border-primary rounded hover:bg-transparent hover:text-primary',
            ]"
            @click="saveBaneners"
          >
            Save banners
          </button>
        </div>
      </div>
      <!-- slider images add area start -->
    </div>
    <!-- main slider edit section end -->

    <!-- banner images edit section start -->
    <div class="mt-5 grid grid-cols-1 shadow-md p-5">
      <!-- banner images preview start -->
      <div>
        <label for="" class="text-gray-600 mb-2 block">Banner Images</label>
        <div class="">
          <!-- single banner image add area start -->
          <div>
            <div
              v-if="
                banner_1_changed ? banner_image_1_prev == '' : !banners.banner_image_1
              "
              class="m-5 h-20 md:h-64 bg-gray-300 rounded-sm cursor-pointer flex justify-center items-center"
            >
              <div class="text-gray-400 z-10 text-xs md:text-base">
                <i class="fa fa-plus mr-1" aria-hidden="true"></i>
                Add new banner image
              </div>
            </div>
            <div class="relative m-5" v-else>
              <img
                :src="
                  banner_1_changed
                    ? banner_image_1_prev
                    : getImageUrl(banners.banner_image_1)
                "
                class="cursor-pointer transition"
                alt=""
                for="product_image"
              />
              <button
                v-if="!banner_1_changed"
                type="button"
                class="absolute top-1/2 translate-y-1/2 md:top-5 -right-5 opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
                @click="removeSelectedBannerImage(1)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div
              class="flex flex-col md:flex-row gap-y-2 justify-between items-start md:items-center mx-4"
            >
              <input
                type="file"
                @change="setBannerImage1"
                id="product_image"
                class="inline-block text-xs md:text-sm w-full"
                hidden
              />
              <div class="flex justify-between items-center gap-x-2">
                <button
                  type=""
                  class="text-center px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md transition uppercase text-xs md:text-sm"
                  @click="clearBanner1Selection()"
                >
                  Cancel
                </button>
                <button
                  type=""
                  :disabled="banner_image_1 == ''"
                  class="text-center px-4 py-2 md:w-48 text-white font-medium rounded-md transition uppercase text-xs md:text-sm"
                  :class="[
                    banner_image_1 == ''
                      ? 'cursor-not-allowed  bg-red-400   border-red-400'
                      : 'bg-primary border border-primary rounded hover:bg-transparent hover:text-primary',
                  ]"
                  @click="saveBannerImage(1)"
                >
                  Save Banner Image
                </button>
              </div>
            </div>
          </div>
          <!-- single banner image add area end -->
          <!-- single banner image add area start -->
          <div>
            <div
              v-if="
                banner_2_changed ? banner_image_2_prev == '' : !banners.banner_image_2
              "
              class="m-5 h-20 md:h-64 bg-gray-300 rounded-sm cursor-pointer flex justify-center items-center"
            >
              <div class="text-gray-400 z-10 text-xs md:text-base">
                <i class="fa fa-plus mr-1" aria-hidden="true"></i>
                Add new banner image
              </div>
            </div>
            <div class="relative m-5" v-else>
              <img
                :src="
                  banner_2_changed
                    ? banner_image_2_prev
                    : getImageUrl(banners.banner_image_2)
                "
                class="cursor-pointer transition"
                alt=""
                for="product_image"
              />
              <button
                v-if="!banner_2_changed"
                type="button"
                class="absolute top-1/2 translate-y-1/2 md:top-5 -right-5 opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
                @click="removeSelectedBannerImage(2)"
              >
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
            <div
              class="flex flex-col md:flex-row gap-y-2 justify-between items-start md:items-center mx-4"
            >
              <input
                type="file"
                @change="setBannerImage2"
                id="product_image"
                class="inline-block text-xs md:text-sm w-full"
                hidden
              />
              <div class="flex justify-between items-center gap-x-2">
                <button
                  type=""
                  class="text-center px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md transition uppercase text-xs md:text-sm"
                  @click="clearBanner2Selection()"
                >
                  Cancel
                </button>
                <button
                  type=""
                  :disabled="banner_image_2 == ''"
                  class="text-center px-4 py-2 md:w-48 text-white font-medium rounded-md transition uppercase text-xs md:text-sm"
                  :class="[
                    banner_image_2 == ''
                      ? 'cursor-not-allowed  bg-red-400   border-red-400'
                      : 'bg-primary border border-primary rounded hover:bg-transparent hover:text-primary',
                  ]"
                  @click="saveBannerImage(2)"
                >
                  Save Banner Image
                </button>
              </div>
            </div>
          </div>
          <!-- single banner image add area end -->
          <!-- <div
              v-for="(image, index) in main_slider_images_db"
              :key="index"
              class="m-5 relative"
            >
              <div class="relative">
                <img
                  :src="getImageUrl(image.image_path)"
                  class="w-100 h-100 transition"
                  alt=""
                  for="product_image"
                />
                <button
                  type="button"
                  class="absolute top-5 right-5 z-100 opacity-100 group-hover:opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
                  @click="removeSliderImages(image.id)"
                >
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div> -->
        </div>
      </div>

      <!-- banner images preview end -->
    </div>
    <!-- banner images edit section end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      main_slider_images_preview: [],
      main_slider_images_db: [],
      main_slider_images: [],
      banners: [],

      banner_1_changed: false,
      banner_2_changed: false,

      banner_image_1: "",
      banner_image_1_prev: "",
      banner_image_2: "",
      banner_image_2_prev: "",
    };
  },

  created() {
    this.loadAllBanners();
  },

  methods: {
    navigateToPage(path, menu_no) {
      this.$store.dispatch("settings/changeSelectedMenu", menu_no);
      this.$router.push({ path });
    },

    async loadAllBanners() {
      const data = await this.$store.dispatch("home/loadAllBanners");
      this.main_slider_images_db = data.main_slides;
      this.banners = data.banners;
    },

    getImageUrl(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    changeRelatedImages(e) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        let related_image_count = this.main_slider_images_preview.length;
        this.main_slider_images_preview.push({
          id: ++related_image_count,
          image_path: URL.createObjectURL(files[i]),
        });
        this.main_slider_images.push(files[i]);
      }
    },

    setBannerImage1(e) {
      this.banner_1_changed = true;
      const file = e.target.files[0];
      this.banner_image_1_prev = URL.createObjectURL(file);
      this.banner_image_1 = file;
    },

    setBannerImage2(e) {
      this.banner_2_changed = true;
      const file = e.target.files[0];
      this.banner_image_2_prev = URL.createObjectURL(file);
      this.banner_image_2 = file;
    },

    clearBanner1Selection() {
      this.banner_1_changed = false;
    },

    clearBanner2Selection() {
      this.banner_2_changed = false;
    },

    saveBaneners() {
      let formData = new FormData();
      for (let i = 0; i < this.main_slider_images.length; i++) {
        formData.append("main_slider_images[]", this.main_slider_images[i]);
      }

      this.$store.dispatch("home/saveMainSliderImages", formData).then((res) => {
        this.main_slider_images_db = [];
        this.main_slider_images_preview = [];
        this.loadAllBanners();
        swal("Success!", res.message, "success");
      });
    },

    saveBannerImage(image_no) {
      let image;
      let endpoint;
      switch (image_no) {
        case 1:
          image = this.banner_image_1;
          endpoint = "saveBannerImage1";
          break;
        case 2:
          image = this.banner_image_2;
          endpoint = "saveBannerImage2";
          break;

        default:
          break;
      }

      let formData = new FormData();
      formData.append("banner_image", image);

      this.$store.dispatch(`home/${endpoint}`, formData).then((res) => {
        this.loadAllBanners();
        swal("Success!", res.message, "success");
      });
    },

    removeSelectedSliderImages(index) {
      this.main_slider_images_preview.splice(index, 1);
    },

    removeSliderImages(id) {
      const index = this.main_slider_images_db.findIndex((el) => el.id == id);
      this.$store
        .dispatch("home/removeSliderImage", { slider_image_id: id })
        .then((res) => {
          this.main_slider_images_db = [];
          this.loadAllBanners();
          swal("Success!", res.message, "success");
        });
    },

    removeSelectedBannerImage(no) {
      this.$store.dispatch("home/removeBannerImage", { banner_no: no }).then((res) => {
        this.loadAllBanners();
        swal("Success!", res.message, "success");
      });
    },

    loadButtonClasses(menu_no) {
      if (menu_no == this.$store.getters["settings/getSelectedProductMenu"]) {
        return "bg-primary text-white";
      } else {
        return "bg-white text-primary";
      }
    },
  },
};
</script>

<style></style>
