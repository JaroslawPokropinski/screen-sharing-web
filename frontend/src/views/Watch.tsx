import * as React from 'react';
import { Params, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Peer from 'peerjs';

const Video = styled.video`
  width: 100vw;
`;


const Watch = () => {
  const { id } = useParams<Params<"id">>();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const peer: Peer = useSelector((state: any) => state.session.peer)

  React.useEffect(() => {
    if (peer && id) {
      const conn = peer.connect(id);
      conn.on('open', () => {
        if (peer) {
          conn.send(peer.id);
        }
      });

      peer &&
        peer.on('call', (call) => {
          call.answer();

          call.on('stream', (incoming: MediaStream) => {
            console.log(this);
            if (videoRef.current !== null) {
              videoRef.current.srcObject = incoming;
              if (incoming.active) {
                videoRef.current.play();
                incoming.getTracks().forEach((track) => {
                  track.addEventListener('ended', () => {
                    toast.info('Stream ended.');
                  });
                });
              } else {
                incoming.onaddtrack = () => {
                  if (videoRef.current) {
                    videoRef.current.play();
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
  }, [])

  return <div>
    <Video ref={videoRef} muted />
  </div>
}

export default Watch;
