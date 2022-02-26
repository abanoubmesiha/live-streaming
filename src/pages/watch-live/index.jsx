import React, { useEffect } from 'react';
import { createPeer } from '../../utils/peer';

export default function WatchLive() {
  useEffect(() => {
    const peer = createPeer('/consumer');
    peer.ontrack = (e) => {
      [document.getElementById('watch-live').srcObject] = e.streams;
    };
    peer.addTransceiver('video', { direction: 'recvonly' });
  }, []);
  return (
    <section className="watch-live">
      <video id="watch-live" controls autoPlay playsInline muted />
    </section>
  );
}
