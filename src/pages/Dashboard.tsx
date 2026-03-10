import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts';
import { Wind, Droplets, Thermometer, Activity, Rewind, Play, FastForward, Layers, Maximize, AlertTriangle, X, Eye, FolderKanban } from 'lucide-react';

const deformationData = [
  { time: '00:00', value: 12.5, predict: 12.5 },
  { time: '04:00', value: 13.2, predict: 13.1 },
  { time: '08:00', value: 14.1, predict: 14.0 },
  { time: '12:00', value: 15.3, predict: 15.5 },
  { time: '16:00', value: null, predict: 16.8 },
  { time: '20:00', value: null, predict: 18.2 },
  { time: '24:00', value: null, predict: 19.5 },
  { time: '28:00', value: null, predict: 21.0 },
  { time: '32:00', value: null, predict: 22.8 },
  { time: '36:00', value: null, predict: 24.5 },
];

const carbonData = [
  { name: '1月', emission: 400, sink: 240 },
  { name: '2月', emission: 300, sink: 139 },
  { name: '3月', emission: 200, sink: 980 },
  { name: '4月', emission: 278, sink: 390 },
  { name: '5月', emission: 189, sink: 480 },
  { name: '6月', emission: 239, sink: 380 },
];

const generateHistoryData = (alert: any) => {
  if (!alert) return [];
  const data = [];
  const now = new Date();
  const type = alert.type;
  
  // Extract numeric value from alert.value (e.g., "25.6mm" -> 25.6)
  const currentValue = parseFloat(alert.value) || 0;
  const thresholdValue = parseFloat(alert.threshold) || 0;
  
  // Use alert ID to seed some randomness so same alert always looks similar but different alerts look different
  const seed = alert.id ? alert.id.toString().split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) : 0;
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

