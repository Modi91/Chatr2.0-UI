import React, { Component } from "react";

class MessageRow extends Component {
  render() {
    return (
      <div>
        <li>{this.props.message.message}</li>
        <li>{this.props.message.username}</li>
        <li>{this.props.message.timestamp}</li>
      </div>
    );
  }
}

export default MessageRow;
