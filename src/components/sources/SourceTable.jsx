import React, { useState, useMemo, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { Edit, Search, Trash2 } from "lucide-react";
import SourceRow from "./SourceRow";
import AddSourceModal from "../modals/AddSourceModal";
import { getSources } from "../../services/sources";

const SourceTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sources, setSources] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        async function fetchSources() {
            const sources = await getSources();
            setSources(sources);
        }
        fetchSources();
    }, []);

    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return sources.filter(product =>
            product.name.toLowerCase().includes(term)
        );
    }, [searchTerm, sources]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const Row = ({ index, style, data }) => {
        const source = data[index];
        return <SourceRow product={source} style={style} />;
    };

    return (
        <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-100 mb-4 md:mb-0'>Sources</h2>
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                    <button
                        type="button"
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        onClick={openModal}>
                        Add Source
                    </button>

                    {isModalOpen && <AddSourceModal onClose={closeModal} />}

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
                    <List
                        height={400}
                        itemCount={filteredProducts.length}
                        itemSize={50}
                        width="100%"
                        itemData={filteredProducts} // Pass filteredProducts here
                    >
                        {Row}
                    </List>
                </div>
            </div>
        </div>
    );
};

export default SourceTable;