const alerts = [
  { id: 1, time: '14:32:05', pond: '隆化顺达', type: '坝体位移异常', level: 'red', value: '25.6mm', threshold: '20mm', trend: '↑ 持续上涨 (近3日+5mm/日)' },
  { id: 2, time: '14:15:22', pond: '金鑫矿业', type: '浸润线偏高', level: 'orange', value: '15.2m', threshold: '15.0m', trend: '↑ 缓慢上涨' },
  { id: 3, time: '13:45:10', pond: '隆化顺达', type: '设备离线', level: 'yellow', value: 'GNSS-02', threshold: '-', trend: '-' },
  { id: 4, time: '12:30:00', pond: '金鑫矿业', type: '越界进入危险区', level: 'yellow', value: '区域A', threshold: '-', trend: '-' },
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [activeView, setActiveView] = useState<'none' | 'model' | 'history'>('none');
  const [fullScreenModule, setFullScreenModule] = useState<'none' | 'project' | 'ai' | 'carbon'>('none');

  const historyData = React.useMemo(() => {
    if (!selectedAlert) return [];
    return generateHistoryData(selectedAlert);
  }, [selectedAlert]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex p-4 gap-4 bg-[#0B1120] relative">
      {/* Background 3D Scene (Simulated) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/tailings/1920/1080?blur=1" 
          alt="3D Scene" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-transparent to-[#0B1120]"></div>
        
        {/* Simulated 3D Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-blue-500/20 rounded-[100%] transform rotate-x-60 animate-[spin_60s_linear_infinite] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-cyan-500/30 rounded-[100%] transform rotate-x-60 animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>
        
        {/* Simulated Data Points */}
        <div className="absolute top-[45%] left-[48%] w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute top-[45%] left-[48%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444]"></div>
        <div className="absolute top-[42%] left-[49%] bg-slate-900/80 border border-red-500/50 text-xs px-2 py-1 rounded text-red-400 backdrop-blur-sm">
          位移: 25.6mm ↑
        </div>

        <div className="absolute top-[55%] left-[52%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        <div className="absolute top-[53%] left-[53%] bg-slate-900/80 border border-cyan-500/30 text-xs px-2 py-1 rounded text-cyan-400 backdrop-blur-sm">
          GNSS-01: 正常
        </div>
      </div>

      {/* Left Panel */}
      <div className="w-[360px] flex flex-col gap-4 z-10">
        <Card title="试点库健康总览" className="h-[30%]">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center justify-between">
              <div className="text-center w-1/2">
                <div className="text-4xl font-bold text-emerald-400 font-mono">92</div>
                <div className="text-xs text-slate-400 mt-1">综合安全指数</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div className="text-center w-1/2">
                <div className="text-2xl font-bold text-blue-400 font-mono">99.8%</div>
                <div className="text-xs text-slate-400 mt-1">设备在线率</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-slate-800/50 rounded p-2 text-center border border-slate-700/50">
                <div className="text-red-400 font-bold font-mono">1</div>
                <div className="text-[10px] text-slate-400">红色预警</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2 text-center border border-slate-700/50">
                <div className="text-orange-400 font-bold font-mono">3</div>
                <div className="text-[10px] text-slate-400">橙色预警</div>
              </div>
              <div className="bg-slate-800/50 rounded p-2 text-center border border-slate-700/50">
                <div className="text-yellow-400 font-bold font-mono">5</div>
                <div className="text-[10px] text-slate-400">黄色预警</div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="实时监测预警" className="h-[35%]">
          <div className="flex flex-col gap-2 h-full overflow-y-auto pr-1 custom-scrollbar">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                onClick={() => setSelectedAlert(alert)}
                className={`p-3 rounded border cursor-pointer hover:brightness-125 transition-all ${
                  alert.level === 'red' ? 'bg-red-500/10 border-red-500/30 animate-[pulse_2s_ease-in-out_infinite]' :
                  alert.level === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    alert.level === 'red' ? 'bg-red-500/20 text-red-400' :
                    alert.level === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{alert.pond}</span>
                  <span className="text-xs text-slate-400 font-mono">{alert.time}</span>
                </div>
                <div className="text-sm text-slate-200">{alert.type}</div>
                <div className="text-xs text-slate-400 mt-1">当前值: <span className="text-slate-200 font-mono">{alert.value}</span></div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="生态环境监测" className="h-[35%]">
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="bg-slate-800/50 rounded p-3 border border-slate-700/50 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Wind size={14} />
                <span className="text-xs">PM2.5</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">12 <span className="text-xs text-slate-500">μg/m³</span></div>
            </div>
            <div className="bg-slate-800/50 rounded p-3 border border-slate-700/50 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Droplets size={14} />
                <span className="text-xs">水质等级</span>
              </div>
              <div className="text-xl font-bold text-blue-400 font-mono">II <span className="text-xs text-slate-500">类</span></div>
            </div>
            <div className="bg-slate-800/50 rounded p-3 border border-slate-700/50 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Thermometer size={14} />
                <span className="text-xs">土壤重金属</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">达标</div>
            </div>
            <div className="bg-slate-800/50 rounded p-3 border border-slate-700/50 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Activity size={14} />
                <span className="text-xs">复绿覆盖率</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">85%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Center Panel (Controls & Overlays) */}
      <div className="flex-1 flex flex-col relative z-10 pointer-events-none">
        {/* Top Center Info */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-2 flex items-center gap-4 shadow-lg">
            <div className="text-sm font-medium text-slate-300">
              {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="w-px h-4 bg-slate-700"></div>
            <div className="text-lg font-bold text-blue-400 font-mono w-24 text-center">
              {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
            <div className="w-px h-4 bg-slate-700"></div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Wind size={16} className="text-cyan-400" />
              <span>晴 22°C</span>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl pointer-events-auto">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 shadow-lg flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span>2026-02-10</span>
              <span>时间轴控制器 (历史回放)</span>
              <span>2026-03-10</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-slate-800 rounded text-slate-300"><Rewind size={16} /></button>
                <button className="p-1.5 hover:bg-slate-800 rounded text-blue-400"><Play size={18} fill="currentColor" /></button>
                <button className="p-1.5 hover:bg-slate-800 rounded text-slate-300"><FastForward size={16} /></button>
              </div>
              <div className="flex-1 h-2 bg-slate-800 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-blue-500 w-full"></div>
              </div>
              <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
                <button className="p-1.5 hover:bg-slate-800 rounded text-slate-300 flex items-center gap-1 text-xs" title="图层切换">
                  <Layers size={16} /> 图层
                </button>
                <button className="p-1.5 hover:bg-slate-800 rounded text-slate-300 flex items-center gap-1 text-xs" title="视图模式">
                  <Maximize size={16} /> 视图
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[360px] flex flex-col gap-4 z-10">
        <div className="h-[30%] cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => setFullScreenModule('project')}>
          <Card title="项目管理进度" className="h-full">
            <div className="flex flex-col gap-3 h-full justify-center">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">隆化顺达矿业尾矿库 (设计阶段)</span>
                  <span className="text-blue-400 font-mono">45%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[45%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">金鑫矿业尾矿库 (排查阶段)</span>
                  <span className="text-orange-400 font-mono">15%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[15%] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">总体投资完成率</span>
                  <span className="text-emerald-400 font-mono">32%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[32%] rounded-full"></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="h-[35%] cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => setFullScreenModule('ai')}>
          <Card title="AI 智能分析 (形变预测)" className="h-full">
            <div className="h-full w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deformationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Line type="monotone" dataKey="value" name="实测位移" stroke="#0066FF" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="predict" name="预测位移" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="h-[35%] cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => setFullScreenModule('carbon')}>
          <Card title="碳排放监测" className="h-full">
            <div className="h-full w-full -ml-4 flex flex-col">
              <div className="flex justify-around mb-2 ml-4">
                <div className="text-center">
                  <div className="text-xs text-slate-400">今日碳排</div>
                  <div className="text-lg font-bold text-orange-400 font-mono">134 <span className="text-[10px] text-slate-500">t</span></div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-400">碳汇增量</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">+50 <span className="text-[10px] text-slate-500">t</span></div>
                </div>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={carbonData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                      cursor={{ fill: '#334155', opacity: 0.4 }}
                    />
                    <Bar dataKey="emission" name="碳排放" fill="#FA8C16" radius={[2, 2, 0, 0]} stackId="a" />
                    <Bar dataKey="sink" name="碳汇" fill="#52C41A" radius={[2, 2, 0, 0]} stackId="b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Alert Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
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
            
            {/* Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar max-h-[70vh]">
              <div>
                <div className="text-lg font-bold text-white mb-1">[{selectedAlert.pond}-{selectedAlert.type}]</div>
                <div className="text-sm text-slate-400 font-mono">预警时间：{selectedAlert.time}</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">预警内容</span>
                  <span className="text-slate-200 text-sm text-right">监测点数值达 <span className="text-red-400 font-mono font-bold">{selectedAlert.value}</span></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">报警阈值</span>
                  <span className="text-slate-200 text-sm font-mono">{selectedAlert.threshold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">当前趋势</span>
                  <span className="text-red-400 text-sm font-medium">{selectedAlert.trend}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setActiveView('model')} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm text-white flex justify-center items-center gap-2 transition-colors">
                  <Eye size={16} /> 查看三维模型
                </button>
                <button onClick={() => setActiveView('history')} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-sm text-white flex justify-center items-center gap-2 transition-colors">
                  <Activity size={16} /> 查看历史曲线
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
                    <span className="text-sm text-slate-200">现场核查中</span>
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

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 bg-slate-800/80 flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm text-white font-medium transition-colors shadow-lg shadow-blue-600/20" onClick={() => setSelectedAlert(null)}>
                提交处置
              </button>
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm text-white font-medium transition-colors" onClick={() => setSelectedAlert(null)}>
                稍后提醒 (5分钟)
              </button>
            </div>
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

      {/* Full Screen Modals */}
      {fullScreenModule === 'project' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <FolderKanban className="text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-white">项目管理进度全景视图</h2>
            </div>
            <button onClick={() => setFullScreenModule('none')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <Card title="总体投资进度" className="h-64">
                <div className="flex items-center justify-center h-full flex-col">
                  <div className="text-5xl font-bold text-emerald-400 font-mono mb-2">32.5%</div>
                  <div className="text-slate-400">已完成投资 / 计划总投资</div>
                  <div className="mt-4 w-full px-8">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>¥ 1,250万</span>
                      <span>¥ 3,840万</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[32.5%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card title="项目阶段分布" className="h-64">
                <div className="flex flex-col justify-center h-full gap-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-400 text-right">前期排查</div>
                    <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[100%]"></div>
                    </div>
                    <div className="w-12 text-sm text-slate-200 font-mono">100%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-400 text-right">方案设计</div>
                    <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[85%]"></div>
                    </div>
                    <div className="w-12 text-sm text-slate-200 font-mono">85%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-400 text-right">工程施工</div>
                    <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-[20%]"></div>
                    </div>
                    <div className="w-12 text-sm text-slate-200 font-mono">20%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 text-sm text-slate-400 text-right">竣工验收</div>
                    <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-600 w-[0%]"></div>
                    </div>
                    <div className="w-12 text-sm text-slate-200 font-mono">0%</div>
                  </div>
                </div>
              </Card>
              <Card title="本月关键里程碑" className="h-64">
                <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-2">
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm text-slate-200">金鑫矿业尾矿库地质勘探报告评审</div>
                      <div className="text-xs text-slate-500">2026-03-05 · 已完成</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm text-slate-200">隆化顺达矿业尾矿库施工招标发布</div>
                      <div className="text-xs text-slate-500">2026-03-12 · 进行中</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm text-slate-200">太和矿业尾矿库在线监测设备安装</div>
                      <div className="text-xs text-slate-500">2026-03-20 · 计划中</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-slate-600 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm text-slate-200">第一季度项目进度汇报会</div>
                      <div className="text-xs text-slate-500">2026-03-28 · 计划中</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <Card title="各尾矿库项目进度明细" className="min-h-[400px]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800/50 border-b border-slate-700">
                  <tr className="text-sm text-slate-400">
                    <th className="p-4 font-medium">项目名称</th>
                    <th className="p-4 font-medium">当前阶段</th>
                    <th className="p-4 font-medium">进度</th>
                    <th className="p-4 font-medium">计划开始</th>
                    <th className="p-4 font-medium">计划结束</th>
                    <th className="p-4 font-medium">负责人</th>
                    <th className="p-4 font-medium">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-sm text-slate-200">隆化顺达矿业尾矿库闭库工程</td>
                    <td className="p-4 text-sm text-slate-300">方案设计</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-blue-500 w-[45%]"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">45%</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">2026-01-15</td>
                    <td className="p-4 text-sm text-slate-400">2026-08-30</td>
                    <td className="p-4 text-sm text-slate-300">张建国</td>
                    <td className="p-4"><span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">正常推进</span></td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-sm text-slate-200">金鑫矿业尾矿库生态修复项目</td>
                    <td className="p-4 text-sm text-slate-300">前期排查</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-orange-500 w-[15%]"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">15%</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">2026-02-20</td>
                    <td className="p-4 text-sm text-slate-400">2026-11-15</td>
                    <td className="p-4 text-sm text-slate-300">李明</td>
                    <td className="p-4"><span className="text-xs px-2 py-1 rounded bg-orange-500/20 text-orange-400">进度滞后</span></td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-sm text-slate-200">太和矿业尾矿库在线监测升级</td>
                    <td className="p-4 text-sm text-slate-300">工程施工</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-emerald-500 w-[80%]"></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">80%</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-400">2025-12-01</td>
                    <td className="p-4 text-sm text-slate-400">2026-04-10</td>
                    <td className="p-4 text-sm text-slate-300">王强</td>
                    <td className="p-4"><span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400">即将完成</span></td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}

      {fullScreenModule === 'ai' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-white">AI 智能分析与形变预测系统</h2>
            </div>
            <button onClick={() => setFullScreenModule('none')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-auto custom-scrollbar flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-6">
              <Card title="预测模型准确率" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-emerald-400 font-mono">94.2%</div>
                <div className="text-xs text-slate-500 mt-2">基于 LSTM + Transformer 架构</div>
              </Card>
              <Card title="已分析监测数据" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-blue-400 font-mono">1.2<span className="text-lg">亿条</span></div>
                <div className="text-xs text-slate-500 mt-2">涵盖位移、渗压、降雨等多模态数据</div>
              </Card>
              <Card title="提前预警时间" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-orange-400 font-mono">72<span className="text-lg">小时</span></div>
                <div className="text-xs text-slate-500 mt-2">平均有效预见期</div>
              </Card>
              <Card title="异常识别事件" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-red-400 font-mono">15<span className="text-lg">起</span></div>
                <div className="text-xs text-slate-500 mt-2">本年度成功拦截潜在风险</div>
              </Card>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-6 min-h-[500px]">
              <Card title="坝体位移 72小时预测曲线 (主坝段)" className="col-span-2 h-full">
                <div className="h-full w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={deformationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '14px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                      />
                      <ReferenceLine x="12:00" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: '当前时间', fill: '#ef4444', fontSize: 12 }} />
                      <Line type="monotone" dataKey="value" name="历史实测位移 (mm)" stroke="#0066FF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="predict" name="AI预测位移 (mm)" stroke="#F59E0B" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title="AI 风险评估报告" className="col-span-1 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                      <AlertTriangle size={18} />
                      高风险预测 (隆化顺达)
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      模型预测未来48小时内，受持续降雨影响，主坝段GNSS-03监测点位移速率将显著增加，预计达到 <span className="text-red-400 font-mono font-bold">2.5mm/d</span>，超过黄色预警阈值。建议提前做好防汛准备。
                    </p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-2">
                      <Activity size={18} />
                      浸润线趋势分析
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      结合历史降雨量与排渗设施运行状态，AI模型判定当前浸润线处于安全水位。未来一周无明显降水，预计浸润线将保持平稳或微降。
                    </p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                      <Layers size={18} />
                      库区形变雷达(InSAR)分析
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      最新一期卫星雷达影像解析完成，库区整体沉降均匀，未发现大面积异常沉降漏斗，与地表GNSS监测数据拟合度达95%。
                    </p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium">
                  导出完整分析报告
                </button>
              </Card>
            </div>
          </div>
        </div>
      )}

      {fullScreenModule === 'carbon' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Wind className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">碳排放与生态碳汇监测系统</h2>
            </div>
            <button onClick={() => setFullScreenModule('none')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 overflow-auto custom-scrollbar flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-6">
              <Card title="年度累计碳排放" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-orange-400 font-mono">12,450 <span className="text-lg">tCO₂e</span></div>
                <div className="text-xs text-emerald-400 mt-2">同比下降 15.2% ↓</div>
              </Card>
              <Card title="年度累计碳汇量" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-emerald-400 font-mono">3,280 <span className="text-lg">tCO₂e</span></div>
                <div className="text-xs text-emerald-400 mt-2">同比增长 45.8% ↑ (复绿成效)</div>
              </Card>
              <Card title="净碳排放量" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-blue-400 font-mono">9,170 <span className="text-lg">tCO₂e</span></div>
                <div className="text-xs text-slate-500 mt-2">排放量 - 碳汇量</div>
              </Card>
              <Card title="碳中和目标达成率" className="p-4 bg-slate-800/50 border-slate-700/50">
                <div className="text-3xl font-bold text-cyan-400 font-mono">26.3%</div>
                <div className="text-xs text-slate-500 mt-2">2030年前实现碳达峰</div>
              </Card>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6 min-h-[400px]">
              <Card title="近30天碳排放与碳汇趋势" className="h-full">
                <div className="h-full w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={carbonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '14px' }}
                        cursor={{ fill: '#334155', opacity: 0.4 }}
                      />
                      <Bar dataKey="emission" name="施工机械碳排放 (t)" fill="#FA8C16" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="sink" name="植被恢复碳汇 (t)" fill="#52C41A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title="碳排放源结构分析" className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full border-[16px] border-slate-800 relative flex items-center justify-center">
                    {/* Simulated Donut Chart using CSS */}
                    <div className="absolute inset-0 rounded-full border-[16px] border-orange-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
                    <div className="absolute inset-0 rounded-full border-[16px] border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 50%)' }}></div>
                    <div className="absolute inset-0 rounded-full border-[16px] border-yellow-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>
                    <div className="text-center z-10 bg-slate-900 w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-inner">
                      <div className="text-2xl font-bold text-white font-mono">134t</div>
                      <div className="text-xs text-slate-400">今日总计</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <div className="text-sm text-slate-300">施工机械 (50%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="text-sm text-slate-300">电力消耗 (25%)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="text-sm text-slate-300">材料运输 (25%)</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
