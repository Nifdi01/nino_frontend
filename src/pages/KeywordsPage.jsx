import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { TrendingUp,  TrendingDown, WholeWord, Key } from "lucide-react";
import KeywordsTable from "../components/keywords/KeywordsTable";
import { useEffect, useState } from "react";
import { getKeywordStatistics } from "../services/statistics";
import { getKeywords } from "../services/keywords";

const KeywordsPage = () => {
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
					<StatCard name='Keywords' icon={WholeWord} value={statistics?.keywordCount || 'None'} color='#8B5CF6' />
                    <StatCard name='Least Active' icon={TrendingDown} value={statistics?.leastFrequentKeywordName  || 'None'} color='#6366F1' />
					<StatCard name='Most Active' icon={TrendingUp} value={statistics?.mostFrequentKeywordName  || 'None'} color='#EF4444' />
                </motion.div>

                {/* Table of Sources */}
                <KeywordsTable setStatistics={setStatistics} />
            </main>
        </div>
    )
};

export default KeywordsPage;