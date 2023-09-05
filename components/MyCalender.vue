<template>
  <FullCalendar :options="calendarOptions" />
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

        // dateClick: this.handleDateClick,
        select: this.handleSelect,
        eventClick: this.handleEventClick,
        eventResize: this.handleEventChange,
        eventDragStart: this.internalDragStart,
        eventDragEnd: this.internalDragEnd,
        eventDrop: this.handleEventChange,
        eventReceive: this.handleEventChange,
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
    };
  },

  created() {
    this.loadSchedulesByConsultant();
  },

  methods: {
    loadSchedulesByConsultant() {
      let consultantId = localStorage.getItem("loggedUserId");
      this.$store
        .dispatch("consultant/loadSchedulesByConsultant", consultantId)
        .then((res) => {
          this.allSlotData = res;
          this.calendarOptions.events = res.map((el) => {
            return {
              id: el.scheduleId,
              title: el.title,
              start: el.start,
              end: el.end,
              color: el.isBooked ? "#04df29" : "#333",
            };
          });
        });
    },

    handleDateClick(arg) {
      console.log("handleDateClick");
      let start, end;

      if (arg.allDay) {
        start = arg.start ? arg.start : arg.date;
        end = arg.end ? arg.end : start;
        end = moment(String(end)).add(24, "h").format("YYYY-MM-DD HH:mm");
      } else {
        start = arg.start;
        end = arg.end;
      }
      console.log("start", moment(start).format("YYYY-MM-DD HH:mm"));
      console.log("end", moment(end).format("YYYY-MM-DD HH:mm"));

      // $("#AddHolidayToCalenderModal").modal();
      // this.$refs.AddHolidayToCalenderModal.setTimeRange(arg);
    },

    handleSelect(arg) {
      console.log("handleSelect");
      let start, end;

      if (arg.allDay) {
        return;
        start = arg.start ? arg.start : arg.date;
        end = arg.end ? arg.end : start;
        end = moment(String(end)).add(24, "h").format("YYYY-MM-DD HH:mm");
      } else {
        start = arg.start;
        end = arg.end;
      }
      console.log("start", moment(start).format("YYYY-MM-DD HH:mm"));
      console.log("end", moment(end).format("YYYY-MM-DD HH:mm"));

      this.saveTimeSlot({ start, end });
      this.createTimeSlot({ start, end });
    },

    createTimeSlot({ start, end }) {
      this.calendarOptions.events.push({
        title: "Slot 1",
        start: moment(start).format("YYYY-MM-DD HH:mm"),
        end: moment(end).format("YYYY-MM-DD HH:mm"),
        color: "#333",
      });
    },

    handleEventClick(arg) {
      const selectedSlotId = arg.event._def.publicId;

      let selectedSlot = this.allSlotData.find(
        (slot) => slot.scheduleId == selectedSlotId
      );

      if (selectedSlot.isBooked) {
        swal("Error!", "This slot is already booked", "error");
        return;
      }

      swal({
        title: "Are you sure?",
        text: "Do you want to delete this slot!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          // this.$store
          //   .dispatch("order/cancelOrder", order_code)
          //   .then((res) => {
          //     swal("Success!", "Order Cancelled successfully", "success");
          //     this.order = res;
          //   })
          //   .catch((err) => {});
        }
      });
    },
    internalDragStart(arg) {
      console.log("sdsd");
      // $("#AddHolidayToCalenderModal").modal();
      // this.$refs.AddHolidayToCalenderModal.setValues(arg.event);
      // return;
    },
    internalDragEnd(arg) {
      console.log("sdsd");
      // $("#AddHolidayToCalenderModal").modal();
      // this.$refs.AddHolidayToCalenderModal.setValues(arg.event);
      // return;
    },

    saveTimeSlot({ start, end }) {
      let loggedUserId = localStorage.getItem("loggedUserId");
      let schedule = {
        title: "Pasindu",
        start: moment(start).format("YYYY-MM-DD HH:mm:ss"),
        end: moment(end).format("YYYY-MM-DD HH:mm:ss"),
        startDate: moment(start).format("YYYY-MM-DD"),
        endDate: moment(end).format("YYYY-MM-DD"),
        startTime: moment(start).format("HH:mm:ss"),
        endTime: moment(end).format("HH:mm:ss"),
        consultant: {
          consultantId: loggedUserId,
        },
      };
      this.$store.dispatch("consultant/saveTimeSlot", { schedule }).then((res) => {
        swal("Success!", res.message, "success");
      });
    },
  },
};
</script>

<style></style>
