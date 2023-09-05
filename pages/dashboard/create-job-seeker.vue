<template>
  <div class="col-span-12 md:col-span-9 shadow rounded px-6 pt-5 pb-7 w-full">
    <h4 class="text-base font-medium capitalize mb-4">
      {{ editMode ? "Update Job Seeker" : "Create Job Seeker" }}
    </h4>
    <div class="space-y-4 text-sm md:text-sm">
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveJobSeeker)">
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
                  v-model="job_seeker.firstName"
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
                  v-model="job_seeker.lastName"
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
                  v-model="job_seeker.email"
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
                  v-model="job_seeker.contactNumber"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
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
                    placeholder="Enter description"
                    v-model="job_seeker.remark"
                  ></textarea>
                  <span class="input-invalid-message text-red-500 text-xs">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
              <!-- single input end -->

              <!-- job_seeker check box start -->
              <div class="flex gap-x-5 mt-3">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="Dominik"
                    class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    v-model="job_seeker.isActive"
                  />
                  <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
                    >Is Available</label
                  >
                </div>
              </div>
              <!-- job_seeker check box end -->
            </div>
          </div>

          <!-- form row end -->
          <div class="mt-4 text-right">
            <button
              v-if="!editMode"
              type="submit"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
            >
              Create job seeker
            </button>
            <button
              v-else
              type="submit"
              class="text-center bg-green-500 border border-green-500 text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-green-500 transition uppercase text-xs md:text-sm"
            >
              Update job seeker
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
      job_seeker: {
        jobSeekerId: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isActive: true,
        user: {},
      },
    };
  },

  computed: {},

  created() {
    const jobSeekerId = this.$route.query.id_;
    if (jobSeekerId && jobSeekerId != null) {
      this.editMode = true;
      this.getJobSeekerDetails(jobSeekerId);
    } else this.editMode = false;
  },

  mounted() {},

  methods: {
    getJobSeekerDetails(jobSeekerId) {
      this.$store.dispatch("job-seeker/getJobSeekerDetails", jobSeekerId).then((res) => {
        this.job_seeker = res;
      });
    },

    saveJobSeeker() {
      let storeAction = "job-seeker/saveJobSeeker";
      if (this.editMode) storeAction = "job-seeker/updateJobSeeker";

      if (!this.editMode) {
        this.job_seeker.user.email = this.job_seeker.email;
        this.job_seeker.user.userName = this.job_seeker.firstName;
        this.job_seeker.user.fullName =
          this.job_seeker.firstName + " " + this.job_seeker.lastName;
        this.job_seeker.user.password = "password";
      }

      this.$store.dispatch(storeAction, { job_seeker: this.job_seeker }).then((res) => {
        if (this.editMode) this.$router.push({ path: "/dashboard/manage-job-seekers" });
        this.clearForm();
        swal("Success!", res.message, "success");
      });
    },

    clearForm() {
      this.editMode = false;
      this.$refs.form.reset();
      this.job_seeker = {
        jobSeekerId: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isActive: true,
        user: {},
      };
    },
  },
};
</script>

<style scoped>
.job_seeker-image {
  width: 300px;
  height: 300px;
}
</style>
