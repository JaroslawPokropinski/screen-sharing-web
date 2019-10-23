import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  padding: 40px;
  border-radius: 4px;
  background-color: white;
  text-align: center;
`;

const Text = styled.div`
  padding-bottom: 20px;
`;

const Video = styled.video`
  width: 600px;
`;

class Share extends React.Component {
  constructor() {
    super();
    this.videoRef = React.createRef();
    this.mediaStream = null;
  }

  componentDidMount() {
    const { session } = this.props;

    session.peer.on('connection', (conn) => {
      conn.on('data', (id) => {
        console.log(this.mediaStream);
        session.peer.call(id, this.mediaStream);
      });

      conn.on('error', (error) => {
        toast.error(error);
      });
    });

    navigator.mediaDevices.getDisplayMedia({ video: { width: 1280, height: 720 } })
      .then((mediaStream) => {
        this.videoRef.current.srcObject = mediaStream;
        this.videoRef.current.play();
        this.mediaStream = mediaStream;
      })
      .catch((err) => {
        toast.error(err);
      })

  }

  render() {
    const { session } = this.props;
    return <Flex>
      <Container>
        <Text>You are sharing video.</Text>
        <Text>Id: {session.peer.id}</Text>
        <Video ref={this.videoRef} />
      </Container>
    </Flex>
  }
}

const mapStateToProps = (state) => ({
  session: state.session
});

const containerShare = connect(mapStateToProps)(Share);

export default containerShare;