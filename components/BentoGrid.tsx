import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Wifi, PawPrint, Zap, MapPin, ArrowUpRight } from 'lucide-react';
import { useGlobalImages } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

const BentoGrid: React.FC = () => {
  const { getImage } = useGlobalImages();
  
  const img1Id = 'bento-workspace';
  const img1Src = getImage(img1Id, "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800");

  const imgCommId = 'bento-community';
  const imgCommSrc = getImage(imgCommId, "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800");

  const imgMapId = 'bento-map';
  // Default fallback for map texture
  const imgMapSrc = getImage(imgMapId, "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/118.87,28.97,9,0/400x400?access_token=Pk.mock"); 
  // Note: Since mapbox mock url might not work perfectly as a replaced image if user uploads a photo, we treat it as generic bg.

  return (
    <section id={SectionId.BENTO} className="py-32 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white">
              不仅仅是代码，
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600">
              这是工作方式的深度重构
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[180px]">
          
          {/* Card 1: Large Image (Span 2 col, 2 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl"
          >
            <img 
              src={img1Src} 
              alt="Office View" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <ImageUploader id={img1Id} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 text-white pointer-events-none">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium inline-block mb-2">Workspace</div>
              <h3 className="text-2xl font-bold">落地窗前的灵感</h3>
            </div>
          </motion.div>

          {/* Card 2: Pet Friendly (Span 1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 bg-orange-100 dark:bg-orange-950/30 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
          >
            {/* Paw backgrounds */}
            <div className="absolute top-2 right-2 text-orange-200 dark:text-orange-900/40 transform rotate-12 scale-150">
               <PawPrint size={80} />
            </div>
            
            <div className="relative z-10 w-10 h-10 bg-orange-200 dark:bg-orange-800/40 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400">
               <PawPrint size={20} />
            </div>
            
            <div className="relative z-10">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Meow!</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">萌宠友好，欢迎带猫上班</div>
              <div className="mt-2 flex -space-x-1">
                 {/* Fake avatars of pets */}
                 <div className="w-5 h-5 rounded-full bg-yellow-200 border border-white"></div>
                 <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                 <div className="w-5 h-5 rounded-full bg-amber-700 border border-white"></div>
                 <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[8px] text-gray-500">+2</div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: AI Tools Navigation (Span 1 col, 2 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-gray-900 to-black rounded-3xl p-6 flex flex-col relative overflow-hidden group border border-white/5"
          >
             {/* Background Matrix/Grid effect */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
             
             <div className="relative z-10 mb-4">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Zap size={16} className="text-white" />
                   </div>
                   <span className="text-white font-bold text-lg">AI 探索站</span>
                </div>
                <p className="text-xs text-gray-400">精选 AI 工具箱</p>
             </div>

             <div className="relative z-10 flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar mask-gradient-b">
                {[
                  { name: 'Kimi', desc: '智能助手', url: 'https://kimi.moonshot.cn', icon: '🌙' },
                  { name: '即梦 AI', desc: '创意绘画', url: 'https://jimeng.jianying.com', icon: '🎨' },
                  { name: '魔搭社区', desc: '模型工坊', url: 'https://www.modelscope.cn', icon: '🤖' },
                  { name: '可灵 AI', desc: '视频生成', url: 'https://klingai.kuaishou.com', icon: '🎬' },
                ].map((tool, i) => (
                  <a 
                    key={i}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/item"
                  >
                     <span className="text-2xl group-hover/item:scale-110 transition-transform">{tool.icon}</span>
                     <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-200 truncate">{tool.name}</div>
                        <div className="text-[10px] text-gray-500 truncate">{tool.desc}</div>
                     </div>
                     <ArrowUpRight size={14} className="text-gray-500 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                  </a>
                ))}
             </div>
             
             {/* Bottom overlay for scroll hint */}
             <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          </motion.div>

          {/* Card 4: Location (Span 1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 bg-blue-600 dark:bg-blue-600 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer"
          >
             <div 
               className="absolute inset-0 bg-cover opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
               style={{ backgroundImage: `url(${imgMapSrc})` }}
             ></div>
             <ImageUploader id={imgMapId} />

             <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
               <div className="flex justify-between items-start">
                  <MapPin size={20} />
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div>
                 <div className="font-bold">衢州 · 东坪村</div>
                 <div className="text-xs opacity-80">30.2°N, 120.1°E</div>
               </div>
             </div>
          </motion.div>

          {/* Card 5: Connectivity (Span 2 col, 1 row) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="md:col-span-2 md:row-span-1 bg-white dark:bg-[#111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-gray-300 dark:hover:border-white/20 transition-colors"
          >
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                 <Wifi size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 dark:text-white">全域 Wi-Fi 6 覆盖</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400">无论是在森林步道，还是溪边岩石。</p>
               </div>
             </div>
             <div className="hidden md:block">
               <div className="flex gap-1">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-1 bg-green-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s`}}></div>
                 ))}
               </div>
             </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default BentoGrid;