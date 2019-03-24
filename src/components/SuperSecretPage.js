import React, { Component } from "react";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";
class SuperSecretPage extends Component {
  render() {
    return (
      <div className="container text-center my-auto z-1" id="secret">
        <h1 id="chat">LET'S CHAT!</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperSecretPage);
