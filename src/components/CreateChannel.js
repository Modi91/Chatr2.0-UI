import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreaters from "../store/actions/index";

class CreateChannel extends Component {
  state = {
    name: "",
    image_url: "",
    owner: ""
  };

  textChangeHandler = event =>
    this.setState({ [event.target.name]: event.target.value });

  submitChannel = event => {
    event.preventDefault();
    this.props.addChannel(this.state, this.props.history);
  };

  render() {
    return (
      <div id="create">
        {this.props.user && (
          <Card id="createCard" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Create a New Channel</Card.Title>
              <Form onSubmit={this.submitChannel}>
                <Form.Group controlId="formGroupText">
                  <Form.Label>Channel Name</Form.Label>
                  <Form.Control
                    name="name"
                    onChange={this.textChangeHandler}
                    type="text"
                    placeholder="Enter channel name"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>image url</Form.Label>
                  <Form.Control
                    name="image_url"
                    onChange={this.textChangeHandler}
                    type="text"
                    placeholder="image url"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "10px" }}
                    id="button"
                  >
                    ADD
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addChannel: (newChannel, history) =>
      dispatch(actionCreaters.addChannel(newChannel, history))
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    channels: state.channels.channels
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChannel);
