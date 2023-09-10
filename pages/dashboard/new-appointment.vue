<template>
  <div class="col-span-12 md:col-span-9 shadow rounded px-6 pt-5 pb-7 w-full">
    <h4 class="text-base font-medium capitalize mb-4">Create New Appointment</h4>
    <div class="space-y-4 text-sm md:text-sm">
      <ValidationObserver v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(saveAppointmentWithUser)">
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
                  v-model="appointment.firstName"
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
                  v-model="appointment.lastName"
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
                  v-model="appointment.email"
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
                  v-model="appointment.contactNumber"
                />
                <span class="input-invalid-message text-red-500 text-xs">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
            <!-- single input end -->
          </div>

          <div class="col-span-12 md:col-span-8 rounded mt-3">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                <!-- single input start -->
                <div>
                  <label for="" class="text-gray-600 mb-2 block text-sm">Job Type</label>
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

          <!-- form row end -->
          <div class="mt-4 text-right">
            <button
              type="submit"
              class="text-center bg-primary border border-primary text-white px-4 py-2 font-medium rounded-md hover:bg-transparent hover:text-primary transition uppercase text-xs md:text-sm"
            >
              Create Appointment
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
      countryId: 0,
      jobTypeId: 0,
      appointment: {
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isActive: true,
        user: {
          email: "",
          fullName: "",
          userName: "",
          password: null,
        },
        isAccepted: false,
        status: 0,
        consultant: {
          consultantId: 0,
        },
        schedule: {
          scheduleId: 0,
        },
        jobSeeker: {
          jobSeekerId: null,
        },
      },
      consultants: [],
      schedules: [],
      showAlert_: false,
      showAlert2_: false,
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

  created() {},

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

    saveAppointmentWithUser() {
      this.appointment.user.email = this.appointment.email;
      this.appointment.user.userName = this.appointment.firstName.toLocaleLowerCase();
      this.appointment.user.fullName =
        this.appointment.firstName + " " + this.appointment.lastName;
      this.appointment.user.password = null;
      this.$store
        .dispatch("appointment/saveAppointmentWithUser", {
          appointment: this.appointment,
        })
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
      this.countryId = 0;
      this.jobTypeId = 0;
      this.appointment = {
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        isActive: true,
        user: {
          email: "",
          fullName: "",
          userName: "",
          password: null,
        },
        isAccepted: false,
        status: 0,
        consultant: {
          consultantId: 0,
        },
        schedule: {
          scheduleId: 0,
        },
        jobSeeker: {
          jobSeekerId: null,
        },
      };
      this.consultants = [];
      this.schedules = [];
      this.showAlert_ = false;
      this.showAlert2_ = false;
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
