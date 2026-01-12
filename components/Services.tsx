import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { SectionId } from '../types';
import { useGlobalImages } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

const Services: React.FC = () => {
  const { getImage } = useGlobalImages();

  return (
    <section id={SectionId.SERVICES} className="py-32 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            生态系统
          </h2>
          <hr className="border-gray-200 dark:border-white/10 transition-colors duration-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const imageId = `service-img-${index}`;
            const imageSrc = getImage(imageId, service.image);

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 bg-gray-100 dark:bg-[#111] border border-transparent dark:border-white/5 transition-colors duration-300">
                  <motion.img 
                    src={imageSrc} 
                    alt={service.title}
                    className="object-cover w-full h-full opacity-100 dark:opacity-80 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <ImageUploader id={imageId} />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm dark:border dark:border-white/10 transition-colors duration-300 pointer-events-none">
                    <service.icon size={20} className="text-black dark:text-white transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;