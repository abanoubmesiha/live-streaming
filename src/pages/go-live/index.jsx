import React, { useEffect } from 'react';
import { createPeer } from '../../utils/peer';

export default function GoLive() {
  const constraints = {
    audio: true,
    video: {
      width: { min: 640, ideal: 640, max: 640 },
      height: { min: 480, ideal: 480, max: 480 },
      framerate: 60,
    },
  };

  const isMediaAvaiable = !!navigator.mediaDevices.getUserMedia;

  useEffect(() => {
    if (isMediaAvaiable) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStream) => {
          document.querySelector('#broadcast').srcObject = mediaStream;
          const peer = createPeer('/broadcast');
          mediaStream.getTracks().forEach((track) => peer.addTrack(track, mediaStream));
        });
    }
  }, []);

  return (
    <>
      <div>Go Live</div>
      <video id="broadcast" controls autoPlay playsInline muted />
    </>
  );
}
