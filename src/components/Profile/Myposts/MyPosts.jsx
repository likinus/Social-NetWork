import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { TextArea } from '../../common/Preloader/FormsControls/FormsControls';

const maxLength30 = maxLengthCreator(90);

const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((post) => (
    <Post id={post.id} message={post.message} key={post.id} likesCount={post.likiesCount} />
  ));

  let addNewPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <PostReduxFrom onSubmit={addNewPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name="newPostText" component={TextArea} validate={[required, maxLength30]}></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const PostReduxFrom = reduxForm({
  form: 'profileAddPostForm',
})(PostForm);

export default MyPosts;
