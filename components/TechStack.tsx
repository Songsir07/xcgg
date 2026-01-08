import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Camera, Plus, X, UploadCloud, Heart, User, Loader2 } from 'lucide-react';
import { SectionId } from '../types';

// Mock Data for the Photo Wall
interface Moment {
  id: string;
  user: string;
  avatar: string;
  location: string;
  image: string;
  caption: string;
  likes: number;
  timestamp: number;
}

const INITIAL_MOMENTS: Moment[] = [
  {
    id: '1',
    user: 'Alex Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    location: 'Swiss Alps, Base Camp 1',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    caption: 'Deploying to prod from 3000m altitude. 🏔️💻',
    likes: 124,
    timestamp: Date.now()
  },
  {
    id: '2',
    user: 'Sarah Miller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    location: 'Kyoto, Zen Garden',
    image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&q=80&w=600',
    caption: 'Debugging with matcha. Silence is the best compiler.',
    likes: 89,
    timestamp: Date.now()
  },
  {
    id: '3',
    user: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    location: 'Bali, Ubud Hub',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
    caption: 'Morning standup beside the rice fields. 🌾',
    likes: 256,
    timestamp: Date.now()
  },
  {
    id: '4',
    user: 'Elena R.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    location: 'Iceland, Aurora Cabin',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600',
    caption: 'Coding under the northern lights. Unreal.',
    likes: 342,
    timestamp: Date.now()
  }
];

const STORAGE_KEY = 'rural_sv_moments_v1';

const TechStack: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);
  const [moments, setMoments] = useState<Moment[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMoments(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse moments", e);
        setMoments(INITIAL_MOMENTS);
      }
    } else {
      setMoments(INITIAL_MOMENTS);
    }
  }, []);

  const handleNewUpload = (moment: Moment) => {
    const updatedMoments = [moment, ...moments];
    setMoments(updatedMoments);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMoments));
    } catch (e) {
      alert("存储空间不足，无法保存更多照片。");
    }
  };
  
  return (
    <section id={SectionId.TECH} className="relative py-32 bg-[#050505] overflow-hidden min-h-[900px] flex flex-col items-center justify-center">
      
      {/* Background Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505]"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="flex items-center justify-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-[0.3em] mb-4">
               <Globe size={14} className="animate-spin-slow" />
               Global Nomad Network
             </div>
             <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
               全球游牧足迹
             </h2>
             <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
               我们的代码在云端运行，但我们的灵魂在旷野栖息。
               <br/>
               看看乡村硅谷的成员们正在世界的哪个角落创造未来。
             </p>
          </motion.div>

          {/* Upload Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsUploadOpen(true)}
            className="mt-8 group relative inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
          >
            <Camera size={18} className="text-white group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium text-white">上传我的视界</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </motion.button>
        </div>

        {/* --- The Holographic Globe & Orbit System --- */}
        <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center perspective-[1000px]">
          
          {/* Core Planet (Abstract) */}
          <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-blue-600/5 blur-3xl animate-pulse"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-[#000] flex items-center justify-center overflow-hidden z-20">
             {/* Grid Lines on Globe */}
             <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Wireframe_sphere.svg/1024px-Wireframe_sphere.svg.png')] bg-cover bg-center animate-spin-slow-reverse"></div>
             <div className="text-xs font-mono text-blue-400 text-center leading-tight z-10">
               RURAL<br/>SV<br/>HQ
             </div>
          </div>

          {/* Orbit Rings */}
          {[1, 2, 3].map((ring) => (
            <div 
              key={ring}
              className="absolute rounded-full border border-white/5"
              style={{
                width: `${ring * 30 + 30}%`,
                height: `${ring * 30 + 30}%`,
                transform: `rotateX(60deg) rotateY(${ring * 10}deg)`,
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)'
              }}
            />
          ))}

          {/* Floating Orbiting Cards */}
          <div className="absolute inset-0 z-30 pointer-events-none">
             {moments.map((moment, idx) => {
               // Determine abstract position based on index to distribute them
               // We limit display to max 12 items to prevent crowding
               if (idx >= 12) return null;
               
               const total = Math.min(moments.length, 12);
               const angle = (idx / total) * 360;
               // Vary radius slightly for depth
               const radius = 30 + (idx % 3) * 10; 
               
               return (
                 <OrbitingItem 
                    key={moment.id} 
                    moment={moment} 
                    angle={angle} 
                    radius={radius} 
                    delay={idx * 2}
                    onClick={() => setActiveMoment(moment)}
                 />
               );
             })}
          </div>

        </div>

      </div>

      {/* --- Modals --- */}
      <AnimatePresence>
        {isUploadOpen && (
          <UploadModal 
            onClose={() => setIsUploadOpen(false)} 
            onUpload={handleNewUpload} 
          />
        )}
        {activeMoment && <DetailModal moment={activeMoment} onClose={() => setActiveMoment(null)} />}
      </AnimatePresence>

    </section>
  );
};

// --- Sub Components ---

