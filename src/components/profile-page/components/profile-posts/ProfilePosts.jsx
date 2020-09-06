/* eslint camelcase: 0 */
import React, { useState, useEffect } from "react";
import { Button, FormGroup, Input, Form } from "reactstrap";
import PostDropdown from "../../../shared/post-dropdown";
import EditPostModal from "../../../shared/edit-post-modal";

import { db } from "../../../../firebase";

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
  <div style={{ padding: "0px 20px" }}>
    {typeof index !== "undefined" ? index > 0 && <hr /> : <hr />}
    {children}
  </div>
);

const PostHeader = ({ timestamp, onRemovePost, canEdit, onEditPost }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <p>{timestamp}</p>
    {canEdit !== false && (
      <PostDropdown onRemovePost={onRemovePost} onEditPost={onEditPost} />
    )}
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

const AuthSocialView = ({
  post_details,
  createPost,
  onChange,
  posts,
  onRemovePost,
  onEditPost,
}) => (
  <div>
    <PostInput
      post_details={post_details}
      createPost={createPost}
      onChange={onChange}
    />
    <AuthPostFeed
      posts={posts}
      onRemovePost={onRemovePost}
      onEditPost={onEditPost}
    />
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

const ProfilePosts = ({ uid, isOwner }) => {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  const [editable, setEditable] = useState(false);
  const [index, setIndex] = useState(0);
  // state = { description: '', posts: [], editable: false, index: 0 };

  useEffect(() => {
    const init = async () => {
      const _posts = await db.getPosts("users")(uid);
      setPosts(_posts);
    };
    init();
  }, [uid]);

  const createPost = async (event) => {
    event.preventDefault();
    const post = await db.createPost("users")(uid)(description);
    setDescription("");
    setPosts([...posts, post]);
    // this.setState(prevState => ({
    //   description: '',
    //   posts: [ ...prevState.posts, post ],
    // }));
  };

  const onRemovePost = async (idx) => {
    await db.removePost("users")(uid)(posts[idx].pid);
    posts.splice(idx, 1);
    setPosts(posts);
    // this.setState({ posts });
  };

  const onEditPost = async (idx) => {
    // const { editable, posts } = this.state;
    setEditable((prevState) => !prevState);
    setDescription(posts[idx].description);
    setIndex(idx);
    // this.setState({ editable: !editable, description: posts[index].description });
    // this.setState({ index });
  };

  const onSavePost = async () => {
    setEditable((prevState) => !prevState);
    // this.setState(prevState => ({ editable: !prevState.editable }));
    await db.editPost("users")(uid)(posts[index].pid)(description);
    const newPost = [...posts];
    newPost[index].description = description;
    setPosts(newPost);
    // this.setState({ posts: newPost });
  };

  return (
    <>
      {isOwner ? (
        <AuthSocialView
          post_details={description}
          createPost={createPost}
          onChange={(event) => setDescription(event.target.value)}
          posts={posts}
          onRemovePost={onRemovePost}
          onEditPost={onEditPost}
        />
      ) : (
        <GuestSocialView posts={posts} />
      )}
      <EditPostModal
        onSavePost={onSavePost}
        description={description}
        onChange={(event) => setDescription(event.target.value)}
        editable={editable}
        toggle={() => setEditable((prevState) => !prevState)}
      />
    </>
  );
};

export default ProfilePosts;
