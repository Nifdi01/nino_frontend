import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { TrendingUp,  TrendingDown, WholeWord, Key } from "lucide-react";
import KeywordsTable from "../components/keywords/KeywordsTable";
import KeywordDistributionChart from "../components/overview/KeywordDistributionChart";
import { useEffect, useState } from "react";
import { getKeywordStatistics } from "../services/statistics";
import { getKeywords } from "../services/keywords";

const KeywordsPage = () => {
    const [keywords, setKeywords] = useState([]);
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        async function fetchStatistics(){
            try {
                const statisticsData = await getKeywordStatistics();
                setStatistics(statisticsData);
            } catch (error){
                console.error(error);
            }
        }
        fetchStatistics();
    }, []);


    useEffect(() => {
        async function fetchKeywords() {
            try {
                const keywords = await getKeywords();
                setKeywords(keywords);
            } catch (error){
                console.error(error);
            }
        }
        fetchKeywords();
    }, []);

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Keywords" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
					<StatCard name='Keywords' icon={WholeWord} value={statistics?.total || 'None'} color='#8B5CF6' />
                    <StatCard name='Least Active' icon={TrendingDown} value={statistics?.least_frequent?.name  || 'None'} color='#6366F1' />
					<StatCard name='Most Active' icon={TrendingUp} value={statistics?.most_frequent?.name  || 'None'} color='#EF4444' />
                </motion.div>

                {/* Table of Sources */}
                <KeywordsTable keywords={keywords} setKeywords={setKeywords} setStatistics={setStatistics} />

                {/* CHARTS */}
                <div className="grid grid-cols-1 mt-8">
                    <KeywordDistributionChart />
                    {/* <SourcePlatformDistribution /> */}
                </div>
            </main>
        </div>
    )
};

export default KeywordsPage;