export const SET_PEER = 'set peer';
export const SET_SESSION = 'set session';

export const setPeer = (peer, peerId) => ({
  type: SET_PEER,
  peer,
  peerId,
});

export const setSession = (login) => ({
  type: SET_SESSION,
  payload: login
});
