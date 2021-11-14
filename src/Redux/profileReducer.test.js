import profileReducer, { actions } from './profileReducer';

let state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likiesCount: 12 },
    { id: 2, message: 'It is my first post :)', likiesCount: 19 },
  ],
  profile: null,
  status: '',
};

it('length of posts should be inc', () => {
  let action = actions.addPostActionCreator('it-kama');

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  let action = actions.addPostActionCreator('it-kama');

  let newState = profileReducer(state, action);

  expect(newState.posts[2].message).toBe('it-kama');
});

it('after delete length of messages should be decrement', () => {
  let action = actions.deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(1);
});

it('after delete length of messages shouldnt be decrement if id is incorrect', () => {
  let action = actions.deletePost(1000);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
});

describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2