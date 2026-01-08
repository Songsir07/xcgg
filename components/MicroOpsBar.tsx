import React from 'react';
import { AlertTriangle, CalendarClock, UserCheck } from 'lucide-react';

const MicroOpsBar: React.FC = () => (
  <div className="mx-auto max-w-6xl px-6 py-4 mt-8 rounded-2xl border border-amber-200/40 bg-amber-50 text-amber-900 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <div className="flex items-center gap-3">
      <AlertTriangle size={18} className="text-amber-600" />
      <div className="text-sm">
        <div className="font-semibold">今日还剩 3 间房 / 8 个工位</div>
        <div className="text-amber-700">高峰周建议提前锁定档期。</div>
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm flex-wrap">
      <div className="flex items-center gap-1 text-emerald-700">
        <UserCheck size={16} /> 本周可预约导师：架构、AIGC、产品评审
      </div>
      <div className="flex items-center gap-1 text-slate-600">
        <CalendarClock size={16} /> 下次空档：周三 / 周五
      </div>
    </div>
    <div className="flex gap-2">
      <button className="px-3 py-2 rounded-xl bg-amber-600 text-white text-sm hover:bg-amber-700">预约档期</button>
      <button className="px-3 py-2 rounded-xl border border-amber-500 text-amber-700 text-sm hover:bg-white">联系顾问</button>
    </div>
  </div>
);

export default MicroOpsBar;
