import React, { Component } from "react";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";
import MessageRow from "./MessageRow";

class ChannelInterface extends Component {
  state = {
    user: "",
    channel: "",
    message: "",
    timestamp: ""
  };

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.props.fetchMessages(channelID);
  }

  textChangeHandler = event =>
    this.setState({ [event.target.name]: event.target.value });

  submitMessage = () => {
    const channelID = this.props.match.params.channelID;

    this.props.addMessage(channelID, this.state);
  };

  componentDidUpdate(prevState) {
    console.log("[ChannelInterface.js prevState]", prevState);
    if (prevState.match.params.channelID != this.props.match.params.channelID) {
      const channelID = this.props.match.params.channelID;
      this.props.fetchMessages(channelID);
    }
  }

  render() {
    const messages = this.props.messages.map(message => (
      <MessageRow key={message.id} message={message} />
    ));
    return (
      <div className="message-container">
        <div className="room-info-container">
          <div className="room-info-name">{this.props.channels.name}</div>
        </div>
        {messages}
        <div className="message-field">
          <input
            name="message"
            className="message-text"
            placeholder="Type your message here..."
            type="text"
            onChange={this.textChangeHandler}
          />
          <button onClick={this.submitMessage}>SEND</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages, //list of messages {user: channel: message:"" timestamp: id:}
    channels: state.channels.channels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID =>
      dispatch(actionCreators.fetchMessages(channelID)),
    addMessage: (channelID, m) =>
      dispatch(actionCreators.addMessage(channelID, m))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelInterface);
