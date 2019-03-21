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

  updateMessage = 0;

  async componentDidMount() {
    if (this.props.user) {
      const channelID = this.props.match.params.channelID;
      await this.props.fetchMessages(channelID);
      // let latestMessageTS = this.props.messages[this.props.messages.length - 1]
      //   .timestamp;
      if (this.props.messages.length !== 0) {
        this.updateMessage = setInterval(
          () =>
            this.props.fetchMessagesTS(
              channelID,
              this.props.messages[this.props.messages.length - 1].timestamp
            ),
          3000
        );
      }
    }
  }

  textChangeHandler = event =>
    this.setState({ [event.target.name]: event.target.value });

  submitMessage = () => {
    const channelID = this.props.match.params.channelID;

    this.props.addMessage(channelID, this.state);
    this.setState({ message: "" });
  };

  async componentDidUpdate(prevState) {
    const channelID = this.props.match.params.channelID;
    // let latestMessageTS = this.props.messages[this.props.messages.length - 1]
    //   .timestamp;
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      await clearInterval(this.updateMessage);
      await this.props.fetchMessages(channelID);
      if (this.props.messages.length !== 0) {
        await clearInterval(this.updateMessage);
        this.updateMessage = setInterval(
          () =>
            this.props.fetchMessagesTS(
              channelID,
              this.props.messages[this.props.messages.length - 1].timestamp
            ),
          3000
        );
      } else {
        this.updateMessage = setInterval(
          () => this.props.fetchMessages(channelID),
          3000
        );
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateMessage);
  }

  render() {
    const messages = this.props.messages.map(message => (
      <MessageRow key={message.id} message={message} />
    ));
    return (
      <div>
        {this.props.user && (
          <div className="message-container">
            <div className="room-info-container" />
            {messages}
            <div className="message-field">
              <input
                name="message"
                className="message-text"
                placeholder="Type your message here..."
                type="text"
                onChange={this.textChangeHandler}
              />
              <button onClick={this.submitMessage.bind(this)}>SEND</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    messages: state.messages.messages, //list of messages {user: channel: message:"" timestamp: id:}
    channels: state.channels.channels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID =>
      dispatch(actionCreators.fetchMessages(channelID)),
    addMessage: (channelID, m) =>
      dispatch(actionCreators.addMessage(channelID, m)),
    fetchMessagesTS: (channelID, ts) =>
      dispatch(actionCreators.fetchMessagesTS(channelID, ts))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelInterface);
