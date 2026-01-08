import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { useGlobalImages } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

const Concept: React.FC = () => {
  const { getImage } = useGlobalImages();
  const conceptImgId = 'concept-main';
  const conceptImgSrc = getImage(conceptImgId, "https://picsum.photos/id/16/800/1200");

  return (
    <section id={SectionId.CONCEPT} className="py-32 bg-black dark:bg-black text-white relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute inset-0 bg-gray-50 dark:bg-black transition-colors duration-300"></div>

      {/* Noise Texture - subtle on both */}
      <div className="absolute inset-0 opacity-10 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white transition-colors duration-300">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">乡村硅谷</span>
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed transition-colors duration-300">
              <p>
                我们坚信，AI 的下一个突破不会发生在拥挤的城市办公室，而将诞生于寂静之中。
              </p>
              <p>
                我们的园区提供高速光纤、私有 GPU 集群和极简主义的生活空间，环绕着 500 英亩的原生态森林。
              </p>
              <p>
                这里是构建未来的地方，远离当下的喧嚣。
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl group"
          >
             <img 
               src={conceptImgSrc} 
               alt="Nature and Tech" 
               className="object-cover w-full h-full opacity-90 dark:opacity-60 transition-opacity duration-300"
             />
             <ImageUploader id={conceptImgId} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
             
             {/* Overlay Text */}
             <div className="absolute bottom-10 left-10 pointer-events-none">
               <div className="text-6xl font-bold text-white mb-2">01</div>
               <div className="text-xl font-medium tracking-widest uppercase text-gray-300">专注</div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Concept;