import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { Edit, Search, Trash2 } from "lucide-react";

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

const SourceTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

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

	// Row renderer for react-window
	const Row = ({ index, style }) => {
		const product = filteredProducts[index];
		return (
			<div
				style={style}
				className='grid grid-cols-4 items-center px-4 py-2 border-b border-gray-700'
			>
				<div className='text-gray-100 truncate'>{product.name.toLowerCase()}</div>
				<div className='text-gray-300 truncate'>{product.platform.toLowerCase()}</div>
				<div className='text-gray-300 truncate'>{product.link}</div>
				<div className='flex space-x-2'>
					<button className='text-indigo-400 hover:text-indigo-300'>
						<Edit size={18} />
					</button>
					<button className='text-red-400 hover:text-red-300'>
						<Trash2 size={18} />
					</button>
				</div>
			</div>
		);
	};

	return (
		<div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold text-gray-100'>Sources</h2>
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

			{/* Table Headings */}
			<div className='grid grid-cols-4 px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-700'>
				<div>Name</div>
				<div>Platform</div>
				<div>Link</div>
				<div>Actions</div>
			</div>

			{/* Virtualized List */}
			<div className='overflow-auto' style={{ height: "400px" }}>
				<List
					height={400} // Container height
					itemCount={filteredProducts.length} // Total number of rows
					itemSize={50} // Row height
					width="100%" // Width of the list
				>
					{Row}
				</List>
			</div>
		</div>
	);
};

export default SourceTable;
