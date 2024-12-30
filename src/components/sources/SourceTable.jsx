import React, { useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { Edit, Search, Trash2 } from "lucide-react";
import SourceRow from "./SourceRow";
import AddSourceModal from "../modals/AddSourceModal";

const PRODUCT_DATA = [
	{ id: 1, name: "Oxu az", platform: "Website", active:true, link: "https://oxu.az" },
	{ id: 2, name: "Apa az", platform: "Telegram", active:false, link: "https://apa.az" },
	{ id: 3, name: "Baku WS", platform: "X", active:true, link: "https://bakunews.az" },
	{ id: 4, name: "Musavat TV", platform: "Instagram", active:true, link: "https://musavat.tv" },
	{ id: 5, name: "Tech az", platform: "Telegram", active:false, link: "https://tech.az" },
	{ id: 6, name: "Az news", platform: "Facebook", active:true, link: "https://aznews.az" },
	// Add more rows to test virtual scrolling
	...Array.from({ length: 1000 }, (_, i) => ({
		id: i + 7,
		name: `Source ${i + 7}`,
		platform: `Platform ${i % 5}`,
		active: i % 2 === 0,
		link: `https://source${i + 7}.com`,
	})),
];


const SourceTable = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const filteredProducts = useMemo(() => {
            const term = searchTerm.toLowerCase();
            return PRODUCT_DATA.filter(product =>
              product.name.toLowerCase().includes(term)
            );
        }, [searchTerm]);
        
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const Row = ({ index, style, data }) => {
        const product = data[index];
        return <SourceRow product={product} style={style} />;
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
    
                    {/* Add Source Modal */}
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

			{/* Scrollable Columns */}
            <div
                className='overflow-x-auto overflow-y-auto'
                style={{ height: "500px", width: "100%" }}
            >
                <div className='min-w-[800px]'>
                    {/* Table Headings */}
                    <div className='grid grid-cols-5 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-700'>
                        <div>Name</div>
						<div>Platform</div>
						<div>Link</div>
                        <div>Active</div>
                        <div>Actions</div>
                    </div>
                    <List
                        height={400} // Container height
                        itemCount={filteredProducts.length} // Total number of rows
                        itemSize={50} // Row height
                        width="100%" // Width of the list
                        itemData={filteredProducts} // Pass filteredProducts as itemData
                    >
                        {Row}
                    </List>
                </div>
            </div>
		</div>
	);
};

export default SourceTable;
