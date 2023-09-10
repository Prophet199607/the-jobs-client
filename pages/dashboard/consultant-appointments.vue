<template>
  <!-- <div class="col-span-9 hidden md:grid grid-cols-1 gap-4"> -->
  <div class="col-span-12 md:col-span-12 shadow rounded px-2 md:px-6 pt-5 pb-7 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Manage Job Seekers</p>
    </div>
    <div class="flex justify-end my-2">
      <select
        class="w-44 text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
        v-model="selectedStatus"
        @change="loadConsultantsAppointments"
      >
        <option v-for="(status, index) in statusArr" :key="index" :value="status.id">
          {{ status.status }}
        </option>
      </select>
    </div>
    <!-- breadcrumbs end -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 md:px-6 py-3">ID</th>
            <th scope="col" class="px-2 md:px-6 py-3">Name</th>
            <th scope="col" class="px-2 md:px-6 py-3">Contact Number</th>
            <th scope="col" class="px-2 md:px-6 py-3">Slot Details</th>
            <th scope="col" class="px-2 md:px-6 py-3">
              <span class="sr-only"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="appointment in appointments"
            :key="appointment.id"
          >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ appointment.appointmentId }}
            </th>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.jobSeeker.firstName }} {{ appointment.jobSeeker.lastName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.jobSeeker.contactNumber }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.schedule.title }}
              ({{ appointment.schedule.startDate }} -
              {{ appointment.schedule.startTime }} to {{ appointment.schedule.endTime }})
            </td>
            <td
              class="px-2 md:px-6 py-4 text-gray-900 text-right flex gap-x-4 items-center"
              v-if="appointment.status == 0"
            >
              <div
                class="font-medium text-green-600 cursor-pointer"
                @click="acceptAppointment(appointment)"
              >
                Accept
              </div>
              <div
                class="font-medium text-red-600 cursor-pointer"
                @click="rejectAppointment(appointment)"
              >
                Reject
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
      selectedStatus: 0,
      appointments: [],
      statusArr: [
        { id: 0, status: "Pending" },
        { id: 1, status: "Accepted" },
        { id: 3, status: "Rejected" },
      ],
    };
  },

  computed: {
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
  },

  created() {
    this.loadConsultantsAppointments();
  },

  mounted() {},

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const required_roles = ["ROLE_CONSULTANT"];
      let hasRole = false;
      required_roles.forEach((role) => {
        if (vm.loggedInUserRoles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        vm.$router.push({ path: "/" });
      } else {
        return true;
      }
    });
  },

  methods: {
    loadConsultantsAppointments() {
      this.$store
        .dispatch("appointment/loadConsultantsAppointments", this.selectedStatus)
        .then((res) => {
          this.appointments = res;
        });
    },

    acceptAppointment(appointment) {
      swal({
        text: "Do you want to accept this appointment!",
        buttons: true,
        dangerMode: false,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store
            .dispatch("appointment/changeStatusOfAppointment", {
              appointmentId: appointment.appointmentId,
              status: 1,
              isAccepted: true,
            })
            .then((res) => {
              this.loadConsultantsAppointments();
              swal("Success!", "Appointment accepted successfully", "success");
              this.order = res;
            })
            .catch((err) => {});
        }
      });
    },

    rejectAppointment(appointment) {
      swal({
        title: "Are you sure?",
        text: "Do you want to reject this appointment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store
            .dispatch("appointment/changeStatusOfAppointment", {
              appointmentId: appointment.appointmentId,
              status: 3,
              isAccepted: false,
            })
            .then((res) => {
              this.loadConsultantsAppointments();
              swal("Success!", "Appointment rejected successfully", "success");
              this.order = res;
            })
            .catch((err) => {});
        }
      });
    },
  },
};
</script>

<style scoped>
/* pagination styles start */
::v-deep .pagination {
  display: -ms-flexbox;
  display: flex;
  padding-left: 0;
  list-style: none;
  border-radius: 0.25rem;
}
::v-deep .page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #e88c02;
  background-color: #fff;
  border: 1px solid #dee2e6;
}
::v-deep .page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #e88c02;
  border-color: #e88c02;
}
::v-deep a:hover {
  color: #e88c02;
  text-decoration: none;
  background-color: #adadad83;
  color: #fff;
}
::v-deep .VuePagination__count {
  margin-top: 5px;
  font-size: 13px;
}
/* pagination styles end */
</style>
