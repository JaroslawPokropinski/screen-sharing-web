import * as React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Session } from '../reducers/sessionReducer';
import TextField from '../components/CopyTextField';
import Peer from 'peerjs';

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

const Share = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const peer: Peer = useSelector((state: any) => state.session.peer)
  const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);

  const id = peer ? peer.id : 'Failed to fetch id';
  const url = window.location.href.replace('/share', '/watch');

  React.useEffect(() => {
    getDisplayMedia({ video: { width: 1280, height: 720 } })
      .then((_mediaStream: MediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = _mediaStream;
          videoRef.current.play();
          setMediaStream(_mediaStream)
        } else {
          toast.error('No video tag reference!');
        }
      })
      .catch(() => {
        toast.error('Failed to get video recording');
      });

  }, [])

  React.useEffect(() => {
    if (peer) {
      peer.on('connection', (conn) => {
        conn.on('data', (id) => {
          if (mediaStream !== null && peer) {
            peer.call(id, mediaStream);
          }
        });

        conn.on('error', () => {
          console.error('Connection with peer was broken');
        });
      });
    }
  }, [mediaStream])

  return <Flex>
    <Container>
      <Text>You are sharing video.</Text>
      <TextField tag='Id' value={id} copy={true} />
      <TextField
        tag='Url'
        value={`${url}/${id}`}
        copy={true}
        onCopy={() => toast('Copied to clipboard.')}
      />
      <Video ref={videoRef} />
    </Container>
  </Flex>
}

export default Share;
