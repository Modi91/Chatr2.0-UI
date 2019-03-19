import React, { Component } from "react";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";
class SuperSecretPage extends Component {
  render() {
    return (
      <div>
        <h1>this page has all the secrets</h1>
        <p>now that you're logged in you can see this page</p>
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
