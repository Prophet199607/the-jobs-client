<template>
  <div class="col-span-12 md:col-span-9 shadow rounded px-6 pt-5 pb-7 w-full">
    <h4 class="text-base font-medium capitalize mb-4">
      {{ editMode ? "Update Consultant" : "Create New Consultant" }}
    </h4>
    <div class="space-y-4 text-sm md:text-sm">
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveConsultant)">
          <!-- form row start -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">First name</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter first name"
                  v-model="consultant.firstName"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Last name</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="text"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter last name"
                  v-model="consultant.lastName"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Email Address</label>
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <input
                  type="email"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter email address"
                  v-model="consultant.email"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Contact Number</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="number"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter contact number"
                  v-model="consultant.contactNumber"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
            <!-- single input start -->
            <div>
              <label for="" class="text-gray-600 mb-2 block">Specialized Country</label>
              <ValidationProvider v-slot="{ errors }" rules="select">
                <select
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  v-model="consultant.country.countryId"
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
            <div>
              <label for="" class="text-gray-600 mb-2 block">Specialized Job Type</label>
              <select
                class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                v-model="consultant.jobType.jobTypeId"
              >
                <option value="0">-- select --</option>
                <option
                  v-for="(jobType, index) in jobTypes"
                  :key="index"
                  :value="jobType.jobTypeId"
                >
                  {{ jobType.jobType }}
                </option>
              </select>
            </div>
            <!-- single input end -->

            <div>
              <!-- single input start -->
              <div>
                <label for="" class="text-gray-600 mb-2 block">Remark</label>
                <ValidationProvider v-slot="{ errors }">
                  <textarea
                    type="text"
                    rows="5"
                    class="block w-full text-base border-gray-300 text-gray-600 placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                    placeholder="Enter consultant description"
                    v-model="consultant.remark"
                  ></textarea>
                  <span class="input-invalid-message text-red-500 text-xs">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
              <!-- single input end -->

              <!-- consultant check box start -->
              <div class="flex gap-x-5 mt-3">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="Dominik"
                    class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    v-model="consultant.isAvailable"
                  />
                  <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                    >Is Available</label
                  >
                </div>
              </div>
              <!-- consultant check box end -->
            </div>
          </div>

          <!-- <h4 class="text-base font-medium capitalize my-4">Login Details</h4>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="" class="text-gray-600 mb-2 block">User Name</label>
              <ValidationProvider v-slot="{ errors }" rules="required">
                <input
                  type="number"
                  class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                  placeholder="Enter user number"
                  v-model="consultant.contactNumber"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
          </div> -->

          <!-- form row end -->
          <div class="mt-4 text-right">
            <button
              v-if="!editMode"
              type="submit"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
            >
              Create consultant
            </button>
            <button
              v-else
              type="submit"
              class="text-center bg-green-500 border border-green-500 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-green-500 transition uppercase text-xs md:text-sm"
            >
              Update consultant
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
      editMode: false,
      consultant: {
        consultantId: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isAvailable: true,
        user: {},
        country: {
          countryId: 0,
        },
        jobType: {
          jobTypeId: 0,
        },
      },
    };
  },

  computed: {
    countries() {
      return this.$store.getters["country/getAllCountries"];
    },
    jobTypes() {
      return this.$store.getters["job-type/getAllJobTypes"];
    },
  },

  created() {
    const consultantId = this.$route.query.id_;
    if (consultantId && consultantId != null) {
      this.editMode = true;
      this.getConsultantDetails(consultantId);
    } else this.editMode = false;
  },

  mounted() {
    this.loadAllCountries();
    this.loadAllJobTypes();
  },

  methods: {
    loadAllCountries() {
      this.$store.dispatch("country/loadAllCountries");
    },

    loadAllJobTypes() {
      this.$store.dispatch("job-type/loadAllJobTypes");
    },

    getConsultantDetails(consultantId) {
      this.$store
        .dispatch("consultant/getConsultantDetails", consultantId)
        .then((res) => {
          this.consultant = res;
        });
    },

    saveConsultant() {
      let storeAction = "consultant/saveConsultant";
      if (this.editMode) storeAction = "consultant/updateConsultant";

      if (!this.editMode) {
        this.consultant.user.email = this.consultant.email;
        this.consultant.user.userName = this.consultant.firstName.toLocaleLowerCase();
        this.consultant.user.fullName =
          this.consultant.firstName + " " + this.consultant.lastName;
        this.consultant.user.password = "00000";
      }

      this.$store
        .dispatch(storeAction, { consultant: this.consultant })
        .then((res) => {
          if (this.editMode) this.$router.push({ path: "/dashboard/manage-consultants" });
          this.clearForm();
          swal("Success!", res.message, "success");
        })
        .catch((error) => {
          swal("Error!", error.response.data.message, "error");
        });
    },

    clearForm() {
      this.editMode = false;
      this.$refs.form.reset();
      this.consultant = {
        consultantId: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isAvailable: true,
        user: {
          email: "",
          fullName: "",
          userName: "",
          password: "",
        },
        country: {
          countryId: 0,
        },
        jobType: {
          jobTypeId: 0,
        },
      };
    },
  },
};
</script>

<style scoped>
.consultant-image {
  width: 300px;
  height: 300px;
}
</style>
