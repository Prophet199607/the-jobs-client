<template>
  <div class="px-5 grid grid-cols-5 my-5 font-poppins">
    <div class="col-span-3 w-100 flex justify-center items-center">
      <img
        src="https://img.freepik.com/free-vector/appointment-booking-with-calendar-concept_23-2148556783.jpg?w=740&t=st=1694030336~exp=1694030936~hmac=b4df9d05b5d53456d4ba491e6a521e13f2dade7df1ef18b0bec304bdf0d71244"
        alt=""
        width="550px"
      />
    </div>
    <div
      class="col-span-2 min-w-full mx-auto shadow px-3 py-3 rounded overflow-hidden"
      style="height: 565px"
    >
      <h2 class="text-2xl uppercase font-medium mb-1">Make an appointment</h2>
      <p class="text-gray-600 mb-6 text-sm">
        Create an appointment with our best consultants
      </p>
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveAppointment)">
          <div class="space-y-4">
            <!-- registration form start -->
            <div class="col-span-12 md:col-span-8 rounded">
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <!-- single input start -->
                  <div>
                    <label for="" class="text-gray-600 mb-2 block text-sm"
                      >Job Type</label
                    >
                    <select
                      class="block w-full text-sm border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                      v-model="jobTypeId"
                      @change="resetCountry"
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
                  <!-- single input start -->
                  <div>
                    <label for="" class="text-gray-600 mb-2 block text-sm">Country</label>
                    <ValidationProvider v-slot="{ errors }" rules="select">
                      <select
                        class="block w-full text-sm border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        v-model="countryId"
                        @change="loadConsultants"
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
                    <div class="flex gap-x-4">
                      <label for="" class="text-gray-600 mb-2 block text-sm"
                        >Available Consultants</label
                      >
                      <label
                        for=""
                        v-show="showAlert_"
                        class="mb-2 block text-sm text-orange-500 font-medium"
                      >
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> No
                        Available consultants found!</label
                      >
                    </div>
                    <ValidationProvider v-slot="{ errors }" rules="select">
                      <select
                        class="block w-full text-sm border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        v-model="appointment.consultant.consultantId"
                        @change="loadtimeSlots"
                      >
                        <option value="0">-- select --</option>
                        <option
                          v-for="(consultant, index) in consultants"
                          :key="index"
                          :value="consultant.consultantId"
                        >
                          {{ consultant.firstName }} {{ consultant.lastName }}
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
                    <div class="flex gap-x-4">
                      <label for="" class="text-gray-600 mb-2 block text-sm"
                        >Available Time Slots</label
                      >
                      <label
                        for=""
                        v-show="showAlert2_"
                        class="mb-2 block text-sm text-orange-500 font-medium"
                      >
                        <i class="fa fa-exclamation-circle" aria-hidden="true"></i> No
                        Available schedules found!</label
                      >
                    </div>
                    <ValidationProvider v-slot="{ errors }" rules="select">
                      <select
                        class="block w-full text-sm border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
                        v-model="appointment.schedule.scheduleId"
                      >
                        <option value="0">-- select --</option>
                        <option
                          v-for="(schedule, index) in schedules"
                          :key="index"
                          :value="schedule.scheduleId"
                        >
                          {{ schedule.start | formattedDate3 }} to
                          {{ schedule.end | formattedDate3 }}
                        </option>
                      </select>
                      <span class="input-invalid-message text-red-500 text-xs">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
            </div>
            <!-- registration form end -->
          </div>
          <div class="mt-6 w-100">
            <button
              type="submit"
              class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ModelSelect } from "vue-search-select";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  middleware: "guest",

  components: {
    ModelSelect,
    ValidationProvider: ValidationProvider,
    ValidationObserver: ValidationObserver,
  },

  data() {
    return {
      countryId: 0,
      jobTypeId: 0,
      appointment: {
        status: 0,
        isAccepted: false,
        consultant: {
          consultantId: 0,
        },
        schedule: {
          scheduleId: 0,
        },
        jobSeeker: {
          jobSeekerId: 0,
        },
      },
      consultants: [],
      schedules: [],
      showAlert_: false,
      showAlert2_: false,
    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.getters["auth-api/getAuthenticatedState"];
    },
    loggedInUserDetails() {
      return this.$store.getters["auth-api/getLoggedInUserDetails"];
    },
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
    countries() {
      return this.$store.getters["country/getAllCountries"];
    },
    jobTypes() {
      return this.$store.getters["job-type/getAllJobTypes"];
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isUserLoggedIn) {
        vm.$router.push({ path: "/login" });
      } else {
        return true;
      }
    });
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

    loadConsultants() {
      this.consultants = [];
      this.appointment.consultant.consultantId = 0;
      this.schedules = [];
      this.appointment.schedule.scheduleId = 0;
      this.showAlert2_ = false;
      this.$store
        .dispatch("consultant/loadAllConsultantsByJobTypeAndCountry", {
          countryId: this.countryId,
          jobTypeId: this.jobTypeId,
        })
        .then((res) => {
          this.showAlert();
          this.consultants = res;
        });
    },

    resetCountry() {
      this.countryId = 0;
      this.showAlert_ = false;
      this.appointment.schedule.scheduleId = 0;
      this.showAlert2_ = false;
    },

    loadtimeSlots() {
      this.$store
        .dispatch(
          "consultant/loadAvailableSchedulesByConsultant",
          this.appointment.consultant.consultantId
        )
        .then((res) => {
          this.showAlert2();
          this.schedules = res;
        });
    },

    saveAppointment() {
      let loggedUserId = localStorage.getItem("loggedUserId");
      this.appointment.jobSeeker.jobSeekerId = loggedUserId;
      this.$store
        .dispatch("appointment/saveAppointment", { appointment: this.appointment })
        .then((res) => {
          this.clearForm();
          swal("Success!", "Appointment created successfully!", "success");
        });
    },

    showAlert() {
      setTimeout(() => {
        this.showAlert_ = false;
        if (this.consultants.length == 0 && this.countryId != 0) {
          this.showAlert_ = true;
        }
      }, 100);
    },

    showAlert2() {
      setTimeout(() => {
        this.showAlert_ = false;
        if (this.schedules.length == 0) {
          this.showAlert2_ = true;
        }
      }, 100);
    },

    clearForm() {
      this.$refs.form.reset();
      this.appointment = {
        status: 0,
        isAccepted: false,
        consultant: {
          consultantId: 0,
        },
        schedule: {
          scheduleId: 0,
        },
        jobSeeker: {
          jobSeekerId: 0,
        },
      };
    },
  },
};
</script>

<style></style>
