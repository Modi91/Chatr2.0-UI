import React, { Component } from "react";

// let messageTime = new Date(this.props.message.timestamp);
// const timeDiff = (new Date() - messageTime) / (1000 * 60 * 60 * 24);
// if (timeDiff > 1) {
//   console.log(`${Math.floor(timeDiff)} days ago`);
// } else if (timeDiff * 24 > 1 && timeDiff < 1) {
//   let timeInH = timeDiff * 24;
//   console.log(`${Math.floor(timeInH)} hours ago`);
// } else if (timeDiff * 24 < 1) {
//   let timeInM = timeDiff * 24 * 60 - 5;
//   console.log(`${Math.floor(timeInM)} minutes ago`);
// } else {
//   console.log("check");
// }

class MessageRow extends Component {
  //Don't judge :)
  sinceSentFunction = () => {
    if (
      (new Date() - new Date(this.props.message.timestamp)) /
        (1000 * 60 * 60 * 24) >
      1
    ) {
      return ` .. ${Math.floor(
        (new Date() - new Date(this.props.message.timestamp)) /
          (1000 * 60 * 60 * 24)
      )} days ago`;
    } else if (
      ((new Date() - new Date(this.props.message.timestamp)) /
        (1000 * 60 * 60 * 24)) *
        24 >
        1 &&
      (new Date() - new Date(this.props.message.timestamp)) /
        (1000 * 60 * 60 * 24) <
        1
    ) {
      let timeInH =
        ((new Date() - new Date(this.props.message.timestamp)) /
          (1000 * 60 * 60 * 24)) *
        24;
      return `.. ${Math.floor(timeInH)} hours ago`;
    } else if (
      ((new Date() - new Date(this.props.message.timestamp)) /
        (1000 * 60 * 60 * 24)) *
        24 <
      1
    ) {
      let timeInM =
        ((new Date() - new Date(this.props.message.timestamp)) /
          (1000 * 60 * 60 * 24)) *
          24 *
          60 -
        5;
      return `.. ${Math.floor(timeInM)} minutes ago`;
    } else {
      console.log("check");
    }
    //Don't judge :)
  };
  render() {
    return (
      <div className="message-item active">
        <div className="author-message-container">
          <div className="active-message message">
            {this.props.message.message}
          </div>
          <div className="active-author message-author">
            {this.props.message.username}
            {this.sinceSentFunction()}
          </div>
        </div>
      </div>
    );
  }
}

export default MessageRow;
