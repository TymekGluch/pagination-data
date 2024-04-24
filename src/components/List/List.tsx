"use client";

import { ValuesOf } from "@/types";
import React, { Suspense } from "react";
import { SORTING_ORDER } from "../server/DataFetcher/DataFetcher.constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import classNames from "classnames";

type ListProps = {
  data: {
    items: Array<{
      title: string;
      link: string;
    }>;
  };
};

const List = ({ data }: ListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPage = parseInt((searchParams.get("page") ?? "1") as string);
  const initialOrder = (searchParams.get("order") ??
    SORTING_ORDER.ASCENDING) as ValuesOf<typeof SORTING_ORDER>;
  const minPage = 1;
  const maxPage = 25;

  const [page, setPage] = React.useState<number>(initialPage);

  const [order, setOrder] =
    React.useState<ValuesOf<typeof SORTING_ORDER>>(initialOrder);

  const setParam = (name: string, value: string) => {
    const currentSerchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    currentSerchParams.set(name, value);

    const search = currentSerchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const handleSortClick = () => {
    setParam("order", order);

    setOrder((prev) =>
      prev === SORTING_ORDER.ASCENDING
        ? SORTING_ORDER.DESCENDING
        : SORTING_ORDER.ASCENDING
    );
  };

  const handleNextClick = () => {
    if (page < maxPage) {
      setParam("page", `${page + 1}`);
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (page > minPage) {
      setParam("page", `${page - 1}`);
      setPage((prev) => prev - 1);
    }
  };

  console.log(data);

  return (
    <div className="flex flex-col justify-between items-center gap-6 w-full max-w-xl min-h-12 p-3 rounded-xl bg-red-500 bg-opacity-20 border-solid border border-red-500  text-textColor">
      <div className="flex justify-between items-center w-full">
        <button
          className="flex justify-center items-center py-1 px-3 bg-default border-solid border border-red-500 rounded-xl hover:shadow-[0_0_0_1px_red] focus:shadow-[0_0_0_1px_red] text-base uppercase"
          type="button"
          onClick={handlePrevClick}
          disabled={page <= minPage}>
          prev
        </button>

        <button
          onClick={handleSortClick}
          type="button"
          className="group flex items-center py-1 px-3 bg-default border-solid border border-red-500 rounded-xl hover:shadow-[0_0_0_1px_red] focus:shadow-[0_0_0_1px_red] text-base text-nowrap transition-shadow delay-100 ease-in-out uppercase">
          sort <span className="sr-only">{order}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={classNames(
              "w-5 h-5 group-hover:scale-125 group-focus:scale-125 transition-transform easy-in-out delay-100",
              order === SORTING_ORDER.DESCENDING && "rotate-180"
            )}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
            />
          </svg>
        </button>

        <button
          className="flex justify-center items-center py-1 px-3 bg-default border-solid border border-red-500 rounded-xl hover:shadow-[0_0_0_1px_red] focus:shadow-[0_0_0_1px_red] text-base uppercase"
          type="button"
          onClick={handleNextClick}
          disabled={page >= maxPage}>
          next
        </button>
      </div>

      <Suspense fallback={<p>loading...</p>}>
        <ul className="flex flex-col justify-between gap-4 w-full">
          {data?.items?.map(({ link, title }) => (
            <li
              className="flex justify-center items-cente flex-wrap w-full max-w-full overflow-x-clip"
              key={link}>
              <p className="flex justify-start items-cente flex-wrap w-full">
                <strong>{title}</strong>

                <a
                  className="w-full text-red-400 hover:text-red-500 focus:text-red-900"
                  href={link}
                  target="_blank"
                  rel="norefferer noopener">
                  {link}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export { List };
