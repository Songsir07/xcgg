import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mountain, Monitor, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { SectionId } from '../types';
import { useGlobalImages } from '../context/ImageContext';

type TabKey = 'lodge' | 'outdoor' | 'workspace';

const DEFAULTS: Record<TabKey, string[]> = {
  lodge: [
    'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1600', // Added for demo
  ],
  outdoor: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1600', // Added for demo
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1600', // Added for demo
  ],
  workspace: [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600',
    'https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=1600', // Added for demo
  ]
};

const CATEGORIES = [
  { 
    key: 'workspace' as const, 
    title: 'OFFICE', 
    subtitle: '办公环境', 
    desc: '极客圣殿，灵感光纤 / Tech Sanctuary',
    icon: Monitor,
    color: 'from-blue-500 to-indigo-500'
  },
  { 
    key: 'outdoor' as const, 
    title: 'NATURE', 
    subtitle: '户外环境', 
    desc: '野性生长，自然重启 / Wild Reboot',
    icon: Mountain,
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    key: 'lodge' as const, 
    title: 'LIVING', 
    subtitle: '住宿环境', 
    desc: '云端安睡，代码同频 / Dream Sync',
    icon: Zap,
    color: 'from-orange-500 to-amber-500'
  },
];

const Accommodation: React.FC = () => {
  const { getImage } = useGlobalImages();
  const [activeTab, setActiveTab] = useState<TabKey>('workspace');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Get current images based on active tab
  const currentCategory = CATEGORIES.find(c => c.key === activeTab)!;
  const currentImages = DEFAULTS[activeTab].map((url, i) => ({
      id: `habitat-${activeTab}-${i}`,
      src: getImage(`habitat-${activeTab}-${i}`, url)
  }));

  // Handlers for Lightbox
  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % currentImages.length);
  };
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! - 1 + currentImages.length) % currentImages.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, currentImages.length]);

  return (
    <section id={SectionId.ACCOMMODATION} className="w-full bg-white relative pt-24 pb-24 overflow-hidden min-h-screen flex flex-col">
       {/* Background decorative elements */}
       <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-50/80 to-transparent pointer-events-none" />
       
       <div className="max-w-[100rem] mx-auto px-6 md:px-12 w-full relative z-10">
          {/* Header */}
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="flex items-center gap-3 mb-4"
               >
                 <div className="h-px w-8 bg-gray-400" />
                 <span className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400">Lifestyle Redesign</span>
               </motion.div>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]"
               >
                 HABITAT
               </motion.h2>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-4 p-1.5 rounded-2xl bg-gray-100/50 border border-gray-200 backdrop-blur-sm self-start md:self-end">
                {CATEGORIES.map((cat) => {
                  const isActive = activeTab === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveTab(cat.key)}
                      className={`relative px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 overflow-hidden group ${
                        isActive ? 'text-white shadow-lg' : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute inset-0 bg-gradient-to-r ${cat.color}`}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2">
                        <cat.icon size={16} className={isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900"} />
                        <span>{cat.subtitle}</span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Description of current category */}
          <motion.div 
             key={activeTab}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4 }}
             className="mb-12 flex items-center gap-4 text-gray-500"
          > 
             <div className={`p-2 rounded-lg bg-gradient-to-r ${currentCategory.color} text-white shadow-md`}>
                <currentCategory.icon size={20} />
             </div>
             <p className="text-lg md:text-xl font-medium tracking-wide">
               {currentCategory.desc}
             </p>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div 
             key={`grid-${activeTab}`}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
             }}
          >
             {currentImages.map((img, i) => (
               <motion.div 
                 key={img.id}
                 layoutId={img.id}
                 variants={{
                   hidden: { opacity: 0, scale: 0.9, y: 20 },
                   visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.3 } }
                 }}
                 className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in border border-gray-100 bg-gray-50 ${
                   i % 3 === 0 ? 'md:col-span-2 md:aspect-[2/1]' : 'md:aspect-square'
                 }`}
                 onClick={() => openLightbox(i)}
               >
                 <img 
                   src={img.src} 
                   alt={currentCategory.title} 
                   className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                 />
                 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 flex items-center gap-2">
                           <Maximize2 size={14} /> View Large
                        </span>
                    </div>
                 </div>
               </motion.div>
             ))}
          </motion.div>
       </div>

       {/* Lightbox Modal */}
       <AnimatePresence>
          {selectedImageIndex !== null && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                onClick={closeLightbox}
             >
                <div className="absolute top-6 right-6 z-50">
                   <button 
                     onClick={closeLightbox}
                     className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                   >
                     <X size={24} />
                   </button>
                </div>

                <button 
                   onClick={prevImage}
                   className="absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors hidden md:block"
                >
                   <ChevronLeft size={32} />
                </button>

                <motion.div 
                   key={selectedImageIndex}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   drag="x"
                   dragConstraints={{ left: 0, right: 0 }}
                   dragElastic={1}
                   onDragEnd={(e, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -10000) { nextImage(); }
                      else if (swipe > 10000) { prevImage(); }
                   }}
                   className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center select-none"
                   onClick={(e) => e.stopPropagation()}
                >
                   <img 
                      src={currentImages[selectedImageIndex].src} 
                      alt="Full screen"
                      className="w-full h-full object-contain pointer-events-none rounded-sm shadow-2xl"
                   />
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 text-sm font-mono border border-white/10">
                      {selectedImageIndex + 1} / {currentImages.length}
                   </div>
                </motion.div>

                <button 
                   onClick={nextImage}
                   className="absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors hidden md:block"
                >
                   <ChevronRight size={32} />
                </button>
             </motion.div>
          )}
       </AnimatePresence>
    </section>
  );
};

export default Accommodation;
