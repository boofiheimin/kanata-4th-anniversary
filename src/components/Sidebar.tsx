"use client";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { MouseEvent, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const isCurrent = (segment: string, liveSegment: string | null) =>
  `/${liveSegment}` === segment;

const Sidebar = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const segment = useSelectedLayoutSegment();
  const sidebarOptions = [
    { name: "Home", href: "/", current: !segment },
    {
      name: "Timeline",
      href: "/timeline",
      current: isCurrent("/timeline", segment),
    },
    {
      name: "Discography",
      href: "/discography",
      current: isCurrent("/discography", segment),
    },
  ];

  const onHamburgerClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={classNames(
          isOpen ? "inset-y-0 w-72" : "w-0",
          "hidden lg:flex flex-col lg:fixed ",
          "transition-all ease-in-out duration-150"
        )}
      >
        <div
          className={classNames(
            "flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r-2",
            isOpen ? "px-6 pb-4" : ""
          )}
        >
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="ml-10 text-3xl font-bold">Header</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-1 space-y-1">
              {sidebarOptions.map(({ current, href, name }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className={classNames(
                      current
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div
        className="absolute top-4 left-6 p-1 rounded border text-2xl font-bold cursor-pointer z-50 bg-white"
        onClick={onHamburgerClick}
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={classNames(
          isOpen ? "lg:w-72" : "lg:w-0",
          "transition-all ease-in-out duration-150",
          "hidden lg:block"
        )}
      ></div>
    </div>
  );
};

export default Sidebar;
