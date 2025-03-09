import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { memo } from 'react';
import { useState, useEffect } from "react";
import { getTopSources } from "../../services/dashboard";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const ScrapingBySourceChart = memo(() => {
	const [sources, setSources] = useState([]);
	const [error, setError] = useState(false);
	useEffect(() => {
        const fetchSources = async () => {
            try {
                const data = await getTopSources();
                setSources(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchSources();
    }, []);

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50  shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Most Scraped Sources</h2>

			<div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={sources}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey={"value"} fill='#8884d8'>
							{sources.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
});

export default ScrapingBySourceChart;