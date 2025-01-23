// SourceTable.jsx

import React, { useState, useEffect, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Search } from "lucide-react";
import SourceRow from "./SourceRow";
import AddSourceModal from "../modals/AddSourceModal";
import { getSources } from "../../services/sources";
import { getSourceStatistics } from "../../services/statistics";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure ToastContainer is rendered in your App
import { getPlatforms } from '../../services/platforms'


const SourceTable = ({ setStatistics }) => {
    const [sources, setSources] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [platforms, setPlatform] = useState([]);

    const pageSize = 30; // Adjust as needed

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const platformData = await getPlatforms();
                setPlatform(platformData.results);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    // Fetch sources function
    const fetchSources = useCallback(async (pageNumber, currentSearchTerm) => {
        setIsLoading(true);
        try {
            const data = await getSources(pageNumber, pageSize, currentSearchTerm);
            setSources(prev => [...prev, ...data.results]);
            setHasMore(!!data.next);
            setTotalCount(data.count);
        } catch (error) {
            console.error("Failed to fetch sources:", error);
            toast.error("Failed to load sources.");
        } finally {
            setIsLoading(false);
        }
    }, []);


    // Handler for loading more items
    const loadMoreItems = useCallback(() => {
        if (!isLoading && hasMore) {
            fetchSources(page + 1, searchTerm);
            setPage(prevPage => prevPage + 1);
        }
    }, [fetchSources, hasMore, isLoading, page, searchTerm]);

    // Determine if an item is loaded
    const isItemLoaded = index => !hasMore || index < sources.length;

    // Handle search input with debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            // Trigger search by updating searchTerm
            // The actual fetching is handled in the main useEffect
            setSources([]);
            setPage(1);
            setHasMore(true);
            fetchSources(1, searchTerm);
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, fetchSources]);

    // Handle search input
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            setSearchTerm(searchInput.trim());
        }
    };

    // Handle source deletion
    const handleSourceDelete = useCallback(async (id) => {
        try {
            setSources(prevSources => prevSources.filter(source => source.id !== id));

            const updatedStatistics = await getSourceStatistics();
            setStatistics(updatedStatistics);

        } catch (error) {
            console.error("Failed to delete source:", error);
            toast.error("Failed to delete source.");
        }
    }, [setStatistics]);

    // Handle source creation
    const handleSourceCreate = useCallback(async (newSource) => {
        setSources(prevSources => [newSource, ...prevSources]);
        const updatedStatistics = await getSourceStatistics();
        setStatistics(updatedStatistics);
        toast.success(`${newSource.name} added to sources.`);
    }, [setStatistics]);

    // Row renderer
    const Row = useCallback(({ index, style }) => {
        if (!isItemLoaded(index)) {
            return (
                <div style={style} className="flex items-center justify-center">
                    Loading...
                </div>
            );
        }

        const source = sources[index];

        return (
            <SourceRow
                key={source.id}
                product={source}
                style={style}
                onDelete={handleSourceDelete}
            />
        );
    }, [isItemLoaded, sources, handleSourceDelete]);

    return (
        <div className='bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-6'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-100 mb-4 md:mb-0'>Sources</h2>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <div className='relative w-full md:w-auto'>
                        <input
                            type='text'
                            placeholder='Search sources...'
                            className='w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={handleSearch}
                            value={searchInput}
                            onKeyDown={handleKeyDown}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                    <button
                        type="button"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={() => setIsModalOpen(true)}>
                        Add Source
                    </button>

                    {isModalOpen && (
                        <AddSourceModal
                            onClose={() => setIsModalOpen(false)}
                            onCreate={handleSourceCreate}
                            platforms={platforms}
                        />
                    )}

                </div>
            </div>

            <div
                className='overflow-x-auto overflow-y-auto'
                style={{ height: "500px", width: "100%" }}
            >
                <div className='min-w-[800px]'>
                    <div className='grid grid-cols-5 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-700'>
                        <div>Name</div>
                        <div>Platform</div>
                        <div>Link</div>
                        <div>Active</div>
                        <div>Actions</div>
                    </div>
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={hasMore ? sources.length + 1 : sources.length}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            <List
                                height={400}
                                itemCount={hasMore ? sources.length + 1 : sources.length}
                                itemSize={50}
                                width="100%"
                                onItemsRendered={onItemsRendered}
                                ref={ref}
                                itemData={sources} // Pass sources directly
                            >
                                {Row}
                            </List>
                        )}
                    </InfiniteLoader>
                </div>
            </div>
        </div>
    );
};

export default SourceTable;
