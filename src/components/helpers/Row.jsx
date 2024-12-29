import { Edit, Trash2 } from 'lucide-react';

const Row = ({ index, style }) => {
    const product = filteredProducts[index];
    return (
        <div
            style={style}
            className='flex items-center justify-between px-4 py-2 border-b border-gray-700'
        >
            <div className='text-gray-100'>{product.name}</div>
            <div className='text-gray-300'>{product.platform}</div>
            <div>
                <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                    <Edit size={18} />
                </button>
                <button className='text-red-400 hover:text-red-300'>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default Row;