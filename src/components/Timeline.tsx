"use client";
import { reverse } from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import TimelineEvent from "./TimelineEvent";

export interface EventContent {
  explanation: string;
}

export interface Event {
  name: string;
  date: Date;
  type: string;
  content?: EventContent;
}

const genData = (): Event[] => {
  const result: Event[] = [];
  const now = new Date();
  for (let i = 400; i >= 1; i--) {
    result.push({
      name: `Event-${i}`,
      date: moment(now).subtract(i, "day").toDate(),
      type: i % 2 === 0 ? "A" : "B",
      ...(i % 2 === 0 && { content: { explanation: "Lorem ipsum" } }),
    });
  }

  return reverse(result);
};

const Timeline = () => {
  const [data, setData] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const fullData = genData();
  const loadMore = useCallback(() => {
    if (data.length < 400) {
      setData((data) => [
        ...data,
        ...fullData.slice(page * 100, page * 100 + 100),
      ]);
      setPage((page) => page + 1);
    }
  }, [setPage, setData, page, data.length, fullData]);
  useEffect(() => {
    loadMore();
  }, []);

  return (
    <Virtuoso
      style={{ height: "100%", width: "100%" }}
      data={data}
      overscan={100}
      endReached={loadMore}
      itemContent={(index, data) => <TimelineEvent event={data} />}
    ></Virtuoso>
  );
};

export default Timeline;