const OrbitingItem: React.FC<{ moment: Moment; angle: number; radius: number; delay: number; onClick: () => void }> = ({ moment, angle, radius, delay, onClick }) => {
  // Using the index to offset the start rotation so they are spread out
  const duration = 40 + Math.random() * 20; // Random speed

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-auto"
      initial={{ rotate: angle }}
      animate={{ rotate: angle + 360 }}
      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
    >
      <div 
        className="absolute"
        style={{
          top: 0,
          left: `${radius}%`, 
          transform: `translate(-50%, -50%)`
        }}
      >
        <motion.div
           // Counter rotate to keep image upright
           initial={{ rotate: -angle }}
           animate={{ rotate: -(angle + 360) }}
           transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
        >
          <motion.div 
            whileHover={{ scale: 1.5, zIndex: 100 }}
            onClick={onClick}
            className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 border-white/20 overflow-hidden cursor-pointer shadow-2xl group bg-black hover:border-blue-400/50 transition-colors"
          >
             <img src={moment.image} alt={moment.location} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1">
                <span className="text-[8px] text-white font-medium truncate w-full">{moment.location}</span>
             </div>
             {/* Pulse ring indicating live status - show for recent uploads */}
             {Date.now() - moment.timestamp < 3600000 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black"></div>
             )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface UploadModalProps {
  onClose: () => void;
  onUpload: (moment: Moment) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("图片大小不能超过 5MB");
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!preview || !location) return;
    
    setIsProcessing(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      const newMoment: Moment = {
        id: Date.now().toString(),
        user: 'Anonymous Nomad', // In a real app, this would come from auth
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${Date.now()}`,
        location: location,
        caption: caption || '探索未知的边界...',
        image: preview,
        likes: 0,
        timestamp: Date.now()
      };
      
      onUpload(newMoment);
      setIsProcessing(false);
      setStep(2); // Show success
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-lg bg-[#1c1c1e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-white font-semibold text-lg">上传足迹</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>
        
        <div className="p-8">
           {step === 1 ? (
             <div className="space-y-6">
                {!preview ? (
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-400 group-hover:border-blue-500/50 group-hover:bg-white/5 transition-all">
                       <UploadCloud size={48} className="mb-4 group-hover:text-blue-400 transition-colors" />
                       <p className="text-sm font-medium">拖放照片或点击浏览</p>
                       <p className="text-xs text-gray-600 mt-2">支持 JPG, PNG (最大 5MB)</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden aspect-video group">
                     <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                     <button 
                       onClick={() => { setFile(null); setPreview(''); }}
                       className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                     >
                       <X size={16} />
                     </button>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">当前位置 *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="例如: 喜马拉雅山脉, 数字游民基地..." 
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">描述 (可选)</label>
                    <input 
                      type="text" 
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="这一刻的想法..." 
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>
             </div>
           ) : (
             <div className="text-center py-10">
               <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Camera size={32} />
               </div>
               <h4 className="text-white text-xl font-bold mb-2">上传成功！</h4>
               <p className="text-gray-400">您的足迹已永久保存在乡村硅谷网络中。</p>
             </div>
           )}
        </div>

        <div className="p-6 bg-black/30 flex justify-end gap-3">
          {step === 1 ? (
            <>
              <button onClick={onClose} className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white text-sm font-medium transition-colors">取消</button>
              <button 
                onClick={handleSubmit} 
                disabled={!preview || !location || isProcessing}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : '发布瞬间'}
              </button>
            </>
          ) : (
            <button onClick={onClose} className="w-full px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors">完成</button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const DetailModal: React.FC<{ moment: Moment; onClose: () => void }> = ({ moment, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={onClose}>
      <motion.div
        layoutId={`moment-${moment.id}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#0f0f10] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
         <div className="w-full md:w-2/3 bg-black relative">
            <img src={moment.image} alt={moment.location} className="w-full h-full object-contain md:object-cover" />
            <div className="absolute top-4 left-4">
               <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs border border-white/10">
                 <MapPin size={12} /> {moment.location}
               </span>
            </div>
         </div>
         <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col bg-[#0f0f10]">
            <div className="flex items-center gap-3 mb-6">
               <img src={moment.avatar} alt={moment.user} className="w-10 h-10 rounded-full bg-gray-800" />
               <div>
                 <h4 className="text-white font-semibold text-sm">{moment.user}</h4>
                 <p className="text-gray-500 text-xs">
                   {moment.timestamp ? new Date(moment.timestamp).toLocaleDateString() : '刚刚'}
                 </p>
               </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <p className="text-gray-300 text-sm leading-relaxed mb-8">
                "{moment.caption}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 mt-auto">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2 text-pink-500">
                    <Heart size={18} fill="currentColor" />
                    <span className="text-sm font-bold">{moment.likes}</span>
                 </div>
                 <span className="text-gray-600 text-xs">ID: {moment.id.substring(0, 8)}...</span>
              </div>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-xl transition-colors border border-white/10">
                 关注此游牧者
              </button>
            </div>
         </div>
      </motion.div>
    </div>
  );
};

export default TechStack;