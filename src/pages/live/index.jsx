import React, { useEffect } from 'react';

export default function Live() {
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
          document.querySelector('#live_video').srcObject = mediaStream;
          const mediaRecorder = new MediaRecorder(mediaStream);
          mediaRecorder.start(2000);
          mediaRecorder.ondataavailable = (e) => {
            console.log(e.data);
          };
        });
    }
  }, []);

  return (
    <>
      <div>Live</div>
      <video id="live_video" controls autoPlay playsInline muted />
    </>
  );
}
