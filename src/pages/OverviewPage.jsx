import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { Rss, Search, Globe, Newspaper } from "lucide-react";
import ScrapeOverviewChart from "../components/overview/ScrapeOverviewChart";
import KeywordDistribution from "../components/overview/KeywordDistributionChart";
import ScrapingBySourceChart from "../components/overview/ScrapingBySourceChart";
import { useState, useEffect } from "react";
import { getOverviewStatistics } from "../services/statistics";

const OverviewPage = () => {
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        async function fetchStatistics() {
            try {
                const statisticsData = await getOverviewStatistics();  // Rename variable to avoid shadowing state variable
                setStatistics(statisticsData);  // Update state with the fetched data
            } catch (error) {
                console.log(error);
            }
        }
        fetchStatistics();  // Call fetchStatistics inside useEffect
    }, []);


    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Overview" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StatCard name='News' icon={Newspaper} value={statistics?.newsCount} color='#6366F1' />
                    <StatCard name='Sources' icon={Rss} value={statistics?.sourceCount} color='#8B5CF6' />
                    <StatCard name='Top Source' icon={Globe} value={statistics?.mostFrequentSource || 'None'} color='#EF4444' />
                    <StatCard name='Top Keyword' icon={Search} value={statistics?.mostFrequentKeywordName || 'None'} color='#EF4444' />
                </motion.div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ScrapingBySourceChart />
                    <KeywordDistribution />
                    <ScrapeOverviewChart />
                </div>
            </main>
        </div>
    )
};

export default OverviewPage;