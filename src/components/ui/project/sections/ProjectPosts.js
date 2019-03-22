/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import { Button, FormGroup, Input, Form } from 'reactstrap';
import PostDropdown from '../../dropdowns/PostDropdown';
import EditPostModal from '../../modals/EditPostModal';

import withAuthorization from '../../../Authentication/withAuthorization';
import AuthUserContext from '../../../Authentication/AuthUserContext';

import { db } from '../../../../firebase';

const PostInput = ({ createPost, post_details, onChange }) => (
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
);

const Post = ({ children, index }) => (
  <div style={{ padding: '0px 20px' }}>
    {typeof index !== 'undefined' ? index > 0 && <hr /> : <hr />}
    {children}
  </div>
);

const PostHeader = ({ timestamp, onRemovePost, canEdit, onEditPost, onSavePost }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <p>{timestamp}</p>
    {canEdit !== false && <PostDropdown onRemovePost={onRemovePost} onEditPost={onEditPost} />}
  </div>
);

const PostBody = ({ description }) => (
  <div>
    <h5>{description}</h5>
  </div>
);

const AuthPostFeed = ({ posts, onRemovePost, onEditPost }) => (
  <div style={{ marginTop: 20 }}>
    {posts
      .slice(0)
      .reverse()
      .map((post, i) => (
        <Post key={i}>
          <PostHeader
            timestamp={post.timestamp}
            onRemovePost={() => onRemovePost(posts.length - (i + 1))}
            onEditPost={() => onEditPost(posts.length - (i + 1))}
          />
          <PostBody description={post.description} />
        </Post>
      ))}
  </div>
);

const AuthSocialView = ({ post_details,
  createPost,
  onChange,
  posts,
  onRemovePost,
  onEditPost }) => (
    <div>
      <PostInput post_details={post_details} createPost={createPost} onChange={onChange} />
      <AuthPostFeed posts={posts} onRemovePost={onRemovePost} onEditPost={onEditPost} />
    </div>
);

const GuestSocialView = ({ posts }) => (
  <div>
    {posts.length !== 0 ? (
      <div>
        {posts
          .slice(0)
          .reverse()
          .map((post, i) => (
            <Post key={i} index={i}>
              <PostHeader timestamp={post.timestamp} canEdit={false} />
              <PostBody description={post.description} />
            </Post>
          ))}
      </div>
    ) : (
      <div>no posts yet</div>
    )}
  </div>
);

class ProfilePosts extends Component {
  state = { description: '', posts: [], editable: false, index: 0 };

  componentDidMount = async () => {
    const { projectId } = this.props;
    const posts = await db.getProjectPosts(projectId);
    this.setState({ posts });
  };

  createPost = async (event) => {
    event.preventDefault();

    const { description } = this.state;
    const { uid } = this.props;
    let date = new Date();

    const docId = await db.createProjectPostWithFields(description, date, uid);
    date = `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() }`;
    this.setState(prevState => ({ description: '',
      posts: [ ...prevState.posts, { description, timestamp: date, pid: docId } ] }));
  };

  onRemovePost = async (index) => {
    const { posts } = this.state;
    const { projectId } = this.props;
    await db.removeProjectPost(projectId, posts[index].pid);
    posts.splice(index, 1);
    this.setState({ posts });
  };

  onEditPost = async (index) => {
    const { editable, posts } = this.state;
    this.setState({ editable: !editable, description: posts[index].description });
    this.setState({ index });
  };

  onSavePost = async () => {
    const { editable, posts, description, index } = this.state;
    console.log(description);
    console.log(index);
    this.setState({ editable: !editable });
    const { projectId } = this.props;
    await db.editProjectPost(projectId, posts[index].pid, description);
    const newPost = [ ...posts ];
    newPost[index].description = description;
    this.setState({ posts: newPost });
  };

  render() {
    const { isOwner, projectId } = this.props;
    const { posts, description, editable, index } = this.state;
    console.log(projectId);
    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <SizeMe>
              {({ size }) => (
                <div
                  style={{ paddingLeft: size.width < 720 ? 0 : 50,
                    paddingRight: size.width < 720 ? 0 : 100 }}
                >
                  {editable ? (
                    <EditPostModal
                      post={posts[index].pid}
                      onSavePost={this.onSavePost}
                      description={description}
                      onChange={event => this.setState({ description: event.target.value })}
                      editable={editable}
                      toggle={event => this.setState({ editable: !editable })}
                    />
                  ) : (
                    <div>
                      {isOwner ? (
                        <AuthSocialView
                          post_details={description}
                          createPost={this.createPost}
                          onChange={event => this.setState({ description: event.target.value })}
                          posts={posts}
                          onRemovePost={this.onRemovePost}
                          onEditPost={this.onEditPost}
                        />
                      ) : (
                        <GuestSocialView posts={posts} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </SizeMe>
          )}
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(ProfilePosts);
