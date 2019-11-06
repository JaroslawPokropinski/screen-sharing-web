import MyPeer from '../peerjs';

export const SET_PEER = 'set peer';
export const setPeer = (peer: MyPeer, peerId: string) => ({
  type: SET_PEER as typeof SET_PEER,
  payload: { peer, peerId },
});

export const SET_SESSION = 'set session';
export const setSession = (login: string) => ({
  type: SET_SESSION as typeof SET_SESSION,
  payload: login,
});

type SessionActions = typeof setPeer | typeof setSession;

export type SessionActionTypes = ReturnType<SessionActions>;
