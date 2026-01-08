import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Shield, Key, Eye, EyeOff, Lock, Database, Server } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { getAllPasses } from '../services/passService';
import { UserPass } from '../types';

const PassVault: React.FC = () => {
  const { navigate } = useRouter();
  const [passes, setPasses] = useState<UserPass[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPasses(getAllPasses());
  }, []);

  const togglePassword = (id: string) => {
    const newSet = new Set(visiblePasswords);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setVisiblePasswords(newSet);
  };

  const filteredPasses = passes.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('auth')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                 <Database size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                    <span className="font-bold tracking-tight text-gray-900 text-lg">数据保险库</span>
                    <span className="text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">绝密档案</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-green-600 flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            安全连接已建立
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">注册居民总数</div>
            <div className="text-4xl font-bold text-gray-900 flex items-end gap-2">
              {passes.length}
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-1.5">+12%</span>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">系统状态</div>
             <div className="text-xl font-bold text-green-600 flex items-center gap-2">
               <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
               运行正常
             </div>
          </div>
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="relative z-10">
               <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">最后同步</div>
               <div className="text-xl font-bold text-gray-900">刚刚</div>
             </div>
             <Server className="absolute right-4 bottom-4 text-gray-50 w-16 h-16 transform group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 relative max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索通行证 ID、姓名或邮箱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-14 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm text-base"
          />
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">通行证 ID</th>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">用户信息</th>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">访问密钥 (密码)</th>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider">签发日期</th>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPasses.map((pass) => (
                  <motion.tr 
                    key={pass.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="p-6">
                      <div className="font-mono text-blue-600 font-semibold bg-blue-50 inline-block px-2 py-1 rounded text-sm">{pass.id}</div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={pass.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200" />
                        <div>
                          <div className="text-gray-900 font-semibold">{pass.name}</div>
                          <div className="text-gray-500 text-xs">{pass.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3 bg-gray-50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                        <div className={`font-mono text-sm ${visiblePasswords.has(pass.id) ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                          {visiblePasswords.has(pass.id) ? pass.password : '••••••••••••'}
                        </div>
                        <button 
                          onClick={() => togglePassword(pass.id)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {visiblePasswords.has(pass.id) ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-gray-500 text-sm">
                        {new Date(pass.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                         活跃
                       </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPasses.length === 0 && (
             <div className="p-16 text-center">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Database size={24} />
               </div>
               <p className="text-gray-500 font-medium">数据库中未找到相关记录。</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PassVault;