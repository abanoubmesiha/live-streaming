import React, { useEffect } from 'react';

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
      <div>Go Live</div>
      <video id="broadcast" controls autoPlay playsInline muted />
    </>
  );
}
