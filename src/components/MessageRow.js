import React, { Component } from "react";

class MessageRow extends Component {
  render() {
    return (
      <div className={"message-item active"}>
        <div className="author-message-container">
          <div className="active-message message">
            {this.props.message.message}
          </div>
          <div className="active-author message-author">
            {this.props.message.username}
            {this.props.message.timestamp}
          </div>
        </div>
      </div>
    );
  }
}

export default MessageRow;
