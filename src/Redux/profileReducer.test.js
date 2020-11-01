import profileReducer, { addPostActionCreator, deletePost } from './profileReducer';

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likiesCount: 12 },
    { id: 2, message: 'It is my first post :)', likiesCount: 19 },
  ],
  profile: null,
  status: '',
};

it('length of posts should be inc', () => {
  let action = addPostActionCreator('it-kama');

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  let action = addPostActionCreator('it-kama');

  let newState = profileReducer(state, action);

  expect(newState.posts[2].message).toBe('it-kama');
});

it('after delete length of messages should be decrement', () => {
  let action = deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(1);
});

it('after delete length of messages shouldnt be decrement if id is incorrect', () => {
  let action = deletePost(1000);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
});
