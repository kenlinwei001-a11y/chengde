import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Wind, Droplets, Activity, FastForward, 
  Layers, Map as MapIcon, ShieldAlert, Video, Truck, AlertOctagon, X, ChevronRight
} from 'lucide-react';

// --- Mock Data ---
const mapMarkers = [
  { id: 'SL-001', name: '隆化顺达矿业尾矿库', top: '40%', left: '45%', status: 'normal', type: '闭库工程' },
  { id: 'JX-002', name: '金鑫矿业尾矿库', top: '60%', left: '55%', status: 'warning', type: '生态修复' },
  { id: 'TH-003', name: '太和矿业尾矿库', top: '30%', left: '60%', status: 'normal', type: '在线监测' },
  { id: 'HD-004', name: '宏达铁矿尾矿库', top: '70%', left: '35%', status: 'normal', type: '日常监管' },
  { id: 'XY-005', name: '鑫源金矿尾矿库', top: '20%', left: '40%', status: 'normal', type: '日常监管' },
  { id: 'HF-006', name: '华丰铜矿尾矿库', top: '50%', left: '70%', status: 'warning', type: '隐患排查' },
  { id: 'BS-007', name: '宝山铅锌矿尾矿库', top: '80%', left: '65%', status: 'normal', type: '闭库工程' },
  { id: 'YX-008', name: '银星矿业尾矿库', top: '45%', left: '30%', status: 'normal', type: '日常监管' },
  { id: 'JL-009', name: '聚龙钨矿尾矿库', top: '25%', left: '75%', status: 'warning', type: '生态修复' },
  { id: 'TC-010', name: '天成钼矿尾矿库', top: '65%', left: '45%', status: 'normal', type: '日常监管' },
];

const radarData = [
  { subject: '坝体稳定', A: 95, fullMark: 100 },
  { subject: '防洪排涝', A: 88, fullMark: 100 },
  { subject: '地下水质', A: 82, fullMark: 100 },
  { subject: '土壤环境', A: 90, fullMark: 100 },
  { subject: '生态复绿', A: 78, fullMark: 100 },
  { subject: '合规管理', A: 85, fullMark: 100 },
];

const waterQualityData = [
  { time: '00:00', ph: 7.2, cod: 15 },
  { time: '04:00', ph: 7.1, cod: 16 },
  { time: '08:00', ph: 7.3, cod: 14 },
  { time: '12:00', ph: 7.4, cod: 18 },
  { time: '16:00', ph: 7.2, cod: 15 },
  { time: '20:00', ph: 7.1, cod: 17 },
  { time: '24:00', ph: 7.2, cod: 16 },
];

const projectProgress = [
  { name: '隆化顺达矿业 (闭库)', progress: 45, status: 'normal' },
  { name: '金鑫矿业 (生态修复)', progress: 15, status: 'warning' },
  { name: '太和矿业 (在线监测)', progress: 80, status: 'success' },
];

const alerts = [
  { id: 1, time: '14:32:05', pond: '隆化顺达', type: '排污口COD超标', level: 'red', value: '65mg/L', threshold: '50mg/L' },
  { id: 2, time: '14:15:22', pond: '金鑫矿业', type: 'AI识别: 违规倾倒', level: 'orange', value: '视频监控#3', threshold: '-' },
  { id: 3, time: '13:45:10', pond: '隆化顺达', type: '地下水水位异常下降', level: 'yellow', value: '-2.5m', threshold: '-1.5m' },
];

interface DashboardProps {
  onNavigateToProject?: (id: string) => void;
  onNavigateToPage?: (page: string) => void;
}

