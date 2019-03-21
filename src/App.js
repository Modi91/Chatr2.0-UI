import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import ChannelInterface from "./components/ChannelInterface";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import CreateChannel from "./components/CreateChannel";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    //call the checkForExpiredToken action here
    main();
    this.props.checkForExpiredToken();
    console.log("[App.js] componentDidMount");
  }

  componentDidUpdate(prevState) {
    console.log("[App.js] prevState", prevState);
    if (prevState.user !== this.props.user) {
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          {/* messagelist */}
          <Route path="/channels/create" component={CreateChannel} />

          <Route path="/channels/:channelID" component={ChannelInterface} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />

          <Route path="/welcome" component={Welcome} />

          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
