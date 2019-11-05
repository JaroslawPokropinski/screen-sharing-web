import { action } from 'typesafe-actions';
import MyPeer from '../peerjs';

export const SET_PEER = 'set peer';
export const SET_SESSION = 'set session';

// export const setPeer = (peer, peerId) => ({
//   type: SET_PEER,
//   peer,
//   peerId,
// });

export const setPeer = (peer: MyPeer, peerId: string) =>
  action(SET_PEER, peer, peerId);

export const setSession = (login: string) => action(SET_SESSION, login);

// export const setSession = (login) => ({
//   type: SET_SESSION,
//   payload: login
// });
