import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Wifi, Zap, Coffee, MapPin, ArrowUpRight } from 'lucide-react';
import { useGlobalImages } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

const BentoGrid: React.FC = () => {
  const { getImage } = useGlobalImages();
  
  const img1Id = 'bento-workspace';
  const img1Src = getImage(img1Id, "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800");

  const imgMapId = 'bento-map';
  // Default fallback for map texture
  const imgMapSrc = getImage(imgMapId, "https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/118.87,28.97,9,0/400x400?access_token=Pk.mock"); 
  // Note: Since mapbox mock url might not work perfectly as a replaced image if user uploads a photo, we treat it as generic bg.

  return (
    <section id={SectionId.BENTO} className="py-32 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            不仅仅是代码。<br/>
            <span className="text-gray-400 dark:text-gray-600">这是生活方式的重构。</span>
          </h2>
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

          {/* Card 2: Speed/Tech (Span 1 col, 1 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 bg-white dark:bg-[#111] rounded-3xl p-6 border border-gray-100 dark:border-white/5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10Gbps</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">光纤直连骨干网</div>
            </div>
          </motion.div>

          {/* Card 3: Coffee/Lifestyle (Span 1 col, 2 row) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 bg-black dark:bg-white text-white dark:text-black rounded-3xl p-6 flex flex-col relative overflow-hidden group"
          >
             <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div className="w-10 h-10 bg-white/20 dark:bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Coffee size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-bold mb-2">有机生活</h3>
                   <p className="text-sm opacity-70 leading-relaxed">
                     这里的每一杯咖啡都来自公平贸易，每一餐食材都采摘自我们的有机农场。
                   </p>
                </div>
             </div>
             {/* Abstract circle decoration */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
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
                 <div className="font-bold">衢州 · 烂柯山</div>
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