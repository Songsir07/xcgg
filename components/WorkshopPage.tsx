import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, Code, Sparkles, Terminal, Cpu, X, Zap } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

// Types for the gift content
interface GiftCard {
  id: number;
  author: string;
  role: string;
  message: string;
  codeSnippet: string;
}

const GIFTS: GiftCard[] = [
  {
    id: 1,
    author: "Alex.Z",
    role: "首席架构师",
    message: "愿你的堆栈永不溢出，愿你的系统如松树般常青。",
    codeSnippet: "while(isChristmas) { joy++; bugCount = 0; }"
  },
  {
    id: 2,
    author: "Sarah.L",
    role: "AI 研究员",
    message: "送你一个拟合完美的模型，预测你新的一年全是好运。",
    codeSnippet: "model.predict(newYear) => 'Fortune'"
  },
  {
    id: 3,
    author: "David.W",
    role: "DevOps",
    message: "这是部署在云端的祝福，具有 99.999% 的高可用性。",
    codeSnippet: "kubectl apply -f happiness.yaml"
  }
];

const WorkshopPage: React.FC = () => {
  const { navigate } = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeGift, setActiveGift] = useState<GiftCard | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Mouse Move for Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Handle Retina Display
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // --- Particle System Configuration ---
    const particles: Particle[] = [];
    const treeHeight = Math.min(height * 0.7, 600);
    const treeWidth = Math.min(width * 0.4, 300);
    const particleCount = width < 768 ? 800 : 2000; // More particles on desktop

    class Particle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      radius: number;
      color: string;
      originalX: number = 0;
      originalZ: number = 0;
      originalY: number = 0;
      angle: number;
      speed: number;
      yOffset: number;
      decay: number;
      type: 'tree' | 'snow' | 'sparkle';

      constructor(type: 'tree' | 'snow' | 'sparkle') {
        this.type = type;
        this.angle = Math.random() * Math.PI * 2;
        this.yOffset = Math.random() * treeHeight;
        
        if (type === 'tree') {
          // Spiral Logic
          const spiral = (treeHeight - this.yOffset) / treeHeight; // 1 at bottom, 0 at top
          const radius = spiral * treeWidth + Math.random() * 20;
          
          this.originalX = Math.cos(this.angle) * radius;
          this.originalZ = Math.sin(this.angle) * radius;
          this.originalY = this.yOffset - treeHeight / 2 + 50; // Center vertically
          
          this.radius = Math.random() * 2 + 0.5;
          // Tech Colors: Cyan, Blue, Gold, White
          const colors = ['rgba(56, 189, 248, ', 'rgba(234, 179, 8, ', 'rgba(255, 255, 255, ', 'rgba(168, 85, 247, '];
          const chosenColor = colors[Math.floor(Math.random() * colors.length)];
          this.color = chosenColor;
          this.decay = Math.random() * 0.5 + 0.5; // Opacity
          this.speed = 0.005 + Math.random() * 0.01;

        } else if (type === 'snow') {
          this.x = Math.random() * width - width / 2;
          this.y = Math.random() * height - height / 2;
          this.z = Math.random() * 500 - 250;
          this.radius = Math.random() * 1.5 + 0.5;
          this.color = 'rgba(255, 255, 255, ';
          this.speed = Math.random() * 1 + 0.5;
          this.decay = Math.random() * 0.5 + 0.2;
          this.angle = 0; // Not used for rotation
          this.yOffset = 0; // Not used
        } else {
             // Sparkle
             this.x = 0; this.y = 0; this.z = 0; this.radius = 0; this.color = ''; this.speed = 0; this.decay = 0;
        }
      }

      update(time: number, mouseX: number, mouseY: number) {
        if (this.type === 'tree') {
          // Rotate tree
          this.angle += this.speed;
          
          // Mouse interaction (gentle tilt)
          const tiltX = mouseY * 0.1;
          const tiltY = mouseX * 0.1;

          // 3D Rotation Math around Y axis
          let x = Math.cos(this.angle + tiltY) * Math.sqrt(this.originalX**2 + this.originalZ**2);
          let z = Math.sin(this.angle + tiltY) * Math.sqrt(this.originalX**2 + this.originalZ**2);
          let y = this.originalY + Math.sin(time * 0.001 + this.yOffset * 0.01) * 5; // Breathing effect

          // Simple Projection
          const fov = 800;
          const scale = fov / (fov + z + 400); // 400 is camera distance
          
          this.x = x * scale + width / 2;
          this.y = (y + tiltX * 100) * scale + height / 2;
          this.radius = (Math.random() * 1.5 + 0.5) * scale;
          this.z = z; // Store z for sorting
          
          // Twinkle
          this.decay = 0.5 + Math.sin(time * 0.005 + this.originalY) * 0.4;

        } else if (this.type === 'snow') {
          this.y += this.speed;
          this.x += Math.sin(time * 0.001 + this.z) * 0.5;

          if (this.y > height / 2) {
            this.y = -height / 2;
            this.x = Math.random() * width - width / 2;
          }

          // Simple 3D projection for snow depth
          const fov = 800;
          const scale = fov / (fov + this.z + 400);
          
          const screenX = this.x * scale + width / 2;
          const screenY = this.y * scale + height / 2;

          // Only return screen coords, don't mutate state x/y for projection
          return { x: screenX, y: screenY, scale };
        }
      }

      draw(ctx: CanvasRenderingContext2D, coords?: {x: number, y: number, scale: number}) {
        ctx.beginPath();
        if (this.type === 'tree') {
           ctx.fillStyle = `${this.color}${this.decay})`;
           ctx.shadowBlur = this.radius * 5;
           ctx.shadowColor = this.color + '1)';
           ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        } else if (this.type === 'snow' && coords) {
           ctx.fillStyle = `rgba(255, 255, 255, ${this.decay})`;
           ctx.shadowBlur = 0;
           ctx.arc(coords.x, coords.y, this.radius * coords.scale, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle('tree'));
    }
    for (let i = 0; i < 200; i++) {
      particles.push(new Particle('snow'));
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 16;
      ctx.clearRect(0, 0, width, height);

      // Sort particles by Z for depth buffering effect
      // We only strictly sort tree particles for performance, snow can be overlay
      particles.sort((a, b) => b.z - a.z);

      // 1. Draw Background Glow (The "Northern Lights" effect)
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      gradient.addColorStop(0, 'rgba(20, 50, 80, 0.4)'); // Deep Blue Center
      gradient.addColorStop(0.5, 'rgba(10, 20, 40, 0.1)'); 
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Particles
      // Use lighter composite for "holographic" additive blending
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach(p => {
        if (p.type === 'tree') {
          p.update(time, mousePos.x * 2, mousePos.y * 2);
          p.draw(ctx);
        } else {
          const coords = p.update(time, 0, 0);
          if (coords) p.draw(ctx, coords as any);
        }
      });

      // 3. Draw The Star (Radiant Light at Top)
      // Calculate top of tree position
      const fov = 800;
      const starScale = fov / (fov + 400); // approximate
      const starX = width / 2;
      const starY = ((-treeHeight / 2 + 50) + mousePos.y * 200) * starScale + height / 2;
      
      const starGlow = ctx.createRadialGradient(starX, starY, 2, starX, starY, 60);
      starGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      starGlow.addColorStop(0.2, 'rgba(255, 255, 200, 0.8)');
      starGlow.addColorStop(0.5, 'rgba(234, 179, 8, 0.3)');
      starGlow.addColorStop(1, 'rgba(234, 179, 8, 0)');
      
      ctx.fillStyle = starGlow;
      ctx.beginPath();
      ctx.arc(starX, starY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Draw Star Core
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(starX, starY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over'; // Reset

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]); // Re-run effect logic if mousePos logic needs deep integration, but here we use ref/state inside loop mostly

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-[#050505] selection:bg-yellow-500/30 selection:text-yellow-200 font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* Background Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#020617] to-black z-0 pointer-events-none"></div>

      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Floating UI Elements - The "Ornaments" */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        {/* We place interactive elements relative to center */}
        <div className="relative w-full h-full max-w-4xl max-h-[800px]">
           {GIFTS.map((gift, index) => {
             // Position gifts in a triangle/orbit around the tree
             const positions = [
               { top: '30%', left: '20%' },
               { top: '60%', right: '20%' },
               { top: '75%', left: '30%' }
             ];
             const pos = positions[index % positions.length];
             
             return (
               <motion.div
                 key={gift.id}
                 className="absolute pointer-events-auto cursor-pointer group"
                 style={pos}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5 + index * 0.2, type: 'spring', stiffness: 100 }}
                 whileHover={{ scale: 1.1 }}
                 onClick={() => setActiveGift(gift)}
               >
                 {/* Glass Ornament */}
                 <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {/* Inner sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Gift className="text-white/80 group-hover:text-yellow-300 transition-colors" size={28} />
                 </div>
                 
                 {/* Floating Label */}
                 <motion.div 
                   className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-xs font-medium text-white/60 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm"
                   animate={{ y: [0, 5, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 >
                   来自 {gift.author}
                 </motion.div>
               </motion.div>
             )
           })}
        </div>
      </div>

      {/* Header UI */}
      <div className="absolute top-0 left-0 w-full z-30 p-6 md:p-12 flex justify-between items-start pointer-events-none">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('home')}
          className="pointer-events-auto flex items-center gap-3 text-white/70 hover:text-white transition-all bg-white/5 hover:bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-lg group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">HQ Headquarters</span>
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-right"
        >
          <div className="flex items-center justify-end gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-[0.2em] font-mono">Live System</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight drop-shadow-sm">
            Workshop
          </h1>
          <p className="text-xs md:text-sm text-blue-200/50 font-light mt-1 tracking-wider uppercase">
            Rural Silicon Valley · Holiday Edition
          </p>
        </motion.div>
      </div>

      {/* Footer Quote */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-0 w-full text-center z-20 pointer-events-none"
      >
        <p className="text-white/20 text-xs font-mono tracking-[0.3em]">
          CODE_IS_POETRY // NATURE_IS_CANVAS
        </p>
      </motion.div>

      {/* Gift Popup Modal (Apple Style) */}
      <AnimatePresence>
        {activeGift && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]" onClick={() => setActiveGift(null)}>
            <motion.div
              layoutId={`gift-${activeGift.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              {/* Card Header Gradient */}
              <div className="h-32 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 relative flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-lg flex items-center justify-center text-black">
                    <Sparkles size={32} />
                 </div>
                 <button 
                   onClick={() => setActiveGift(null)}
                   className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-colors"
                 >
                   <X size={18} />
                 </button>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                 <div className="mb-6">
                   <h3 className="text-2xl font-bold text-white mb-1">{activeGift.author}</h3>
                   <p className="text-xs font-medium text-blue-400 uppercase tracking-widest">{activeGift.role}</p>
                 </div>
                 
                 <p className="text-gray-300 leading-relaxed mb-8 font-light italic">
                   "{activeGift.message}"
                 </p>

                 {/* Code Snippet Box */}
                 <div className="bg-black/50 rounded-xl p-4 text-left border border-white/5 mb-8 group relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                       <Terminal size={12} className="text-gray-500" />
                       <span className="text-[10px] text-gray-500 font-mono">gift.tsx</span>
                    </div>
                    <code className="font-mono text-sm text-green-400 block overflow-x-auto pb-1">
                      {activeGift.codeSnippet}
                    </code>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                 </div>

                 <button 
                   onClick={() => setActiveGift(null)}
                   className="w-full bg-white text-black font-semibold py-3.5 rounded-2xl hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                 >
                   <Cpu size={18} />
                   收入囊中 (Merge)
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WorkshopPage;