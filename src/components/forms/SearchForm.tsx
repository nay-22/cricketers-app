import { KeyboardEvent, useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";
import { SearchFormProps } from "../../types";

/**
 * SearchForm Component
 *
 * A generic search form that fetches and displays search results based on user input with support for
 * keyboard navigation.
 * 
 * @component
 *
 * @template T - Type of the data fetched from dataFetcher
 * @template U - Type of the individual result item
 * @template V - Type of the props passed to the resultView component
 *
 * @param {Object} props - Component props
 * @param {(q: string) => Promise<T>} props.dataFetcher - Asynchronous function to fetch data based on input
 * @param {(data: T) => U[]} props.dataExtractor - Function to extract an array of results from fetched data
 * @param {(res: U) => V} props.resultExtractor - Function to transform a result item to props for the result view
 * @param {ComponentType<V>} props.resultView - Component to render each search result
 * @param {(res: U) => void} [props.onClick] - Callback function triggered when a search result is clicked
 * @param {Object} [props.styleOptions] - Custom style options for input, icon, and wrapper
 * @param {Object} [props.styleOptions.wrapper] - Style options for the wrapper
 * @param {string} [props.styleOptions.wrapper.className] - CSS class name for the wrapper
 * @param {CSSProperties} [props.styleOptions.wrapper.style] - Inline styles for the wrapper
 * @param {Object} [props.styleOptions.icon] - Style options for the icon
 * @param {string} [props.styleOptions.icon.className] - CSS class name for the icon
 * @param {CSSProperties} [props.styleOptions.icon.style] - Inline styles for the icon
 * @param {boolean} [props.isDark=false] - Flag to apply dark mode styling
 * 
 * @returns The search form component
 */
const SearchForm = <T, U, V>({
  dataFetcher,
  dataExtractor,
  resultExtractor,
  resultView,
  onClick,
  styleOptions,
  isDark = false,
}: SearchFormProps<T, U, V>) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showRes, setShowRes] = useState<boolean>(false);
  const [results, setResults] = useState<U[] | undefined>(undefined);

  const [currIdx, setCurrIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  const executeFetch = async () => {
    try {
      const response = await dataFetcher(input);
      setData(response);
      setResults(dataExtractor(response));
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setInput("");
    setResults(undefined);
    setData(undefined);
  };

  const handleResultClick = (res: U) => {
    if (onClick) onClick(res);
    reset();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && results) {
      setCurrIdx((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    } else if (e.key === "ArrowDown" && results) {
      setCurrIdx((prev) => (prev + 1 < results?.length ? prev + 1 : prev));
    } else if (e.key === "Enter" && results && onClick) {
      console.log(results[currIdx]);
      onClick(results[currIdx]);
      inputRef.current?.blur();
      reset();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (input === "") {
      setIsLoading(false);
      setResults(undefined);
      setData(undefined);
    } else {
      setIsLoading(true);
    }
    if (input) {
      timer = setTimeout(() => executeFetch(), 350);
    }

    return () => clearTimeout(timer);
  }, [input]);

  const ResultViewComponent = resultView;

  return (
    <div data-testid="search-form" className="relative w-full">
      <div
        className={`flex items-center justify-center px-2 py-2 w-full ${
          !showRes ? "rounded-lg" : "rounded-t-lg"
        } ${styleOptions?.wrapper?.className}`}
      >
        <SearchIcon
          className={styleOptions?.icon?.className}
          style={styleOptions?.icon?.style}
          width={25}
        />
        <input
          ref={inputRef}
          onFocus={() => setShowRes(true)}
          onBlur={() => setTimeout(() => setShowRes(false), 200)}
          type="search"
          placeholder="Type player name..."
          className={`w-full outline-0 ${
            isDark ? "placeholder-white" : "placeholder-black"
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
      {data && showRes && (
        <div className="absolute w-full backdrop-blur-xl rounded-b-lg z-35">
          {isLoading ? (
            <div className="p-2 flex items-center justify-center">
              Loading...
            </div>
          ) : (
            results &&
            results.map((res, i) => (
              <div
                className={`overflow-hidden ${
                  i === currIdx ? "bg-white/30 backdrop-blur-2xl" : ""
                } last:rounded-b-lg`}
                key={`wrapper-${i}`}
                onClick={() => handleResultClick(res)}
              >
                <ResultViewComponent key={i} {...resultExtractor(res)} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
