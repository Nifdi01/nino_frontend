import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { Newspaper, Search, TrendingUp,  TrendingDown } from "lucide-react";
import NewsList from "../components/news/NewsList";
import { useState, useEffect } from "react";
import { getNewsStatistics } from "../services/statistics";


const SourcesPage = () => {
    const [statistics, setStatistics] = useState({});
    
    useEffect(() => {
        async function fetchStatistics() {
            try {
                const statisticsData = await getNewsStatistics();  // Rename variable to avoid shadowing state variable
                setStatistics(statisticsData);  // Update state with the fetched data
            } catch (error) {
                console.error(error);
            }
        }
        fetchStatistics();  // Call fetchStatistics inside useEffect
    }, []);

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="News" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
					<StatCard name='News' icon={Newspaper} value={statistics?.newsCount} color='#8B5CF6' />
                    <StatCard name='Least Active' icon={TrendingDown} value={statistics?.leastFrequentSourceName} color='#6366F1' />
					<StatCard name='Most Active' icon={TrendingUp} value={statistics?.mostFrequentSourceName} color='#EF4444' />
					<StatCard name='Top Platform' icon={Search} value={statistics?.mostFrequentPlatformName} color='#EF4444' />
                </motion.div>

                {/* Table of Sources */}
                <NewsList />
            </main>
        </div>
    )
};

export default SourcesPage;