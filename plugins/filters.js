import Vue from "vue";
import moment from "moment";

Vue.filter("formattedDate", (date) => {
  if (date === undefined) return "";
  return moment(date).format("DD-MM-YYYY");
});

Vue.filter("formattedDate2", (date) => {
  if (date === undefined) return "";
  return moment(date).format("LL");
});

Vue.filter("formattedDate3", (date) => {
  if (date === undefined) return "";
  return moment(date).format("MMM DD [at] h:mm A");
});

Vue.filter("currency", (number) => {
  return (
    "Rs. " +
    parseFloat(number)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
});

Vue.filter("currencyWithoutRs", (number) => {
  return parseFloat(number)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

Vue.filter("limitText", (text, count) => {
  if (text === null || text === undefined) return "";
  const newText = text.slice(0, count);
  return `${newText}${text.length > count ? "..." : ""}`;
});
