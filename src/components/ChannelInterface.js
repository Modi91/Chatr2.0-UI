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

  componentWillMount() {}
  async componentDidMount() {
    if (this.props.user) {
      const channelID = this.props.match.params.channelID;
      await this.props.fetchMessages(channelID);

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

  submitMessage = e => {
    const channelID = this.props.match.params.channelID;
    if (e.key === "Enter") {
      this.props.addMessage(channelID, this.state);
      this.setState({ message: "" });
    }
  };

  async componentDidUpdate(prevState) {
    const channelID = this.props.match.params.channelID;

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
        ///ADD-ME///ADD-ME///ADD-ME///ADD-ME///ADD-ME///ADD-ME///ADD-ME///
        this.currentChannelName = this.props.channels
          .filter(channel => channel.id === this.props.messages[0].channel)
          .map(channel => channel.name);

        console.log(this.currentChannelName);
        ///ADD-ME///ADD-ME///ADD-ME///ADD-ME///ADD-ME///ADD-ME///ADD-ME///
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
            {messages}

            <div className="message-field">
              <input
                name="message"
                className="message-text"
                placeholder="Type here..."
                type="text"
                value={this.state.message}
                onChange={this.textChangeHandler}
                onKeyPress={this.submitMessage.bind(this)}
              />
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
