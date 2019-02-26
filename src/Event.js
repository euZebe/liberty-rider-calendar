import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

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

  truncate = text =>
    text.length > 220 ? `${text.substring(0, 40)}...Lire la suite` : text;

  render() {
    const { dateFrom, title, location, description, link, dateTo } = this.props;
    return (
      <div id={dateFrom} className="event">
        <div className="eventTitle">{title}</div>
        <div className="eventSubtitle">
          {this.formatDate(dateFrom, dateTo)} - {location}
        </div>
        <div className="eventDescription">{description}</div>
      </div>
    );
  }
}
