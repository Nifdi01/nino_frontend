import { Edit, Trash2 } from 'lucide-react';


const KeywordRow = ({ index, style , filteredProducts}) => {
    const product = filteredProducts[index];
    return (
        <div
            style={style}
            className='grid grid-cols-3 items-center px-4 py-2 border-b border-gray-700'
        >
            <div className='text-gray-100'>{product.name}</div>
            <div className='text-gray-300'>{product.active ? 
            (<span type="button" 
                class="text-red-700 border border-red-700 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500">
                Inactive
            </span>
            ) : (
            <span type="button" 
                class="text-green-700 border border-green-700 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500">
                Active
            </span>
            )
            }</div>
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

export default KeywordRow;