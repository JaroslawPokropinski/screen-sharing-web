import Peer from 'peerjs';

class MyPeer extends Peer {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      super({
        host: 'versity-project.herokuapp.com',
        path: '/myapp',
        port: 443,
        secure: true,
        key: 'peerjs',
        debug: 0
      });
    } else {
      super({
        host: '127.0.0.1',
        path: '/myapp',
        port: 9000,
        secure: false,
        key: 'peerjs',
        debug: 3
      });
    }
  }
}

export default MyPeer;
