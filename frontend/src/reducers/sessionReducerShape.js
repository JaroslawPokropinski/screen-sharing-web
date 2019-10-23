import PropTypes from 'prop-types';
import Peer from 'peerjs';

const shape = {
  peer: PropTypes.instanceOf(Peer),
  peerId: PropTypes.string,
  isSessionOnline: PropTypes.bool,
  login: PropTypes.string,
};

export default shape;
