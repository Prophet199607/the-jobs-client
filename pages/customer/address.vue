<template>
  <div>
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">My Addresses</p>
    </div>
    <!-- breadcrumbs end -->
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(saveAddresses)">
        <div class="col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- billing address section start -->
          <div class="shadow rounded bg-white px-4 pt-6 pb-8">
            <p class="text-gray-800 text-base font-medium mb-5">Billing Address</p>
            <div class="space-y-4">
              <!-- registration form start -->
              <div class="col-span-12 row-span-2 md:col-span-8 rounded">
                <div class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="text-gray-600 mb-2 block text-sm"
                        >First Name <span class="text-primary">*</span></label
                      >
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input
                          type="text"
                          v-model="billing_address.first_name"
                          class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                          placeholder="Enter your first name"
                        />
                        <span class="input-invalid-message text-red-500 text-xs">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                    <div>
                      <label class="text-gray-600 mb-2 block text-sm"
                        >Last Name <span class="text-primary">*</span></label
                      >
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input
                          type="text"
                          v-model="billing_address.last_name"
                          class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                          placeholder="Enter your last name"
                        />
                        <span class="input-invalid-message text-red-500 text-xs">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Province<span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <model-select
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        :options="provinces"
                        v-model="billing_address.province"
                        @input="billing_loadDistricts"
                        placeholder="Select your province"
                      >
                      </model-select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >District<span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <model-select
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        :options="districts"
                        v-model="billing_address.district"
                        @input="billing_loadCities"
                        placeholder="Select your district"
                      >
                      </model-select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >City<span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <model-select
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        :options="cities"
                        v-model="billing_address.city"
                        placeholder="Select your city"
                      >
                      </model-select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Street Address <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="billing_address.street_address"
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter street address"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Zip Code <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="billing_address.zip_code"
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter zip code"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Phone Number <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="billing_address.phone_number"
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter phone number"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <!-- registration form end -->
            </div>
          </div>
          <!-- billing address section end -->
          <!-- shipping address section start -->
          <div class="shadow rounded bg-white px-4 pt-6 pb-8">
            <div class="flex justify-between items-center mb-5">
              <p class="text-gray-800 text-base font-medium">Delivery Address</p>
              <div class="flex items-center">
                <input
                  v-model="sameAsRegDetails"
                  id="fillUserDetails"
                  type="checkbox"
                  class="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                />
                <label
                  for="fillUserDetails"
                  class="text-gray-600 ml-3 cursor-pointer text-sm"
                  >Same as billing address</label
                >
              </div>
            </div>
            <div class="space-y-4">
              <div class="col-span-12 row-span-2 md:col-span-8 rounded">
                <div class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="text-gray-600 mb-2 block text-sm"
                        >First Name <span class="text-primary">*</span></label
                      >
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input
                          type="text"
                          v-model="delivery_address.first_name"
                          class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                          placeholder="Enter your name"
                        />
                        <span class="input-invalid-message text-red-500 text-xs">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                    <div>
                      <label class="text-gray-600 mb-2 block text-sm"
                        >Last Name <span class="text-primary">*</span></label
                      >
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <input
                          type="text"
                          v-model="delivery_address.last_name"
                          class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                          placeholder="Enter your name"
                        />
                        <span class="input-invalid-message text-red-500 text-xs">
                          {{ errors[0] }}
                        </span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Province<span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <model-select
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        :options="provinces2"
                        v-model="delivery_address.province"
                        @input="delivery_loadDistricts"
                        placeholder="Select your province"
                      >
                      </model-select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >District<span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <model-select
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        :options="districts2"
                        v-model="delivery_address.district"
                        @input="delivery_loadCities"
                        placeholder="Select your district"
                      >
                      </model-select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >City<span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <model-select
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        :options="cities2"
                        v-model="delivery_address.city"
                        placeholder="Select your city"
                      >
                      </model-select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Street Address <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="delivery_address.street_address"
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter street address"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Zip Code <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="delivery_address.zip_code"
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter zip code"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div>
                    <label class="text-gray-600 mb-2 block text-sm"
                      >Phone Number <span class="text-primary">*</span></label
                    >
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <input
                        type="text"
                        v-model="delivery_address.phone_number"
                        class="block w-full text-base border border-gray-300 px-4 placeholder:text-sm py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        placeholder="Enter phone number"
                      />
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- shipping address section end -->
        </div>
        <div class="mt-4 float-right">
          <button
            type="submit"
            class="block px-4 py-2 text-center text-white text-sm bg-primary border border-primary rounded hover:bg-transparent hover:text-primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ModelSelect } from "vue-search-select";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ModelSelect,
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      provinces: [],
      districts: [],
      cities: [],
      provinces2: [],
      districts2: [],
      cities2: [],
      sameAsRegDetails: false,
      hasDeliveryAddress: false,
      billing_address: {
        first_name: "",
        last_name: "",
        province: "",
        district: "",
        city: "",
        street_address: "",
        zip_code: "",
        phone_number: "",
      },
      delivery_address: {
        first_name: "",
        last_name: "",
        province: "",
        district: "",
        city: "",
        street_address: "",
        zip_code: "",
        phone_number: "",
      },
    };
  },

  watch: {
    async sameAsRegDetails(newVal) {
      if (newVal) {
        this.provinces2 = this.provinces;
        this.districts2 = this.districts;
        this.cities2 = this.cities;
        this.delivery_address = this.billing_address;
      } else {
        if (this.hasDeliveryAddress) {
          this.delivery_address = this.delivery_address_original;
          await this.delivery_loadCities();
        } else {
          this.delivery_address = {
            first_name: "",
            last_name: "",
            province: "",
            district: "",
            city: "",
            street_address: "",
            zip_code: "",
            phone_number: "",
          };
        }
      }
    },
  },

  async created() {
    await this.loadCustomerAddresses();
    await this.billing_loadProvinces();
    await this.billing_loadDistricts();
    await this.billing_loadCities();

    if (this.hasDeliveryAddress) {
      await this.delivery_loadProvinces();
      await this.delivery_loadDistricts();
      await this.delivery_loadCities();
    }

    // Promise.all([]).then((_) => {});
  },

  methods: {
    loadCustomerAddresses() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadCustomerAddresses").then(async (res) => {
          res.forEach((address) => {
            if (address.address_type == 1) {
              this.billing_address = address;
            } else if (address.address_type == 2) {
              this.hasDeliveryAddress = true;
              this.delivery_address = address;
              this.delivery_address_original = { ...address };
            }
          });
          resolve();
        });
      });
    },

    billing_loadProvinces() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadProvinces").then((res) => {
          this.provinces = res.map((province) => {
            return {
              value: province.id,
              text: province.name_en,
            };
          });
          resolve();
        });
      });
    },

    delivery_loadProvinces() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch("customer/loadProvinces").then((res) => {
          this.provinces2 = res.map((province) => {
            return {
              value: province.id,
              text: province.name_en,
            };
          });
          resolve();
        });
      });
    },

    billing_loadDistricts() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("customer/loadDistricts", this.billing_address.province)
          .then((res) => {
            this.districts = res.map((district) => {
              return {
                value: district.id,
                text: district.name_en,
              };
            });
            resolve();
          });
      });
    },

    delivery_loadDistricts() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("customer/loadDistricts", this.delivery_address.province)
          .then((res) => {
            this.districts2 = res.map((district) => {
              return {
                value: district.id,
                text: district.name_en,
              };
            });
            resolve();
          });
      });
    },

    billing_loadCities() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("customer/loadCities", this.billing_address.district)
          .then((res) => {
            this.cities = res.map((city) => {
              return {
                value: city.id,
                text: city.name_en,
              };
            });
            return resolve();
          });
      });
    },

    delivery_loadCities() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("customer/loadCities", this.delivery_address.district)
          .then((res) => {
            this.cities2 = res.map((city) => {
              return {
                value: city.id,
                text: city.name_en,
              };
            });
            return resolve();
          });
      });
    },

    saveAddresses() {
      this.$store
        .dispatch("customer/saveCustomerAddresses", {
          billing_address: this.billing_address,
          delivery_address: this.delivery_address,
        })
        .then((res) => {
          swal("Success!", res.message, "success");
        });
    },
  },
};
</script>

<style></style>
