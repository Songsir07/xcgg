import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Link as LinkIcon, MapPin, Mail, Users, BookOpen, GitFork } from 'lucide-react';
import { GITHUB_ORG_URL } from '../constants';
import { SectionId } from '../types';

const GitHubWindow: React.FC = () => {
  return (
    <section id={SectionId.GITHUB} className="py-32 bg-gray-50 dark:bg-black relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 transition-colors duration-300">开源开放。</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-light transition-colors duration-300">
            我们在 GitHub 上公开构建核心技术。透明、协作，与全球开发者共同定义乡村 AI 的未来。
          </p>
        </div>

        {/* Browser Window Component */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative w-full max-w-6xl mx-auto shadow-2xl rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-[#0d1117]"
        >
          {/* MacOS Window Header */}
          <div className="h-12 bg-[#f6f8fa] dark:bg-[#161b22] flex items-center px-4 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 relative z-20">
            <div className="flex gap-2 absolute left-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
            </div>
            
            {/* Address Bar */}
            <div className="mx-auto w-full max-w-xl">
              <div className="bg-white dark:bg-[#0d1117] h-7 rounded-md shadow-sm border border-gray-300 dark:border-gray-700 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium transition-colors duration-300 group cursor-default">
                 <div className="w-3 h-3 rounded-full bg-gray-400/20 group-hover:bg-blue-500/20 text-gray-500 group-hover:text-blue-500 transition-colors flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                 </div>
                 <span className="opacity-50">https://</span>
                 <span className="text-gray-900 dark:text-gray-200">github.com/Rural-Silicon-Valley</span>
              </div>
            </div>
          </div>

          {/* Browser Content (1:1 Replica of Organization Page) */}
          <div className="flex flex-col md:flex-row relative min-h-[600px]">
            
            {/* Sidebar (Left Profile) */}
            <div className="w-full md:w-[296px] p-4 md:pl-8 md:pr-4 flex flex-col items-start z-10 bg-white dark:bg-[#0d1117]">
               
               {/* Avatar */}
               <div className="mt-4 mb-4 relative group">
                  <div className="w-[200px] h-[200px] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-black flex items-center justify-center">
                    {/* Placeholder for the logo seen in screenshot */}
                    <div className="text-white font-bold text-2xl tracking-widest bg-gradient-to-br from-blue-600 to-cyan-500 w-full h-full flex flex-col items-center justify-center p-4 text-center">
                       <span>乡村</span>
                       <span>硅谷</span>
                       <span className="text-[10px] font-normal mt-2 opacity-80 uppercase tracking-normal">Rural Silicon Valley</span>
                    </div>
                  </div>
               </div>

               {/* Org Name */}
               <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                 硅谷农村
               </h1>
               
               {/* Bio */}
               <p className="text-gray-600 dark:text-gray-300 text-base mt-2 mb-4 leading-normal">
                 中国曲州的硅谷农村
               </p>
               
               {/* Meta Info */}
               <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 w-full mb-6">
                  <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                     <Users size={16} className="text-gray-500" /> 
                     <span className="font-semibold text-gray-900 dark:text-gray-200">4</span> 名追随者
                  </div>
                  <div className="flex items-center gap-2">
                     <MapPin size={16} className="text-gray-500" /> 
                     <span>中国</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                     <LinkIcon size={16} className="text-gray-500" /> 
                     <a href="http://www.deepwork.cn" target="_blank" rel="noreferrer" className="truncate">http://www.deepwork.cn</a>
                  </div>
                  <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                     <Mail size={16} className="text-gray-500" /> 
                     <a href="mailto:github@deepwork.cn">github@deepwork.cn</a>
                  </div>
               </div>
               
               <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-6"></div>

               <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">主要语言</h4>
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-full bg-[#f1e05a]"></span> JavaScript
                    <span className="w-3 h-3 rounded-full bg-[#3572A5]"></span> Python
                 </div>
                 <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="w-3 h-3 rounded-full bg-[#41b883]"></span> Vue
                    <span className="w-3 h-3 rounded-full bg-[#2b7489]"></span> TypeScript
                 </div>
               </div>
            </div>

            {/* Main Content (Right Repos) */}
            <div className="flex-1 p-4 md:pr-8 md:pt-8 bg-white dark:bg-[#0d1117]">
               
               {/* Tabs */}
               <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-4 sticky top-0 bg-white dark:bg-[#0d1117] z-10 pt-2">
                  <div className="px-4 py-2 border-b-2 border-[#fd8c73] font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 text-sm">
                    <BookOpen size={16} /> 概述
                  </div>
                  <div className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md flex items-center gap-2 text-sm transition-colors cursor-pointer">
                    <Github size={16} /> 存储库 <span className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full text-xs font-medium">29</span>
                  </div>
                  <div className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md flex items-center gap-2 text-sm transition-colors cursor-pointer">
                     项目
                  </div>
                  <div className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md flex items-center gap-2 text-sm transition-colors cursor-pointer">
                     套餐
                  </div>
                   <div className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md flex items-center gap-2 text-sm transition-colors cursor-pointer">
                     人物
                  </div>
               </div>

               <div className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">流行资料库</div>

               {/* Repo Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Repo 1 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group h-[140px]">
                     <div>
                        <div className="flex items-center justify-between mb-1">
                           <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm truncate pr-2">初学者生成式人工智能</a>
                           <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-2 rounded-full whitespace-nowrap">公共</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                           <GitFork size={12} /> 从 microsoft/generative-ai-for-beginners 分支出来
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                           21 课，开始用生成式人工智能构建
                        </p>
                     </div>
                     <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#DA5B0B]"></div> 朱皮特笔记本</div>
                        <div className="flex items-center gap-1 hover:text-blue-600"><ExternalLink size={12} /> 1</div>
                     </div>
                  </div>

                   {/* Repo 2 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group h-[140px]">
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">社区指南</a>
                           <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-2 rounded-full whitespace-nowrap">公共</span>
                        </div>
                     </div>
                  </div>

                   {/* Repo 3 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group h-[140px]">
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">游戏化-指南</a>
                           <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-2 rounded-full whitespace-nowrap">公共</span>
                        </div>
                     </div>
                  </div>

                   {/* Repo 4 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group h-[140px]">
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">Prompt_Learning</a>
                           <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-2 rounded-full whitespace-nowrap">公共</span>
                        </div>
                     </div>
                  </div>

                   {/* Repo 5 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group h-[140px]">
                     <div>
                        <div className="flex items-center justify-between mb-1">
                           <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">长篇小说GPT</a>
                           <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-2 rounded-full whitespace-nowrap">公共</span>
                        </div>
                         <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                           <GitFork size={12} /> 从 MaoXiaoYuZ/Long-Novel-GPT 分支而来
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                           该项目包括一个基于 GPT 等大语言模型的长篇小说生成器...
                        </p>
                     </div>
                     <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#3572A5]"></div> 蟒蛇</div>
                     </div>
                  </div>

                   {/* Repo 6 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group h-[140px]">
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <a href="#" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-sm">check_in_everday</a>
                           <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 px-2 rounded-full whitespace-nowrap">公共</span>
                        </div>
                     </div>
                  </div>

               </div>
               
               {/* Contributions Calendar (Visual Filler) */}
               <div className="mt-8">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-semibold text-gray-900 dark:text-white">过去一年的贡献</span>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-[#0d1117] flex items-center justify-center overflow-hidden">
                     <div className="flex gap-[3px] overflow-hidden opacity-80">
                         {Array.from({ length: 40 }).map((_, col) => (
                            <div key={col} className="flex flex-col gap-[3px]">
                               {Array.from({ length: 7 }).map((_, row) => {
                                  // Random green intensity
                                  const r = Math.random();
                                  let bg = "bg-[#ebedf0] dark:bg-[#161b22]";
                                  if (r > 0.9) bg = "bg-[#216e39]";
                                  else if (r > 0.8) bg = "bg-[#30a14e]";
                                  else if (r > 0.6) bg = "bg-[#40c463]";
                                  else if (r > 0.4) bg = "bg-[#9be9a8]";
                                  return <div key={row} className={`w-[11px] h-[11px] rounded-sm ${bg}`}></div>
                               })}
                            </div>
                         ))}
                     </div>
                  </div>
               </div>

            </div>

            {/* Overlay Action Button (Kept as per previous request for usability) */}
            <div className="absolute inset-0 bg-white/50 dark:bg-black/60 backdrop-blur-[2px] z-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500 group">
               <motion.a 
                 href={GITHUB_ORG_URL}
                 target="_blank"
                 rel="noreferrer"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
               >
                 <Github size={24} />
                 访问组织主页
                 <ExternalLink size={20} className="opacity-50" />
               </motion.a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default GitHubWindow;