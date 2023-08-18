"use client";
import classNames from "classnames";
import { MouseEvent, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Reveal from "./Reveal";
import { Event } from "./Timeline";

interface TimelineEvent {
  event: Event;
}

const TimelineEvent = (props: TimelineEvent) => {
  const [open, setOpen] = useState(false);
  const {
    event: { name, type, content, date },
  } = props;
  const logo = type === "A" ? "💫" : "🗿";

  const onOpen = (e: MouseEvent<HTMLElement>) => {
    if (content) {
      setOpen((v) => !v);
    }
  };

  return (
    <Reveal>
      <div className="p-2">
        <div
          className={classNames(
            "p-4 shadow-md border rounded",
            content ? "cursor-pointer" : ""
          )}
          onClick={onOpen}
        >
          <div className="flex items-center">
            <div className="flex flex-1 items-center">
              <div className="mr-4">{logo}</div>
              <div className="mr-4">{name}</div>
              <div>{`[${date.toISOString()}]`}</div>
            </div>
            {content && (open ? <FaChevronUp /> : <FaChevronDown />)}
          </div>
          {open && <div className="p-3">{content?.explanation}</div>}
        </div>
      </div>
    </Reveal>
  );
};

export default TimelineEvent;
