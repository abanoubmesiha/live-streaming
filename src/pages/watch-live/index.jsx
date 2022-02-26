import React from 'react';
import { createPeer } from '../../utils/peer';

export default function WatchLive() {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          const peer = createPeer('/consumer');
          peer.ontrack = (e) => {
            [document.getElementById('watch-live').srcObject] = e.streams;
          };
          peer.addTransceiver('video', { direction: 'recvonly' });
        }}
      >
        Watch Live
      </button>
      <video id="watch-live" controls autoPlay playsInline muted />
    </>
  );
}
