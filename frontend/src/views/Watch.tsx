import * as React from 'react';
import { match } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Session } from '../reducers/sessionReducer';

const Video = styled.video`
  width: 100vw;
`;

type Params = {
  id: string;
};

type WatchProps = {
  match: match<Params>;
  session: Session;
};

class Watch extends React.Component<WatchProps> {
  videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: WatchProps) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { session } = this.props;
    if (session.peer) {
      const conn = session.peer.connect(id);
      conn.on('open', () => {
        if (session.peer) {
          conn.send(session.peer.id);
        }
      });

      session.peer &&
        session.peer.on('call', (call) => {
          call.answer();

          call.on('stream', (incoming: MediaStream) => {
            console.log(this);
            if (this.videoRef.current !== null) {
              this.videoRef.current.srcObject = incoming;
              if (incoming.active) {
                this.videoRef.current.play();
                incoming.getTracks().forEach((track) => {
                  track.addEventListener('ended', () => {
                    toast.info('Stream ended.');
                  });
                });
              } else {
                incoming.onaddtrack = () => {
                  if (this.videoRef.current) {
                    this.videoRef.current.play();
                  }
                };
              }
            }
            toast.info('Connected');
          });

          call.on('error', (error) => {
            toast.error(error);
          });
        });
    }
  }

  render() {
    return (
      <div>
        <Video ref={this.videoRef} muted />
      </div>
    );
  }
}

const mapStateToProps = (state: { session: Session }) => ({
  session: state.session,
});

const containerWatch = connect(mapStateToProps)(Watch);

export default containerWatch;
