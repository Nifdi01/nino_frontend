import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { Rss, Search, TrendingUp, TrendingDown } from "lucide-react";
import SourceTable from "../components/sources/SourceTable";
import { useState, useEffect } from "react";
import { getSourceStatistics } from "../services/statistics";

const SourcesPage = () => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        async function fetchStatistics() {
            try {
                const statisticsData = await getSourceStatistics();  // Rename variable to avoid shadowing state variable
                setStatistics(statisticsData);  // Update state with the fetched data
            } catch (error) {
                console.error(error);
            }
        }
        fetchStatistics();  // Call fetchStatistics inside useEffect
    }, []);

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Sources" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StatCard name='Sources' icon={Rss} value={statistics?.total} color='#8B5CF6' />
                    <StatCard name='Least Active' icon={TrendingDown} value={statistics?.least_active?.name || 'None'} color='#6366F1' />
                    <StatCard name='Most Active' icon={TrendingUp} value={statistics?.most_active?.name || 'None'} color='#EF4444' />
                    <StatCard name='Top Platform' icon={Search} value={statistics?.top_platform?.name || 'None'} color='#EF4444' />
                </motion.div>

                {/* Table of Sources */}
                <SourceTable setStatistics={setStatistics} />
            </main>
        </div>
    )
};

export default SourcesPage;