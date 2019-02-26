import moment from "moment";

export function isEventPendingOrFuture(event) {
  const today = moment().startOf("day");
  console.log(moment(event.dateFrom).isSameOrAfter(today));
  return event.dateTo
    ? moment(event.dateTo).isSameOrAfter(today)
    : moment(event.dateFrom).isSameOrAfter(today);
}

function isEventForDate(event, selectedDay) {
  const dateTo = event.dateTo ? moment(event.dateTo).startOf("day") : undefined;
  const dateFrom = moment(event.dateFrom).startOf("day");
  const selection = moment(selectedDay).startOf("day");
  return dateTo
    ? dateTo >= selection && dateFrom <= selection
    : dateFrom === selection;
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export function futureDateOrToday(date) {
  return new Date(Math.max(new Date(date), new Date()));
}
