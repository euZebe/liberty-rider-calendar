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

export default class Calendar extends React.Component {
  state = { selectedDay: undefined };

  getEventDays = () => {
    const { events } = this.props;
    return events
      .filter(utils.isEventPendingOrFuture) // do not mark past days as "with event"
      .reduce(
        (acc, e) =>
          e.dateTo
            ? [
                ...acc,
                ...utils.getDates(utils.futureDateOrToday(e.dateFrom), e.dateTo)
              ]
            : [...acc, e.dateFrom],
        []
      );
  };

  sortEvents(a, b) {
    if (a.dateFrom === b.dateFrom) {
      return a.title > b.title ? 1 : -1;
    }
    return moment(a.dateFrom) - moment(b.dateFrom);
  }

  getEvents = () => {
    const { events } = this.props;
    const filteredEvents = events
      .filter(utils.isEventPendingOrFuture) // hide past events
      .sort(this.sortEvents);

    const eventsGroupedByMonth = [
      <div>{MomentLocaleUtils.getMonths("fr")[new Date().getMonth()]}</div>
    ];
    for (let i = 0; i < filteredEvents.length; i++) {
      const currentEvent = filteredEvents[i];
      eventsGroupedByMonth.push(<Event {...currentEvent} />);

      const currentMonth = currentEvent.dateFrom.getMonth();
      if (
        i < filteredEvents.length - 1 &&
        currentEvent.dateFrom.getMonth() !==
          filteredEvents[i + 1].dateFrom.getMonth()
      ) {
        eventsGroupedByMonth.push(
          <div>{MomentLocaleUtils.getMonths("fr")[currentMonth + 1]}</div>
        );
      }
    }
    //debugger;
    return eventsGroupedByMonth;
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
          selectedDays={this.getEventDays()}
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
