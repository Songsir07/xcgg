import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, GitBranch, Clock3, Video, Link as LinkIcon } from 'lucide-react';

type SprintItem = {
  team: string;
  days: number;
  prs: number;
  completion: number; // 0-100
  velocity: string;
  demo?: string;
  tags: string[];
  summary: string;
};

const data: SprintItem[] = [
  {
    team: '北极星研发小队',
    days: 5,
    prs: 42,
    completion: 87,
    velocity: '峰值 11 次提交/天',
    demo: '#',
    tags: ['AI', 'Backend', 'Infra'],
    summary: '完成私有推理服务 MVP，接入团队 SSO，并跑通性能压测基线。'
  },
  {
    team: '深林移动端组',
    days: 3,
    prs: 18,
    completion: 72,
    velocity: '稳定 6 次提交/天',
    demo: '#',
    tags: ['Mobile', 'UI/UX'],
    summary: '交付 iOS 流水线和首版交互稿，埋点与灰度开关已接好。'
  }
];

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="rounded-xl bg-white/5 px-3 py-2 border border-white/5">
    <div className="flex items-center gap-2 text-slate-300">{icon}<span>{label}</span></div>
    <div className="text-white font-semibold mt-1">{value}</div>
  </div>
);

const SprintWall: React.FC = () => (
  <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white" aria-labelledby="sprint-wall-heading">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">封闭开发营 · 产出墙</p>
        <h2 id="sprint-wall-heading" className="text-4xl font-bold mt-3">3~7 天交付的真实产出</h2>
        <p className="text-slate-300 mt-3">展示团队在山谷里专注冲刺的节奏与成果，含 PR 数、完成度、Demo 与简要复盘。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((item, i) => (
          <motion.div
            key={item.team}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{item.team}</div>
                <div className="text-sm text-blue-200 mt-1">封闭冲刺 {item.days} 天</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <CheckCircle2 size={16} /> 完成度 {item.completion}%
              </div>
            </div>

            <p className="text-slate-200 mt-4 text-sm leading-relaxed">{item.summary}</p>

            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <Stat icon={<GitBranch size={16} />} label="PR 数" value={item.prs} />
              <Stat icon={<Clock3 size={16} />} label="提交节奏" value={item.velocity} />
              <Stat icon={<CheckCircle2 size={16} />} label="完成度" value={`${item.completion}%`} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-xs rounded-full bg-white/10">{tag}</span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4 text-sm">
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">
                <Video size={16} /> Demo 回放
              </button>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                <LinkIcon size={16} /> 提交记录
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SprintWall;
