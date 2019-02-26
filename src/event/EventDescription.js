import React from "react";

export default class EventDescription extends React.PureComponent {
  state = { folded: true };

  toggleFolded = () => {
    const { folded } = this.state;
    this.setState({ folded: !folded });
  };

  truncate = splittedText => {
    return [
      splittedText
        .slice(0, 15)
        .join(" ")
        .concat("..."),
      <div className="readMore" onClick={this.toggleFolded}>
        Lire la suite
      </div>
    ];
  };

  render() {
    const { text } = this.props;
    const { folded } = this.state;

    const splittedText = text.split(" ");
    if (folded && splittedText.length > 15) {
      return (
        <div onClick={this.toggleFolded} className="eventDescription">
          {this.truncate(splittedText)}
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
