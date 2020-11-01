const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageText;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    }

    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageText) => ({ type: SEND_MESSAGE, newMessageText });

export default messagesReducer;
