import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Welcome extends Component {
  render() {
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1" id="secret">
          <h1 className="mb-1">WELCOME TO CHATR</h1>

          {!this.props.user && (
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
          )}
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Welcome);
