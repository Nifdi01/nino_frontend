// NewsList.js
import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import Select from "react-select";
import { DateRange } from "react-date-range";
import { Search, Calendar } from "lucide-react"; // Added Calendar icon
import NewsCard from "./NewsCard";
import { addDays, parseISO, isWithinInterval } from "date-fns"; // Imported necessary functions
import customSelectStyles from "../utils/CustomSelectStyles";
import CustomMultiValue from "../utils/CustomMultiValue";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file
import "../../css/datepicker.css"
import { getNews } from "../../services/news";
import InfiniteLoader from "react-window-infinite-loader";
import { toast } from "react-toastify";

const NewsList = () => {
  const listRef = useRef();

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dropdown filters
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const pageSize = 30;

  // Ref for date picker
  const datePickerRef = useRef(null);

  // State for Resizing
  const [isVisible, setIsVisible] = useState(true);

  const fetchNews = useCallback(async (pageNumber, currentSearchTerm) => {
    setIsLoading(true);
    try {
      const data = await getNews(pageNumber, pageSize, currentSearchTerm);
      setNews((prev) => [...prev, ...data.results]);
      setHasMore(!!data.next);
      setTotalCount(data.count);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      toast.error("Failed to load news.");
    } finally {
      setIsLoading(false);
    }
  }, []);


  const loadMoreItems = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchNews(page + 1, searchTerm);
      setPage(prevPage => prevPage + 1);
    }
  }, [fetchNews, isLoading, hasMore, page, searchTerm]);

  const isItemLoaded = (index) => !hasMore || index < filteredProducts.length;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setNews([]);
      setPage(1);
      setHasMore(true);
      fetchNews(1, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchNews]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchInput.trim());
    }
  }

  // State for date range filtering
  const [dateRange, setDateRange] = useState([
    {
      startDate: addDays(new Date(), -30), // Default to last 30 days
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Generate unique options for dropdowns
  const sourceOptions = useMemo(() => {
    const sources = Array.from(new Set(news.map((item) => item.source.name)));
    return sources.map((source) => ({ value: source, label: source }));
  }, [news]);

  const platformOptions = useMemo(() => {
    const platforms = Array.from(new Set(news.map((item) => item.platform)));
    return platforms.map((platform) => ({ value: platform, label: platform }));
  }, []);

  const keywordOptions = useMemo(() => {
    const keywordsSet = new Set();
    news.forEach((item) => {
      item.keywords.forEach((keyword) => keywordsSet.add(keyword));
    });
    const keywords = Array.from(keywordsSet);
    return keywords.map((keyword) => ({ value: keyword, label: keyword }));
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return news.filter((product) => {
      // Filter by search term
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by sources
      const matchesSource =
        selectedSources.length === 0 ||
        selectedSources.some((source) => source.value === product.source.name);

      // Filter by platforms
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) => platform.value === product.source.platform.name);

      // Filter by keywords
      const matchesKeyword =
        selectedKeywords.length === 0 ||
        selectedKeywords.some((keyword) => product.keywords.includes(keyword.value));

      // Filter by date range
      let productDate;
      if (typeof product.published_at === "string" || typeof product.published_at === "number") {
        productDate = parseISO(product.published_at);
      } else if (product.published_at instanceof Date) {
        productDate = product.published_at;
      } else {
        return false; // Invalid date format
      }

      const { startDate, endDate } = dateRange[0];
      const matchesDate = isWithinInterval(productDate, { start: startDate, end: endDate });

      return matchesSearch && matchesSource && matchesPlatform && matchesKeyword && matchesDate;
    });
  }, [
    news,
    searchTerm,
    selectedSources,
    selectedPlatforms,
    selectedKeywords,
    dateRange,
  ]);

  // Function to estimate item size
  const getItemSize = useCallback(
    (index) => {
      let size = 140; // Base size for title, source, keywords
      return size;
    },
    []
  );


  // Define the Row component
  const Row = useCallback(({ index, style }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="flex items-center justify-center">
          Loading...
        </div>
      );
    }
    const product = filteredProducts[index];
    return <NewsCard key={product.id} product={product} style={style} />;
  }, [isItemLoaded, filteredProducts]);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1000); // Adjust size as needed
    };

    handleResize(); // Set initial visibility
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false); // Close the calendar
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setShowDatePicker(false); // Close the calendar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [datePickerRef, setShowDatePicker]);

  return (
    <div className="bg-gray-800 bg-opacity-50  shadow-lg rounded-xl p-6">
      <h2 className='text-xl font-semibold text-gray-100 mb-4'>News</h2>
      {/* Search Input */}
      <div className="mt-2">
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            placeholder="Search titles..."
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (listRef.current) {
                listRef.current.resetAfterIndex(0, true);
              }
            }}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center justify-end flex-grow">
          {/* Date Range Filter */}
          {isVisible && (
            <div className="relative w-full">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Calendar className="mr-2 bg-gray-800" size={18} />
                {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
              </button>

              {showDatePicker && (
                <div
                  className="absolute z-10 mt-2 bg-gray-800"
                  ref={datePickerRef} // Add a ref to the calendar dropdown
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDateRange([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    maxDate={new Date()}
                  />
                </div>
              )}
            </div>
          )}


          {/* Source Dropdown */}
          <Select
            isMulti
            options={sourceOptions}
            value={selectedSources}
            onChange={(selected) => {
              setSelectedSources(selected);
              if (listRef.current) {
                listRef.current.resetAfterIndex(0, true);
              }
            }}
            className="w-full"
            placeholder="Filter by Source"
            classNamePrefix="react-select"
            styles={customSelectStyles}
            components={{ MultiValue: CustomMultiValue }}
          />

          {/* Platform Dropdown */}
          <Select
            isMulti
            options={platformOptions}
            value={selectedPlatforms}
            onChange={(selected) => {
              setSelectedPlatforms(selected);
              if (listRef.current) {
                listRef.current.resetAfterIndex(0, true);
              }
            }}
            className="w-full"
            placeholder="Filter by Platform"
            classNamePrefix="react-select"
            styles={customSelectStyles}
            components={{ MultiValue: CustomMultiValue }}
          />

          {/* Keyword Dropdown */}
          <Select
            isMulti
            options={keywordOptions}
            value={selectedKeywords}
            onChange={(selected) => {
              setSelectedKeywords(selected);
              if (listRef.current) {
                listRef.current.resetAfterIndex(0, true);
              }
            }}
            className="w-full"
            placeholder="Filter by Keywords"
            classNamePrefix="react-select"
            styles={customSelectStyles}
            components={{ MultiValue: CustomMultiValue }}
          />
        </div>
      </div>

      {/* Scrollable Columns */}
      <div
        className="overflow-auto"
        style={{ height: "600px", width: "100%" }}
      >
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={hasMore ? filteredProducts.length + 1 : filteredProducts.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref} // Attach the ref
              height={600} // Container height
              itemCount={hasMore ? filteredProducts.length + 1 : filteredProducts.length} // Total number of rows
              itemSize={getItemSize} // Dynamic row height function
              onItemsRendered={onItemsRendered}
              width="100%" // Width of the list
              itemData={filteredProducts} // Pass filteredProducts as itemData
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      </div>
    </div>
  );
};

export default NewsList;
