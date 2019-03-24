import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "../store/actions";
import { connect } from "react-redux";
import SuperSecretPage from "./SuperSecretPage";
class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const type = this.props.match.url.substring(1);
    if (type === "login") {
      this.props.login(this.state, this.props.history);
    } else if (type === "signup") {
      this.props.signup(this.state, this.props.history);
    }

    console.log("[RegistrationForm.js]", type);
  };

  componentDidMount() {
    this.props.checkForExpiredToken();
  }
  render() {
    const type = this.props.match.url.substring(1);
    return (
      <div className="card col-6 mx-auto p-0 mt-5" id="createCard">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
            </div>
            <input
              className="btn btn-primary"
              id="button"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
            id="button"
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
          <div className="row">
            {this.props.user ? <SuperSecretPage /> : <div />}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
  login: (userData, history) =>
    dispatch(actionCreators.login(userData, history)),
  signup: (userData, history) =>
    dispatch(actionCreators.signup(userData, history))
});

export default connect(
  null,
  mapDispatchToProps
)(RegistationForm);
