import React, { useState } from 'react';
import { AlertTriangle, Search, Filter, X, Eye, Activity, Radio, Wifi, Database, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const generateHistoryData = (alert: any) => {
  if (!alert) return [];
  const data = [];
  const now = new Date();
  const type = alert.type;
  
  // Extract numeric value from alert.value (e.g., "25.6mm" -> 25.6)
  const currentValue = parseFloat(alert.value) || 0;
  const thresholdValue = parseFloat(alert.threshold) || 0;
  
  // Use alert ID to seed some randomness so same alert always looks similar but different alerts look different
  const seed = alert.id ? alert.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) : 0;
  const random = (i: number) => Math.sin(seed + i) * 0.5 + 0.5; // 0 to 1
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const timeStr = `${time.getHours().toString().padStart(2, '0')}:00`;
    
    let value = 0;

    if (type === '坝体位移异常') {
      // Gradual increase leading up to the current value
      const startValue = currentValue * 0.6;
      const progress = (23 - i) / 23;
      // Exponential-like curve
      value = startValue + (currentValue - startValue) * Math.pow(progress, 2) + (random(i) * 1 - 0.5);
      if (i === 0) value = currentValue; // Ensure last point matches exactly
    } else if (type === '浸润线偏高') {
      // Slow gradual increase
      const startValue = thresholdValue * 0.8;
      const progress = (23 - i) / 23;
      value = startValue + (currentValue - startValue) * progress + (random(i) * 0.4 - 0.2);
      if (i === 0) value = currentValue;
    } else if (type === '降雨量超标') {
      // Sudden spike in the last few hours
      if (i > 4) {
        value = random(i) * 5; // Light rain or no rain
      } else {
        const progress = (4 - i) / 4;
        value = (currentValue * progress) + (random(i) * 5 - 2.5);
      }
      if (i === 0) value = currentValue;
    } else if (type === '设备离线') {
      // 1 is online, 0 is offline. Went offline recently.
      value = i > 2 ? 1 : 0;
    } else if (type === '越界进入危险区') {
      // 0 is no one, 1 is someone. Someone entered recently.
      value = i === 0 ? 1 : 0;
    } else {
      value = currentValue * 0.8 + random(i) * (currentValue * 0.4);
      if (i === 0) value = currentValue;
    }

    data.push({
      time: timeStr,
      value: Number(value.toFixed(2)),
      threshold: thresholdValue > 0 ? thresholdValue : undefined
    });
  }
  return data;
};

const alertsData = [
  { id: 'AL-20260310-001', pond: '隆化顺达矿业尾矿库', type: '坝体位移异常', level: 'red', value: '25.6mm', threshold: '20mm', time: '2026-03-10 14:32:05', status: 'active' },
  { id: 'AL-20260310-002', pond: '金鑫矿业尾矿库', type: '浸润线偏高', level: 'orange', value: '15.2m', threshold: '15m', time: '2026-03-10 14:15:22', status: 'processed' },
  { id: 'AL-20260310-003', pond: '隆化顺达矿业尾矿库', type: '设备离线', level: 'yellow', value: 'GNSS-02', threshold: '-', time: '2026-03-10 13:45:10', status: 'active' },
  { id: 'AL-20260310-004', pond: '金鑫矿业尾矿库', type: '越界进入危险区', level: 'yellow', value: '区域A', threshold: '-', time: '2026-03-10 12:30:00', status: 'closed' },
  { id: 'AL-20260309-005', pond: '太和矿业尾矿库', type: '降雨量超标', level: 'orange', value: '55mm/h', threshold: '50mm/h', time: '2026-03-09 08:12:00', status: 'closed' },
];

