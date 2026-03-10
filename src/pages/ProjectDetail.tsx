import React, { useState } from 'react';
import { ArrowLeft, FileText, Activity, AlertTriangle, Clock, Upload, Download, X, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = Array.from({ length: 10 }).map((_, i) => ({
  time: `03-${i + 1}`,
  x: Math.random() * 5 + 10,
  y: Math.random() * 3 + 5,
  z: Math.random() * 2 - 1,
}));

export default function ProjectDetail({ projectId, onBack }: { projectId: string, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('progress');
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={16} /> 返回列表
        </button>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">隆化顺达矿业尾矿库</h1>
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-xs">治理中</span>
              <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs font-mono">{projectId}</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <span>权属单位: 隆化顺达矿业</span>
              <span>等别: 三等</span>
              <span>坝型: 上游法</span>
              <span>总库容: 1250万m³</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm text-white transition-colors">编辑信息</button>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
              <Download size={16} /> 导出报告
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 px-6 flex-shrink-0">
        <Tab active={activeTab === 'progress'} onClick={() => setActiveTab('progress')} icon={<Clock size={16} />} label="进度跟踪" />
        <Tab active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} icon={<FileText size={16} />} label="文档管理" />
        <Tab active={activeTab === 'monitoring'} onClick={() => setActiveTab('monitoring')} icon={<Activity size={16} />} label="监测数据" />
        <Tab active={activeTab === 'hazards'} onClick={() => setActiveTab('hazards')} icon={<AlertTriangle size={16} />} label="隐患治理" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 relative">
        {activeTab === 'progress' && (
          <div className="space-y-6 max-w-4xl">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-6">项目里程碑</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700"></div>
                <div className="space-y-8">
                  <TimelineItem 
                    status="completed" date="2025-10-15" title="隐患排查诊断完成" desc="生成三维隐患分布图、风险评估报告" 
                    manager="张建国 (勘察组长)" details="完成了全库区10个钻孔取样，物探高密度电法覆盖率100%，发现3处疑似渗漏通道。"
                  />
                  <TimelineItem 
                    status="active" date="2026-03-01" title="治理设计阶段" desc="BIM设计模型构建中，预计2026-04-15完成" 
                    manager="李明 (设计总监)" details="正在进行排洪系统改造的BIM建模，已完成初步安全设施设计审查，等待专家组终审意见。"
                  />
                  <TimelineItem 
                    status="pending" date="预计 2026-05" title="工程施工" desc="等待设计方案审批" 
                    manager="王强 (项目经理)" details="计划投入挖掘机5台，防渗膜铺设团队20人。主要进行坝体加固和截排洪沟施工。"
                  />
                  <TimelineItem 
                    status="pending" date="预计 2027-12" title="闭库验收" desc="生态修复后评估" 
                    manager="赵局长 (应急管理局)" details="联合环保、自然资源等多部门进行联合验收，评估生态复绿效果及长期稳定性。"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'docs' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">档案资料 (一库一档)</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-sm text-white transition-colors">
                  <Upload size={14} /> 上传文档
                </button>
                <button className="flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 px-3 py-1.5 rounded text-sm transition-colors">
                  <Activity size={14} /> AI 智能提取
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DocCard title="地质勘察报告.pdf" type="勘察数据" date="2025-09-12" size="12.5 MB" onClick={() => setPreviewDoc({title: '地质勘察报告.pdf', type: 'pdf'})} />
              <DocCard title="初步安全设施设计.docx" type="设计文档" date="2026-01-20" size="5.2 MB" onClick={() => setPreviewDoc({title: '初步安全设施设计.docx', type: 'word'})} />
              <DocCard title="历史监测数据汇总.xlsx" type="运营数据" date="2025-12-31" size="8.1 MB" onClick={() => setPreviewDoc({title: '历史监测数据汇总.xlsx', type: 'excel'})} />
              <DocCard title="隐蔽工程影像记录.mp4" type="施工记录" date="2026-02-15" size="145.0 MB" onClick={() => setPreviewDoc({title: '隐蔽工程影像记录.mp4', type: 'video'})} />
              <DocCard title="三维隐患分布图.pdf" type="排查阶段" date="2025-10-10" size="24.5 MB" onClick={() => setPreviewDoc({title: '三维隐患分布图.pdf', type: 'pdf'})} />
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">表面位移 (最大值)</div>
                <div className="text-2xl font-bold text-red-400 font-mono">25.6 <span className="text-sm text-slate-500">mm</span></div>
                <div className="text-xs text-red-400 mt-2">↑ 较昨日上涨 2.1mm</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">浸润线埋深 (平均)</div>
                <div className="text-2xl font-bold text-orange-400 font-mono">15.2 <span className="text-sm text-slate-500">m</span></div>
                <div className="text-xs text-orange-400 mt-2">↑ 较昨日上涨 0.5m</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">干滩长度</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">125.0 <span className="text-sm text-slate-500">m</span></div>
                <div className="text-xs text-emerald-400 mt-2">达标 (要求≥100m)</div>
              </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-80">
              <h3 className="text-lg font-medium text-white mb-4">1号监测点位移趋势</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} itemStyle={{ color: '#e2e8f0' }} />
                  <Line type="monotone" dataKey="x" name="X向位移" stroke="#0066FF" strokeWidth={2} />
                  <Line type="monotone" dataKey="y" name="Y向位移" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="z" name="Z向沉降" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'hazards' && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden max-w-6xl">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
              <h3 className="text-lg font-medium text-white">隐患排查闭环管理</h3>
              <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm text-white transition-colors">上报新隐患</button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-700 text-sm text-slate-400">
                  <th className="p-4 font-medium">隐患编号</th>
                  <th className="p-4 font-medium">隐患描述</th>
                  <th className="p-4 font-medium">发现时间</th>
                  <th className="p-4 font-medium">当前状态</th>
                  <th className="p-4 font-medium">责任人</th>
                  <th className="p-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-sm text-slate-300 font-mono">HZ-20260301-01</td>
                  <td className="p-4 text-sm text-slate-200">东侧坝肩发现横向裂缝，长约2m</td>
                  <td className="p-4 text-sm text-slate-400 font-mono">2026-03-01</td>
                  <td className="p-4">
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs">整改中</span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">王强</td>
                  <td className="p-4 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">提交验收</button></td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-sm text-slate-300 font-mono">HZ-20260215-02</td>
                  <td className="p-4 text-sm text-slate-200">排水井入口有杂物堵塞</td>
                  <td className="p-4 text-sm text-slate-400 font-mono">2026-02-15</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded text-xs flex items-center gap-1 w-max ml-auto"><CheckCircle2 size={12}/> 已销号</span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">李明</td>
                  <td className="p-4 text-right"><button className="text-slate-400 hover:text-slate-300 text-sm">查看档案</button></td>
                </tr>
                <tr className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 text-sm text-slate-300 font-mono">HZ-20260308-01</td>
                  <td className="p-4 text-sm text-slate-200">2号渗压计数据传输异常</td>
                  <td className="p-4 text-sm text-slate-400 font-mono">2026-03-08</td>
                  <td className="p-4">
                    <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded text-xs">待评估</span>
                  </td>
                  <td className="p-4 text-sm text-slate-300">张工</td>
                  <td className="p-4 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">开始评估</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl h-[80vh] bg-slate-800 border border-slate-700 rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-400" size={20} />
                <h3 className="font-bold text-white">{previewDoc.title}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-900/50 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <FileText size={300} />
              </div>
              <div className="z-10 text-center bg-slate-800/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-md shadow-xl">
                <FileText size={48} className="mx-auto mb-4 text-blue-400" />
                <h4 className="text-xl font-medium text-white mb-2">文档预览区</h4>
                <p className="text-sm text-slate-400 mb-6">正在加载 {previewDoc.title} 的内容...</p>
                <div className="flex gap-3 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition-colors shadow-lg shadow-blue-600/20 flex items-center gap-2">
                    <Download size={16} /> 下载源文件
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm text-white transition-colors">
                    在新标签页打开
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Tab({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
        active ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function TimelineItem({ status, date, title, desc, manager, details }: { status: 'completed' | 'active' | 'pending', date: string, title: string, desc: string, manager: string, details: string }) {
  return (
    <div className="relative pl-12 group">
      <div className={`absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-slate-900 ${
        status === 'completed' ? 'border-emerald-500 bg-emerald-500' :
        status === 'active' ? 'border-blue-500 bg-blue-500 animate-pulse' :
        'border-slate-600'
      }`}></div>
      <div className="flex flex-col cursor-help">
        <span className="text-xs text-slate-500 font-mono mb-1">{date}</span>
        <span className={`text-base font-medium ${status === 'pending' ? 'text-slate-400' : 'text-slate-200'}`}>{title}</span>
        <span className="text-sm text-slate-500 mt-1">{desc}</span>
      </div>

      {/* Hover Tooltip */}
      <div className="absolute left-full top-0 ml-4 w-72 p-4 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
        <div className="absolute top-4 -left-2 w-4 h-4 bg-slate-800 border-l border-b border-slate-600 transform rotate-45"></div>
        <div className="relative z-10">
          <div className="text-sm font-bold text-white mb-2">{title}</div>
          <div className="text-xs text-blue-400 mb-3 bg-blue-500/10 inline-block px-2 py-1 rounded border border-blue-500/20">负责人: {manager}</div>
          <div className="text-xs text-slate-300 leading-relaxed">{details}</div>
        </div>
      </div>
    </div>
  );
}

function DocCard({ title, type, date, size, onClick }: { title: string, type: string, date: string, size: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col gap-3 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
            <FileText size={20} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-1" title={title}>{title}</div>
            <div className="text-xs text-slate-500 mt-0.5">{type}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-700/50">
        <span>{date}</span>
        <span>{size}</span>
      </div>
    </div>
  );
}
