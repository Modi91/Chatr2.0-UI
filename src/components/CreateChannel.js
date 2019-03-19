import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreaters from "../store/actions/index";
import ChannelInterface from "./ChannelInterface";
import { Link } from "react-router-dom";

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
      <div>
        {this.props.user && (
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
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>image url</Form.Label>
                  <Form.Control
                    name="image_url"
                    onChange={this.textChangeHandler}
                    type="text"
                    placeholder="enter url"
                  />
                  <Link to="/private">
                    <Button variant="primary" type="submit">
                      ADD
                    </Button>
                  </Link>
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
    addChannel: newChannel => dispatch(actionCreaters.addChannel(newChannel))
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
