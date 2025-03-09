import { motion } from "framer-motion";
import { Pi } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { memo, useEffect, useState } from 'react';
import { getKeywords } from "../../services/dashboard";

const keywordData = [
	{ name: "AZAL", value: 4500 },
	{ name: "Airplanes", value: 3200 },
	{ name: "Azerbaijan", value: 2800 },
	{ name: "Russia", value: 2100 },
	{ name: "Grozny", value: 1900 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const KeywordDistributionChart = memo(() => {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchKeywords = async () => {
        try {
            const data = await getKeywords();
            setKeywords(data || []);
        } catch (err) {
            setError(err.message);
        }
    };

    fetchKeywords();
}, []);

console.log(keywords);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50  shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Keyword Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={keywords}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {keywords.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              borderColor: "#4B5563",
            }}
            itemStyle={{ color: "#E5E7EB" }}
          />
          <Legend />
        </PieChart>
        </ResponsiveContainer>

      </div>

    </motion.div>
  )
});

export default KeywordDistributionChart