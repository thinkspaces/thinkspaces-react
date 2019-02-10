import React, { Component } from "react";
import "./ProfileCard/ProfileCard.css";
import { Button, FormGroup, Label, Input } from "reactstrap";
import withAuthorization from "../../Authentication/withAuthorization";
import AuthUserContext from "../../Authentication/AuthUserContext";

import { db } from "../../../firebase";

const MySocialView = ({ post_details, createPost}) => (
    <div>
        <h4 style={{ marginBottom: 20}}>What have you been up to? </h4>
        <FormGroup onSubmit={createPost}>
          <Input
            value={post_details}
            onClick={() => this.setState({ post_details: "" })}
            onChange={event =>
              this.setState({ post_details: event.target.value })
            }
            type="textarea"
          />
          <Button style={{ marginTop: 10}} color="primary">
            Post
          </Button>
        </FormGroup>
      </div>
);

const GuestSocialView = () => (
    <div>not mind</div>
);

class ProfilePosts extends Component {
  state = {
    post_details: "",
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
        post_details: "",
        date: ""
      });
      history.push("/");
    });
  };

  render() {
      const { uid } = this.props;
    return (
        <div>
        <AuthUserContext.Consumer>
        {authUser =>
            <div style = {{paddingLeft: 50, paddingRight: 100}}>
            {authUser.uid === uid ? (
                <MySocialView post_details={this.state.post_details} createPost={this.createPost} />
            ) : (
             <GuestSocialView />

          )}
          </div>
        }
      </AuthUserContext.Consumer>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfilePosts);
