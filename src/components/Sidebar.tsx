"use client";

import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const isCurrent = (segment: string, liveSegment: string | null) =>
  `/${liveSegment}` === segment;

const Sidebar = () => {
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
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r-2">
        <div className="flex h-16 shrink-0k items-center">
          <h1 className="text-3xl font-bold">Header</h1>
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
  );
};

export default Sidebar;
