import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, ExternalLink, X, Building2, Users, Upload, Trash2, Loader2, Plus } from 'lucide-react';
import { useGlobalImages, GalleryItem } from '../context/ImageContext';
import ImageUploader from './ImageUploader';

// --- Data ---
// Fallback data if user hasn't uploaded anything yet
const DEFAULT_DATA: GalleryItem[] = [
  { id: 't1', timestamp: 1, image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800' },
  { id: 't2', timestamp: 2, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800' },
  { id: 't3', timestamp: 3, image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800' },
  { id: 't4', timestamp: 4, image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800' },
  { id: 't5', timestamp: 5, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
  { id: 't6', timestamp: 6, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800' },
  { id: 't7', timestamp: 7, image: 'https://images.unsplash.com/photo-1628336706938-1a5c60205cb6?auto=format&fit=crop&q=80&w=800' },
  { id: 't8', timestamp: 8, image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3dab?auto=format&fit=crop&q=80&w=800' },
];

// --- 3D Sphere Component ---
const InteractiveSphere: React.FC = () => {
  const { govGallery } = useGlobalImages();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  // Ref for auto-rotation accumulation (avoids jumps when pausing)
  const autoRotationRef = useRef(0);
  // Ref for hover state to be accessible inside animation loop
  const isHoveringRef = useRef(false);
  
  // Use persistent data if available, otherwise use default fallback
  const displayItems = govGallery.length > 0 ? govGallery : DEFAULT_DATA;
  
  // Configuration
  const radius = 400; 
  const autoRotateSpeed = 0.012; // Significantly faster speed (approx 0.7 degrees per frame)

  // Generate spherical coordinates using Fibonacci Sphere algorithm based on DYNAMIC length
  const points = useMemo(() => {
    const count = displayItems.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    return displayItems.map((item, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      // Safe check for single item to avoid NaN
      const ySafe = isNaN(y) ? 0 : y; 
      
      const radiusAtY = Math.sqrt(1 - ySafe * ySafe);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return { ...item, x: x * radius, y: ySafe * radius, z: z * radius };
    });
  }, [displayItems]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse distance from center
      targetRotationY = (e.clientX - centerX) * 0.0005; 
      targetRotationX = -(e.clientY - centerY) * 0.0005;
    };

    const animate = () => {
      // Smooth interpolation (Lerp) for mouse interaction
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      
      // Auto Rotate Logic
      // Only increment rotation if NOT hovering
      if (!isHoveringRef.current) {
        autoRotationRef.current += autoRotateSpeed;
      }
      
      // Combine manual mouse rotation (Y-axis tilt) + auto continuous rotation (Y-axis spin)
      const finalY = currentRotationY + autoRotationRef.current;
      
      // Gentle X-axis wave
      const finalX = currentRotationX + Math.sin(Date.now() * 0.001) * 0.05; 

      setRotation({ x: finalX, y: finalY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[900px] flex items-center justify-center perspective-[2000px] overflow-hidden bg-[#050505]" ref={containerRef}>
       
       {/* Background Aesthetics */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]"></div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

       {/* Central Tech Core */}
       <div className="absolute z-0 w-[400px] h-[400px] rounded-full border border-white/5 flex items-center justify-center animate-spin-slow-reverse opacity-50 pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full border border-dashed border-white/10"></div>
       </div>
       <div className="absolute z-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6] animate-pulse"></div>

       {/* 3D Items */}
       <div className="relative z-10 w-full h-full flex items-center justify-center transform-style-3d">
          {points.map((point) => {
             // Apply Rotation Matrix
             const cosX = Math.cos(rotation.x);
             const sinX = Math.sin(rotation.x);
             const cosY = Math.cos(rotation.y);
             const sinY = Math.sin(rotation.y);

             // Rotate around Y axis
             let x1 = point.x * cosY - point.z * sinY;
             let z1 = point.z * cosY + point.x * sinY;
             
             // Rotate around X axis
             let y1 = point.y * cosX - z1 * sinX;
             let z2 = z1 * cosX + point.y * sinX;

             // Perspective projection
             const fov = 1200;
             const scale = fov / (fov - z2);
             const alpha = Math.max(0.1, (z2 + radius) / (2 * radius)); // Opacity based on depth
             const isFront = z2 > 0;
             const blur = isFront ? 0 : (1 - alpha) * 8;

             return (
               <motion.div
                 key={point.id}
                 className="absolute top-1/2 left-1/2 cursor-pointer group"
                 style={{
                   x: x1,
                   y: y1,
                   scale: scale,
                   zIndex: Math.floor(z2 + radius),
                   opacity: Math.max(0.15, alpha),
                   filter: `blur(${blur}px)`,
                 }}
                 onClick={() => setActiveImage(point.image)}
                 onMouseEnter={() => isHoveringRef.current = true}
                 onMouseLeave={() => isHoveringRef.current = false}
               >
                  {/* Glassmorphism Card Style */}
                  <div 
                    className={`relative w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 bg-white/5 border border-white/10 ${isFront ? 'hover:scale-105 hover:border-white/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]' : ''}`}
                  >
                     <img src={point.image} alt="Gov Event" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                     
                     {/* Shine Effect */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
               </motion.div>
             );
          })}
       </div>

       {/* Fullscreen Lightbox Modal */}
       <AnimatePresence>
         {activeImage && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
             onClick={() => setActiveImage(null)}
             onMouseEnter={() => isHoveringRef.current = true} // Pause background if overlay is open
           >
             <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
                onClick={() => setActiveImage(null)}
             >
                <X size={32} />
             </button>

             <motion.img 
               layoutId="active-image"
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               src={activeImage} 
               alt="Gallery Fullscreen" 
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto cursor-default"
               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
             />
           </motion.div>
         )}
       </AnimatePresence>

    </div>
  );
};

const NewsPage: React.FC = () => {
  const { getImage, addGovGalleryImages, clearGovGallery, govGallery } = useGlobalImages();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const heroImageId = 'news-milan-video-cover';
  const defaultImage = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000";
  const imageSrc = getImage(heroImageId, defaultImage);
  
  const videoLink = "https://www.weibo.com/2334162530/Pdmd8rWu0";

  // Handle Batch Upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      try {
        await addGovGalleryImages(e.target.files);
      } catch (err) {
        alert("上传出现问题，请重试");
      } finally {
        setIsUploading(false);
        // Reset input value to allow re-uploading same files if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = async () => {
    if(window.confirm('确定要清空所有上传的图集照片吗？将恢复默认演示图片。')) {
      await clearGovGallery();
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-black transition-colors duration-300">
      
      {/* 1. Milan Story Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 pb-32">
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
        >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                Featured Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
               米兰的 AI 农庄梦
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
                见证乡村与未来的连接点
            </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl dark:shadow-none group cursor-pointer bg-gray-100 dark:bg-[#111]"
            onClick={() => window.open(videoLink, '_blank')}
        >
            <div className="absolute inset-0 overflow-hidden">
                <img 
                    src={imageSrc} 
                    alt="Milan Learning AI" 
                    className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <ImageUploader id={heroImageId} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] group-hover:bg-white/30 transition-all duration-300"
                >
                    <Play fill="currentColor" size={32} className="ml-1 opacity-90" />
                </motion.div>
            </div>

            <div className="absolute top-6 right-6 z-10">
                <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Watch on Weibo</span>
                    <ExternalLink size={12} />
                </div>
            </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-16 max-w-3xl mx-auto"
        >
            <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-800 dark:text-gray-200 text-justify">
                    “米兰对于 AI 的学习进入到了尾声，在这期间，她有过担心，怕大家看着她都像看着‘怪物’一样，担心她自己在村里格格不入。
                </p>
                <div className="my-8 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                    不过在最后她还是实现了从零到一的突破，知道了如何用 AI 辅助自己完成表格，还给自己的“米兰农庄”做了一个官网。
                </p>
            </div>

            <div className="mt-12 flex justify-center">
                 <a 
                    href={videoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                 >
                    观看完整视频
                    <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                 </a>
            </div>
        </motion.div>

      </div>

      {/* 2. Government Collaboration Section */}
      <section className="relative pt-20 pb-0 bg-[#050505] overflow-hidden group/control">
         {/* Section Header */}
         <div className="relative z-20 max-w-7xl mx-auto px-6 mb-8 text-center">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <div className="flex items-center justify-center gap-3 mb-6">
                 <Building2 className="text-blue-500" size={24} />
                 <span className="h-px w-12 bg-blue-500/50"></span>
                 <Users className="text-blue-500" size={24} />
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                 政企联动 · 影像纪实
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
                 乡村硅谷与衢州市政府合作瞬间
               </p>

               {/* Admin Controls: Upload Gallery */}
               <div className="flex justify-center gap-4 opacity-0 group-hover/control:opacity-100 transition-opacity duration-300">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <button 
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {isUploading ? '正在上传...' : '上传图集 (支持多选)'}
                  </button>
                  {govGallery.length > 0 && (
                    <button 
                      onClick={handleClear}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-red-500/20 text-white/70 hover:text-red-400 rounded-full text-sm font-medium transition-colors border border-white/10 hover:border-red-500/30"
                    >
                      <Trash2 size={16} />
                      清空
                    </button>
                  )}
               </div>
            </motion.div>
         </div>

         {/* 3D Earth Gallery */}
         <div className="relative z-10 w-full">
            <InteractiveSphere />
         </div>
      </section>

    </div>
  );
};

export default NewsPage;