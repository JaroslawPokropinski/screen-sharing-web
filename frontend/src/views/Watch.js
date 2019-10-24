import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const Video = styled.video`
  width: 100vw;
`;

class Watch extends React.Component {
  constructor() {
    super();
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { session } = this.props;
    const conn = session.peer.connect(id);
    conn.on('open', function () {
      conn.send(session.peer.id);
    });

    session.peer.on('call', (call) => {
      call.answer();

      call.on('stream', (incoming) => {
        if (this.videoRef.current !== null) {
          this.videoRef.current.srcObject = incoming;
          if (incoming.active) {
            this.videoRef.current.play();
          } else {
            incoming.onaddtrack = () => {
              this.videoRef.current.play();
            }
          }

        }
        toast.info('Connected');
      });

      call.on('error', (error) => {
        toast.error(error);
      });
    });
  }

  render() {
    return <div>
      <Video ref={this.videoRef} />
    </div>
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

const containerWatch = connect(mapStateToProps)(Watch);

export default containerWatch;