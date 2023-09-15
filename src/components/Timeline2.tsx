"use client";
import { useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import DatePicker from "tailwind-datepicker-react";

import Search from "./Search";

import { TimelineType } from "@/timeline/timeline";
import { findClosestDate } from "@/utils/util";
import { timeline } from "../timeline/timeline_data";
import { Event } from "./Timeline";
import TimelineEvent2 from "./TimelineEvent2";

const genData = (): Event[] => {
  return timeline.map((e) => {
    return {
      ...e,
      date: new Date(e.date),
      type: e.type as TimelineType,
    };
  });
};

const Timeline2 = () => {
  const fullData = genData();
  const dateArr = fullData.map(({ date }) => date);
  const virtuoso = useRef<VirtuosoHandle>(null);

  const onSearch = (searchTerm: string) => {
    const index = fullData.findIndex(({ name }) =>
      name.match(new RegExp(`${searchTerm}`))
    );
    virtuoso?.current?.scrollToIndex({
      index,
    });
  };

  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    const index = findClosestDate(dateArr, selectedDate);
    virtuoso?.current?.scrollToIndex({
      index: index || 0,
    });
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">Go to:</div>
          <DatePicker
            classNames="w-72"
            show={show}
            setShow={handleClose}
            onChange={handleChange}
          ></DatePicker>
        </div>
        <Search onSearch={onSearch}></Search>
      </div>
      <Virtuoso
        ref={virtuoso}
        style={{ height: "100%", width: "100%", flexGrow: 1 }}
        data={fullData}
        itemContent={(index, data) => <TimelineEvent2 event={data} />}
      ></Virtuoso>
    </div>
  );
};

export default Timeline2;
