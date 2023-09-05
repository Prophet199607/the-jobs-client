<template>
  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(saveData)">
      <!-- form row start -->
      <div class="grid grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4">
        <!-- single input start -->
        <div class="row-span-4 flex flex-col items-center justify-start gap-2">
          <label for="" class="text-gray-600 block">Company Logo</label>
          <img
            :src="image_prev"
            class="cursor-pointer pb-3 company-image"
            alt=""
            for="company_image"
          />
          <input
            type="file"
            @change="changeImage"
            id="company_image"
            class="block w-full"
            placeholder="Enter company name"
            hidden
          />
        </div>
        <!-- single input end -->
        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-2 block">Company name</label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              type="text"
              class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              placeholder="Enter company name"
              v-model="company.company_name"
            />
            <span class="input-invalid-message text-red-500 text-xs">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <!-- single input end -->
        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-2 block"
            >Business Registration Certifcate's registerd name</label
          >
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input
              type="text"
              class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              placeholder="Enter company name"
              v-model="company.brc_registered_name"
            />
            <span class="input-invalid-message text-red-500 text-xs">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <!-- single input end -->

        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-2 block">Slogan</label>
          <input
            type="text"
            class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
            placeholder="Enter company slogan"
            v-model="company.slogan"
          />
        </div>
        <!-- single input end -->

        <!-- single input start -->
        <div>
          <label for="" class="text-gray-600 mb-2 block">Description</label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <textarea
              type="text"
              rows="5"
              class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
              placeholder="Enter company description"
              v-model="company.company_description"
            ></textarea>
            <span class="input-invalid-message text-red-500 text-xs">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <!-- single input end -->
        <div>
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block"
              >Main Location Address Line 1</label
            >
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location address line 1"
                v-model="company.main_location_address_line_1"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2"
              >Main Location Address Line 2</label
            >
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location address line 2"
                v-model="company.main_location_address_line_2"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Contact No</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location contact no"
                v-model="company.main_location_contact_no"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
          <!-- single input start -->
          <div>
            <label for="" class="text-gray-600 mb-2 block mt-2">Email</label>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                type="text"
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                placeholder="Enter main location email"
                v-model="company.main_location_email"
              />
              <span class="input-invalid-message text-red-500 text-xs">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </div>
          <!-- single input end -->
        </div>
      </div>
      <!-- form row end -->
      <div class="mt-4 text-right">
        <button
          type="submit"
          class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
        >
          save changes
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
      company: {
        id: "",
        company_name: "",
        brc_registered_name: "",
        company_description: "",
        slogan: "",
        main_location_address_line_1: "",
        main_location_address_line_2: "",
        main_location_contact_no: "",
        main_location_email: "",
        company_image: "",
      },
      image_prev: `${process.env.API_IMAGE_BASE_URL}company/default.png`,
    };
  },

  computed: {},

  created() {},

  mounted() {
    // this.loadCompanyData();
  },

  methods: {
    loadCompanyData() {
      this.$store.dispatch("company/loadCompanyData").then((res) => {
        this.company = { ...res };
        if (res.company_image) {
          this.image_prev = process.env.API_IMAGE_BASE_URL + res.company_image;
        }
      });
    },

    changeImage(e) {
      const file = e.target.files[0];
      this.image_prev = URL.createObjectURL(file);
      this.company.company_image = file;
    },

    saveData() {
      let storeAction = "company/saveCompanyData";

      let formData = new FormData();
      formData.append("id", this.company.id);
      formData.append("company_name", this.company.company_name);
      formData.append("brc_registered_name", this.company.brc_registered_name);
      formData.append("company_description", this.company.company_description);
      formData.append(
        "main_location_address_line_1",
        this.company.main_location_address_line_1
      );
      formData.append(
        "main_location_address_line_2",
        this.company.main_location_address_line_2
      );
      formData.append("main_location_contact_no", this.company.main_location_contact_no);
      formData.append("main_location_email", this.company.main_location_email);
      formData.append("slogan", this.company.slogan);
      formData.append("company_image", this.company.company_image);

      this.$store.dispatch(storeAction, formData).then((res) => {
        swal("Success!", res.message, "success");

        this.clearForm();
      });
    },

    clearForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.company-image {
  width: 300px;
  height: 300px;
}
</style>
