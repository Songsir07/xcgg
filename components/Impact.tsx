import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Users, GraduationCap, Phone, Mail, MapPin } from 'lucide-react';

const Impact: React.FC = () => {
  return (
    <section id={SectionId.IMPACT} className="py-32 bg-gray-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <h4 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-4 text-sm">我们的使命</h4>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">
               AI 不应只是城市的特权。<br/>
               <span className="text-gray-400 dark:text-gray-500">让技术在城乡生根。</span>
             </h2>
             <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
               乡村硅谷致力于“AI 平权”。我们不仅提供顶级的开发环境，更致力于消除数字鸿沟。
             </p>
          </motion.div>
        </div>

        {/* Feature: Education (AI Charity Lecture) - Full Width Display */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="w-full bg-black dark:bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-transparent shadow-2xl flex flex-col lg:flex-row gap-12 lg:gap-20 text-white dark:text-black overflow-hidden relative"
        >
           {/* Decorative blob */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

           {/* Left Content */}
           <div className="flex-1 relative z-10 flex flex-col justify-center">
             <div className="w-14 h-14 bg-white/20 dark:bg-black/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <GraduationCap size={28} />
             </div>
             <h3 className="text-3xl md:text-4xl font-bold mb-6">技术平权Ai公益讲堂</h3>
             <p className="text-lg opacity-80 mb-8 leading-relaxed">
               乡村硅谷与浙江省衢州市当地政府展开多次 AI 公益培训课，覆盖整个衢州市及周边地区学员，并建立了活跃的学员社区。帮助村民掌握 DeepSeek、豆包 等 AI 工具的使用，让老人用 AI 写诗，让孩子用 AI 作画。
             </p>
             <ul className="space-y-4 mb-8 opacity-90">
               <li className="flex items-center gap-4 text-lg">
                 <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-black/5 flex items-center justify-center shrink-0">
                    <Users size={20} />
                 </div>
                 <span>累计参与培训与学习体验 1,000+ 人次</span>
               </li>
               <li className="flex items-center gap-4 text-lg">
                 <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-black/5 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                 </div>
                 <span>覆盖衢州市及周边乡镇社区</span>
               </li>
             </ul>
           </div>

           {/* Right Content: Contact Info Card */}
           <div className="lg:w-[420px] relative z-10 flex flex-col justify-center bg-white/10 dark:bg-black/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 dark:border-black/5">
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                  报名与咨询
                </h4>
                <div className="space-y-8 text-base opacity-90">
                  <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                         <Phone size={24} /> 
                      </div>
                      <div>
                        <div className="text-xs opacity-60 uppercase tracking-wider mb-1.5">联系电话</div>
                        <a href="tel:19703681290" className="text-xl font-mono font-bold tracking-tight hover:text-blue-400 dark:hover:text-blue-600 transition-colors">19703681290</a>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                         <Mail size={24} /> 
                      </div>
                      <div className="overflow-hidden">
                         <div className="text-xs opacity-60 uppercase tracking-wider mb-1.5">电子邮箱</div>
                         <a href="mailto:yanghui@deepwork.cn" className="text-lg font-medium hover:text-blue-400 dark:hover:text-blue-600 transition-colors truncate block">yanghui@deepwork.cn</a>
                      </div>
                  </div>

                  <div className="flex items-start gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/5 flex items-center justify-center shrink-0 mt-1 group-hover:bg-blue-500/20 transition-colors">
                         <MapPin size={24} /> 
                      </div>
                      <div>
                         <div className="text-xs opacity-60 uppercase tracking-wider mb-1.5">基地地址</div>
                         <span className="text-lg font-medium leading-snug block">浙江省衢州市衢江区<br/>峡川镇东坪村99号乡村硅谷</span>
                      </div>
                  </div>
                </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Impact;