import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import {React, memo} from 'react'


const scrapeData = [
	{ name: "Jul", scraping: 4200 },
	{ name: "Aug", scraping: 3800 },
	{ name: "Sep", scraping: 5100 },
	{ name: "Oct", scraping: 4600 },
	{ name: "Nov", scraping: 5400 },
	{ name: "Dec", scraping: 7200 },
	{ name: "Jan", scraping: 6100 },
	{ name: "Feb", scraping: 5900 },
	{ name: "Mar", scraping: 6800 },
	{ name: "Apr", scraping: 6300 },
	{ name: "May", scraping: 7100 },
	{ name: "Jun", scraping: 7500 },
];


const ScrapeOverviewChart = memo(() => {
  return (
    <motion.div
    className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    >
        <h1 className="text-lg font-medium mb-4 text-gray-100">Monthly Scraped Content</h1>
        
        <div className="h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <LineChart data={scrapeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                    contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#4b5563",
                    }}
                    itemStyle={{ color: "#e5e7eb" }}
                    />
                        <Line type="monotone" 
                        dataKey="scraping" 
                        stroke="#6366F1" 
                        strokeWidth={3}
                        dot={{ fill: "#6366F1", r: 6, strokeWidth: 2 }}
                        activeDot={{ r: 8, strokeWidth: 2 }}
                        />
                    
                </LineChart>
            </ResponsiveContainer>
        </div>
    </motion.div>
  )
});

export default ScrapeOverviewChart