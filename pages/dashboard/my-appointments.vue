<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        themeSystem: "bootstrap",
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        hiddenDays: [0],
        businessHours: [
          { daysOfWeek: [1, 2, 3, 4, 5], startTime: "08:30", endTime: "17:30" },
          { daysOfWeek: [6], startTime: "08:30", endTime: "13:30" },
        ],
        selectOverlap: false,

        eventClick: this.handleEventClick,

        initialView: "dayGridMonth",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        droppable: true,
        events: [],
      },
      allSlotData: [],
      selectedConsultantId: 0,
    };
  },

  computed: {
    consultants() {
      return { ...this.$store.getters["consultant/getAllConsultants"] };
    },
  },

  created() {
    this.loadMyAppointments();
  },

  methods: {
    loadMyAppointments() {
      this.$store.dispatch("appointment/loadMyAppointments").then((res) => {
        this.allSlotData = res;
        this.calendarOptions.events = res.map((el) => {
          return {
            id: el.appointmentId,
            title: `Appointment-${el.appointmentId}`,
            start: el.schedule.start,
            end: el.schedule.end,
            color: el.isAccepted ? "#04df29" : "#4245f5",
          };
        });
      });
    },

    handleEventClick(arg) {
      const selectedSlotId = arg.event._def.publicId;

      let index = this.calendarOptions.events.findIndex(
        (event) => event.id == selectedSlotId
      );

      swal({
        title: "Are you sure?",
        text: "Do you want to cancel this appointment?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store
            .dispatch("appointment/canceledAppointment", selectedSlotId)
            .then((res) => {
              this.calendarOptions.events.splice(index, 1);
              swal("Success!", "Appointment canceled successfully", "success");
              this.order = res;
            })
            .catch((err) => {});
        }
      });
    },
  },
};
</script>

<style></style>
