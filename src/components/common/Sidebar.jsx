import { BarChart2, Newspaper, Rss, WholeWord, Settings, Users, Menu, TrendingUp} from 'lucide-react'
import React, { memo } from 'react'
import { useState } from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const SIDEBAR_ITEMS = [
	{ name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
	{ name: "News", icon: Newspaper, color: "#8B5CF6", href: "/news" },
	{ name: "Sources", icon: Rss, color: "#10B981", href: "/sources" },
	{ name: "Keywords", icon: WholeWord, color: "#F59E0B", href: "/keywords" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
    className={`z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
    animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 rounded-full hover:bg-gray-700 transition-colors'
          >
            <Menu size={24} />
          </motion.button>
          <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      <Link to={'/'}>
                        <img 
                          src="src/assets/images/logo-nino.png" 
                          alt="Nino Logo" 
                          className='ml-2 mb-2 w-16' 
                        />
                      </Link>
                    </motion.span>
                  )}
                </AnimatePresence>
          
        </div>
        <nav className='mt-8 flex-grow'>
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
              className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'
              >
                <item.icon size={24} color={item.color} style={{color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                    className='ml-4 whitespace-nowrap'
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  )
});

export default Sidebar