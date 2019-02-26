import React from "react";

export default class EventDescription extends React.PureComponent {
  state = { folded: true };

  toggleFolded = () => {
    const { folded } = this.state;
    this.setState({ folded: !folded });
  };

  render() {
    const { text } = this.props;
    const { folded } = this.state;

    const splittedText = text.split(" ");
    if (splittedText.length > 15) {
      return folded ? (
        <div onClick={this.toggleFolded} className="eventDescription">
          {splittedText
            .slice(0, 15)
            .join(" ")
            .concat("...")}
          <div className="readMore">Lire la suite</div>
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
