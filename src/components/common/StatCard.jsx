import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({name, icon:Icon, value, color}) => {
  return (
    <motion.div
    className='bg-gray-800 bg-opacity-50  shadow-lg overflow-hidden rounded-xl border border-gray-700'
    whileHover={{y: -5, boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.5)"}}
    >
        <div className='px-4 py-5 sm:p-6'>
            <span className='flex items-center text-sm'>
                <Icon size={20} className='mr-2' style={{ color }}/>
                {name}
            </span>
            <p className='mt-1 text-2xl font-semibold truncate'>{value}</p>
        </div>
    </motion.div>
  )
}

export default StatCard