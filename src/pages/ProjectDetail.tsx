import React, { useState } from 'react';
import { ArrowLeft, FileText, Activity, AlertTriangle, Clock, Upload, Download, X, CheckCircle2, DollarSign, TrendingUp, TrendingDown, PieChart, ShieldAlert, Share2, Droplets, Wind, Map, Video, Radio, Database, Layers, Box, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';

const mockChartData = Array.from({ length: 10 }).map((_, i) => ({
  time: `03-${i + 1}`,
  x: Math.random() * 5 + 10,
  y: Math.random() * 3 + 5,
  z: Math.random() * 2 - 1,
}));

export default function ProjectDetail({ projectId, onBack }: { projectId: string, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('progress');
  const [previewDoc, setPreviewDoc] = useState<any>(null);
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);

  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'diffusion-details':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-white">渗滤液污染扩散数据详情</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 overflow-auto custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                 <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                   <h3 className="text-sm font-medium text-slate-300 mb-4">特征污染物浓度随距离衰减预测 (5年后)</h3>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={[
                         { distance: '0m', concentration: 0.8, limit: 0.2 },
                         { distance: '100m', concentration: 0.5, limit: 0.2 },
                         { distance: '300m', concentration: 0.25, limit: 0.2 },
                         { distance: '500m', concentration: 0.18, limit: 0.2 },
                         { distance: '800m', concentration: 0.05, limit: 0.2 },
                         { distance: '1000m', concentration: 0.01, limit: 0.2 },
                       ]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                         <XAxis dataKey="distance" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} itemStyle={{ color: '#e2e8f0' }} />
                         <Line type="monotone" dataKey="concentration" name="预测浓度 (mg/L)" stroke="#ef4444" strokeWidth={2} />
                         <Line type="step" dataKey="limit" name="标准限值" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
                       </LineChart>
                     </ResponsiveContainer>
                   </div>
                 </div>
                 <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                   <h3 className="text-sm font-medium text-slate-300 mb-4">扩散面积演化趋势 (公顷)</h3>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={[
                         { year: '第1年', area: 1.2 },
                         { year: '第2年', area: 2.5 },
                         { year: '第3年', area: 3.8 },
                         { year: '第4年', area: 4.6 },
                         { year: '第5年', area: 5.1 },
                       ]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                         <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} cursor={{ fill: '#334155', opacity: 0.4 }} />
                         <Bar dataKey="area" name="影响面积 (ha)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                       </BarChart>
                     </ResponsiveContainer>
                   </div>
                 </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-4">风险评估结论</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  根据 MODFLOW 和 MT3DMS 耦合模型测算，在无额外防渗干预的情况下，尾矿库特征污染物（以氰化物为例）将在第 5 年扩散至东南方向约 500 米处，局部浓度可能接近地下水 III 类标准限值（0.2 mg/L）。建议在 300 米处增设截渗墙或抽水井，以阻断污染羽流的进一步扩散。
                </p>
              </div>
            </div>
          </div>
        );
      case 'soil-risk-details':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-white">周边土壤重金属风险数据</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 overflow-auto custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                   <h3 className="text-sm font-medium text-slate-300 mb-4">核心区土壤重金属含量对比 (mg/kg)</h3>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={[
                         { element: '镉 (Cd)', value: 0.45, limit: 0.6 },
                         { element: '铅 (Pb)', value: 85, limit: 170 },
                         { element: '砷 (As)', value: 22, limit: 25 },
                         { element: '汞 (Hg)', value: 0.8, limit: 3.4 },
                         { element: '铬 (Cr)', value: 120, limit: 250 },
                       ]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                         <XAxis dataKey="element" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} cursor={{ fill: '#334155', opacity: 0.4 }} />
                         <Bar dataKey="value" name="实测均值" fill="#10b981" radius={[4, 4, 0, 0]} />
                         <Bar dataKey="limit" name="风险筛选值" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                       </BarChart>
                     </ResponsiveContainer>
                   </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                   <h3 className="text-sm font-medium text-slate-300 mb-4">地表水/地下水综合污染指数 (Nemerow Index)</h3>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={[
                         { month: '25年10月', index: 1.2 },
                         { month: '25年11月', index: 1.3 },
                         { month: '25年12月', index: 1.1 },
                         { month: '26年01月', index: 1.4 },
                         { month: '26年02月', index: 1.5 },
                         { month: '26年03月', index: 1.2 },
                       ]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                         <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 3]} />
                         <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} itemStyle={{ color: '#e2e8f0' }} />
                         <ReferenceLine y={1.0} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '警戒线 (轻度污染)', fill: '#10b981', fontSize: 12 }} />
                         <ReferenceLine y={2.0} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '重度污染线', fill: '#ef4444', fontSize: 12 }} />
                         <Line type="monotone" dataKey="index" name="内梅罗指数" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                       </LineChart>
                     </ResponsiveContainer>
                   </div>
                </div>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-300 mb-4">采样点分布与超标情况</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/50 border-b border-slate-700 text-sm text-slate-400">
                        <th className="p-3 font-medium">采样点位</th>
                        <th className="p-3 font-medium">位置描述</th>
                        <th className="p-3 font-medium">超标因子</th>
                        <th className="p-3 font-medium">超标倍数</th>
                        <th className="p-3 font-medium">风险等级</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      <tr className="text-sm text-slate-300">
                        <td className="p-3 font-mono">S-01</td>
                        <td className="p-3">尾矿库主坝下游 100m 农田</td>
                        <td className="p-3 text-slate-500">无</td>
                        <td className="p-3 text-slate-500">-</td>
                        <td className="p-3"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs">安全</span></td>
                      </tr>
                      <tr className="text-sm text-slate-300">
                        <td className="p-3 font-mono">S-02</td>
                        <td className="p-3">排洪沟沿线 50m</td>
                        <td className="p-3 text-orange-400">砷 (As)</td>
                        <td className="p-3 text-orange-400">1.2倍</td>
                        <td className="p-3"><span className="text-orange-400 bg-orange-500/10 px-2 py-1 rounded text-xs">轻微风险</span></td>
                      </tr>
                      <tr className="text-sm text-slate-300">
                        <td className="p-3 font-mono">S-03</td>
                        <td className="p-3">尾矿库东侧自然沟谷</td>
                        <td className="p-3 text-slate-500">无</td>
                        <td className="p-3 text-slate-500">-</td>
                        <td className="p-3"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded text-xs">安全</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'diffusion-model':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-white">3D 污染扩散模拟模型</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584972208173-0f1170f18d6e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
              <div className="z-10 text-center">
                <Map size={64} className="text-blue-400 mx-auto mb-4 opacity-80" />
                <h3 className="text-2xl font-bold text-white mb-2">渗滤液扩散 3D 演化模型</h3>
                <p className="text-slate-400 max-w-lg mx-auto mb-6">基于地下水动力学模型 (MODFLOW) 和溶质运移模型 (MT3DMS) 构建。当前展示未来 5 年内重金属污染物的扩散羽流演化过程。</p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2">
                    <Video size={18} /> 播放演化动画
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2">
                    <Download size={18} /> 导出分析报告
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'inspection-process':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-white">排查-整改-销号 电子化流程</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 overflow-auto">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* 流程步骤 */}
                <div className="flex justify-between items-center relative">
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-700 -z-10 -translate-y-1/2"></div>
                  <div className="absolute left-0 w-2/3 top-1/2 h-1 bg-blue-500 -z-10 -translate-y-1/2"></div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-4 border-slate-900"><CheckCircle2 size={20}/></div>
                    <span className="text-sm font-medium text-blue-400">发现隐患</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-4 border-slate-900"><CheckCircle2 size={20}/></div>
                    <span className="text-sm font-medium text-blue-400">下达整改</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-4 border-slate-900 animate-pulse"><Clock size={20}/></div>
                    <span className="text-sm font-medium text-blue-400">执行整改</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold border-4 border-slate-900">4</div>
                    <span className="text-sm font-medium text-slate-500">复查验收</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 font-bold border-4 border-slate-900">5</div>
                    <span className="text-sm font-medium text-slate-500">归档销号</span>
                  </div>
                </div>

                {/* 当前任务单 */}
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                  <h3 className="text-lg font-medium text-white mb-4 border-b border-slate-800 pb-4">当前任务: 排洪设施畅通性整改</h3>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">隐患描述</div>
                      <div className="text-slate-300">排洪井入口有大量树枝和泥沙堆积，影响过水断面。</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">整改要求</div>
                      <div className="text-slate-300">立即组织人工或机械清理，恢复设计排洪能力。</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">责任人</div>
                      <div className="text-slate-300">王强 (工程部)</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">限期完成时间</div>
                      <div className="text-red-400 font-medium">2026-03-15</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm font-medium text-white mb-3">提交整改结果</div>
                    <textarea className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500 mb-3" rows={3} placeholder="详细描述整改过程和结果..."></textarea>
                    <div className="flex items-center gap-4">
                      <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm text-white transition-colors flex items-center gap-2">
                        <Upload size={16}/> 上传整改后照片
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-sm text-white transition-colors ml-auto">
                        提交复查
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'material-request':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-white">应急物资调配申请</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 overflow-auto">
              <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl border border-slate-700 p-8 shadow-xl">
                <h3 className="text-lg font-medium text-white mb-6 border-b border-slate-800 pb-4">填写物资调配单</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">申请单位/部门</label>
                      <input type="text" value="隆化顺达矿业 - 应急指挥部" disabled className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-300 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">申请日期</label>
                      <input type="text" value="2026-03-10" disabled className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-300 cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">调配事由</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-slate-300 focus:outline-none focus:border-blue-500">
                      <option>日常物资补充</option>
                      <option>防汛应急演练</option>
                      <option>突发事件应急抢险</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">需求物资清单</label>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-900/50 border-b border-slate-700">
                          <tr>
                            <th className="p-3 text-sm font-medium text-slate-400">物资名称</th>
                            <th className="p-3 text-sm font-medium text-slate-400">规格型号</th>
                            <th className="p-3 text-sm font-medium text-slate-400">申请数量</th>
                            <th className="p-3 text-sm font-medium text-slate-400">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          <tr>
                            <td className="p-3"><input type="text" defaultValue="应急照明灯" className="w-full bg-transparent border-b border-slate-600 focus:border-blue-500 text-slate-200 text-sm p-1 outline-none" /></td>
                            <td className="p-3"><input type="text" defaultValue="1000W 移动式" className="w-full bg-transparent border-b border-slate-600 focus:border-blue-500 text-slate-200 text-sm p-1 outline-none" /></td>
                            <td className="p-3"><input type="number" defaultValue={10} className="w-full bg-transparent border-b border-slate-600 focus:border-blue-500 text-slate-200 text-sm p-1 outline-none" /></td>
                            <td className="p-3"><button type="button" className="text-red-400 hover:text-red-300 text-sm"><X size={16}/></button></td>
                          </tr>
                        </tbody>
                      </table>
                      <button type="button" className="w-full p-3 text-sm text-blue-400 hover:bg-slate-700/50 transition-colors flex justify-center items-center gap-2">
                        + 添加物资项
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">备注说明</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-blue-500" rows={3} placeholder="请输入补充说明..."></textarea>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex justify-end gap-4">
                    <button type="button" onClick={() => setActiveSubPage(null)} className="px-6 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">取消</button>
                    <button type="button" className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-lg text-white font-medium transition-colors">提交申请</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case 'emergency-report':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-red-400 flex items-center gap-2"><AlertTriangle /> 突发环境事件一键上报</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 overflow-auto">
              <div className="max-w-3xl mx-auto bg-slate-900 rounded-xl border border-red-500/30 p-8 shadow-2xl shadow-red-500/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 flex gap-4 items-start">
                  <ShieldAlert className="text-red-400 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-red-400 font-bold mb-1">紧急提报说明</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      此表单将直接上报至<span className="text-white font-bold">县级生态环境部门</span>及<span className="text-white font-bold">应急管理部门</span>指挥中心。请如实、准确、快速填写核心信息。提交后系统将自动启动应急预案响应流程。
                    </p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">事件类型 <span className="text-red-500">*</span></label>
                      <select className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500">
                        <option>尾矿水泄漏/超标排放</option>
                        <option>坝体滑坡/溃坝征兆</option>
                        <option>扬尘严重污染</option>
                        <option>非法倾倒</option>
                        <option>其他突发环境事件</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">发生时间 <span className="text-red-500">*</span></label>
                      <input type="datetime-local" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">事件发生地点 <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="详细位置描述 (如: 东侧坝肩、2号排洪口)" className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-red-500" />
                      <button type="button" className="bg-slate-700 hover:bg-slate-600 px-4 rounded-lg text-slate-300 transition-colors flex items-center gap-2">
                        <Map size={16}/> 获取定位
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">事件简述及初步影响 <span className="text-red-500">*</span></label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500" rows={4} placeholder="请描述事件经过、目前的污染范围、是否有人员伤亡或财产损失..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">已采取的先期处置措施</label>
                    <textarea className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500" rows={2} placeholder="如：已关闭排洪阀门、已组织人员撤离..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">现场影像资料 (可选)</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <Upload className="mx-auto mb-2 text-slate-500" size={24} />
                      <div className="text-sm text-slate-400">点击或拖拽上传现场照片/视频</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
                    <button type="button" onClick={() => setActiveSubPage(null)} className="px-6 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">取消</button>
                    <button type="button" className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg text-white font-bold text-lg transition-colors shadow-lg shadow-red-600/20 flex items-center gap-2">
                      <AlertTriangle size={20} /> 确认上报
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case 'remote-sensing':
        return (
          <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setActiveSubPage(null)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-white">多时相遥感对比分析</h2>
            </div>
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500">
                    <option>2025年10月 (基准期)</option>
                    <option>2025年06月</option>
                  </select>
                  <span className="text-slate-500 flex items-center">VS</span>
                  <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500">
                    <option>2026年03月 (当前期)</option>
                    <option>2026年01月</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-sm text-white transition-colors">生成变化图斑</button>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm text-white transition-colors">导出分析报告</button>
                </div>
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden border border-slate-700 flex">
                <div className="w-1/2 relative border-r-2 border-blue-500">
                  <img src="https://images.unsplash.com/photo-1584972208173-0f1170f18d6e?q=80&w=800&auto=format&fit=crop" alt="2025" className="w-full h-full object-cover opacity-60 hue-rotate-30" />
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded backdrop-blur-sm font-mono text-sm">2025-10-15</div>
                </div>
                <div className="w-1/2 relative">
                  <img src="https://images.unsplash.com/photo-1584972208173-0f1170f18d6e?q=80&w=800&auto=format&fit=crop" alt="2026" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded backdrop-blur-sm font-mono text-sm">2026-03-10</div>
                  
                  {/* Simulated Change Detection Highlight */}
                  <div className="absolute top-1/3 left-1/4 w-32 h-24 border-2 border-red-500 bg-red-500/20 rounded-lg animate-pulse">
                    <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">新增裸露区域 (0.5ha)</div>
                  </div>
                </div>
                {/* Slider Handle */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-blue-500 cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                  <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
      <div className="flex border-b border-slate-700 px-6 flex-shrink-0 overflow-x-auto custom-scrollbar">
        <Tab active={activeTab === 'progress'} onClick={() => setActiveTab('progress')} icon={<Clock size={16} />} label="进度跟踪" />
        <Tab active={activeTab === 'docs'} onClick={() => setActiveTab('docs')} icon={<FileText size={16} />} label="文档管理" />
        <Tab active={activeTab === 'monitoring'} onClick={() => setActiveTab('monitoring')} icon={<Activity size={16} />} label="综合监测" />
        <Tab active={activeTab === 'hazards'} onClick={() => setActiveTab('hazards')} icon={<AlertTriangle size={16} />} label="隐患与风险" />
        <Tab active={activeTab === 'emergency'} onClick={() => setActiveTab('emergency')} icon={<ShieldAlert size={16} />} label="应急管理" />
        <Tab active={activeTab === 'integration'} onClick={() => setActiveTab('integration')} icon={<Share2 size={16} />} label="数据协同与合规" />
        <Tab active={activeTab === 'budget'} onClick={() => setActiveTab('budget')} icon={<DollarSign size={16} />} label="预算管理" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 relative">
        {activeSubPage ? renderSubPage() : (
          <>
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
            {/* 预警横幅 */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="text-red-400 mt-0.5" size={18} />
              <div>
                <div className="text-red-400 font-medium text-sm">超标预警 (2)</div>
                <div className="text-slate-300 text-xs mt-1">1. 下游监测井 GW-02 氰化物浓度超标 (0.06mg/L, 限值0.05)</div>
                <div className="text-slate-300 text-xs mt-0.5">2. AI识别: 尾矿运输车辆遗撒 (排洪口区域)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1 flex items-center gap-2"><Activity size={14}/> 表面位移 (最大值)</div>
                <div className="text-2xl font-bold text-orange-400 font-mono">25.6 <span className="text-sm text-slate-500">mm</span></div>
                <div className="text-xs text-orange-400 mt-2">↑ 较昨日上涨 2.1mm</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1 flex items-center gap-2"><Droplets size={14}/> 尾矿水排放流量</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">125.0 <span className="text-sm text-slate-500">m³/h</span></div>
                <div className="text-xs text-emerald-400 mt-2">水质: COD 45mg/L (达标)</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1 flex items-center gap-2"><Map size={14}/> 地下水水位 (GW-01)</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">-15.2 <span className="text-sm text-slate-500">m</span></div>
                <div className="text-xs text-emerald-400 mt-2">水质综合评价: 良好</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1 flex items-center gap-2"><Layers size={14}/> 周边土壤重金属</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">正常 <span className="text-sm text-slate-500">级别</span></div>
                <div className="text-xs text-emerald-400 mt-2">最近评估: 2026-02-15</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2"><Video size={18}/> 排放口视频与AI监控</h3>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">实时联动</span>
                </div>
                <div className="relative h-[calc(100%-2rem)] bg-black rounded-lg overflow-hidden border border-slate-700">
                  <img src="https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800&auto=format&fit=crop" alt="排放口" className="w-full h-full object-cover opacity-70" />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">排放口 CAM-02</div>
                  <div className="absolute bottom-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm animate-pulse">AI识别: 疑似遗撒</div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2"><Radio size={18}/> 遥感与无人机巡查</h3>
                  <button onClick={() => setActiveSubPage('remote-sensing')} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">多时相对比 &gt;</button>
                </div>
                <div className="relative h-[calc(100%-2rem)] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 flex">
                  <div className="w-1/2 border-r border-slate-700 relative">
                    <img src="https://images.unsplash.com/photo-1584972208173-0f1170f18d6e?q=80&w=400&auto=format&fit=crop" alt="遥感" className="w-full h-full object-cover opacity-60 hue-rotate-15" />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">卫星遥感 (库面变化)</div>
                  </div>
                  <div className="w-1/2 relative">
                    <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400&auto=format&fit=crop" alt="无人机" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">无人机近景 (边坡)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hazards' && (
          <div className="space-y-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><Map size={18}/> 风险区域建模与评估</h3>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <div className="text-sm text-slate-200 mb-1">污染扩散模拟 (渗滤液)</div>
                    <div className="text-xs text-slate-400 mb-2">基于地下水流向，模拟未来5年渗滤液扩散范围。当前主要影响东南方向 500m 区域。</div>
                    <div className="flex gap-2">
                      <button onClick={() => setActiveSubPage('diffusion-model')} className="text-xs text-blue-400 border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-500/10 transition-colors">查看 3D 扩散模型</button>
                      <button onClick={() => setActiveSubPage('diffusion-details')} className="text-xs text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded hover:bg-emerald-500/10 transition-colors">详情</button>
                    </div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <div className="text-sm text-slate-200 mb-1">土壤/地下水风险评估</div>
                    <div className="text-xs text-slate-400 mb-2">2026年度汛前全面排查评估报告已生成。周边农田土壤重金属风险可控。</div>
                    <div className="flex gap-2">
                      <button onClick={() => setPreviewDoc({title: '2026年度土壤及地下水风险评估报告.pdf', type: 'pdf'})} className="text-xs text-blue-400 border border-blue-500/30 px-2 py-1 rounded hover:bg-blue-500/10 transition-colors">下载评估报告</button>
                      <button onClick={() => setActiveSubPage('soil-risk-details')} className="text-xs text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded hover:bg-emerald-500/10 transition-colors">详情</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><CheckCircle2 size={18}/> 汛期前全面排查 (电子化)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">1. 坝体稳定性检查</span>
                    <span className="text-emerald-400">已完成 (无异常)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">2. 排洪设施畅通性</span>
                    <span className="text-orange-400">整改中 (发现堵塞)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">3. 应急物资储备核查</span>
                    <span className="text-emerald-400">已完成 (储备充足)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">4. 监测设备校准</span>
                    <span className="text-slate-500">待执行 (计划 03-15)</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-700">
                    <button onClick={() => setActiveSubPage('inspection-process')} className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm text-white transition-colors">进入排查-整改-销号流程</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
                <h3 className="text-lg font-medium text-white">隐患台账</h3>
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
                    <td className="p-4 text-sm text-slate-200">排洪井入口有杂物堵塞</td>
                    <td className="p-4 text-sm text-slate-400 font-mono">2026-03-01</td>
                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs">整改中</span>
                    </td>
                    <td className="p-4 text-sm text-slate-300">王强</td>
                    <td className="p-4 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">提交验收</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="space-y-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><FileText size={18}/> 应急预案管理</h3>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="text-sm text-slate-200">尾矿库溃坝应急预案</div>
                      <div className="text-xs text-slate-500 mt-1">已备案 | 2025-11修订</div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300"><Download size={16}/></button>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="text-sm text-slate-200">环境突发事件应急预案</div>
                      <div className="text-xs text-slate-500 mt-1">已备案 | 2025-12修订</div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300"><Download size={16}/></button>
                  </div>
                  <button className="w-full mt-2 text-sm text-slate-400 border border-slate-600 border-dashed py-2 rounded hover:bg-slate-700 transition-colors">
                    + 演练计划与记录
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><Box size={18}/> 应急物资台账</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">防汛编织袋</span>
                    <span className="text-emerald-400 font-mono">5000 条</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">挖掘机/装载机</span>
                    <span className="text-emerald-400 font-mono">3 台</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">应急照明灯</span>
                    <span className="text-orange-400 font-mono">10 套 (需补充)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                    <span className="text-slate-300">中和药剂(石灰)</span>
                    <span className="text-emerald-400 font-mono">10 吨</span>
                  </div>
                  <button onClick={() => setActiveSubPage('material-request')} className="w-full mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">物资调配申请 &gt;</button>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 border-l-4 border-l-red-500">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><ShieldAlert size={18} className="text-red-400"/> 突发事件响应</h3>
                <p className="text-sm text-slate-400 mb-4">
                  发生突发环境事件时，通过此模块启动应急响应，并自动向县级生态环境部门、应急管理部门推送报告。
                </p>
                <button onClick={() => setActiveSubPage('emergency-report')} className="w-full bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white py-3 rounded-lg font-medium transition-colors flex justify-center items-center gap-2">
                  <AlertTriangle size={18} /> 一键上报突发事件
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integration' && (
          <div className="space-y-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><Share2 size={18}/> 数据共享与协同</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700">
                    <div>
                      <div className="text-sm text-slate-200">全国固体废物污染环境防治信息平台</div>
                      <div className="text-xs text-slate-500">标准接口对接状态</div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">已连接</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700">
                    <div>
                      <div className="text-sm text-slate-200">部-省-市生态环境部门数据交换</div>
                      <div className="text-xs text-slate-500">实时同步监测与预警数据</div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">同步中</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700">
                    <div>
                      <div className="text-sm text-slate-200">跨部门协同 (应急管理、自然资源)</div>
                      <div className="text-xs text-slate-500">共享隐患排查与地质灾害数据</div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">已连接</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700">
                    <div>
                      <div className="text-sm text-slate-200">企业端数据汇集 (产废与运营单位)</div>
                      <div className="text-xs text-slate-500">台账与日常巡查数据协同</div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">正常</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><Map size={18}/> 选址合规性校验</h3>
                  <div className="flex gap-4 mb-4">
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30">生态保护红线</span>
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/30">永久基本农田</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30">行洪区</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    经GIS图层叠加分析，该尾矿库边界距离最近的生态保护红线 2.5km，未占用永久基本农田及行洪区，<span className="text-emerald-400 font-bold">选址合规</span>。
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2"><Database size={18}/> 数据存储合规性</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">监测记录保存期限</span>
                      <span className="text-emerald-400">已保障 (≥5年)</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-4">
                      <span className="text-slate-300">视频监控记录保存期限</span>
                      <span className="text-emerald-400">已保障 (≥3个月)</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'budget' && (
          <div className="space-y-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <DollarSign size={16} className="text-blue-400" />
                  项目总预算
                </div>
                <div className="text-3xl font-bold text-white font-mono">1,250<span className="text-sm text-slate-500 ml-1">万元</span></div>
                <div className="text-xs text-slate-500 mt-2">包含设计、施工、监理等全过程费用</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-400" />
                  已拨付资金
                </div>
                <div className="text-3xl font-bold text-emerald-400 font-mono">450<span className="text-sm text-emerald-500/50 ml-1">万元</span></div>
                <div className="text-xs text-emerald-400 mt-2">拨付进度: 36.0%</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <TrendingDown size={16} className="text-orange-400" />
                  已执行(支出)
                </div>
                <div className="text-3xl font-bold text-orange-400 font-mono">380<span className="text-sm text-orange-500/50 ml-1">万元</span></div>
                <div className="text-xs text-orange-400 mt-2">执行率: 30.4%</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                  <PieChart size={16} className="text-purple-400" />
                  预算结余
                </div>
                <div className="text-3xl font-bold text-purple-400 font-mono">870<span className="text-sm text-purple-500/50 ml-1">万元</span></div>
                <div className="text-xs text-purple-400 mt-2">剩余可用资金</div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
                <h3 className="text-lg font-medium text-white">预算执行明细</h3>
                <div className="flex gap-2">
                  <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-sm text-white transition-colors">导出明细</button>
                  <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm text-white transition-colors">新增支出记录</button>
                </div>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 border-b border-slate-700 text-sm text-slate-400">
                    <th className="p-4 font-medium">支出项名称</th>
                    <th className="p-4 font-medium">分类</th>
                    <th className="p-4 font-medium">计划预算</th>
                    <th className="p-4 font-medium">实际支出</th>
                    <th className="p-4 font-medium">执行率</th>
                    <th className="p-4 font-medium">状态</th>
                    <th className="p-4 font-medium text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-sm text-slate-200">前期勘察设计费</td>
                    <td className="p-4 text-sm text-slate-400">服务费</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">150 万元</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">145 万元</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.6%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">96.6%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded text-xs">已结项</span>
                    </td>
                    <td className="p-4 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">查看凭证</button></td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-sm text-slate-200">排洪系统改造工程</td>
                    <td className="p-4 text-sm text-slate-400">工程款</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">480 万元</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">120 万元</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">25.0%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs">执行中</span>
                    </td>
                    <td className="p-4 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">查看凭证</button></td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-sm text-slate-200">在线监测设备采购</td>
                    <td className="p-4 text-sm text-slate-400">设备费</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">220 万元</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">115 万元</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '52.2%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">52.2%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs">执行中</span>
                    </td>
                    <td className="p-4 text-right"><button className="text-blue-400 hover:text-blue-300 text-sm">查看凭证</button></td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-sm text-slate-200">坝体加固工程</td>
                    <td className="p-4 text-sm text-slate-400">工程款</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">350 万元</td>
                    <td className="p-4 text-sm text-slate-300 font-mono">0 万元</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 w-24">
                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-500 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">0.0%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-700 text-slate-300 border border-slate-600 px-2 py-1 rounded text-xs">未开始</span>
                    </td>
                    <td className="p-4 text-right"><button className="text-slate-400 hover:text-slate-300 text-sm">查看凭证</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
          </>
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
