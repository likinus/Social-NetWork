import { PropertiesTypes } from './reduxStore';

type DialogType = {
  id: number,
  name: string,
}

type MessageType = {
  id: number, 
  message: string,
}

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Yo' },
    { id: 4, message: 'Yo' },
    { id: 5, message: 'Yo' },
  ] as Array<MessageType>,
  dialogs: [
    { id: 1, name: 'Igor' },
    { id: 2, name: 'Nastya' },
    { id: 3, name: 'Lesha' },
    { id: 4, name: 'Valera' },
    { id: 5, name: 'Iliya' },
  ]as Array<DialogType>,
};

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>;

export type InitialStateType = typeof initialState;

const messagesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
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

export const actions = {
  sendMessageCreator: (newMessageText: string) => ({ type: 'SEND_MESSAGE', newMessageText } as const)
}

export default messagesReducer;
