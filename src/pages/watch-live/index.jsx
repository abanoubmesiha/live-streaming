import React, { useEffect } from 'react';

export default function WatchLive() {
  useEffect(() => {
  }, []);

  return (
    <>
      <div>Watch Live</div>
      <video id="watch-live" controls autoPlay playsInline muted />
    </>
  );
}
