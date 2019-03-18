import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreaters from "../store/actions/index";

class CreateChannel extends Component {
  state = {
    name: "",
    image_url: "",
    owner: ""
    // owner: this.props.user.username
  };

  textChangeHandler = event =>
    this.setState({ [event.target.name]: event.target.value });

  submitChannel = event => {
    event.preventDefault();
    this.props.addChannel(this.state);
  };

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://s3-eu-west-1.amazonaws.com/userlike-cdn-blog/benefits-of-live-chat/chat-benefits.png"
        />
        <Card.Body>
          <Card.Title>Create New Channel</Card.Title>
          <Form onSubmit={this.submitChannel}>
            <Form.Group controlId="formGroupText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={this.textChangeHandler}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group controlId="formGroupText">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                name="owner"
                value={this.props.user.username}
                disabled
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Button variant="primary" type="submit">
                ADD
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addChannel: newChannel => dispatch(actionCreaters.addChannel(newChannel))
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
)(CreateChannel);
