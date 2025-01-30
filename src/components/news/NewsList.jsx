import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import Select from "react-select";
import { DateRange } from "react-date-range";
import { Search, Calendar } from "lucide-react";
import NewsCard from "./NewsCard";
import { addDays, parseISO, isWithinInterval } from "date-fns";
import customSelectStyles from "../utils/CustomSelectStyles";
import CustomMultiValue from "../utils/CustomMultiValue";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../css/datepicker.css";
import { getNews } from "../../services/news";
import InfiniteLoader from "react-window-infinite-loader";
import { toast } from "react-toastify";
import { getSources } from "../../services/sources";
import { getPlatforms } from "../../services/platforms";
import { getKeywords } from "../../services/keywords";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [sources, setSources] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isVisible, setIsVisible] = useState(true);

  const pageSize = 30;
  const datePickerRef = useRef(null);

  const fetchNews = useCallback(
    async (pageNumber) => {
      try {
        const sources = selectedSources.map((source) => source.value).join(",");
        const platforms = selectedPlatforms.map((platform) => platform.value).join(",");
        const keywords = selectedKeywords.map((keyword) => keyword.value).join(",");

        const startDate = dateRange[0].startDate.toISOString();
        const endDate = dateRange[0].endDate.toISOString();

        const filters = {
          sources: sources,
          keywords: keywords,
          platforms: platforms,
          start_date: startDate,
          end_date: endDate,
        };

        const data = await getNews(pageNumber, pageSize, searchTerm, filters);
        setNews((prev) => (pageNumber === 1 ? data.results : [...prev, ...data.results]));
        setHasMore(!!data.next);
        setTotalCount(data.count);
      } catch (error) {
        console.error("Failed to fetch news: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, selectedSources, selectedPlatforms, selectedKeywords, dateRange]
  );

  useEffect(() => {
    const fetchAllSources = async () => {
      try {
        let page = 1;
        const pageSize = 20;
        let allSources = [];
        let hasMore = true;

        while (hasMore) {
          const data = await getSources(page, pageSize);
          allSources = [...allSources, ...data.results];
          hasMore = data.next !== null;
          page += 1;
        }

        setSources(allSources);
      } catch (error) {
        console.error("Error fetching all sources:", error);
      }
    };

    fetchAllSources();
  }, []);

  useEffect(() => {
    const fetchAllPlatforms = async () => {
      try {
        let page = 1;
        const pageSize = 20;
        let allPlatforms = [];
        let hasMore = true;

        while (hasMore) {
          const data = await getPlatforms(page, pageSize);
          allPlatforms = [...allPlatforms, ...data.results];
          hasMore = data.next !== null;
          page += 1;
        }

        setPlatforms(allPlatforms);
      } catch (error) {
        console.error("Error fetching all platforms:", error);
      }
    };

    fetchAllPlatforms();
  }, []);

  useEffect(() => {
    const fetchAllKeywords = async () => {
      try {
        let page = 1;
        const pageSize = 20;
        let allKeywords = [];
        let hasMore = true;

        while (hasMore) {
          const data = await getKeywords(page, pageSize);
          allKeywords = [...allKeywords, ...data.results];
          hasMore = data.next !== null;
          page += 1;
        }

        setKeywords(allKeywords);
      } catch (error) {
        console.error("Error fetching all keywords:", error);
      }
    };

    fetchAllKeywords();
  }, []);

  const loadMoreItems = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchNews(page + 1);
      setPage((prevPage) => prevPage + 1);
    }
  }, [fetchNews, isLoading, hasMore, page]);

  const isItemLoaded = (index) => !hasMore || index < news.length;

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setNews([]);
      setPage(1);
      setHasMore(true);
      fetchNews(1);
    }, 500);
    return () => clearTimeout(debounceSearch);
  }, [searchTerm, fetchNews]);

  useEffect(() => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    fetchNews(1);
  }, [selectedSources, selectedPlatforms, selectedKeywords, dateRange, fetchNews]);

  useEffect(() => {
    const handleResize = () => setIsVisible(window.innerWidth > 1000);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") setShowDatePicker(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const sourceOptions = useMemo(
    () => sources.map((source) => ({ value: source.name, label: source.name })),
    [sources]
  );
  const platformOptions = useMemo(
    () => platforms.map((platform) => ({ value: platform.name, label: platform.name })),
    [platforms]
  );
  const keywordOptions = useMemo(
    () => keywords.map((keyword) => ({ value: keyword.name, label: keyword.name })),
    [keywords]
  );

  const Row = useCallback(
    ({ index, style }) => {
      if (!isItemLoaded(index)) {
        return (
          <div style={style} className="flex items-center justify-center">
            Loading...
          </div>
        );
      }
      const product = news[index];
      return <NewsCard key={product.id} product={product} style={style} />;
    },
    [isItemLoaded, news]
  );

  return (
    <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">News</h2>
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          placeholder="Search titles..."
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearchTerm(searchInput.trim())}
          value={searchInput}
          aria-label="Search news titles"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4">
        {isVisible && (
          <div className="relative w-full">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={showDatePicker}
              aria-label="Toggle date range picker"
            >
              <Calendar className="mr-2" size={18} />
              {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
            </button>
            {showDatePicker && (
              <div className="absolute z-10 mt-2 bg-gray-800 p-2 rounded-md" ref={datePickerRef}>
                <DateRange
                  editableDateInputs
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  maxDate={new Date()}
                />
              </div>
            )}
          </div>
        )}
        <Select
          isMulti
          options={sourceOptions}
          value={selectedSources}
          onChange={setSelectedSources}
          className="w-full"
          placeholder="Filter by Source"
          styles={customSelectStyles}
          components={{ MultiValue: CustomMultiValue }}
        />
        <Select
          isMulti
          options={platformOptions}
          value={selectedPlatforms}
          onChange={setSelectedPlatforms}
          className="w-full"
          placeholder="Filter by Platform"
          styles={customSelectStyles}
          components={{ MultiValue: CustomMultiValue }}
        />
        <Select
          isMulti
          options={keywordOptions}
          value={selectedKeywords}
          onChange={setSelectedKeywords}
          className="w-full"
          placeholder="Filter by Keywords"
          styles={customSelectStyles}
          components={{ MultiValue: CustomMultiValue }}
        />
      </div>
      <div className="overflow-x-auto" style={{ height: "600px", width: "100%" }}>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={hasMore ? news.length + 1 : news.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              height={600}
              itemCount={hasMore ? news.length + 1 : news.length}
              itemSize={150}
              onItemsRendered={onItemsRendered}
              width="100%"
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
        {news.length === 0 && !isLoading && <div className="text-center text-gray-400 mt-4">No news found.</div>}
      </div>
    </div>
  );
};

export default NewsList;