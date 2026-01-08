import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Plane, Code2, Sparkles } from 'lucide-react';

type Mode = 'itinerary' | 'dev';

type Message = {
  from: 'ai' | 'user';
  text: string;
};

const AIButler: React.FC = () => {
  const [mode, setMode] = useState<Mode>('itinerary');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { from: 'ai', text: '你好，我是驻场管家。要做行程/报价，还是帮你拆需求、生成代码片段？' }
  ]);

  const quickPrompts = mode === 'itinerary'
    ? ['帮我安排 3 天封闭营行程并估价', '7 天包含 GPU 机房与餐饮的套餐？', '带 8 人团队，私有带宽怎么配？']
    : ['把这个接口需求拆成任务列表', '帮我生成 React + Tailwind 的表单骨架', '给一个 API 速率限制的中间件示例'];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    // TODO: 接入 Gemini 3 Pro，多模态/代码能力
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'ai', text: `（示例回复）我会根据「${text}」生成行程/代码草稿，并给出报价/任务拆分。` }]);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 w-[360px] max-w-[90vw] rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-2xl backdrop-blur z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-amber-300" />
          <span className="font-semibold">AI 驻场管家</span>
        </div>
        <div className="flex gap-2 text-xs bg-white/10 rounded-full p-1">
          <ModeTab active={mode === 'itinerary'} onClick={() => setMode('itinerary')} icon={<Plane size={14} />} label="行程/报价" />
          <ModeTab active={mode === 'dev'} onClick={() => setMode('dev')} icon={<Code2 size={14} />} label="研发助理" />
        </div>
      </div>

      <div className="max-h-[360px] overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm leading-relaxed ${m.from === 'ai' ? 'text-slate-200' : 'text-white'}`}>
            {m.from === 'ai' ? '管家：' : '我：'} {m.text}
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-3 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder={mode === 'itinerary' ? '例如：带 6 人封闭开发 5 天，需 2 间会议室和 GPU' : '贴上需求或问题，让我生成代码/任务拆解'}
            className="flex-1 bg-white/10 rounded-2xl px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={() => handleSend(input)}
            className="p-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold"
          >
            发送
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ModeTab = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1 px-2 py-1 rounded-full ${active ? 'bg-white/20 text-white' : 'text-slate-300'}`}
  >
    {icon}{label}
  </button>
);

export default AIButler;
