import React, { useState, memo } from "react";
import { FixedSizeList as List } from "react-window";
import { Edit, Search, Trash2 } from "lucide-react";
import Row from "../helpers/Row";
import AddSourceModal from "../modals/AddSourceModal";

const PRODUCT_DATA = [
	{ id: 1, name: "Oxu az", platform: "Website", link: "https://oxu.az" },
	{ id: 2, name: "Apa az", platform: "Telegram", link: "https://apa.az" },
	{ id: 3, name: "Baku WS", platform: "X", link: "https://bakunews.az" },
	{ id: 4, name: "Musavat TV", platform: "Instagram", link: "https://musavat.tv" },
	{ id: 5, name: "Tech az", platform: "Telegram", link: "https://tech.az" },
	{ id: 6, name: "Az news", platform: "Facebook", link: "https://aznews.az" },
	// Add more rows to test virtual scrolling
	...Array.from({ length: 1000 }, (_, i) => ({
		id: i + 7,
		name: `Source ${i + 7}`,
		platform: `Platform ${i % 5}`,
		link: `https://source${i + 7}.com`,
	})),
];


const SourceTable = memo(() => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = PRODUCT_DATA.filter(
			(product) =>
				product.name.toLowerCase().includes(term) ||
				product.platform.toLowerCase().includes(term)
		);
		setFilteredProducts(filtered);
	};


	return (
		<div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold text-gray-100'>Sources</h2>
				<div className="flex">
					<button type="button" 
					className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
					onClick={openModal}>
					Add Source
					</button>

					{/* Add Source Modal */}
					{isModalOpen && <AddSourceModal onClose={closeModal} />}

					<div className='relative'>
						<input
							type='text'
							placeholder='Search sources...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							onChange={handleSearch}
							value={searchTerm}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
				</div>
			</div>

			{/* Table Headings */}
			<div className='grid grid-cols-4 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-700'>
				<div>Name</div>
				<div>Platform</div>
				<div>Link</div>
				<div>Actions</div>
			</div>

			{/* Virtualized List */}
			<div className='overflow-x-auto' style={{ height: "400px", width: "100%" }}>
				<List
					height={400} // Container height
					itemCount={filteredProducts.length} // Total number of rows
					itemSize={50} // Row height
					width="100%" // Width of the list
				>
					{({index, style}) => (
						<Row index={index} style={style} filteredProducts={filteredProducts} />
					)}
				</List>
			</div>
		</div>
	);
});

export default SourceTable;
