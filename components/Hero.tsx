import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionId } from '../types';
import { useGlobalImages } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

const Hero: React.FC = () => {
  const { getImage } = useGlobalImages();
  const heroImageId = 'hero-bg-main';
  const defaultImage = "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=2500";
  const imageSrc = getImage(heroImageId, defaultImage);

  return (
    <section id={SectionId.HERO} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gray-900 transition-colors duration-300 group/hero">
      
      {/* Background Image: Deep Moody Forest */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageSrc} 
          alt="Deep Forest" 
          className="w-full h-full object-cover scale-105" 
          style={{ animation: 'zoom 30s infinite alternate ease-in-out' }}
        />
        {/* CSS for slow zoom animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes zoom {
            0% { transform: scale(1.0); }
            100% { transform: scale(1.1); }
          }
        `}} />
        
        <ImageUploader id={heroImageId} />
        
        {/* Overlay layers for text readability and theme adaptation */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/50 transition-colors duration-300 pointer-events-none"></div>
        
        {/* Gradient overlays for top/bottom integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/80 dark:from-black/60 dark:via-transparent dark:to-black/90 transition-colors duration-300 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/70 dark:bg黑/40 border border-white/20 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-6 backdrop-blur-md shadow-sm">
            始于2025
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-8 transition-colors duration-300 drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-500 to-amber-500 dark:from-amber-400 dark:via-amber-400 dark:to-amber-400">
              当硅谷
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-300 dark:to-yellow-400">
              遇见旷野
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 dark:text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed transition-colors duration-300 drop-shadow-md text-shadow-sm">
            全球首个封闭开发庄园及基地<br className="hidden md:block"/>
            于自然中编码，向未来去部署
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
             <button onClick={() => document.getElementById(SectionId.GITHUB)?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 rounded-full bg-black/80 dark:bg-white/90 text-white dark:text-black text-lg font-medium hover:scale-105 shadow-xl backdrop-blur-md transition-all duration-300 border border-transparent dark:border-white/50">
              探索技术
            </button>
            <button onClick={() => document.getElementById(SectionId.SERVICES)?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 rounded-full bg-white/60 dark:bg-black/40 border border-white/40 dark:border-white/20 text-gray-900 dark:text-white text-lg font-medium hover:bg-white/80 dark:hover:bg-black/60 hover:scale-105 backdrop-blur-md transition-all duration-300 shadow-lg">
              查看服务
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-800 dark:text-white/80 z-10 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={32} strokeWidth={2} />
      </motion.div>
    </section>
  );
};

export default Hero;