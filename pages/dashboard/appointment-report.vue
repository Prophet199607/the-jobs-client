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

      <p class="text-gray-500 font-medium">Reports</p>
    </div>
    <div class="flex justify-end gap-x-3 my-5 items-center">
      <!-- single input start -->
      <div>
        <label for="" class="text-gray-600 mb-2 text-sm">Date From</label>
        <input
          type="date"
          v-model="dateFrom"
          class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
        />
      </div>
      <!-- single input end -->
      <!-- single input start -->
      <div>
        <label for="" class="text-gray-600 mb-2 text-sm">Date To</label>
        <input
          type="date"
          v-model="dateTo"
          class="block w-full text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
        />
      </div>
      <!-- single input end -->
      <button
        class="bg-yellow-500 text-white px-3 py-2 mt-5 text-sm rounded-md shadow-md"
        @click="loadAppointmentReport"
      >
        Load report
      </button>
    </div>
    <!-- breadcrumbs end -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        v-if="appointments.length > 0"
        class="bg-red-500 text-white px-3 py-2 mt-5 text-sm mb-2 rounded-md shadow-md"
        @click="downloadReport"
      >
        <i class="fa fa-file-pdf mr-2" aria-hidden="true"></i>
        Download Pdf
      </button>
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-2 md:px-6 py-3">ID</th>
            <th scope="col" class="px-2 md:px-6 py-3">Consultant Name</th>
            <th scope="col" class="px-2 md:px-6 py-3">job Seeker Name</th>
            <th scope="col" class="px-2 md:px-6 py-3">Job Type</th>
            <th scope="col" class="px-2 md:px-6 py-3">Country</th>
            <th scope="col" class="px-2 md:px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b hover:bg-gray-50"
            v-for="appointment in appointments"
            :key="appointment.id"
          >
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ appointment.appointmentId }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.consultant.firstName }} {{ appointment.consultant.lastName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.jobSeeker.firstName }} {{ appointment.jobSeeker.lastName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.consultant.jobType.jobType }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ appointment.consultant.country.countryName }}
            </td>
            <td class="px-2 md:px-6 py-4 text-gray-900">
              {{ getApopintmentStatus(appointment.status) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import moment from "moment";
export default {
  data() {
    return {
      dateFrom: moment(new Date()).format("YYYY-MM-DD"),
      dateTo: moment(new Date()).format("YYYY-MM-DD"),
      appointments: [],
    };
  },

  computed: {
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
  },

  created() {
    this.loadAppointmentReport();
  },

  mounted() {},

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const required_roles = ["ROLE_ADMIN"];
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
    loadAppointmentReport() {
      this.$store
        .dispatch("report/loadAppointmentReport", {
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        })
        .then((res) => {
          this.appointments = res;
        });
    },

    downloadReport() {
      let dataArray = this.appointments.map((appointment, index) => {
        return [
          {
            content: appointment.appointmentId,
            styles: { cellWidth: 8, halign: "left", textColor: "#000000" },
          },
          {
            content:
              appointment.consultant.firstName + " " + appointment.consultant.lastName,
            styles: { cellWidth: 35, textColor: "#000000" },
          },
          {
            content:
              appointment.jobSeeker.firstName + " " + appointment.jobSeeker.lastName,
            styles: { cellWidth: 30, halign: "left", textColor: "#000000" },
          },
          {
            content: appointment.consultant.jobType.jobType,
            styles: { halign: "left", textColor: "#000000" },
          },
          {
            content: appointment.consultant.country.countryName,
            styles: { cellWidth: 25, halign: "left", textColor: "#000000" },
          },
          {
            content:
              appointment.schedule.title +
              "(" +
              appointment.schedule.startDate +
              " " +
              appointment.schedule.startTime +
              " to " +
              appointment.schedule.endTime +
              ")",
            styles: { halign: "left", textColor: "#000000" },
          },
          {
            content: this.getApopintmentStatus(appointment.status),
            styles: { cellWidth: 15, halign: "center", textColor: "#000000" },
          },
        ];
      });
      const doc = new jsPDF();

      doc.setFontSize(14);
      doc.text(80, 10, "Appointments Report");
      doc.setFontSize(10);
      doc.text(165, 10, " " + moment().format("DD/MM/YYYY h:mm:ss a"));
      doc.setFontSize(10);
      doc.text(6, 25, "Date - " + this.loadDateRange());
      doc.setFontSize(10);
      doc.autoTable({
        theme: "grid",
        margin: { top: 45, left: 6, right: 6 },
        didDrawPage: function (data) {
          data.settings.margin.top = 10;
        },
        headStyles: {
          // fillColor: "Blue",
          fontSize: 8,
          halign: "center",
          valign: "middle",
        },
        bodyStyles: { fontSize: 7 },
        head: [
          [
            "No",
            "Consultant Name",
            "Job Seeker Name",
            "Job Type",
            "Country",
            "Schedule Details",
            "Status",
          ],
        ],
        body: dataArray,
      });
      doc.setProperties({
        title: "Appointments Report",
      });

      // horizontal footer
      doc.setFontSize(8);
      var pageCount = doc.internal.getNumberOfPages();
      for (let i = 0; i < pageCount; i++) {
        doc.setPage(i);
        let c_name = "The Jobs";
        let text_l = doc.getStringUnitWidth(c_name);
        doc.text(
          doc.internal.pageSize.width / 2 - text_l,
          doc.internal.pageSize.height - 5,
          c_name
        );
        doc.text(
          doc.internal.pageSize.width - 10,
          doc.internal.pageSize.height - 5,
          doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount
        );
      }

      window.open(doc.output("bloburl"));
    },

    loadDateRange() {
      if (moment(this.dateFrom).isSame(moment(this.dateTo))) {
        return (
          moment(this.dateFrom).format("DD/MM/YYYY") +
          ` (${moment(this.dateFrom).format("dddd")})`
        );
      } else {
        return (
          moment(this.dateFrom).format("DD/MM/YYYY") +
          " to " +
          moment(this.dateTo).format("DD/MM/YYYY")
        );
      }
    },

    getApopintmentStatus(status) {
      switch (status) {
        case 0:
          return "Pending";
          break;
        case 1:
          return "Accepted";
          break;
        case 3:
          return "Rejected";
          break;

        default:
          break;
      }
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
