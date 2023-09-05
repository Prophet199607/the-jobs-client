<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
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

        dateClick: this.handleDateClick,
        select: this.handleDateClick,
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
    };
  },
  methods: {
    handleDateClick(arg) {
      console.log("handleDateClick");
      console.log(arg);
      let today = new Date();
      let date;
      if (arg.allDay) {
        date = arg.start ? arg.start : arg.date;
      } else {
        date = arg.start;
      }
      // $("#AddHolidayToCalenderModal").modal();
      // this.$refs.AddHolidayToCalenderModal.setTimeRange(arg);
    },
    handleEventClick(arg) {
      // $("#AddHolidayToCalenderModal").modal();
      // this.$refs.AddHolidayToCalenderModal.setValues(arg.event);
      // return;
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
  },
};
</script>

<style></style>
