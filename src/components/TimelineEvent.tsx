"use client";
import { getIconSrc } from "@/timeline/timeline";
import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Reveal from "./Reveal";
import { Event } from "./Timeline";
import TimelineEventContent from "./TimelineEventContent";

interface TimelineEvent {
  event: Event;
}

const TimelineEvent = (props: TimelineEvent) => {
  const [open, setOpen] = useState(false);
  const {
    event: { name, type, content, date },
  } = props;

  const clickable = content;

  const onOpen = (e: MouseEvent<HTMLElement>) => {
    if (clickable) {
      setOpen((v) => !v);
    }
  };

  return (
    <Reveal>
      <div className="p-2">
        <div
          className={classNames(
            "timelineEvent",
            clickable ? "cursor-pointer" : ""
          )}
          onClick={onOpen}
        >
          <div className="flex items-center">
            <Image
              src={getIconSrc(type)}
              width={40}
              height={40}
              alt="icon"
            ></Image>
            <div className="flex items-center p-2 flex-1">
              <div className="flex items-center flex-1">
                <div className="mr-4 font-bold text-yellow-300">
                  {moment(date).format("YYYY.MM.DD")}
                </div>
                <div className="mr-4 text-white">{name}</div>
              </div>
              {clickable && (open ? <FaChevronUp /> : <FaChevronDown />)}
            </div>
          </div>
          {open && (
            <div className="p-3">
              <TimelineEventContent {...content}></TimelineEventContent>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default TimelineEvent;
