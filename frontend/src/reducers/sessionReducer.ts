import MyPeer from '../peerjs';
import { SET_PEER, SET_SESSION } from '../actions/sessionActions';
import { SessionActionTypes } from '../actions/sessionActions';

export type Session = Readonly<{
  peer: MyPeer | null;
  peerId: string | null;
  isSessionOnline: boolean;
  login: string | null;
}>;

const initialState: Session = {
  peer: null,
  peerId: null,
  isSessionOnline: false,
  login: null,
};

const session = (state = initialState, action: SessionActionTypes) => {
  switch (action.type) {
    case SET_PEER:
      return {
        ...state,
        peer: action.payload.peer,
        peerId: action.payload.peerId,
      };
    case SET_SESSION:
      return {
        ...state,
        isSessionOnline: true,
        login: action.payload,
      };
    default:
      return state;
  }
};
export default session;
