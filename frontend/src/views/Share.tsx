import * as React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Session } from '../reducers/sessionReducer';
import { RouteComponentProps } from 'react-router';
import TextField from '../components/CopyTextField';

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

const getDisplayMedia = (options: any): Promise<MediaStream> => {
  const md: any = navigator.mediaDevices;
  return md.getDisplayMedia(options);
};

interface ShareProps extends RouteComponentProps {
  session: Session;
}

class Share extends React.Component<ShareProps> {
  videoRef: React.RefObject<HTMLVideoElement>;
  mediaStream: MediaStream | null;

  constructor(props: ShareProps) {
    super(props);
    this.videoRef = React.createRef();
    this.mediaStream = null;
  }

  componentDidMount() {
    const { session } = this.props;
    if (session.peer) {
      session.peer.on('connection', (conn) => {
        conn.on('data', (id) => {
          if (this.mediaStream !== null && session.peer) {
            session.peer.call(id, this.mediaStream);
          }
        });

        conn.on('error', () => {
          console.error('Connection with peer was broken');
        });
      });

      getDisplayMedia({ video: { width: 1280, height: 720 } })
        .then((mediaStream: MediaStream) => {
          if (this.videoRef.current) {
            this.videoRef.current.srcObject = mediaStream;
            this.videoRef.current.play();
            this.mediaStream = mediaStream;
          } else {
            toast.error('No video tag reference!');
          }
        })
        .catch(() => {
          toast.error('Failed to get video recording');
        });
    }
  }

  render() {
    const { session } = this.props;
    const id = session.peer ? session.peer.id : 'Failed to fetch id';
    const url = window.location.href.replace('/share', '/watch');
    return (
      <Flex>
        <Container>
          <Text>You are sharing video.</Text>
          <TextField tag='Id' value={id} copy={true} />
          <TextField
            tag='Url'
            value={`${url}/${id}`}
            copy={true}
            onCopy={() => toast('Copied to clipboard.')}
          />
          <Video ref={this.videoRef} />
        </Container>
      </Flex>
    );
  }
}

const mapStateToProps = (state: { session: Session }) => ({
  session: state.session,
});

const containerShare = connect(mapStateToProps)(Share);

export default containerShare;
