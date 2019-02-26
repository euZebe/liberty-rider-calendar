import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import EventDescription from "./EventDescription";

export default class Event extends React.Component {
  static propTypes = {
    dateFrom: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string,
    dateTo: PropTypes.string
  };

  formatDate = (dateFrom, dateTo) =>
    dateTo
      ? `Du ${moment(dateFrom).format("DD MMMM")} au ${moment(dateTo).format(
          "DD MMMM"
        )}`
      : `Le ${moment(dateFrom).format("DD MMMM")}`;

  render() {
    const { dateFrom, title, location, description, link, dateTo } = this.props;
    return (
      <div id={title} className="event">
        <div className="eventTitle">{title}</div>
        <div className="eventSubtitle">
          {this.formatDate(dateFrom, dateTo)} - {location}
        </div>
        <EventDescription text={description} eventID={title} />
      </div>
    );
  }
}
