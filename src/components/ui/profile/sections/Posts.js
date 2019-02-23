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
import { Icon } from 'react-icons-kit';
import { threeHorizontal } from 'react-icons-kit/entypo/threeHorizontal';
import withAuthorization from '../../../Authentication/withAuthorization';
import AuthUserContext from '../../../Authentication/AuthUserContext';

import { db } from '../../../../firebase';

const MySocialView = ({ post_details, createPost, onChange, posts }) => (
  <div>
    <Form onSubmit={createPost}>
      <FormGroup>
        <Input
          placeholder="What have you been up to?"
          value={post_details}
          onChange={onChange}
          type="textarea"
        />
      </FormGroup>
      <Button style={{ marginTop: 10 }} color="primary">
        Post
      </Button>
    </Form>
    <div style={{ marginTop: 20, marginLeft: 90, marginRight: 90 }}>
      {posts
        .slice(0)
        .reverse()
        .map((post, i) => (
          <div key={i}>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>{post.timestamp}</div>
            </div>
            <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 30 }}>
              <h4>{post.description}</h4>
            </div>
          </div>
        ))}
    </div>
  </div>
);

const GuestSocialView = ({ posts }) => (
  <div>
    {posts.length !== 0 ? (
      <ListGroup flush>
        {posts
          .slice(0)
          .reverse()
          .map((post, i) => (
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
    let date = new Date();

    db.createProfilePostWithFields(description, date, uid).then(() => {
      date = `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;
      this.setState(prevState => ({ description: '',
        posts: [ ...prevState.posts, { description, timestamp: date } ] }));
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
