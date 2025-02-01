// NewsCard.js
import React from 'react';
import { formatInTimeZone } from 'date-fns-tz';

const NewsCard = ({ product, style }) => {
  const date = new Date(product.published_at);
  const formattedDate = formatInTimeZone(date, "UTC", 'yyyy-MM-dd HH:mm');
  return (
    <div style={style} className="px-2">
      <a
        href={product.link}
        className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={`Read more about ${product.title}`}
        target="_blank" // Opens the link in a new tab
        rel="noopener noreferrer" // Security best practice
      >
        {/* Date */}
        <p className='text-gray-400 text-sm'>{formattedDate}</p>

        {/* Title */}
        <h5 className="mb-1 sm:text-m md:text-lg lg:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title.split(" ").slice(0, 8).join(" ")}
          {product.title.split(" ").length > 8 ? " ..." : ""}
        </h5>



        {/* Source */}
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 font-semibold text-xs px-2 py-1 rounded-full">
            {product.source.platform.name}
          </span>
          <span className="inline-block bg-blue-100 text-blue-500 font-semibold text-xs px-2 py-1 ml-2 rounded-full">
            {product.source.name}
          </span>
          {product.keywords && product.keywords.length > 0 ? (
            product.keywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 ml-2 rounded-full"
              >
                {keyword.name}
              </span>
            ))
          ) : null}
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1">

        </div>
      </a>
    </div>
  );
};

export default React.memo(NewsCard);
