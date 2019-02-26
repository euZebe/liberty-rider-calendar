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

  openExternalLink = () => {
    const { link } = this.props;
    if (link) {
      console.log("TODO: redirect to ", link);
    }
  };

  render() {
    const { dateFrom, title, location, description, link, dateTo } = this.props;
    const eventID = title.replace(/\s/g, "-");
    return (
      <div id={dateFrom} className="event">
        <div onClick={this.openExternalLink}>
          {link && <span className="chevron right link" />}
          <div id={eventID} className="eventTitle">
            {title}
          </div>
          <div className="eventSubtitle">
            {this.formatDate(dateFrom, dateTo)} - {location}
          </div>
        </div>
        <EventDescription text={description} eventID={eventID} />
      </div>
    );
  }
}
