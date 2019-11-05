import { createReducer } from 'typesafe-actions';

import { SET_PEER, SET_SESSION } from '../actions/sessionActions';
import MyPeer from '../peerjs';

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

const session = createReducer(initialState)
  .handleType(SET_PEER, (state: Session, action: any) => ({
    ...state,
    peer: action.payload,
    peerId: action.meta,
  }))
  .handleType(SET_SESSION, (state: Session, action: any) => ({
    ...state,
    isSessionOnline: true,
    login: action.payload,
  }));

export default session;