export default function Dashboard({ onNavigateToProject, onNavigateToPage }: DashboardProps = {}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [fullScreenModule, setFullScreenModule] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col bg-[#050A15] text-slate-200 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-gradient-to-b from-[#0B1426] to-transparent border-b border-blue-900/30 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            <Activity size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            尾矿库全生命周期智慧监管驾驶舱
          </h1>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">接入尾矿库</span>
              <span className="text-lg font-bold text-cyan-400 font-mono">3 <span className="text-xs text-slate-500">座</span></span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">设备在线率</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">99.8 <span className="text-xs text-slate-500">%</span></span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-slate-400">今日预警</span>
              <span className="text-lg font-bold text-red-400 font-mono">5 <span className="text-xs text-slate-500">条</span></span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-slate-700/50"></div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-cyan-400">
              <Wind size={16} />
              <span>晴 22°C</span>
            </div>
            <div className="font-mono text-slate-300">
              {currentTime.toLocaleDateString('zh-CN')} {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex relative p-4 gap-4 overflow-hidden">
        
        {/* Center GIS Map Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]"></div> {/* Base dark color */}
          
          {/* Base Map Image - High Quality Satellite */}
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
            alt="GIS Base Map" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity filter contrast-125 brightness-75"
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay Grid for Tech Feel */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwgMjExLCAyMzgsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
          
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050A15_100%)]"></div>
          
          {/* Layer Overlays based on activeLayer */}
          {activeLayer === 'satellite' && (
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay transition-opacity duration-500"></div>
          )}
          {activeLayer === 'redline' && (
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMTAwIDEwMCBRIDIwMCA1MCAzMDAgMjAwIFQgNTAwIDE1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIzOSwgNjgsIDY4LCAwLjUpIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1kYXNoYXJyYXk9IjEwLCA1Ii8+PC9zdmc+')] opacity-60 transition-opacity duration-500"></div>
          )}
          {activeLayer === 'groundwater' && (
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMCAyMDAgQyAxMDAgMTAwLCAyMDAgMzAwLCA0MDAgMjAwIFMgNzAwIDMwMCwgMTAwMCAyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuNCkiIHN0cm9rZS13aWR0aD0iMjAiIGZpbHRlcj0iYmx1cig4cHgpIi8+PC9zdmc+')] opacity-60 transition-opacity duration-500"></div>
          )}
          
          {/* Map Markers */}
          {mapMarkers.map((marker) => (
            <div 
              key={marker.id}
              className="absolute flex flex-col items-center group cursor-pointer z-10"
              style={{ top: marker.top, left: marker.left }}
              onClick={() => setSelectedMarker(marker)}
            >
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center relative transition-transform group-hover:scale-125 ${
                marker.status === 'warning' 
                  ? 'border-red-500/50 bg-red-500/10 animate-[pulse_1.5s_ease-in-out_infinite]' 
                  : 'border-cyan-500/50 bg-cyan-500/10 animate-[pulse_3s_ease-in-out_infinite]'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  marker.status === 'warning' ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'
                }`}></div>
                <div className={`absolute inset-0 rounded-full border-t-2 animate-spin opacity-80 ${
                  marker.status === 'warning' ? 'border-red-500' : 'border-cyan-400'
                }`} style={{ animationDuration: marker.status === 'warning' ? '1s' : '3s' }}></div>
              </div>
              
              {/* Tooltip on hover */}
              <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                <div className={`px-3 py-1.5 rounded text-xs backdrop-blur-md shadow-lg border ${
                  marker.status === 'warning' 
                    ? 'bg-red-900/80 border-red-500/50 text-red-100' 
                    : 'bg-slate-900/80 border-cyan-500/30 text-cyan-100'
                }`}>
                  <div className="font-bold">{marker.name}</div>
                  <div className={`text-[10px] mt-0.5 ${marker.status === 'warning' ? 'text-red-300' : 'text-cyan-400'}`}>
                    {marker.status === 'warning' ? '预警状态' : '运行正常'} | {marker.type}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Map Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-full px-4 py-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10">
            <button 
              onClick={() => { setActiveLayer('satellite'); setFullScreenModule('satellite'); }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${
                activeLayer === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Layers size={14} /> 高分卫星影像
            </button>
            <div className="w-px h-4 bg-slate-700"></div>
            <button 
              onClick={() => { setActiveLayer('redline'); setFullScreenModule('redline'); }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${
                activeLayer === 'redline' ? 'bg-red-600/80 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <MapIcon size={14} /> 生态保护红线
            </button>
            <div className="w-px h-4 bg-slate-700"></div>
            <button 
              onClick={() => { setActiveLayer('groundwater'); setFullScreenModule('groundwater'); }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${
                activeLayer === 'groundwater' ? 'bg-cyan-600/80 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Droplets size={14} /> 地下水流场模型
            </button>
            <div className="w-px h-4 bg-slate-700"></div>
            <button 
              onClick={() => { setActiveLayer('drone'); setFullScreenModule('drone'); }}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-colors ${
                activeLayer === 'drone' ? 'bg-emerald-600/80 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Video size={14} /> 无人机正射影像
            </button>
          </div>
        </div>

        {/* Marker Detail Modal */}
        {selectedMarker && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl w-[400px] overflow-hidden">
              <div className={`px-4 py-3 flex justify-between items-center border-b ${
                selectedMarker.status === 'warning' ? 'bg-red-900/30 border-red-900/50' : 'bg-slate-800 border-slate-700'
              }`}>
                <div className="flex items-center gap-2">
                  {selectedMarker.status === 'warning' ? (
                    <AlertOctagon size={18} className="text-red-400" />
                  ) : (
                    <Activity size={18} className="text-cyan-400" />
                  )}
                  <h3 className="font-bold text-white">{selectedMarker.name}</h3>
                </div>
                <button onClick={() => setSelectedMarker(null)} className="text-slate-400 hover:text-white">
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <div>
                    <div className="text-xs text-slate-400">当前状态</div>
                    <div className={`text-sm font-bold mt-0.5 ${selectedMarker.status === 'warning' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {selectedMarker.status === 'warning' ? '存在预警隐患' : '运行平稳正常'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">项目类型</div>
                    <div className="text-sm text-slate-200 mt-0.5">{selectedMarker.type}</div>
                  </div>
                </div>

                {selectedMarker.status === 'warning' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <div className="text-xs text-red-400 font-bold mb-1">最新预警信息</div>
                    <div className="text-sm text-slate-300">
                      监测到坝体位移速率异常，超出黄色警戒线。AI识别周边有疑似违规倾倒行为。
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50 text-center">
                    <div className="text-[10px] text-slate-400">在线设备</div>
                    <div className="text-sm font-mono text-slate-200">24 / 24</div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50 text-center">
                    <div className="text-[10px] text-slate-400">今日巡检</div>
                    <div className="text-sm font-mono text-slate-200">已完成</div>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigateToProject && onNavigateToProject(selectedMarker.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  进入项目详情页 <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Left Panel */}
        <div className="w-[400px] flex flex-col gap-4 z-10">
          {/* 综合安全态势 */}
          <Card title="综合安全态势评估" className="h-[30%] bg-slate-900/70 backdrop-blur-md border-blue-900/30" onClick={() => onNavigateToPage && onNavigateToPage('reports')}>
            <div className="h-full w-full flex items-center justify-center -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="安全指数" dataKey="A" stroke="#0ea5e9" strokeWidth={2} fill="#0ea5e9" fillOpacity={0.3} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* 实时监测预警 */}
          <Card title="AI 智能预警与行为识别" className="h-[35%] bg-slate-900/70 backdrop-blur-md border-blue-900/30" onClick={() => onNavigateToPage && onNavigateToPage('video')}>
            <div className="flex flex-col h-full gap-3">
              {/* Simulated AI Video Feed */}
              <div className="h-28 bg-black rounded border border-slate-700 relative overflow-hidden flex-shrink-0">
                <img src="https://picsum.photos/seed/dumping/400/200" alt="AI Feed" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500/80 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                  AI 识别: 疑似违规倾倒
                </div>
                {/* Bounding Box */}
                <div className="absolute top-1/4 left-1/3 w-1/3 h-1/2 border-2 border-red-500 bg-red-500/10"></div>
              </div>
              
              {/* Alert List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                {alerts.map(alert => (
                  <div key={alert.id} className={`p-2.5 rounded border text-sm ${
                    alert.level === 'red' ? 'bg-red-500/10 border-red-500/30' :
                    alert.level === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                    'bg-yellow-500/10 border-yellow-500/30'
                  }`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5">
                        <AlertOctagon size={14} className={
                          alert.level === 'red' ? 'text-red-400' :
                          alert.level === 'orange' ? 'text-orange-400' : 'text-yellow-400'
                        } />
                        <span className="font-medium text-slate-200">{alert.pond}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{alert.time}</span>
                    </div>
                    <div className="text-slate-300 text-xs">{alert.type}</div>
                    <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                      <span>当前: <span className="font-mono text-slate-200">{alert.value}</span></span>
                      {alert.threshold !== '-' && <span>阈值: <span className="font-mono">{alert.threshold}</span></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 地下水与排污监测 */}
          <Card title="地下水与排污口实时监测" className="h-[35%] bg-slate-900/70 backdrop-blur-md border-blue-900/30" onClick={() => onNavigateToPage && onNavigateToPage('environment')}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-2 px-1">
                <div className="text-xs text-slate-400 flex items-center gap-1"><Droplets size={12} className="text-blue-400" /> 下游监测井 pH值</div>
                <div className="text-xs text-slate-400 flex items-center gap-1"><Activity size={12} className="text-orange-400" /> 排污口 COD (mg/L)</div>
              </div>
              <div className="flex-1 -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterQualityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[6, 9]} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '12px' }} />
                    <Line yAxisId="left" type="monotone" dataKey="ph" name="pH值" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="cod" name="COD" stroke="#f97316" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="w-[400px] flex flex-col gap-4 z-10 ml-auto">
          {/* 生态复绿与遥感 */}
          <Card title="生态复绿与多时相遥感" className="h-[30%] bg-slate-900/70 backdrop-blur-md border-blue-900/30" onClick={() => onNavigateToPage && onNavigateToPage('environment')}>
            <div className="flex flex-col h-full gap-3">
              <div className="flex gap-2 h-24">
                <div className="flex-1 relative rounded overflow-hidden border border-slate-700 group cursor-pointer">
                  <img src="https://picsum.photos/seed/rs1/200/100" alt="2024" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[10px] text-white px-1 py-0.5 text-center">2024-05 影像</div>
                </div>
                <div className="flex items-center text-slate-500"><FastForward size={14} /></div>
                <div className="flex-1 relative rounded overflow-hidden border border-emerald-500/50 group cursor-pointer">
                  <img src="https://picsum.photos/seed/rs2/200/100" alt="2026" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-0 left-0 right-0 bg-emerald-900/80 text-[10px] text-white px-1 py-0.5 text-center">2026-03 影像 (复绿)</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded border border-slate-700/50 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">植被覆盖度 (NDVI)</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">0.68 <span className="text-xs text-emerald-500">↑ 0.15</span></span>
                </div>
                <div className="w-px h-8 bg-slate-700"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400">累计碳汇量</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">3,280 <span className="text-xs text-slate-500">t</span></span>
                </div>
              </div>
            </div>
          </Card>

          {/* 排查整改与闭库 */}
          <Card title="排查整改与闭库进度" className="h-[35%] bg-slate-900/70 backdrop-blur-md border-blue-900/30" onClick={() => onNavigateToPage && onNavigateToPage('projects')}>
            <div className="flex flex-col justify-center h-full gap-5 px-2">
              {projectProgress.map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{proj.name}</span>
                    <span className={`font-mono ${
                      proj.status === 'success' ? 'text-emerald-400' :
                      proj.status === 'warning' ? 'text-orange-400' : 'text-blue-400'
                    }`}>{proj.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      proj.status === 'success' ? 'bg-emerald-500' :
                      proj.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                    }`} style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-3 border-t border-slate-800 flex justify-between items-center">
                <div className="text-xs text-slate-400">隐患整改销号率</div>
                <div className="text-sm font-bold text-emerald-400 font-mono">92.5%</div>
              </div>
            </div>
          </Card>

          {/* 应急响应与物资 */}
          <Card title="应急响应与物资调配" className="h-[35%] bg-slate-900/70 backdrop-blur-md border-blue-900/30" onClick={() => onNavigateToPage && onNavigateToPage('alerts')}>
            <div className="flex flex-col h-full gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded p-2 border border-slate-700/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <ShieldAlert size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">应急队伍</div>
                    <div className="text-sm font-bold text-slate-200">3 支 / 45 人</div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded p-2 border border-slate-700/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Truck size={16} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">救援车辆</div>
                    <div className="text-sm font-bold text-slate-200">12 辆 (待命)</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 bg-slate-800/30 rounded border border-slate-700/50 p-3">
                <div className="text-xs text-slate-400 mb-3">关键物资储备状态</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-slate-300">防汛编织袋</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[85%]"></div>
                    </div>
                    <span className="w-10 text-right text-slate-400 font-mono">85%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-slate-300">中和药剂</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-[40%]"></div>
                    </div>
                    <span className="w-10 text-right text-slate-400 font-mono">40%</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-slate-300">吸油毡</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[90%]"></div>
                    </div>
                    <span className="w-10 text-right text-slate-400 font-mono">90%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Full Screen Modules */}
      {fullScreenModule === 'satellite' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Layers className="text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-white">高分卫星影像与地表形变监测</h2>
            </div>
            <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); }} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 flex gap-6">
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Satellite" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
              {/* Simulated InSAR heat map */}
              <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-red-500/30 blur-3xl rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-500/40 blur-2xl rounded-full"></div>
            </div>
            <div className="w-96 flex flex-col gap-4">
              <Card title="InSAR 地表形变分析" className="flex-1">
                <div className="p-4 space-y-4">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">最大沉降速率</div>
                    <div className="text-2xl font-bold text-red-400 font-mono">-12.5 <span className="text-sm">mm/年</span></div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">重点监测区域</div>
                    <div className="text-sm text-slate-200 mt-1">金鑫矿业尾矿库主坝体</div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    基于 Sentinel-1 雷达卫星数据，采用 SBAS-InSAR 技术提取地表形变信息。当前监测显示金鑫矿业尾矿库主坝体存在局部沉降趋势，建议结合地表 GNSS 监测数据进行交叉验证。
                  </p>
                  <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); onNavigateToPage && onNavigateToPage('environment'); }} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                    进入生态环境系统
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {fullScreenModule === 'redline' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <MapIcon className="text-red-400" size={24} />
              <h2 className="text-xl font-bold text-white">生态保护红线冲突分析</h2>
            </div>
            <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); }} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 flex gap-6">
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Redline" className="w-full h-full object-cover opacity-40 grayscale" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMTAwIDEwMCBRIDIwMCA1MCAzMDAgMjAwIFQgNTAwIDE1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIzOSwgNjgsIDY4LCAwLjgpIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1kYXNoYXJyYXk9IjEwLCA1Ii8+PC9zdmc+')] opacity-80"></div>
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-red-500 bg-red-500/20 rounded-lg flex items-center justify-center">
                <span className="text-red-200 text-xs font-bold bg-red-900/80 px-2 py-1 rounded">冲突区域 A</span>
              </div>
            </div>
            <div className="w-96 flex flex-col gap-4">
              <Card title="空间合规性审查" className="flex-1">
                <div className="p-4 space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
                    <div className="text-xs text-red-400 font-bold">发现 1 处红线冲突</div>
                    <div className="text-sm text-slate-300 mt-1">华丰铜矿尾矿库扩建区 (约 2.5 公顷) 涉及省级水源涵养生态保护红线。</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">距离最近水源地</div>
                    <div className="text-xl font-bold text-orange-400 font-mono">1.2 <span className="text-sm">km</span></div>
                  </div>
                  <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); onNavigateToPage && onNavigateToPage('reports'); }} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                    生成合规性审查报告
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {fullScreenModule === 'groundwater' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Droplets className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold text-white">地下水流场与污染扩散模型</h2>
            </div>
            <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); }} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 flex gap-6">
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Groundwater" className="w-full h-full object-cover opacity-30 grayscale" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMCAyMDAgQyAxMDAgMTAwLCAyMDAgMzAwLCA0MDAgMjAwIFMgNzAwIDMwMCwgMTAwMCAyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuOCkiIHN0cm9rZS13aWR0aD0iMjAiIGZpbHRlcj0iYmx1cig4cHgpIi8+PC9zdmc+')] opacity-80"></div>
              {/* Simulated Flow Arrows */}
              <div className="absolute top-1/2 left-1/3 text-cyan-400 rotate-45 animate-pulse">➔</div>
              <div className="absolute top-1/2 left-1/2 text-cyan-400 rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}>➔</div>
              <div className="absolute top-2/3 left-2/3 text-cyan-400 rotate-45 animate-pulse" style={{ animationDelay: '1s' }}>➔</div>
            </div>
            <div className="w-96 flex flex-col gap-4">
              <Card title="MODFLOW 流场模拟" className="flex-1">
                <div className="p-4 space-y-4">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">主径流方向</div>
                    <div className="text-lg font-bold text-cyan-400">自西北向东南</div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">渗透系数 (K)</div>
                    <div className="text-lg font-mono text-slate-200">1.2 × 10⁻⁴ <span className="text-sm">cm/s</span></div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    基于区域水文地质资料构建的地下水三维流场模型。模拟结果显示，隆化顺达矿业尾矿库下游存在潜在的渗漏优势通道，建议在该区域增设 2 口地下水水质监测井。
                  </p>
                  <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); onNavigateToPage && onNavigateToPage('environment'); }} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                    查看水质监测数据
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {fullScreenModule === 'drone' && (
        <div className="fixed inset-0 z-[70] bg-slate-900 flex flex-col animate-in fade-in duration-300">
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Video className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">无人机正射影像与三维建模</h2>
            </div>
            <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); }} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 p-6 flex gap-6">
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Drone" className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
              {/* Simulated 3D Mesh Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSAwIDEwIEwgMjAgMTAgTSAxMCAwIEwgMTAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNiwgMTg1LCAxMjksIDAuMikiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-50" style={{ transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'bottom' }}></div>
            </div>
            <div className="w-96 flex flex-col gap-4">
              <Card title="倾斜摄影测算" className="flex-1">
                <div className="p-4 space-y-4">
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">当前库容测算</div>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">125.4 <span className="text-sm">万m³</span></div>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                    <div className="text-xs text-slate-400">干滩长度测算</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">185 <span className="text-sm">m</span> <span className="text-xs text-slate-500 ml-2">(合规)</span></div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    基于 2026-03-01 无人机倾斜摄影数据生成的实景三维模型。通过体积计算，当前库容与设计库容相符，干滩长度满足安全规程要求。
                  </p>
                  <button onClick={() => { setFullScreenModule(null); setActiveLayer(null); onNavigateToPage && onNavigateToPage('video'); }} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition-colors">
                    进入视频监控系统
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
