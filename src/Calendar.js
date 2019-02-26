import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

// Include the locale utils designed for moment
import MomentLocaleUtils from "react-day-picker/moment";
import moment from "moment";

// Make sure moment.js has the required locale data
import "moment/locale/fr";

import Event from "./Event";
import Navbar from "./calendar/Navbar";
import Weekday from "./calendar/Weekday";
import * as utils from "./date-utils";
import "./styles.css";

import data from "./events.json";

const eventDays = data.events
  .filter(utils.isEventPendingOrFuture) // do not mark past days as "with event"
  .reduce(
    (acc, e) =>
      e.dateTo
        ? [
            ...acc,
            ...utils.getDates(
              utils.futureDateOrToday(e.dateFrom),
              new Date(e.dateTo)
            )
          ]
        : [...acc, new Date(e.dateFrom)],
    []
  );

export default class Calendar extends React.Component {
  state = { selectedDay: undefined };

  getEvents = () => {
    const { selectedDay } = this.state;
    return data.events
      .filter(utils.isEventPendingOrFuture) // hide past events
      .sort((a, b) => moment(a.dateFrom) - moment(b.dateFrom))
      .map(e => <Event {...e} />);
  };

  handleDayClick = selectedDay => {
    this.setState({ selectedDay });
  };

  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        <DayPicker
          localeUtils={MomentLocaleUtils}
          selectedDays={eventDays}
          locale="fr"
          showOutsideDays
          onDayClick={this.handleDayClick}
          fromMonth={new Date()}
          weekdayElement={Weekday}
          navbarElement={<Navbar />}
        />

        <div>{this.getEvents()}</div>
      </div>
    );
  }
}
