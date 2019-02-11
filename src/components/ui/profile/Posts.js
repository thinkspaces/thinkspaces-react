import React, { Component } from "react";
import "./ProfileCard/ProfileCard.css";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";
import withAuthorization from "../../Authentication/withAuthorization";
import AuthUserContext from "../../Authentication/AuthUserContext";

import { db } from "../../../firebase";

const MySocialView = ({ post_details, createPost, onChange }) => (
  <div>
    <h4 style={{ marginBottom: 20 }}>What have you been up to? </h4>
    <Form onSubmit={createPost}>
      <FormGroup>
        <Input value={post_details} onChange={onChange} type="textarea" />
      </FormGroup>
      <Button style={{ marginTop: 10 }} color="primary">
        Post
      </Button>
    </Form>
  </div>
);

const GuestSocialView = uid => (
  <div>no posts yet</div>
  // let posts = getProfilePosts();
  // if(get) {
  //     {posts.map((p, i) => (
  //       <Row sm key={i}>
  //         <ProfileCard
  //         date = {p.date}
  //         post_details = {p.post_details}
  //         />
  //       </Row>
  //     ))}
  // }
  // else {
  //     <div>not posts yet</div>
  // }
);

class ProfilePosts extends Component {
  state = {
    description: "",
    posts: ""
  };

  createPost = event => {
    event.preventDefault();
    const { description } = this.state;

    // var date = new Date().getDate();
    // this.setState({today: date})
    // const { history } = this.props;
    let uid = this.props.uid;
    let date = new Date();

    db.createProfilePostWithFields(description, date, uid).then(() => {
      this.setState({
        description: ""
      });
      // history.push("/");
    });
  };

  // componentDidMount = async () => {
  //   let posts = await db.getProfilePosts();
  //   this.setState({ posts });
  // };

  render() {
    const { uid, posts } = this.props;
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <div style={{ paddingLeft: 50, paddingRight: 100 }}>
              {authUser.uid === uid ? (
                <MySocialView
                  post_details={this.state.description}
                  createPost={this.createPost}
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
              ) : (
                <GuestSocialView uid={uid} posts={posts} />
              )}
            </div>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfilePosts);
