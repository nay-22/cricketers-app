import { FC, useEffect, useState } from "react";
import { PaginatorProps } from "../types";

export const generatePages = (items: number, limit: number): number[] => {
  return [...Array(Math.ceil(items / limit)).keys()].map((i) => i);
};

export const generateVisiblePages = (
  currPage: number,
  totalPages: number[],
  visiblePageLimit: number = 5
): (string | number)[] => {
  if (totalPages.length <= visiblePageLimit) {
    return totalPages;
  }

  const offset = Math.floor(visiblePageLimit / 2);
  const start = currPage - offset,
    end = currPage + offset;

  let visible: (string | number)[];

  if (start < 0) {
    visible = [...totalPages.slice(0, visiblePageLimit - 1), "..."];
  } else if (end > totalPages.length) {
    visible = ["...", ...totalPages.slice(start - end)];
  } else {
    visible = ["...", ...totalPages.slice(start + 1, end), "..."];
  }

  return visible;
};

/**
 * Paginator Component
 *
 * Renders a pagination control for navigating through pages of items.
 * Supports showing navigation controls (next, previous, first, last) and custom styling options.
 *
 * @component
 *
 * @param {Object} props - Component properties
 * @param {number} props.items - Total number of items to paginate
 * @param {number} [props.limit=5] - Number of items per page
 * @param {function} props.onClick - Callback function invoked when a page is selected
 * @param {boolean} [props.showControls=false] - Whether to display next/previous page controls
 * @param {boolean} [props.showJumpControls=false] - Whether to display first/last page jump controls
 * @param {Object} [props.styleOptions] - Custom styling options
 * @param {Object} [props.styleOptions.wrapper] - Styles for the pagination wrapper
 * @param {Object} [props.styleOptions.icons] - Styles for pagination control icons
 *
 * @returns {JSX.Element} The rendered Paginator component
 */
const Paginator: FC<PaginatorProps> = ({
  items,
  limit = 5,
  onClick,
  showControls = false,
  showJumpControls = false,
  styleOptions,
}) => {
  const [curr, setCurr] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);
  const [visiblePages, setVisiblePages] = useState<(string | number)[]>([]);

  useEffect(() => {
    setPages(generatePages(items, limit));
  }, [items, limit]);

  useEffect(() => {
    setVisiblePages(generateVisiblePages(curr, pages, 5));
  }, [pages, curr]);

  const handlePageClick = (page: number) => {
    setCurr(page);
    onClick(page, limit);
  };

  const jumpToLastPage = () => {
    handlePageClick(pages.length - 1);
  };

  const jumpToFirstPage = () => {
    handlePageClick(0);
  };

  const next = () => {
    if (curr < pages.length - 1) {
      handlePageClick(curr + 1);
    }
  };

  const prev = () => {
    if (curr > 0) {
      handlePageClick(curr - 1);
    }
  };

  return (
    <>
      <div
        className={
          "flex items-center justify-center gap-1 px-2" +
          styleOptions?.wrapper?.className
        }
      >
        {showControls && (
          <div className="flex items-center justify-center gap-1">
            {showJumpControls && (
              <button
                onClick={jumpToFirstPage}
                className="w-8 py-3 rounded-lg flex items-center justify-center hover:cursor-pointer "
                aria-label="First Page"
              >
                <div
                  className={`h-2.5 w-2.5 border-t-3 border-l-3 rounded-tl-sm -rotate-45 ${styleOptions?.icons?.className}`}
                ></div>
                <div
                  className={`h-2.5 w-2.5 border-t-3 border-l-3 rounded-tl-sm -rotate-45 ${styleOptions?.icons?.className}`}
                ></div>
              </button>
            )}
            <button
              onClick={prev}
              className="hover:cursor-pointer  w-8 py-3 flex items-center justify-center rounded-lg"
              aria-label="Previous Page"
            >
              <div
                className={`h-2.5 w-2.5 border-t-3 border-l-3 rounded-tl-sm -rotate-45 ${styleOptions?.icons?.className}`}
              ></div>
            </button>
          </div>
        )}
        {visiblePages.map((p, i) => (
          <button
            className={`max-sm:text-sm max-sm:min-w-6 min-w-8 text-center py-1 ${
              typeof p === "number" ? "hover:cursor-pointer" : ""
            } ${typeof p === "number" && p !== curr ? "" : ""} rounded-lg ${
              p === curr ? "bg-amber-600" : ""
            }`}
            onClick={() => (typeof p === "number" ? handlePageClick(p) : null)}
            key={`${p}-${i}`}
          >
            {typeof p === "number" ? p + 1 : p}
          </button>
        ))}
        {showControls && (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={next}
              className="hover:cursor-pointer  w-8 py-3 flex items-center justify-center rounded-lg"
              aria-label="Next Page"
            >
              <div
                className={`h-2.5 w-2.5 border-t-3 border-r-3 rounded-tr-sm rotate-45 ${styleOptions?.icons?.className}`}
              ></div>
            </button>
            {showJumpControls && (
              <button
                onClick={jumpToLastPage}
                className="flex items-center justify-center w-8 py-3 rounded-lg hover:cursor-pointer "
                aria-label="Last Page"
              >
                <div
                  className={`h-2.5 w-2.5 border-t-3 border-r-3 rounded-tr-sm rotate-45 ${styleOptions?.icons?.className}`}
                ></div>
                <div
                  className={`h-2.5 w-2.5 border-t-3 border-r-3 rounded-tr-sm rotate-45 ${styleOptions?.icons?.className}`}
                ></div>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Paginator;
