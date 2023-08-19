"use client";
import { reverse } from "lodash";
import moment from "moment";
import { useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import DatePicker from "tailwind-datepicker-react";
import Search from "./Search";
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
  const fullData = genData();
  const virtuoso = useRef<VirtuosoHandle>(null);

  const onSearch = (searchTerm: string) => {
    const index = fullData.findIndex(({ name }) =>
      name.match(new RegExp(`${searchTerm}`))
    );
    virtuoso?.current?.scrollToIndex({
      index,
      behavior: "smooth",
    });
  };

  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    const index = fullData.findIndex(({ date }) =>
      moment(date).isSame(selectedDate, "day")
    );
    virtuoso?.current?.scrollToIndex({
      index,
      behavior: "smooth",
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
        itemContent={(index, data) => <TimelineEvent event={data} />}
      ></Virtuoso>
    </div>
  );
};

export default Timeline;
