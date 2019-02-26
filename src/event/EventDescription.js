import React from "react";
import PropTypes from "prop-types";

export default class EventDescription extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    eventID: PropTypes.string.isRequired
  };

  state = { folded: true };

  toggleFolded = () => {
    const { folded } = this.state;
    this.setState({ folded: !folded });
  };

  render() {
    const { text, eventID } = this.props;
    const { folded } = this.state;

    const splittedText = text.split(" ");
    if (splittedText.length > 15) {
      return folded ? (
        <div onClick={this.toggleFolded} className="eventDescription">
          {splittedText
            .slice(0, 15)
            .join(" ")
            .concat("...")}
          <a href={`#${eventID}`} className="readMore">
            Lire la suite
          </a>
        </div>
      ) : (
        <div onClick={this.toggleFolded} className="eventDescription">
          {text}
          <div className="readMore">Afficher moins</div>
        </div>
      );
    }
    return (
      <div onClick={this.toggleFolded} className="eventDescription">
        {text}
      </div>
    );
  }
}
