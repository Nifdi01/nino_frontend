// NewsList.js
import React, { useState, useMemo, useRef, useCallback, useEffect  } from "react";
import { VariableSizeList as List } from "react-window";
import Select from "react-select";
import { DateRange } from "react-date-range";
import { Search, Calendar } from "lucide-react"; // Added Calendar icon
import { PRODUCT_DATA } from "./data"; // Adjust the path as necessary
import NewsCard from "./NewsCard";
import { addDays, parseISO, isWithinInterval } from "date-fns"; // Imported necessary functions
import customSelectStyles from "../utils/CustomSelectStyles";
import CustomMultiValue from "../utils/CustomMultiValue";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file
import "../../css/datepicker.css"

const NewsList = () => {
  const listRef = useRef();

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for dropdown filters
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // State for Resizing
  const [isVisible, setIsVisible] = useState(true);

  // State for date range filtering
  const [dateRange, setDateRange] = useState([
    {
      startDate: addDays(new Date(), -28), // Default to last 30 days
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Generate unique options for dropdowns
  const sourceOptions = useMemo(() => {
    const sources = Array.from(new Set(PRODUCT_DATA.map((item) => item.source)));
    return sources.map((source) => ({ value: source, label: source }));
  }, []);

  const platformOptions = useMemo(() => {
    const platforms = Array.from(new Set(PRODUCT_DATA.map((item) => item.platform)));
    return platforms.map((platform) => ({ value: platform, label: platform }));
  }, []);

  const keywordOptions = useMemo(() => {
    const keywordsSet = new Set();
    PRODUCT_DATA.forEach((item) => {
      item.keywords.forEach((keyword) => keywordsSet.add(keyword));
    });
    const keywords = Array.from(keywordsSet);
    return keywords.map((keyword) => ({ value: keyword, label: keyword }));
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCT_DATA.filter((product) => {
      // Filter by search term
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by sources
      const matchesSource =
        selectedSources.length === 0 ||
        selectedSources.some((source) => source.value === product.source);

      // Filter by platforms
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((platform) => platform.value === product.platform);

      // Filter by keywords
      const matchesKeyword =
        selectedKeywords.length === 0 ||
        selectedKeywords.some((keyword) => product.keywords.includes(keyword.value));

      // Filter by date range
      let productDate;
      if (typeof product.date === "string" || typeof product.date === "number") {
        productDate = parseISO(product.date);
      } else if (product.date instanceof Date) {
        productDate = product.date;
      } else {
        return false; // Invalid date format
      }

      const { startDate, endDate } = dateRange[0];
      const matchesDate = isWithinInterval(productDate, { start: startDate, end: endDate });

      return matchesSearch && matchesSource && matchesPlatform && matchesKeyword && matchesDate;
    });
  }, [
    searchTerm,
    selectedSources,
    selectedPlatforms,
    selectedKeywords,
    dateRange,
  ]);

  // Function to estimate item size
  const getItemSize = useCallback(
    (index) => {
      const product = filteredProducts[index];
      let size = 100; // Base size for title, source, keywords

      // Estimate additional height based on number of keywords
      if (product.keywords && product.keywords.length > 0) {
        const keywordLines = Math.ceil(product.keywords.length / 5); // Assuming 5 keywords per line
        size += keywordLines * 25; // 25px per line
      }

      // Add additional spacing (e.g., 20px) between items
      size += 20;

      return size;
    },
    [filteredProducts]
  );


  // Define the Row component
  const Row = ({ index, style, data }) => {
    const product = data[index];
    return <NewsCard product={product} style={style} />;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1000); // Adjust size as needed
    };

    handleResize(); // Set initial visibility
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center flex-grow">

          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              placeholder="Search titles..."
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* Date Range Filter */}
          {isVisible && (
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Calendar className="mr-2 bg-gray-800" size={18} />
                {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
              </button>
              {showDatePicker && (
                <div className="absolute z-10 mt-2 bg-gray-800">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDateRange([item.selection]);
                      setShowDatePicker(false);
                      if (listRef.current) {
                        listRef.current.resetAfterIndex(0, true);
                      }
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    maxDate={new Date()}
                  // styles={customDateRangeStyles}
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
            className="w-full md:w-48"
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
            className="w-full md:w-48"
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
            className="w-full md:w-48"
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
        {filteredProducts.length > 0 ? (
          <List
            ref={listRef} // Attach the ref
            height={600} // Container height
            itemCount={filteredProducts.length} // Total number of rows
            itemSize={getItemSize} // Dynamic row height function
            width="100%" // Width of the list
            itemData={filteredProducts} // Pass filteredProducts as itemData
          >
            {Row}
          </List>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300">
            No news items match your selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;
