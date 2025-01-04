import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { Rss, Search, TrendingUp, TrendingDown } from "lucide-react";
import ScrapingBySourceChart from "../components/overview/ScrapingBySourceChart";
import SourceTable from "../components/sources/SourceTable";
import SourcePlatformDistribution from "../components/sources/SourcePlatformDistribution";
import { getSources } from '../services/sources';
import { useState, useEffect } from "react";
import { getSourceStatistics } from "../services/statistics";
import { getPlatforms } from "../services/platforms";

const SourcesPage = () => {
    const [sources, setSources] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [platforms, setPlatform] = useState([]);

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

    useEffect(() => {
        async function fetchSources() {
            try {
                const sources = await getSources();
                setSources(sources);
            } catch (error) {
                console.error("Failed to fetch sources:", error);
            }
        }
        fetchSources();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const platformData = await getPlatforms();
                setPlatform(platformData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
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
                <SourceTable sources={sources} platforms={platforms} setSources={setSources} setStatistics={setStatistics} />
            </main>
        </div>
    )
};

export default SourcesPage;