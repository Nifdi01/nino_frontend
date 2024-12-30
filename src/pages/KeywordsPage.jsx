import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { TrendingUp,  TrendingDown, WholeWord, Key } from "lucide-react";
import KeywordsTable from "../components/keywords/KeywordsTable";
import KeywordDistributionChart from "../components/overview/KeywordDistributionChart";
const SourcesPage = () => {
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
					<StatCard name='Keywords' icon={WholeWord} value='432' color='#8B5CF6' />
                    <StatCard name='Least Active' icon={TrendingDown} value='Grozny' color='#6366F1' />
					<StatCard name='Most Active' icon={TrendingUp} value='AZAL' color='#EF4444' />
                </motion.div>

                {/* Table of Sources */}
                <KeywordsTable />

                {/* CHARTS */}
                <div className="grid grid-cols-1 mt-8">
                    <KeywordDistributionChart />
                    {/* <SourcePlatformDistribution /> */}
                </div>
            </main>
        </div>
    )
};

export default SourcesPage;