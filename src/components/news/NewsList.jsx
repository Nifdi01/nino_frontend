import React, { useState, useMemo, useRef, useEffect } from "react";
import { VariableSizeList as List } from "react-window";
import { Search } from "lucide-react";
import NewsCard from "./NewsCard";

const PRODUCT_DATA = [
  { id: 1, title: "Oxu az", source: "Oxu az", platform: "Website", link: "https://oxu.az", keywords: ["Azerbaijan", "Russia", "AZAL"], description: "Latest news from Oxu.az." },
  { id: 2, title: "Apa az", source: "Apa az", platform: "Telegram", link: "https://apa.az", keywords: ["Russia", "Grozny", "AZAL"], description: "Updates from Apa.az Telegram channel." },
  { id: 3, title: "Baku WS", source: "Baku WS", platform: "X", link: "https://bakunews.az", keywords: ["Azerbaijan", "Airlines", "Russia"], description: "Breaking news from Baku WS." },
  { id: 4, title: "Musavat TV", source: "Musavat TV", platform: "Instagram", link: "https://musavat.tv", keywords: ["Russia", "AZAL", "Airlines"], description: "Musavat TV on Instagram." },
  { id: 5, title: "Tech az", source: "Tech az", platform: "Telegram", link: "https://tech.az", keywords: ["Azerbaijan", "Airlines", "AZAL"], description: "Tech news from Tech.az." },
  { id: 6, title: "Az news", source: "Az news", platform: "Facebook", link: "https://aznews.az", keywords: ["Russia", "Grozny", "AZAL"], description: "Latest updates from Az News." },
  ...Array.from({ length: 1000 }, (_, i) => ({
    id: i + 7,
    title: `Title ${i + 7}`,
    source: `Source ${i + 7}`,
    platform: `Platform ${i % 5}`,
    link: `https://source${i + 7}.com`,
    keywords: ["Azerbaijan", "Russia", "AZAL"],
    description: "This is a sample description for the news source.", // Ensure description exists
  })),
];

const NewsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const listRef = useRef(); // Ref to the List for dynamic size updates

  // Memoize the filtered products to optimize performance
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return PRODUCT_DATA.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get item sizes for each news
  const getItemSize = (index) => {
    const product = filteredProducts[index];
    let height = 110;
    const keywordLines = Math.ceil(product.keywords.length / 5);
    height += keywordLines * 25;
    return height;
  }

 

  // Define the Row component
  const Row = ({ index, style, data }) => {
    const product = data[index];
    return <NewsCard product={product} style={style} />;
  };

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-100 mb-4 md:mb-0'>News</h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className='relative w-full md:w-auto'>
            <input
              type='text'
              placeholder='Search sources...'
              className='w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
          </div>
        </div>
      </div>

      {/* Scrollable Columns */}
      <div
        className='overflow-x-auto'
        style={{ height: "600px", width: "100%" }}
      >
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
      </div>
    </div>
  );
};

export default NewsList;
