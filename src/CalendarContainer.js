import React from "react";

import Calendar from "./Calendar";
import data from "./events.json";

const events = data.events.map(e => ({
  ...e,
  dateFrom: new Date(e.dateFrom),
  dateTo: e.dateTo ? new Date(e.dateTo) : undefined
}));

export default () => <Calendar events={events} />;
