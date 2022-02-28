import React, { useEffect, useState } from 'react';
import { createPeer } from '../../utils/peer';

const connectionOwnerId = Math.random().toString().slice(3, -1);
export default function WatchLive() {
  const [dataChannelState, setDataChannelState] = useState(null);
  const [pendingComment, setPendingComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (dataChannelState) {
      dataChannelState.onmessage = (e) => {
        setComments([...comments, JSON.parse(e.data)]);
      };
    }
  }, [comments.length]);
  useEffect(async () => {
    const peer = createPeer('/consumer');
    peer.ontrack = (e) => {
      [document.getElementById('watch-live').srcObject] = e.streams;
    };
    peer.addTransceiver('audio');
    peer.addTransceiver('video', { direction: 'recvonly' });
    const dataChannel = peer.createDataChannel('channel');
    dataChannel.onopen = () => {
      setDataChannelState(dataChannel);
    };
    dataChannel.onmessage = (e) => {
      setComments([...comments, JSON.parse(e.data)]);
    };
  }, []);
  return (
    <section className="watch-live">
      <video id="watch-live" controls autoPlay playsInline muted />
      Add a comment...
      <textarea
        type="textarea"
        rows={5}
        onChange={(e) => setPendingComment(e.target.value)}
        value={pendingComment}
      />
      <button
        type="button"
        onClick={() => {
          dataChannelState?.send(JSON.stringify({
            body: pendingComment,
            timestamp: new Date(),
            id: Math.random().toString().slice(2, -1),
            connectionOwnerId,
          }));
          setPendingComment('');
        }}
      >
        Submit
      </button>
      <div className="comments">
        {comments?.length > 0 && comments.map((comment) => (
          <h6 key={comment.id}>
            {comment.body}
            {' '}
            -
            {' '}
            { comment.connectionOwnerId === connectionOwnerId ? 'You' : comment.connectionOwnerId }

          </h6>
        ))}
      </div>
    </section>
  );
}
