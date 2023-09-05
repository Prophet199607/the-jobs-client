<template>
  <div>
    <div class="my-5">
      <select
        class="block w-96 text-base border border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
        v-model="selectedConsultantId"
        @change="loadSchedulesByConsultant"
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
    </div>
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
    this.loadAllConsultants();
  },

  methods: {
    loadAllConsultants() {
      this.$store.dispatch("consultant/loadAllConsultants").then((res) => {});
    },

    loadSchedulesByConsultant() {
      this.$store
        .dispatch("consultant/loadSchedulesByConsultant", this.selectedConsultantId)
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
  },
};
</script>

<style></style>
