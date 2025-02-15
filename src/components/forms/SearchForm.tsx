import { ComponentType, CSSProperties, useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/SearchIcon";

export type SearchFormProps<T, U, V> = {
  dataFetcher: (q: string) => Promise<T>;
  dataExtractor: (data: T) => U[];
  resultExtractor: (res: U) => V;
  resultView: ComponentType<V>;
  onClick?: (res: U) => void;
  styleOptions?: {
    wrapper?: {
      className?: string;
      style?: CSSProperties;
    };
    icon?: {
      className?: string;
      style?: CSSProperties;
    };
  };
  isDark?: boolean;
};

/**
 * TODO:
 * - Apply local and session caching
 * - Add keyboard navigation
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

  const handleResultClick = (res: U) => {
    if (onClick) onClick(res);
    setInput("");
    setResults(undefined);
    setData(undefined);
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
          onFocus={() => setShowRes(true)}
          onBlur={() => setTimeout(() => setShowRes(false), 200)}
          type="search"
          placeholder="Type player name..."
          className={`w-full outline-0 ${
            isDark ? "placeholder-white" : "placeholder-black"
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {data && showRes && (
        <div className="absolute w-full white/40 backdrop-blur-2xl rounded-b-lg z-35">
          {isLoading ? (
            <div className="p-2 flex items-center justify-center">
              Loading...
            </div>
          ) : (
            results &&
            results.map((res, i) => (
              <div key={`wrapper-${i}`} onClick={() => handleResultClick(res)}>
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
