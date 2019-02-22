import React, { Component } from 'react';
import '../ProfileCard/ProfileCard.css';
import { Button,
  FormGroup,
  Input,
  Form,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText } from 'reactstrap';
import withAuthorization from '../../../Authentication/withAuthorization';
import AuthUserContext from '../../../Authentication/AuthUserContext';

import { db } from '../../../../firebase';

const MySocialView = ({ post_details, createPost, onChange, posts }) => (
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
    <div style={{ marginTop: 50 }}>
      <ListGroup flush>
        {posts.map((post, i) => (
          <ListGroupItem key={i}>
            <ListGroupItemHeading>{post.description}</ListGroupItemHeading>
            <ListGroupItemText>{post.timestamp}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  </div>
);

const GuestSocialView = ({ posts }) => (
  <div>
    {posts.length !== 0 ? (
      <ListGroup flush>
        {posts.map((post, i) => (
          <ListGroupItem key={i}>
            <ListGroupItemHeading>{post.description}</ListGroupItemHeading>
            <ListGroupItemText>{post.timestamp}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    ) : (
      <div>no posts yet</div>
    )}
  </div>
);

class ProfilePosts extends Component {
  state = { description: '', posts: [] };

  componentDidMount = async () => {
    const { match } = this.props;
    const posts = await db.getProfilePosts(match.params.id);
    this.setState({ posts });
  };

  createPost = (event) => {
    event.preventDefault();

    const { description } = this.state;
    const { uid } = this.props;
    const date = new Date();

    db.createProfilePostWithFields(description, date, uid).then(() => {
      this.setState(prevState => ({ description: '',
        posts: [ ...prevState.posts, { description } ] }));
    });
  };

  render() {
    const { uid } = this.props;
    const { posts, description } = this.state;
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <div style={{ paddingLeft: 50, paddingRight: 100 }}>
              {authUser.uid === uid ? (
                <MySocialView
                  post_details={description}
                  createPost={this.createPost}
                  onChange={event => this.setState({ description: event.target.value })}
                  posts={posts}
                />
              ) : (
                <GuestSocialView posts={posts} />
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
