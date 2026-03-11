import React, { useState } from 'react';
import { Leaf, Droplets, Wind, Thermometer, Activity, Map, BarChart2, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';

const airQualityData = [
  { time: '00:00', pm25: 12, pm10: 25, so2: 5, no2: 15 },
  { time: '04:00', pm25: 15, pm10: 28, so2: 6, no2: 18 },
  { time: '08:00', pm25: 25, pm10: 45, so2: 12, no2: 35 },
  { time: '12:00', pm25: 35, pm10: 55, so2: 15, no2: 42 },
  { time: '16:00', pm25: 28, pm10: 48, so2: 10, no2: 38 },
  { time: '20:00', pm25: 18, pm10: 32, so2: 7, no2: 22 },
  { time: '24:00', pm25: 14, pm10: 26, so2: 5, no2: 16 },
];

const waterQualityData = [
  { month: '1月', ph: 7.2, cod: 15, nh3: 0.5, heavyMetal: 0.01 },
  { month: '2月', ph: 7.1, cod: 18, nh3: 0.6, heavyMetal: 0.02 },
  { month: '3月', ph: 7.3, cod: 14, nh3: 0.4, heavyMetal: 0.01 },
  { month: '4月', ph: 7.0, cod: 22, nh3: 0.8, heavyMetal: 0.03 },
  { month: '5月', ph: 6.9, cod: 25, nh3: 0.9, heavyMetal: 0.04 },
  { month: '6月', ph: 7.2, cod: 16, nh3: 0.5, heavyMetal: 0.02 },
];

const soilData = [
  { name: '尾矿库周边', pb: 35.2, cd: 0.15, as: 12.4, hg: 0.02 },
  { name: '排土场下风向', pb: 42.8, cd: 0.22, as: 15.6, hg: 0.05 },
  { name: '复绿区核心', pb: 18.5, cd: 0.08, as: 8.2, hg: 0.01 },
  { name: '农田对照区', pb: 12.4, cd: 0.05, as: 5.1, hg: 0.01 },
  { name: '地下水汇集', pb: 28.6, cd: 0.18, as: 14.2, hg: 0.03 },
];

export default function Environment() {
  const [activeTab, setActiveTab] = useState<'air' | 'water' | 'soil' | 'ecology'>('air');

  return (
    <div className="h-full p-6 overflow-hidden bg-slate-900 flex flex-col gap-6">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Leaf className="text-emerald-400" />
            生态环境监测与保护系统
          </h1>
          <p className="text-slate-400 text-sm mt-1">对接国家环保部联网平台、气象局数据接口、水利部水质监测系统</p>
        </div>
        <div className="flex gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button 
            onClick={() => setActiveTab('air')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'air' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            大气环境
          </button>
          <button 
            onClick={() => setActiveTab('water')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'water' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            水质监测
          </button>
          <button 
            onClick={() => setActiveTab('soil')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'soil' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            土壤与重金属
          </button>
          <button 
            onClick={() => setActiveTab('ecology')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'ecology' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            生态复绿
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Panel - Key Metrics */}
        <div className="w-80 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
              <Wind size={16} className="text-cyan-400" />
              空气质量指数 (AQI)
            </h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-bold text-emerald-400 font-mono">42</span>
              <span className="text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded text-xs font-medium mb-1 border border-emerald-500/30">优</span>
            </div>
            <p className="text-xs text-slate-500">首要污染物: 无</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                <div className="text-xs text-slate-400">PM2.5</div>
                <div className="text-lg font-mono text-slate-200">12 <span className="text-[10px] text-slate-500">μg/m³</span></div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                <div className="text-xs text-slate-400">PM10</div>
                <div className="text-lg font-mono text-slate-200">25 <span className="text-[10px] text-slate-500">μg/m³</span></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
              <Droplets size={16} className="text-blue-400" />
              地表水水质等级
            </h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-bold text-blue-400 font-mono">II</span>
              <span className="text-blue-400 bg-blue-500/20 px-2 py-1 rounded text-xs font-medium mb-1 border border-blue-500/30">类水质</span>
            </div>
            <p className="text-xs text-slate-500">排污口监测点: 达标</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                <div className="text-xs text-slate-400">pH值</div>
                <div className="text-lg font-mono text-slate-200">7.2</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-slate-700">
                <div className="text-xs text-slate-400">COD</div>
                <div className="text-lg font-mono text-slate-200">15 <span className="text-[10px] text-slate-500">mg/L</span></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
              <Thermometer size={16} className="text-orange-400" />
              土壤环境风险
            </h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl font-bold text-emerald-400">低风险</span>
            </div>
            <p className="text-xs text-slate-500">重金属含量均低于管控标准</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">铅 (Pb)</span>
                <span className="text-slate-200 font-mono">25.4 mg/kg</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[15%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-slate-400">镉 (Cd)</span>
                <span className="text-slate-200 font-mono">0.12 mg/kg</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[8%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Main Content Area */}
        <div className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex flex-col">
          {activeTab === 'air' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">24小时大气污染物浓度趋势</h2>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> PM2.5</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-cyan-500 rounded-sm"></div> PM10</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-orange-500 rounded-sm"></div> SO₂</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-purple-500 rounded-sm"></div> NO₂</span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={airQualityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPm25" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPm10" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                    <Area type="monotone" dataKey="pm10" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPm10)" />
                    <Area type="monotone" dataKey="pm25" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPm25)" />
                    <Line type="monotone" dataKey="so2" stroke="#f97316" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="no2" stroke="#a855f7" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">扬尘在线监测设备</div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white font-mono">12<span className="text-sm text-slate-500">台</span></span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">全部在线</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">本月超标报警次数</div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white font-mono">0<span className="text-sm text-slate-500">次</span></span>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">环比持平</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">气象站数据同步</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-emerald-400">正常</span>
                    <span className="text-xs text-slate-500">5分钟前更新</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'water' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">排污口水质半年趋势分析</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300">导出水质报告</button>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterQualityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} cursor={{ fill: '#334155', opacity: 0.4 }} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                    <Bar yAxisId="left" dataKey="cod" name="化学需氧量(COD) mg/L" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="ph" name="pH值" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2"><AlertTriangle size={16} /> 水质分析结论</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  近半年排污口水质整体稳定在国家地表水II类标准。4-5月份受丰水期降雨冲刷影响，COD指标略有上升，但仍远低于50mg/L的排放限值。重金属（铅、镉、砷）未检出或远低于限值，未对周边水体造成污染。
                </p>
              </div>
            </>
          )}

          {activeTab === 'ecology' && (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">矿区生态复绿全景图 (卫星遥感解析)</h2>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-400">总复绿面积: <span className="text-emerald-400 font-bold font-mono">125.4</span> 公顷</span>
                  <span className="text-slate-400">植被覆盖率: <span className="text-emerald-400 font-bold font-mono">85.2%</span></span>
                </div>
              </div>
              <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-700 group">
                <img 
                  src="https://images.unsplash.com/photo-1584972208173-0f1170f18d6e?q=80&w=1200&auto=format&fit=crop" 
                  alt="承德市矿区遥感GIS图" 
                  className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 hue-rotate-15 saturate-150"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                {/* GIS Grid Overlay */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-emerald-500/10"></div>
                  ))}
                </div>

                {/* Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 pointer-events-none opacity-70">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-400"></div>
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-emerald-400"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-emerald-400 rounded-full"></div>
                </div>

                {/* Coordinates */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-emerald-400 bg-slate-900/80 px-2 py-1.5 rounded border border-emerald-500/30 backdrop-blur-sm">
                  <div className="flex justify-between gap-4"><span>LAT:</span><span>41°02'15.4"N</span></div>
                  <div className="flex justify-between gap-4"><span>LON:</span><span>117°56'42.8"E</span></div>
                  <div className="flex justify-between gap-4"><span>ELEV:</span><span>845.2m</span></div>
                  <div className="flex justify-between gap-4"><span>CRS:</span><span>WGS 84</span></div>
                </div>
                
                {/* Simulated NDVI Overlay */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-3 rounded-lg">
                  <div className="text-xs text-slate-300 mb-2 font-medium">NDVI 植被指数图例</div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>裸地 (-1)</span>
                    <span>茂密植被 (1)</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-4">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">乔木林面积</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">68.5 <span className="text-xs text-slate-500">ha</span></div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">灌木林面积</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">42.1 <span className="text-xs text-slate-500">ha</span></div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">草地面积</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">14.8 <span className="text-xs text-slate-500">ha</span></div>
                  </div>
                  <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-lg p-4">
                    <div className="text-xs text-slate-400 mb-1">待修复裸地</div>
                    <div className="text-xl font-bold text-orange-400 font-mono">2.5 <span className="text-xs text-slate-500">ha</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'soil' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">矿区周边土壤重金属含量监测</h2>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> 铅(Pb)</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> 砷(As)</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> 镉(Cd)</span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={soilData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} cursor={{ fill: '#334155', opacity: 0.4 }} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                    <Bar dataKey="pb" name="铅(Pb) mg/kg" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="as" name="砷(As) mg/kg" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cd" name="镉(Cd) mg/kg" fill="#eab308" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <h4 className="text-slate-300 font-medium mb-2 flex items-center gap-2"><Map size={16} className="text-blue-400" /> 空间分布特征</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    重金属污染主要集中在排土场下风向及尾矿库周边，呈现明显的距离衰减效应。复绿区经过土壤改良，重金属有效态含量显著降低，已接近农田对照区水平。
                  </p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <h4 className="text-slate-300 font-medium mb-2 flex items-center gap-2"><AlertTriangle size={16} className="text-orange-400" /> 风险评估与建议</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    当前各采样点重金属总量均未超过《土壤环境质量 农用地污染风险管控标准》筛选值。建议继续保持排土场防风抑尘措施，并定期监测地下水汇集区的镉、砷指标。
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
