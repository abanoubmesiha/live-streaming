const axios = require('axios');

async function handleNegotiationNeededEvent(peer, targetRoute) {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
    sdp: peer.localDescription,
  };

  const { data } = await axios.post(`http://localhost:8000${targetRoute}`, payload);
  const desc = new RTCSessionDescription(data.sdp);
  peer.setRemoteDescription(desc).catch((e) => console.log(e));
}

const createPeer = (targetRoute) => {
  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.stunprotocol.org',
      },
    ],
  });
  peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer, targetRoute);

  return peer;
};

module.exports = {
  createPeer,
};
