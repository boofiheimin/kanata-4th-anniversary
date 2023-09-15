import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

interface Props {
  videoId: string;
  timestamp?: number;
  autoPlay?: boolean;
}

const YoutubePlayer = (props: Props) => {
  const { videoId, timestamp, autoPlay = true } = props;
  const [isSeek, setIsSeek] = useState(false);

  const onReady = (event: YouTubeEvent) => {
    if (autoPlay) {
      const player = event.target;
      player.playVideo();
      if (timestamp) {
        player.seekTo(timestamp);
      }
    }
  };
  const onError = (event: YouTubeEvent) => {
    console.error("Youtube Player Error", event);
  };
  const onPlay = (event: YouTubeEvent) => {
    if (!autoPlay) {
      const player = event.target;
      if (timestamp && !isSeek) {
        player.seekTo(timestamp);
        setIsSeek(true);
      }
    }
  };

  return (
    <YouTube
      videoId={videoId}
      onReady={onReady}
      onError={onError}
      onPlay={onPlay}
    />
  );
};

export default YoutubePlayer;