export default function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [activeView, setActiveView] = useState<'none' | 'model' | 'history'>('none');

  const historyData = React.useMemo(() => {
    if (!selectedAlert) return [];
    return generateHistoryData(selectedAlert);
  }, [selectedAlert]);

  return (
    <div className="h-full p-6 overflow-hidden bg-slate-900 flex gap-6">
      {/* Left Sidebar - IoT System Integration */}
      <div className="w-80 flex flex-col gap-4 flex-shrink-0">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-slate-300 font-medium mb-4 flex items-center gap-2">
            <Radio size={18} className="text-blue-400" />
            物联感知网络对接
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                  <Wifi size={16} className="text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">GNSS 表面位移基站</div>
                  <div className="text-xs text-slate-500">北斗高精度定位网</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">24/24 在线</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                  <Database size={16} className="text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">渗压计/水位计数据</div>
                  <div className="text-xs text-slate-500">LoRaWAN 传输协议</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">45/45 在线</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                  <Cpu size={16} className="text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">边缘计算网关 (DTU)</div>
                  <div className="text-xs text-slate-500">MQTT 协议订阅</div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">8/8 在线</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex-1 flex flex-col min-h-0">
          <h3 className="text-slate-300 font-medium mb-4 flex items-center gap-2">
            <Activity size={18} className="text-emerald-400" />
            实时数据流监控
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-blue-400">
                    {['GNSS-01', 'PZ-03', 'WL-02', 'RG-01', 'GNSS-05', 'PZ-12'][i]} 数据上报
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">刚刚</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {['X:12.4 Y:5.2 Z:-1.1', '水压: 124.5 kPa', '库水位: 452.3 m', '降雨量: 0.0 mm/h', 'X:8.1 Y:2.4 Z:0.5', '水压: 98.2 kPa'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white">监测预警中心</h1>
            <p className="text-slate-400 text-sm mt-1">对接物联网传感网络，实现全天候自动化监测与智能预警</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="搜索预警编号/库点..." 
                className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64 text-slate-200"
              />
            </div>
            <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
              <Filter size={16} /> 筛选
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 z-10 bg-slate-800 border-b border-slate-700">
              <tr className="text-sm text-slate-400">
                <th className="p-4 font-medium">预警编号</th>
                <th className="p-4 font-medium">库点名称</th>
                <th className="p-4 font-medium">预警类型</th>
                <th className="p-4 font-medium">等级</th>
                <th className="p-4 font-medium">当前值/阈值</th>
                <th className="p-4 font-medium">预警时间</th>
                <th className="p-4 font-medium">状态</th>
                <th className="p-4 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {alertsData.map(alert => (
                <tr key={alert.id} className={`hover:bg-slate-800/80 transition-colors cursor-pointer ${selectedAlert?.id === alert.id ? 'bg-slate-800/80' : ''}`} onClick={() => setSelectedAlert(alert)}>
                  <td className="p-4 text-sm text-slate-300 font-mono">{alert.id}</td>
                  <td className="p-4 text-sm text-slate-200">{alert.pond}</td>
                  <td className="p-4 text-sm text-slate-300">{alert.type}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      alert.level === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      alert.level === 'orange' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {alert.level === 'red' ? '红色预警' : alert.level === 'orange' ? '橙色预警' : '黄色预警'}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <span className="text-slate-200 font-mono">{alert.value}</span>
                    <span className="text-slate-500 mx-1">/</span>
                    <span className="text-slate-400 font-mono">{alert.threshold}</span>
                  </td>
                  <td className="p-4 text-sm text-slate-400 font-mono">{alert.time}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      alert.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                      alert.status === 'processed' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {alert.status === 'active' ? '待处置' : alert.status === 'processed' ? '处理中' : '已关闭'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedAlert(alert); }}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      处置
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Detail Modal (Simulated as side panel) */}
      {selectedAlert && (
        <div className="w-96 bg-slate-800 border border-slate-700 rounded-xl flex flex-col shadow-2xl overflow-hidden flex-shrink-0 animate-in slide-in-from-right-8 duration-300">
          <div className={`p-4 border-b flex justify-between items-center ${
            selectedAlert.level === 'red' ? 'bg-red-500/10 border-red-500/30' :
            selectedAlert.level === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
            'bg-yellow-500/10 border-yellow-500/30'
          }`}>
            <div className="flex items-center gap-2">
              <AlertTriangle className={
                selectedAlert.level === 'red' ? 'text-red-400' :
                selectedAlert.level === 'orange' ? 'text-orange-400' : 'text-yellow-400'
              } size={20} />
              <h3 className={`font-bold ${
                selectedAlert.level === 'red' ? 'text-red-400' :
                selectedAlert.level === 'orange' ? 'text-orange-400' : 'text-yellow-400'
              }`}>
                {selectedAlert.level === 'red' ? '红色预警' : selectedAlert.level === 'orange' ? '橙色预警' : '黄色预警'}
              </h3>
            </div>
            <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-white"><X size={20} /></button>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
            <div>
              <div className="text-lg font-bold text-white mb-1">[{selectedAlert.pond}-{selectedAlert.type}]</div>
              <div className="text-sm text-slate-400 font-mono">预警时间：{selectedAlert.time}</div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">预警内容</span>
                <span className="text-slate-200 text-sm text-right">1号监测点水平位移达 <span className="text-red-400 font-mono font-bold">{selectedAlert.value}</span></span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">报警阈值</span>
                <span className="text-slate-200 text-sm font-mono">{selectedAlert.threshold}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">当前趋势</span>
                <span className="text-red-400 text-sm font-medium">↑ 持续上涨 (近3日+5mm/日)</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setActiveView('model')} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm text-white flex justify-center items-center gap-2 transition-colors">
                <Eye size={16} /> 查看三维模型
              </button>
              <button onClick={() => setActiveView('history')} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm text-white flex justify-center items-center gap-2 transition-colors">
                <Activity size={16} /> 历史曲线
              </button>
            </div>

            <div className="border-t border-slate-700 pt-6">
              <h4 className="text-sm font-medium text-slate-300 mb-4">处置操作</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded border border-slate-700 hover:bg-slate-800 cursor-pointer transition-colors">
                  <input type="radio" name="action" className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 focus:ring-blue-600 focus:ring-2" />
                  <span className="text-sm text-slate-200">确认险情，启动应急响应</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded border border-slate-700 hover:bg-slate-800 cursor-pointer transition-colors">
                  <input type="radio" name="action" className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 focus:ring-blue-600 focus:ring-2" />
                  <span className="text-sm text-slate-200">现场核查中 (派发巡检任务)</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded border border-slate-700 hover:bg-slate-800 cursor-pointer transition-colors">
                  <input type="radio" name="action" className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 focus:ring-blue-600 focus:ring-2" />
                  <span className="text-sm text-slate-200">误报，解除预警</span>
                </label>
              </div>
              
              <div className="mt-4">
                <textarea 
                  placeholder="备注信息..." 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 min-h-[80px]"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-800/80 flex gap-3">
            <button onClick={() => setSelectedAlert(null)} className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm text-white font-medium transition-colors shadow-lg shadow-blue-600/20">
              提交处置
            </button>
            <button onClick={() => setSelectedAlert(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm text-white font-medium transition-colors">
              稍后提醒
            </button>
          </div>
        </div>
      )}

      {/* 3D Model Modal */}
      {activeView === 'model' && selectedAlert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl h-[80vh] bg-slate-800 border border-slate-700 rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
              <div className="flex items-center gap-2">
                <Eye className="text-blue-400" size={20} />
                <h3 className="font-bold text-white">{selectedAlert.pond} - 三维模型</h3>
              </div>
              <button onClick={() => setActiveView('none')} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
               <img 
                 src="https://picsum.photos/seed/tailings_3d/1200/800" 
                 alt="3D Model" 
                 className="w-full h-full object-cover opacity-60"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                 <div className="w-24 h-24 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                 <div className="text-blue-400 font-mono">加载高精度三维模型中...</div>
                 <div className="text-xs text-slate-500 mt-2">包含地形、坝体、排洪设施等BIM数据</div>
               </div>
               {/* Simulated Alert Point */}
               <div className="absolute top-[40%] left-[60%] flex flex-col items-center">
                 <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                 <div className="w-4 h-4 bg-red-500 rounded-full relative z-10 border-2 border-white"></div>
                 <div className="bg-slate-900/80 text-white text-xs px-2 py-1 rounded mt-2 border border-red-500/50 backdrop-blur-sm">
                   预警位置: {selectedAlert.type}
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* History Curve Modal */}
      {activeView === 'history' && selectedAlert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl h-[60vh] bg-slate-800 border border-slate-700 rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900">
              <div className="flex items-center gap-2">
                <Activity className="text-blue-400" size={20} />
                <h3 className="font-bold text-white">{selectedAlert.pond} - {selectedAlert.type} 历史曲线</h3>
              </div>
              <button onClick={() => setActiveView('none')} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>
            <div className="flex-1 p-6 bg-slate-900/50">
              <div className="h-full w-full bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-medium text-white">近24小时数据趋势</h4>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">24小时</button>
                    <button className="bg-slate-700 text-slate-300 hover:bg-slate-600 px-3 py-1 rounded text-xs">7天</button>
                    <button className="bg-slate-700 text-slate-300 hover:bg-slate-600 px-3 py-1 rounded text-xs">30天</button>
                  </div>
                </div>
                <div className="h-[calc(100%-3rem)]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} itemStyle={{ color: '#e2e8f0' }} />
                      {selectedAlert.threshold !== '-' && (
                        <ReferenceLine y={parseFloat(selectedAlert.threshold)} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: '报警阈值', fill: '#f59e0b', fontSize: 12 }} />
                      )}
                      <Line 
                        type={selectedAlert.type === '设备离线' || selectedAlert.type === '越界进入危险区' ? 'stepAfter' : 'monotone'} 
                        dataKey="value" 
                        name={selectedAlert.type === '设备离线' ? '在线状态(1在线/0离线)' : selectedAlert.type === '越界进入危险区' ? '越界人数' : '监测值'} 
                        stroke="#ef4444" 
                        strokeWidth={2} 
                        dot={{ r: 3, fill: '#ef4444' }} 
                        activeDot={{ r: 5 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
