"use client";
import { Submission, data } from "@/data/submission";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { useState } from "react";
import Message from "./Message";

interface Items {
  groupKey: number;
  key: number;
  submission: Submission;
}

function paginate<T>(array: T[], page_size: number, page_number: number) {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

function getData(page: number) {
  return paginate(data, 10, page);
}

function getItems(nextGroupKey: number) {
  const nextItems: Items[] = [];
  const nextKey = nextGroupKey * 10;

  const data = getData(nextGroupKey);

  for (let i = 0; i < data.length; ++i) {
    nextItems.push({
      groupKey: nextGroupKey,
      key: nextKey + i,
      submission: data[i],
    });
  }

  return nextItems;
}

const Grid = ({ lang }: { lang?: string }) => {
  const [page, setPage] = useState<number>(() => 0);
  const [items, setItems] = useState(() => getItems(0));
  return (
    <MasonryInfiniteGrid
      gap={20}
      align="center"
      onRequestAppend={(e) => {
        const nextGroupKey = (+e.groupKey! || 0) + 1;
        if (page === nextGroupKey) return;
        setPage(nextGroupKey);
        setItems([...items, ...getItems(nextGroupKey)]);
      }}
    >
      {items.map((item) => (
        <Message
          data-grid-groupkey={item.groupKey}
          key={item.key}
          submission={item.submission}
          lang={lang}
        ></Message>
      ))}
    </MasonryInfiniteGrid>
  );
};

export default Grid;
