<template>
  <div class="col-span-12 md:col-span-9 shadow rounded w-full p-5">
    <div v-if="checkUserHasAccess(['ROLE_USER'])">
      <!-- breadcrumbs start -->
      <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
        <a href="#" class="text-primary">
          <i class="fa fa-home" aria-hidden="true"></i>
        </a>
        <span class="text-xs text-gray-400">
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </span>

        <p class="text-gray-500 font-medium">My Profile</p>
      </div>
      <!-- breadcrumbs end -->
      <div class="container mx-auto mt-8 bg-white grid grid-cols-5 gap-4">
        <!-- First Column: Personal Information -->
        <div class="col-span-2">
          <h2 class="text-xl font-normal">Personal Information</h2>
          <!-- Add your text fields or other elements here -->
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              :value="loggedInUserDetails.fullName"
              placeholder="John Doe"
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              :value="loggedInUserDetails.email"
              placeholder="johndoe@example.com"
            />
          </div>
          <!-- Add more text fields as needed -->
        </div>
        <!-- Second Column: Profile Card (from your previous code) -->
        <div class="relative col-span-3 p-4 bg-white rounded-lg shadow-md">
          <div class="profile-image w-32 h-32 rounded-full overflow-hidden bg-gray-300">
            <img
              src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg"
              alt="My Profile"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="md:w-3/4 mt-4 md:mt-0">
            <h2 class="text-xl font-semibold">{{ loggedInUserDetails.fullName }}</h2>
            <p class="text-gray-600">Web Developer</p>
            <p class="mt-4 text-gray-700 text-base">
              Hi! I'm {{ loggedInUserDetails.fullName }}, a passionate web developer with
              experience in building modern and responsive websites. I love coding,
              learning new technologies, and creating user-friendly web applications.
            </p>
            <div class="mt-6">
              <h3 class="text-lg font-semibold">Connect with Me</h3>
              <div class="flex mt-2">
                <a
                  href="https://twitter.com/johndoe"
                  target="_blank"
                  class="mr-4 text-blue-500 hover:underline text-base"
                >
                  <i class="fab fa-twitter"></i> Twitter
                </a>
                <a
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  class="mr-4 text-blue-500 hover:underline text-base"
                >
                  <i class="fab fa-linkedin"></i> LinkedIn
                </a>
                <a
                  href="https://github.com/johndoe"
                  target="_blank"
                  class="text-blue-500 hover:underline text-base"
                >
                  <i class="fab fa-github"></i> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="checkUserHasAccess(['ROLE_ADMIN'])">
      <div class="grid grid-cols-4 gap-x-2">
        <!-- dashoard card start -->
        <div class="bg-green-500 text-white rounded-md shadow-md flex flex-col py-2 px-2">
          <div class="text-base">
            <i class="fa fa-user-circle text-xl mr-3" aria-hidden="true"></i> Total
            Consultnants
          </div>
          <div class="text-2xl my-1">{{ adminFigures.totalConsultants }}</div>
        </div>
        <!-- dashoard card end -->
        <!-- dashoard card start -->
        <div
          class="bg-purple-500 text-white rounded-md shadow-md flex flex-col py-2 px-2"
        >
          <div class="text-base">
            <i class="fa fa-users text-xl mr-3" aria-hidden="true"></i> Total Job Seekers
          </div>
          <div class="text-2xl my-1">{{ adminFigures.totalJobSeekers }}</div>
        </div>
        <!-- dashoard card end -->
        <!-- dashoard card start -->
        <div class="bg-rose-500 text-white rounded-md shadow-md flex flex-col py-2 px-2">
          <div class="text-base">
            <i class="fa fa-chalkboard-user text-xl mr-3" aria-hidden="true"></i> Total
            Schedules
          </div>
          <div class="text-2xl my-1">{{ adminFigures.totalSchedules }}</div>
        </div>
        <!-- dashoard card end -->
        <!-- dashoard card start -->
        <div
          class="bg-yellow-500 text-white rounded-md shadow-md flex flex-col py-2 px-2"
        >
          <div class="text-base">
            <i class="fa fa-list text-xl mr-3" aria-hidden="true"></i> New Appointments
          </div>
          <div class="text-2xl my-1">{{ adminFigures.totalAppointments }}</div>
        </div>
        <!-- dashoard card end -->
      </div>
    </div>
    <div v-if="checkUserHasAccess(['ROLE_CONSULTANT'])">
      <div class="grid grid-cols-3 gap-x-2">
        <!-- dashoard card start -->
        <div class="bg-gray-600 text-white rounded-md shadow-md flex flex-col py-2 px-2">
          <div class="text-base">
            <i class="fa fa-chalkboard-user text-xl mr-3" aria-hidden="true"></i> My
            Schedule Count
          </div>
          <div class="text-2xl my-1">{{ consultantFigures.myScheduleCount }}</div>
        </div>
        <!-- dashoard card end -->
        <!-- dashoard card start -->
        <div class="bg-gray-600 text-white rounded-md shadow-md flex flex-col py-2 px-2">
          <div class="text-base">
            <i class="fa fa-chalkboard-user text-xl mr-3" aria-hidden="true"></i> Total
            Appointments
          </div>
          <div class="text-2xl my-1">{{ consultantFigures.myAppointmentsCount }}</div>
        </div>
        <!-- dashoard card end -->
        <!-- dashoard card start -->
        <div class="bg-gray-600 text-white rounded-md shadow-md flex flex-col py-2 px-2">
          <div class="text-base">
            <i class="fa fa-list text-xl mr-3" aria-hidden="true"></i> New Appointments
          </div>
          <div class="text-2xl my-1">{{ consultantFigures.myNewAppointmentsCount }}</div>
        </div>
        <!-- dashoard card end -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminFigures: {
        totalSchedules: 0,
        totalConsultants: 0,
        totalAppointments: 0,
        totalJobSeekers: 0,
      },
      consultantFigures: {
        myAppointmentsCount: 0,
        myScheduleCount: 0,
        myNewAppointmentsCount: 0,
      },
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
  },

  mounted() {
    if (this.checkUserHasAccess(["ROLE_ADMIN"])) {
      this.loadAdminDashboardFigures();
    } else if (this.checkUserHasAccess(["ROLE_CONSULTANT"])) {
      this.loadConsultantDashboardFigures();
    }
  },

  methods: {
    checkUserHasAccess(required_roles) {
      let hasRole = false;
      required_roles.forEach((role) => {
        if (this.loggedInUserRoles.includes(role)) {
          hasRole = true;
        }
      });
      return hasRole;
    },

    loadAdminDashboardFigures() {
      this.$store.dispatch("dashboard/loadAdminDashboardFigures").then((res) => {
        this.adminFigures = res;
      });
    },

    loadConsultantDashboardFigures() {
      this.$store.dispatch("dashboard/loadConsultantDashboardFigures").then((res) => {
        this.consultantFigures = res;
      });
    },
  },
};
</script>

<style>
.profile-image {
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
