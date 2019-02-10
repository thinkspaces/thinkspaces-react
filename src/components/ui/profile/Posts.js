import React, { Component } from "react";
import "./ProfileCard/ProfileCard.css";
import { Button, FormGroup, Label, Input } from "reactstrap";

import { db } from "../../../firebase";

class ProfilePosts extends Component {
  state = {
    post_details: "What have you been up to?",
    date: ""
  };

  createProject = event => {
    event.preventDefault();
    const { post_details, date } = this.state;

    const { history } = this.props;
    const id = this.props.id;

    db.createPostWithFields({
      post_details,
      date,
      id
    }).then(() => {
      this.setState({
        post_details: "What have you been up to?",
        date: ""
      });
      history.push("/");
    });
  };

  render() {
    return (
      <div style = {{paddingLeft: 50, paddingRight: 100}}>
        <h3>What have you been up to? </h3>
        <FormGroup onSubmit={this.createPost}>
          <Input
            value={this.state.post_details}
            onClick={() => this.setState({ post_details: "" })}
            onChange={event =>
              this.setState({ post_details: event.target.value })
            }
            type="textarea"
          />
          <Button style={{ marginTop: 25}} color="primary">
            Post
          </Button>
        </FormGroup>
      </div>
    );
  }
}

export default ProfilePosts;
