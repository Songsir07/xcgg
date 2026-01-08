import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wifi, Coffee, Monitor, Users, Maximize, Star, ArrowRight, Image as ImageIcon, ChevronLeft, ChevronRight, Check, Zap, Mountain } from 'lucide-react';

// Mock Data
const ROOM_TYPES = [
  {
    id: 'cloud-cabin',
    title: '云端·代码舱',
    description: '专为独行黑客设计的极简空间。配备人体工学椅、升降桌与 27寸 4K 显示器。落地窗直面云海，灵感零延迟。',
    coverImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505693416388-b0346efee539?auto=format&fit=crop&q=80&w=1200'
    ],
    price: { weekday: 499, weekend: 699, holiday: 899 },
    features: ['10G 光纤', '升降桌', '人体工学椅', '胶囊咖啡机'],
    size: '35㎡',
    capacity: '1-2人'
  },
  {
    id: 'valley-villa',
    title: '山谷·行政墅',
    description: '适合小型团队封闭开发的独栋别墅。拥有独立会议室、白板墙与私有服务器机柜。让团队在自然中找回心流。',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-225efc41f471?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-225efc41f471?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200'
    ],
    price: { weekday: 2499, weekend: 3299, holiday: 4599 },
    features: ['独立会议室', '私有 GPU 机柜', 'PS5 游戏区', '开放式厨房'],
    size: '180㎡',
    capacity: '4-6人'
  }
];

const RoomGallery: React.FC = () => {
  const [activeRoomId, setActiveRoomId] = useState(ROOM_TYPES[0].id);
  const activeRoom = ROOM_TYPES.find(r => r.id === activeRoomId) || ROOM_TYPES[0];

  return (
    <div className="py-12 w-full px-4">
      <div className="max-w-6xl mx-auto relative h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl group isolate">
        
        {/* Background Image Transition */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeRoom.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 -z-10"
          >
             <img 
               src={activeRoom.coverImage} 
               alt={activeRoom.title} 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content Container */}
        <div className="relative h-full p-8 md:p-16 flex flex-col justify-center max-w-2xl">
            
            {/* Creative Switcher */}
            <div className="flex items-center gap-2 mb-10 bg-white/10 backdrop-blur-xl w-fit p-1.5 rounded-full border border-white/10 shadow-lg">
                {ROOM_TYPES.map((room) => (
                    <button
                        key={room.id}
                        onClick={() => setActiveRoomId(room.id)}
                        className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                            activeRoomId === room.id ? 'text-gray-900' : 'text-white hover:bg-white/10'
                        }`}
                    >
                        {activeRoomId === room.id && (
                            <motion.div
                                layoutId="activePill"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {room.id === 'cloud-cabin' ? <Zap size={16}/> : <Mountain size={16}/>}
                            {room.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Text Content with Animation */}
            <motion.div
                key={activeRoom.id + "content"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center gap-3 mb-6 text-white/90">
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md text-sm font-medium border border-white/10">
                        <Maximize size={14} /> {activeRoom.size}
                    </span>
                    <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md text-sm font-medium border border-white/10">
                        <Users size={14} /> {activeRoom.capacity}
                    </span>
                </div>

                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                    {activeRoom.title}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-lg font-light">
                    {activeRoom.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                    {activeRoom.features.map((feature, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-center gap-3 text-gray-100"
                        >
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                                <Check size={12} className="text-blue-400" />
                            </div>
                            <span className="text-sm font-medium tracking-wide">{feature}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Price & Action */}
                <div className="flex items-center gap-8">
                    <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting from</div>
                        <div className="text-4xl font-bold text-white flex items-baseline gap-1">
                            <span className="text-2xl">¥</span>
                            {activeRoom.price.weekday}
                            <span className="text-sm text-gray-400 font-normal">/ 晚</span>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-white text-black hover:bg-blue-50 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center gap-2 group transform hover:-translate-y-1">
                        立即预订
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoomGallery;
