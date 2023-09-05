<template>
  <div class="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveData)">
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block">Title (not mandatory)</label>
            <input
              type="text"
              class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              placeholder="Enter cool title"
              v-model="about_us.title"
            />
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Paragraph 1</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <textarea
                type="text"
                rows="5"
                class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Type first paragraph here"
                v-model="about_us.paragraph_1"
              ></textarea>
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Paragraph 2</label>
            <textarea
              type="text"
              rows="5"
              class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              placeholder="Type second paragraph here"
              v-model="about_us.paragraph_2"
            ></textarea>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Paragraph 3</label>
            <textarea
              type="text"
              rows="5"
              class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              placeholder="Type more details"
              v-model="about_us.paragraph_3"
            ></textarea>
          </div>
          <!-- single input end -->
          <input
            type="file"
            @change="setAboutUsBanner"
            id="product_image"
            class="inline-block text-xs md:text-sm w-full my-2"
            hidden
          />
          <div class="mt-4 text-right">
            <button
              type="submit"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
            >
              save changes
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <!-- about us preview start -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
      <h4 class="text-left text-gray-500">Preview</h4>
      <div class="text-lg uppercase font-semibold relative">
        <span v-if="about_us.title && about_us.title != ''">{{ about_us.title }}</span
        ><span v-else>title goes here</span>
        <span class="about-us-title border-primary"></span>
      </div>
      <div>
        <div v-if="true" class="w-48 float-right ml-2 mb-2">
          <div
            v-if="!about_us_banner_preview || about_us_banner_preview == ''"
            class="h-24 bg-gray-300 rounded-sm cursor-pointer flex justify-center items-center"
          >
            <div class="text-gray-400 z-10">
              <i class="fa fa-file-image" aria-hidden="true"></i> image
            </div>
          </div>
          <img
            v-else
            :src="
              about_us_banner_changed
                ? about_us_banner_preview
                : getImageUrl(about_us_banner_preview)
            "
            class="transition relative"
            alt=""
            for="product_image"
          />
          <button
            v-if="!about_us_banner_changed"
            type="button"
            class="absolute top-24 right-7 z-100 opacity-100 group-hover:opacity-100 text-red-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
            @click="removeAboutUsImage"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
          <button
            v-else
            type="button"
            class="absolute top-24 right-7 z-100 opacity-100 group-hover:opacity-100 text-green-500 shadow bg-white rounded-full text-sm p-3 ml-auto inline-flex items-center"
            @click="removelocalAboutUsImage"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <div class="my-5">
          <p
            class="text-xs indent-3"
            v-if="about_us.paragraph_1 && about_us.paragraph_1 != ''"
          >
            {{ about_us.paragraph_1 }}
          </p>
          <div
            v-else
            class="h-24 bg-gray-300 rounded-sm cursor-pointer flex justify-center items-center"
          >
            <div class="text-gray-400 z-10">First paragraph</div>
          </div>
        </div>
        <p
          class="text-xs indent-3"
          v-if="about_us.paragraph_2 && about_us.paragraph_2 != ''"
        >
          {{ about_us.paragraph_2 }}
        </p>
        <div
          v-else
          class="h-32 bg-gray-300 rounded-sm cursor-pointer flex justify-center items-center"
        >
          <div class="text-gray-400 z-10">Second paragraph</div>
        </div>
        <p
          class="text-xs indent-3 my-2"
          v-if="about_us.paragraph_3 && about_us.paragraph_3 != ''"
        >
          {{ about_us.paragraph_3 }}
        </p>
        <div
          v-else
          class="h-20 my-2 bg-gray-300 rounded-sm cursor-pointer flex justify-center items-center"
        >
          <div class="text-gray-400 z-10">Third paragraph</div>
        </div>
      </div>
    </div>
    <!-- about us preview end -->
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
      about_us_banner_preview: "",
      about_us_banner_changed: false,
      about_us: {
        title: "",
        paragraph_1: "",
        paragraph_2: "",
        paragraph_3: "",
        about_us_image: "",
      },
      about_us_image_copy: "",
    };
  },

  mounted() {
    // this.loadCompanyAboutUs();
  },

  methods: {
    loadCompanyAboutUs() {
      this.$store.dispatch("company/loadCompanyAboutUs").then((res) => {
        this.about_us = { ...res };
        this.about_us.about_us_image = "";
        this.about_us_banner_preview = res.about_us_image;
        this.about_us_image_copy = res.about_us_image;
      });
    },

    saveData() {
      let storeAction = "company/saveAboutUsData";

      let formData = new FormData();
      formData.append("title", this.about_us.title);
      formData.append("paragraph_1", this.about_us.paragraph_1);
      formData.append("paragraph_2", this.about_us.paragraph_2);
      formData.append("paragraph_3", this.about_us.paragraph_3);
      formData.append("about_us_image", this.about_us.about_us_image);

      this.$store.dispatch(storeAction, formData).then((res) => {
        this.about_us_banner_changed = false;
        this.about_us_banner_preview = "";
        this.loadCompanyAboutUs();
        swal("Success!", res.message, "success");
      });
    },

    setAboutUsBanner(e) {
      this.about_us_banner_changed = true;
      const file = e.target.files[0];
      this.about_us_banner_preview = URL.createObjectURL(file);
      this.about_us.about_us_image = file;
    },

    removeAboutUsImage() {
      this.$store.dispatch("company/removeAboutUsImage").then((res) => {
        this.loadCompanyAboutUs();
        swal("Success!", res.message, "success");
      });
    },

    removelocalAboutUsImage() {
      this.about_us_banner_changed = false;
      this.about_us_banner_preview = this.about_us_image_copy;
    },

    getImageUrl(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>

<style scoped>
.about-us-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 2px;
  background-color: darkorange;
}
</style>
