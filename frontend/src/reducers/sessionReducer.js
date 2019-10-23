import { SET_PEER, SET_SESSION } from '../actions/sessionActions';

const initialState = {
  peer: null,
  peerId: null,
  isSessionOnline: false,
  login: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PEER:
      return { ...state, peer: action.peer, peerId: action.peerId };
    case SET_SESSION:
      return { ...state, isSessionOnline: true, login: action.payload };
    default:
      return state;
  }
};
