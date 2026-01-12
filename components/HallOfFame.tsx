import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Coffee, Activity, Star } from 'lucide-react';
import { useGlobalImages } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

// 模拟数据：荣誉墙团队
const HALL_OF_FAME = [
  {
    id: 1,
        teamName: "白山云科技",
        project: "保密项目（受 NDA 约束）",
        duration: "15天",
        period: "2025年9月份",
    members: 6,
    achievements: [
      { icon: GitCommit, text: "Merged 142 PRs" },
      { icon: Coffee, text: "Consumed 400+ Espressos" },
      { icon: Activity, text: "V2.0 Mainnet Launch" }
    ],
    quote: "我们山间溪流封闭开发半个月，解决了困扰我们许久的问题",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    tags: ["Rust", "Solana", "Distributed Systems"]
  }
];

const HallOfFame: React.FC = () => {
  const { getImage } = useGlobalImages();
  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                    <Star size={14} className="fill-current" />
                    Hall of Fame
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    代码隐士荣誉墙
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    而在这些静谧山谷中，诞生了改变未来的代码。记录那些在此闭关、创造、突破的杰出团队。
                </p>
            </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-12">
          {HALL_OF_FAME.map((team, index) => {
            const teamImageSrc = getImage(`hof-${team.id}`, team.image);
            return (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="group relative bg-gray-50 dark:bg-[#111] rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              <div className="grid md:grid-cols-2 h-full">
                {/* Image Side */}
                <div className="relative h-64 md:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10"></div>
                    <img 
                        src={teamImageSrc} 
                        alt={team.teamName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <ImageUploader id={`hof-${team.id}`} />
                    <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        {team.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs font-medium bg-black/60 backdrop-blur-md text-white rounded border border-white/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 font-mono">
                                {team.period}，{team.duration}静修
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {team.teamName}
                        </h2>
                        <h3 className="text-lg text-emerald-600 dark:text-emerald-400 font-medium mb-6">
                            Project: {team.project}
                        </h3>

                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 mb-8 italic text-gray-600 dark:text-gray-300">
                            "{team.quote}"
                        </blockquote>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                            Sprint Achievements
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {team.achievements.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                    <item.icon size={20} className="text-blue-500 shrink-0" />
                                    <span className="text-sm font-medium leading-tight">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
            <p className="text-gray-500 dark:text-gray-500 mb-6">
                想要您的团队出现在这里？
            </p>
            <button className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-lg hover:shadow-blue-600/25">
                预订下一次闭关冲刺
            </button>
        </div>

      </main>
    </div>
  );
};

export default HallOfFame;
