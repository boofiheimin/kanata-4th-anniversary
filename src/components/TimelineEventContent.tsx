import Image from "next/image";
import Link from "next/link";
import { Tweet } from "react-tweet";
import { EventContent } from "./Timeline";
import YoutubePlayer from "./YoutubePlayer";

interface Props extends EventContent {
  autoPlay?: boolean;
}

const TimelineEventContent = (props: Props) => {
  const { youtubeInfo, thumbnail, link, tweetId, autoPlay } = props;
  let contentBody;
  if (youtubeInfo) {
    contentBody = (
      <YoutubePlayer
        videoId={youtubeInfo.videoId}
        timestamp={youtubeInfo.timestamp}
        autoPlay={autoPlay}
      ></YoutubePlayer>
    );
  } else if (thumbnail) {
    contentBody = (
      <div style={{ width: 640 }}>
        <Link
          href={link as string}
          rel="noopener noreferrer"
          target="_blank"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Image src={thumbnail} width={640} height={480} alt=""></Image>
        </Link>
      </div>
    );
  } else if (tweetId) {
    contentBody = <Tweet id={tweetId}></Tweet>;
  }

  return <div className="p-3">{contentBody}</div>;
};

export default TimelineEventContent;
