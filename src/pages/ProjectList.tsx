import React, { useState } from 'react';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

const projects = [
  { id: 'SL-001', name: '隆化顺达矿业尾矿库', owner: '隆化顺达矿业', level: '三等', status: '治理中', stage: '设计阶段', safetyIndex: 85, progress: 45, alerts: { red: 1, orange: 2, yellow: 0 } },
  { id: 'JX-002', name: '金鑫矿业尾矿库', owner: '金鑫矿业集团', level: '四等', status: '停用', stage: '排查阶段', safetyIndex: 60, progress: 15, alerts: { red: 0, orange: 3, yellow: 5 } },
  { id: 'TH-003', name: '太和矿业尾矿库', owner: '太和集团', level: '二等', status: '闭库', stage: '验收阶段', safetyIndex: 95, progress: 100, alerts: { red: 0, orange: 0, yellow: 0 } },
];

export default function ProjectList() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  if (selectedProject) {
    return <ProjectDetail projectId={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="h-full p-6 overflow-auto bg-slate-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">试点库项目档案管理</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="搜索项目名称/编码..." 
              className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64 text-slate-200"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
            <Filter size={16} /> 筛选
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition-colors shadow-lg shadow-blue-600/20">
            <Plus size={16} /> 新增项目
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700 text-sm text-slate-400">
              <th className="p-4 font-medium">库点名称</th>
              <th className="p-4 font-medium">权属单位</th>
              <th className="p-4 font-medium">等别</th>
              <th className="p-4 font-medium">当前阶段</th>
              <th className="p-4 font-medium">安全指数</th>
              <th className="p-4 font-medium">进度</th>
              <th className="p-4 font-medium">预警统计</th>
              <th className="p-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-slate-800/50 transition-colors group cursor-pointer" onClick={() => setSelectedProject(p.id)}>
                <td className="p-4">
                  <div className="font-medium text-slate-200">{p.name}</div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{p.id}</div>
                </td>
                <td className="p-4 text-sm text-slate-300">{p.owner}</td>
                <td className="p-4 text-sm text-slate-300">
                  <span className="bg-slate-700 px-2 py-1 rounded text-xs">{p.level}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {['排查', '设计', '施工', '验收'].map((step, i) => {
                        const stages = ['排查阶段', '设计阶段', '施工阶段', '验收阶段'];
                        const currentIndex = stages.indexOf(p.stage);
                        const isActive = i <= currentIndex;
                        return (
                          <div key={step} className={`h-1.5 w-6 rounded-full ${isActive ? 'bg-blue-500' : 'bg-slate-700'}`} title={step}></div>
                        );
                      })}
                    </div>
                    <span className="text-xs text-slate-400">{p.stage}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`text-lg font-bold font-mono ${p.safetyIndex >= 80 ? 'text-emerald-400' : p.safetyIndex >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {p.safetyIndex}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 w-32">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{p.progress}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-1.5">
                    {p.alerts.red > 0 && <span className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5 rounded font-mono">{p.alerts.red}</span>}
                    {p.alerts.orange > 0 && <span className="bg-orange-500/20 text-orange-400 text-xs px-1.5 py-0.5 rounded font-mono">{p.alerts.orange}</span>}
                    {p.alerts.yellow > 0 && <span className="bg-yellow-500/20 text-yellow-400 text-xs px-1.5 py-0.5 rounded font-mono">{p.alerts.yellow}</span>}
                    {p.alerts.red === 0 && p.alerts.orange === 0 && p.alerts.yellow === 0 && <span className="text-xs text-slate-500">-</span>}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-end gap-1 w-full" onClick={(e) => { e.stopPropagation(); setSelectedProject(p.id); }}>
                    详情 <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
