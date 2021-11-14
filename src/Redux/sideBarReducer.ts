type InitialStateType = typeof initialState;

type BestFriendsType = {
  id: number,
  name: string,
}

let initialState = {
  bestFriends: [
    { id: 1, name: 'Genya' },
    { id: 2, name: 'Lesha' },
    { id: 3, name: 'Boris' },
  ] as Array<BestFriendsType>,
};

const sideBarReducer = (state = initialState, action: any) => {
  return state;
};
export default sideBarReducer;
