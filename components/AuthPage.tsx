import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, Lock, User, Eye, EyeOff, CreditCard, Cpu, ShieldCheck, Database, ScanLine, Wifi, Loader2, HardDrive, Zap, Copy, Check, AlertTriangle, RefreshCw, KeyRound } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { mintPass, verifyPass, resetPassword, initDemoData } from '../services/passService';

// Text Scrambler Component for the ID generation effect
const ScrambleText = ({ text, isActive, onComplete }: { text: string, isActive: boolean, onComplete?: () => void }) => {
  const [display, setDisplay] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  useEffect(() => {
    if (!isActive) {
      setDisplay(text || 'SVP-XXXX-XXXX');
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
      
      iterations += 1 / 3; // Speed of decoding
    }, 30);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return <span className="font-mono">{display}</span>;
};

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'mint' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useRouter();
  
  // Minting Process State: 0=Idle, 1=Connecting, 2=Generating, 3=Writing, 4=Success
  const [mintStep, setMintStep] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Derived state for success
  const isSuccess = mintStep === 4;

  // Form State
  const [mintName, setMintName] = useState('');
  const [mintEmail, setMintEmail] = useState('');
  const [mintPassword, setMintPassword] = useState('');
  
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [resetId, setResetId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');

  const [statusMsg, setStatusMsg] = useState('');
  const [generatedPassId, setGeneratedPassId] = useState<string>('');

  useEffect(() => {
    initDemoData();
  }, []);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mintName || !mintEmail || !mintPassword) return;

    setLoading(true);
    setMintStep(1); // Step 1: Connecting
    setStatusMsg('正在连接加密网络...');
    
    // Step 1 Duration
    await new Promise(r => setTimeout(r, 1500));
    
    setMintStep(2); // Step 2: Generating ID (Scramble effect starts)
    setStatusMsg('正在计算唯一标识...');
    const tempPass = mintPass(mintName, mintEmail, mintPassword);
    setGeneratedPassId(tempPass.id);

    // Step 2 Duration (Wait for scramble to visually process)
    await new Promise(r => setTimeout(r, 2000));

    setMintStep(3); // Step 3: Writing to Chip
    setStatusMsg('正在写入生物特征芯片...');
    
    // Step 3 Duration
    await new Promise(r => setTimeout(r, 1500));

    // Step 4: Success - Stop here, do not auto-redirect
    setMintStep(4);
    setStatusMsg('通行证铸造完成。请保存您的凭证。');
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('验证通行证 ID...');

    setTimeout(() => {
      const user = verifyPass(loginId, loginPassword);
      if (user) {
        setStatusMsg('验证通过。欢迎回来。');
        setTimeout(() => navigate('home'), 800);
      } else {
        setStatusMsg('访问被拒绝：ID 或密码错误。');
        setLoading(false);
      }
    }, 1200);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetId || !resetEmail || !resetNewPassword) return;

    setLoading(true);
    setStatusMsg('正在检索用户档案...');
    
    await new Promise(r => setTimeout(r, 1000));

    const success = resetPassword(resetId, resetEmail, resetNewPassword);
    
    if (success) {
      setStatusMsg('安全验证通过。密钥已重置。');
      await new Promise(r => setTimeout(r, 1000));
      setMode('login');
      setLoginId(resetId); // Auto fill for convenience
      setLoginPassword(resetNewPassword);
      setStatusMsg('请使用新密码登录。');
    } else {
      setStatusMsg('错误：ID 与注册邮箱不匹配。');
    }
    setLoading(false);
  };

  const toggleMode = (newMode: 'login' | 'mint' | 'reset') => {
    setMode(newMode);
    setStatusMsg('');
    setMintStep(0);
    setGeneratedPassId('');
    if (newMode === 'reset') {
        setResetId(loginId);
    }
  };

  const copyToClipboard = () => {
    if (!generatedPassId) return;
    navigator.clipboard.writeText(generatedPassId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Shared Input Class for Apple Style
  const inputClass = "w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-300 ease-out focus:outline-none focus:bg-white dark:focus:bg-black focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300 dark:hover:border-white/20";
  const orangeInputClass = "w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-300 ease-out focus:outline-none focus:bg-white dark:focus:bg-black focus:border-orange-500/80 focus:ring-4 focus:ring-orange-500/10 hover:border-gray-300 dark:hover:border-white/20";

  // --- High Tech Card Component ---
  const SiliconValleyCard = () => {
    const displayId = 
      mode === 'mint' && mintStep < 2 ? 'SVP-XXXX-XXXX' :
      mode === 'mint' && mintStep >= 2 ? generatedPassId :
      mode === 'reset' ? (resetId || 'RECOVERY-MODE') :
      (loginId || 'SVP-XXXX-XXXX');
    
    const displayName =
      mode === 'mint' ? (mintName || 'NEW USER') :
      mode === 'reset' ? 'VERIFYING...' :
      'AUTHORIZED USER';

    return (
      <motion.div 
        className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden transition-all duration-500"
        animate={isSuccess ? { 
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)" 
        } : { 
          scale: 1,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* 1. Background Layer */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0">
          {(mintStep === 1 || loading) && (
             <motion.div 
               className={`absolute inset-0 bg-gradient-to-b ${mode === 'reset' ? 'from-orange-500/20' : 'from-blue-500/20'} to-transparent h-[20%]`}
               animate={{ top: ['-20%', '120%'] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             />
          )}
          
          {mode === 'reset' && (
              <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay"></div>
          )}

          <motion.div 
             className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black"
             initial={{ opacity: 0 }}
             animate={{ opacity: isSuccess ? 1 : 0 }}
          />
        </div>

        {/* 2. Texture Layer */}
        <div className="absolute inset-0 opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        {/* 3. Progress Bar Layer */}
        {(mintStep === 3 || (mode === 'reset' && loading)) && (
          <div className="absolute bottom-0 left-0 h-1 bg-gray-800 w-full z-20">
            <motion.div 
              className={`h-full ${mode === 'reset' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]'}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* 4. Content Layer */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
          
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold shadow-inner relative overflow-hidden">
                 <AnimatePresence mode="wait">
                   {mode === 'reset' && <motion.div key="reset" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><RefreshCw size={20} className={`text-orange-400 ${loading ? 'animate-spin' : ''}`} /></motion.div>}
                   {mintStep === 1 && <motion.div key="wifi" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Wifi size={20} className="text-blue-400 animate-pulse" /></motion.div>}
                   {mintStep === 2 && <motion.div key="cpu" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><Cpu size={20} className="text-purple-400 animate-spin-slow" /></motion.div>}
                   {mintStep === 3 && <motion.div key="write" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><HardDrive size={20} className="text-orange-400 animate-pulse" /></motion.div>}
                   {(mintStep === 4 || (mintStep === 0 && mode !== 'reset')) && <motion.div key="done" initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}><ShieldCheck size={20} className={isSuccess ? "text-green-400" : "text-gray-400"} /></motion.div>}
                 </AnimatePresence>
              </div>
              <div>
                  <span className="block font-bold tracking-wider text-sm uppercase opacity-90">乡村硅谷 PASS</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${mode === 'reset' ? 'bg-orange-500' : 'bg-current'} animate-pulse`}></span>
                    <span className="text-[10px] text-gray-400 tracking-widest font-mono">
                      {mode === 'reset' ? 'SYSTEM_RECOVERY' :
                       mintStep === 1 ? 'CONNECTING...' :
                       mintStep === 2 ? 'COMPUTING...' :
                       mintStep === 3 ? 'WRITING...' :
                       mintStep === 4 ? 'AUTHORIZED' : 'READY'}
                    </span>
                  </div>
              </div>
            </div>
            
            <div className="relative">
               <Cpu className={`transition-colors duration-500 ${isSuccess ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : mode === 'reset' ? 'text-orange-500/50' : 'text-white/10'}`} size={48} />
               {mintStep === 3 && (
                 <motion.div 
                   className="absolute inset-0 bg-white/20"
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ repeat: Infinity, duration: 0.2 }}
                 />
               )}
            </div>
          </div>

          {/* Middle: ID Display */}
          <div className="relative py-4">
             {mintStep > 0 ? (
               <div className="font-mono text-xl md:text-2xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-lg break-all min-h-[32px]">
                 {mintStep === 1 ? (
                   <span className="text-white/30 animate-pulse">CONNECTING_NODE...</span>
                 ) : (
                   <ScrambleText 
                     text={generatedPassId} 
                     isActive={mintStep === 2} 
                   />
                 )}
               </div>
             ) : (
               <div className={`font-mono text-xl md:text-2xl tracking-[0.15em] ${mode === 'reset' ? 'text-orange-200' : 'text-gray-600'} break-all`}>
                  {displayId || 'SVP-XXXX-XXXX'}
               </div>
             )}
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end border-t border-white/10 pt-4">
              <div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">HOLDER</div>
                  <div className={`font-medium tracking-wide text-lg transition-colors duration-500 ${isSuccess ? 'text-white' : 'text-gray-500'}`}>
                      {displayName}
                  </div>
              </div>
              
              <div className="text-right">
                  <ScanLine className={`w-8 h-8 transition-all duration-500 ${isSuccess ? 'text-blue-400' : mode === 'reset' ? 'text-orange-400' : 'text-white/20'}`} />
              </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer pointer-events-none"></div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full flex bg-white dark:bg-black transition-colors duration-500 overflow-hidden relative"
    >
      
      {/* Navigation Back */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('home')}
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        返回
      </motion.button>

      {/* Admin Vault Link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('vault')}
        className="absolute top-8 right-8 z-50 flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-blue-600 transition-colors border border-gray-200 dark:border-white/10 hover:border-blue-500/50 bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
      >
        <Database size={14} />
        <span>数据保险库</span>
      </motion.button>

      {/* Main Content Area */}
      <div className="w-full flex flex-col md:flex-row">
        
        {/* Left: Input Area */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 relative z-10 bg-white dark:bg-black pt-24 md:pt-0">
          <div className="max-w-md w-full mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
                {mintStep === 4 ? '铸造成功' : 
                 mode === 'login' ? '身份验证' : 
                 mode === 'reset' ? '重置访问密钥' : '领取通行证'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {mintStep === 4 ? '请务必保存好您的通行证信息。' : 
                 mode === 'login' ? '请输入您的硅谷通行证 ID。' : 
                 mode === 'reset' ? '我们需要验证您的身份以重置权限。' :
                 '每人仅限领取一张，账号永久绑定。'}
              </p>
            </motion.div>

            {/* Active Forms */}
            <AnimatePresence mode="wait">
              {mintStep === 4 ? (
                  // Success State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 space-y-4"
                  >
                      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                          <ShieldCheck size={24} />
                          <span className="font-bold text-lg">身份已确认</span>
                      </div>
                      
                      <div className="bg-white dark:bg-black/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                        <p className="text-xs text-blue-600/60 dark:text-blue-400/60 mb-1 uppercase tracking-wider">您的唯一通行证 ID</p>
                        <div className="flex items-center justify-between gap-2">
                           <code className="font-mono text-lg font-bold text-blue-700 dark:text-blue-300 break-all">{generatedPassId}</code>
                           <button 
                             onClick={copyToClipboard}
                             className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 transition-colors"
                             title="复制 ID"
                           >
                             {copied ? <Check size={18} /> : <Copy size={18} />}
                           </button>
                        </div>
                      </div>

                      <div className="text-sm text-blue-800 dark:text-blue-200 bg-blue-100/50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50">
                        <p className="font-bold flex items-center gap-2 mb-2">
                          <AlertTriangle size={16} /> 
                          请严格保存通行证与账密
                        </p>
                        <p className="opacity-90 leading-relaxed text-xs">
                          以后登录失效可通过通行证直接登录。这是您恢复账户的唯一凭证。
                        </p>
                      </div>

                      <button
                        onClick={() => navigate('home')}
                        className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 mt-2"
                      >
                        我已安全保存，进入硅谷
                        <ArrowRight size={16} />
                      </button>
                  </motion.div>
              ) : mode === 'login' ? (
                // Login Form
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin} 
                  className="space-y-5"
                >
                   <div className="relative group">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" size={20} />
                      <input 
                        type="text" 
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        placeholder="通行证 ID (例如: SVP-2024-...)" 
                        className={inputClass}
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" size={20} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="密码" 
                        className={inputClass}
                      />
                      <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none z-10"
                      >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        type="button"
                        onClick={() => toggleMode('reset')}
                        className="text-xs font-medium text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        忘记密码 / 丢失密钥？
                      </button>
                    </div>

                    {statusMsg && (
                      <div className={`text-sm text-center ${statusMsg.includes('拒绝') ? 'text-red-500' : 'text-blue-500'}`}>
                        {statusMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black dark:bg-white text-white dark:text-black rounded-2xl py-4 font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {loading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : '验证进入'}
                    </button>
                </motion.form>
              ) : mode === 'reset' ? (
                // Reset Form
                <motion.form 
                  key="reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleReset} 
                  className="space-y-5"
                >
                   <div className="relative group">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors z-10" size={20} />
                      <input 
                        type="text" 
                        value={resetId}
                        onChange={(e) => setResetId(e.target.value)}
                        placeholder="待恢复的通行证 ID" 
                        className={orangeInputClass}
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors z-10" size={20} />
                      <input 
                        type="email" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="注册时绑定的邮箱" 
                        className={orangeInputClass}
                      />
                    </div>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors z-10" size={20} />
                      <input 
                        type="password"
                        value={resetNewPassword}
                        onChange={(e) => setResetNewPassword(e.target.value)}
                        placeholder="设置新密码" 
                        className={orangeInputClass}
                      />
                    </div>
                    
                    {statusMsg && (
                      <div className={`text-sm text-center font-mono animate-pulse flex items-center justify-center gap-2 ${statusMsg.includes('错误') ? 'text-red-500' : 'text-orange-500'}`}>
                         {loading && <Loader2 size={14} className="animate-spin" />}
                         {statusMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-orange-600 text-white rounded-2xl py-4 font-semibold text-lg hover:bg-orange-700 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                       {loading ? '正在处理...' : '重置访问权限'}
                    </button>
                    
                    <div className="text-center">
                      <button 
                        type="button"
                        onClick={() => toggleMode('login')}
                        className="text-sm text-gray-500 hover:text-black dark:hover:text-white"
                      >
                        取消
                      </button>
                    </div>
                </motion.form>
              ) : (
                // Mint Form
                <motion.form 
                  key="mint"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleMint} 
                  className="space-y-5"
                >
                   <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" size={20} />
                      <input 
                        type="text" 
                        value={mintName}
                        onChange={(e) => setMintName(e.target.value)}
                        placeholder="真实姓名" 
                        className={inputClass}
                        disabled={loading}
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" size={20} />
                      <input 
                        type="email" 
                        value={mintEmail}
                        onChange={(e) => setMintEmail(e.target.value)}
                        placeholder="联系邮箱" 
                        className={inputClass}
                        disabled={loading}
                      />
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors z-10" size={20} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={mintPassword}
                        onChange={(e) => setMintPassword(e.target.value)}
                        placeholder="设定密码" 
                        className={inputClass}
                        disabled={loading}
                      />
                       <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors focus:outline-none z-10"
                      >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    
                    {statusMsg && (
                      <div className="text-sm text-center text-blue-500 font-mono animate-pulse flex items-center justify-center gap-2">
                         {loading && mintStep < 4 && <Loader2 size={14} className="animate-spin" />}
                         {statusMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white rounded-2xl py-4 font-semibold text-lg hover:bg-blue-700 hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait"
                    >
                       {loading ? '正在处理...' : '领取唯一通行证'}
                    </button>
                </motion.form>
              )}
            </AnimatePresence>

            {!isSuccess && mode !== 'reset' && (
              <div className="mt-8 text-center">
                <button 
                   onClick={() => toggleMode(mode === 'login' ? 'mint' : 'login')}
                   disabled={loading}
                   className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline-offset-4 hover:underline transition-all disabled:opacity-50"
                >
                  {mode === 'login' ? '没有通行证？点击领取' : '已有通行证？返回验证'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Visual Area */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen bg-gray-100 dark:bg-[#080808] relative overflow-hidden flex items-center justify-center p-8 md:p-16">
           
           <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${mode === 'reset' ? 'from-orange-500/10' : 'from-blue-500/10'} via-transparent to-transparent transition-colors duration-1000`}></div>
           
           <div className="w-full max-w-md perspective-1000">
             <motion.div
               animate={{ 
                 rotateY: mode === 'mint' && !isSuccess ? 5 : -5,
                 scale: loading && mintStep < 4 ? 0.98 : 1
               }}
               transition={{ duration: 0.8 }}
             >
                <SiliconValleyCard />
             </motion.div>
             
             <div className="mt-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {mintStep === 4 ? '请确认凭证已保存' : 
                   mode === 'mint' ? '数字身份独一无二' : 
                   mode === 'reset' ? '安全恢复协议' : '高级别安全准入'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                  {mintStep === 4
                    ? '请点击左侧确认按钮进入乡村硅谷。'
                    : mode === 'reset'
                    ? '通过验证您的原始注册信息，我们可以重新生成并下发访问密钥。'
                    : (mode === 'mint' 
                        ? '您的硅谷通行证不仅是进入园区的钥匙，更是您在自然与代码共生社区中的永久身份证明。'
                        : '采用本地加密存储技术，确保您的数字行踪仅属于您自己。'
                      )
                  }
                </p>
             </div>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AuthPage;