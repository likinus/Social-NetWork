import profileReducer from './profileReducer';
import messagesReducer from './messageReducer';
import sideBarReducer from './sideBarReducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likiesCount: 12 },
        { id: 2, message: 'It is my first post :)', likiesCount: 19 },
      ],
      newPostText: '',
    },
    messagesPage: {
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
      ],
      dialogs: [
        { id: 1, name: 'Igor' },
        { id: 2, name: 'Nastya' },
        { id: 3, name: 'Lesha' },
        { id: 4, name: 'Valera' },
        { id: 5, name: 'Iliya' },
      ],

      newMessageText: '',
    },
    sideBar: {
      bestFriends: [
        { id: 1, name: 'Genya' },
        { id: 2, name: 'Lesha' },
        { id: 3, name: 'Boris' },
      ],
    },
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('state changed');
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
    this._state.sideBar = sideBarReducer(this._state.sideBar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
