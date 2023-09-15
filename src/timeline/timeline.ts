export enum TimelineType {
  TwitterEvent = "Twitter Event",
  FirstTime = "First Time",
  SeriesStart = "Series Start",
  Trivia = "Trivia",
  Milestone = "Milestone",
  Cover = "Cover",
  HololiveEvent = "Hololive Event",
  Highlight = "Highlight",
  Birthday = "Birthday",
  ThreeDLive = "3D Live",
  Anniversary = "Anniversary",
  OutfitReveal = "Outfit Reveal",
  OriginalSong = "Original Song",
  OutsideEvent = "Outside Event",
}

export const getIconSrc = (type: TimelineType) => {
  let fileName = "";
  switch (type) {
    case TimelineType.Anniversary:
      fileName = "anniversary";
      break;
    case TimelineType.TwitterEvent:
      fileName = "tweet";
      break;
    case TimelineType.FirstTime:
      fileName = "first";
      break;
    case TimelineType.SeriesStart:
      fileName = "seriesstart";
      break;
    case TimelineType.Trivia:
      fileName = "trivia";
      break;
    case TimelineType.Milestone:
      fileName = "milestone";
      break;
    case TimelineType.Cover:
      fileName = "cover";
      break;
    case TimelineType.HololiveEvent:
      fileName = "hololiveevent";
      break;
    case TimelineType.Highlight:
      fileName = "highlight";
      break;
    case TimelineType.Birthday:
      fileName = "birthday";
      break;
    case TimelineType.ThreeDLive:
      fileName = "live";
      break;
    case TimelineType.OutfitReveal:
      fileName = "outfit";
      break;
    case TimelineType.OriginalSong:
      fileName = "original";
      break;
    case TimelineType.OutsideEvent:
      fileName = "outsideevent";
      break;
  }

  return `/icons/${fileName}.webp`;
};

export function extractVideoIdAndTimestamp(
  link: string
): { videoId: string; timestamp?: number } | null {
  const videoIdRegex =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?feature=player_embedded&list=.*?)|youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?feature=player_embedded&list=.*?))(?<videoId>[\w-]+)(?:[?&]t=(?<timestamp>\d+)s?)?/;

  const match = link.match(videoIdRegex);

  if (match && match.groups) {
    const { videoId, timestamp } = match.groups;
    if (timestamp) {
      return { videoId, timestamp: parseInt(timestamp, 10) };
    } else {
      return { videoId };
    }
  } else {
    return null;
  }
}
