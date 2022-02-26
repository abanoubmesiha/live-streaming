import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createPeer } from '../../utils/peer';

export default function WatchLive() {
  const [dataChannelState, setDataChannelState] = useState({});

  useEffect(async () => {
    const peer = createPeer('/consumer');
    peer.ontrack = (e) => {
      [document.getElementById('watch-live').srcObject] = e.streams;
    };
    peer.addTransceiver('video', { direction: 'recvonly' });
    // *
    const localConnection = new RTCPeerConnection();
    const dataChannel = localConnection.createDataChannel('channel');
    dataChannel.onopen = () => {
      console.log('Connection Opened');
      setDataChannelState(dataChannel);
    };
    dataChannel.onmessage = (e) => console.log(`Just got a message${e.data}`);
    const offer = await localConnection.createOffer();
    await localConnection.setLocalDescription(offer);

    const { data } = await axios.post('http://localhost:8000/comments', { offer: localConnection.localDescription });
    const answerDesc = new RTCSessionDescription(data.answer);
    localConnection.setRemoteDescription(answerDesc).catch((e) => console.log(e));
  }, []);
  return (
    <section className="watch-live">
      <button
        type="button"
        onClick={() => {
          dataChannelState.send('Hi from button');
        }}
      >
        Send a message
      </button>
      <video id="watch-live" controls autoPlay playsInline muted />
    </section>
  );
}
