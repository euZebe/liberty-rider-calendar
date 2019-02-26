import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

// Include the locale utils designed for moment
import MomentLocaleUtils from "react-day-picker/moment";
import moment from "moment";

// Make sure moment.js has the required locale data
import "moment/locale/fr";

import Event from "./Event";
import Navbar from "./Navbar";
import "./styles.css";

import data from "./events.json";

const eventDays = data.events.map(e => new Date(e.dateFrom));

// TODO: handle dateTo for eventDays

function isEventForDate(event, selectedDay) {
  const dateTo = event.dateTo ? moment(event.dateTo).startOf("day") : undefined;
  const dateFrom = moment(event.dateFrom).startOf("day");
  const selection = moment(selectedDay).startOf("day");
  return dateTo
    ? dateTo >= selection && dateFrom <= selection
    : dateFrom === selection;
}

function Weekday({ weekday, className, localeUtils, locale }) {
  const weekdayName = localeUtils.formatWeekdayLong(weekday, locale);
  return (
    <div className={className} title={weekdayName}>
      {weekdayName.slice(0, 1)}
    </div>
  );
}

export default class LocalizedExample extends React.Component {
  state = { selectedDay: undefined };

  getEvents = () => {
    const { selectedDay } = this.state;
    return data.events.map(e => <Event {...e} />);
  };

  handleDayClick = selectedDay => {
    console.log(selectedDay);
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
