import React, { useState } from 'react';
import { Maximize2, Settings, AlertCircle, Server, HardDrive, Cpu, Video as VideoIcon, ChevronRight, Activity } from 'lucide-react';

export default function VideoSurveillance() {
  const [activeTab, setActiveTab] = useState<'grid' | 'ai'>('grid');

  const cameras = [
    { id: 'CAM-01', name: '隆化顺达-坝顶全景', status: 'online', ai: true, alert: false, image: 'https://images.unsplash.com/photo-1545464333-9cbd1f263054?q=80&w=800&auto=format&fit=crop' },
    { id: 'CAM-02', name: '隆化顺达-排洪口', status: 'online', ai: true, alert: true, alertType: '越界进入危险区', image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?q=80&w=800&auto=format&fit=crop' },
    { id: 'CAM-03', name: '金鑫矿业-采选作业面', status: 'online', ai: true, alert: false, image: 'https://images.unsplash.com/photo-1578509376176-793540600645?q=80&w=800&auto=format&fit=crop' },
    { id: 'CAM-04', name: '金鑫矿业-干滩区域', status: 'offline', ai: false, alert: false, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop' },
    { id: 'CAM-05', name: '双滦区-资源化分选厂', status: 'online', ai: true, alert: false, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop' },
    { id: 'CAM-06', name: '双滦区-皮带运输线', status: 'online', ai: true, alert: false, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop' },
  ];

  const aiEvents = [
    { id: 1, time: '14:32:05', type: '人员越界', camera: '隆化顺达-排洪口', confidence: '98%' },
    { id: 2, time: '13:15:22', type: '未戴安全帽', camera: '金鑫矿业-采选作业面', confidence: '92%' },
    { id: 3, time: '11:45:10', type: '车辆超速', camera: '双滦区-资源化分选厂', confidence: '89%' },
    { id: 4, time: '09:30:00', type: '烟火识别', camera: '隆化顺达-坝顶全景', confidence: '95%' },
  ];

  return (
    <div className="h-full p-6 overflow-hidden bg-slate-900 flex gap-6">
      {/* Left Sidebar - System Integration & Topology */}
      <div className="w-80 flex flex-col gap-4 flex-shrink-0">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <h3 className="text-slate-300 font-medium mb-4 flex items-center gap-2">
            <Server size={18} className="text-blue-400" />
            系统对接状态
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                  <VideoIcon size={16} className="text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">视频融合网关</div>
                  <div className="text-xs text-slate-500">GB/T 28181 协议</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                  <Cpu size={16} className="text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">AI 边缘计算盒子</div>
                  <div className="text-xs text-slate-500">算力使用率: 68%</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                  <HardDrive size={16} className="text-slate-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-200">NVR 存储集群</div>
                  <div className="text-xs text-slate-500">剩余容量: 12.5 TB</div>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 flex-1 flex flex-col min-h-0">
          <h3 className="text-slate-300 font-medium mb-4 flex items-center gap-2">
            <Activity size={18} className="text-orange-400" />
            AI 实时告警日志
          </h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {aiEvents.map(event => (
              <div key={event.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 hover:border-slate-500 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    {event.type}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{event.time}</span>
                </div>
                <div className="text-sm text-slate-300 mb-1">{event.camera}</div>
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>置信度: <span className="text-emerald-400 font-mono">{event.confidence}</span></span>
                  <span className="text-blue-400 hover:text-blue-300 flex items-center">查看抓拍 <ChevronRight size={12} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Video Grid */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white">AI 视频安全行为识别</h1>
            <p className="text-slate-400 text-sm mt-1">对接海康/大华视频网关，集成商汤/旷视算法模型</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-slate-800 rounded-lg border border-slate-700 p-1">
              <button 
                onClick={() => setActiveTab('grid')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                实时监控
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === 'ai' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                AI 抓拍库
              </button>
            </div>
            <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              <option>所有库区</option>
              <option>隆化顺达矿业尾矿库</option>
              <option>金鑫矿业尾矿库</option>
            </select>
            <button className="bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
              分屏设置 (3x2)
            </button>
          </div>
        </div>

        {activeTab === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
            {cameras.map(cam => (
              <div key={cam.id} className={`relative bg-black rounded-xl overflow-hidden border ${cam.alert ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-slate-700'} group aspect-video`}>
                {/* Simulated Video Feed */}
                {cam.status === 'online' ? (
                  <img 
                    src={cam.image} 
                    alt={cam.name} 
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-sm">
                    NO SIGNAL
                  </div>
                )}
                
                {/* AI Bounding Box Simulation */}
                {cam.alert && (
                  <div className="absolute top-[30%] left-[40%] w-[100px] h-[150px] border-2 border-red-500 bg-red-500/10">
                    <div className="absolute -top-6 left-[-2px] bg-red-500 text-white text-[10px] px-1 py-0.5 whitespace-nowrap">
                      {cam.alertType} 95%
                    </div>
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cam.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                    <span className="text-sm font-medium text-white shadow-black drop-shadow-md">{cam.name}</span>
                    {cam.ai && <span className="bg-blue-600/80 text-[10px] text-white px-1.5 py-0.5 rounded ml-2">AI 分析中</span>}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-black/50 hover:bg-black/80 rounded text-white backdrop-blur-sm"><Settings size={14} /></button>
                    <button className="p-1.5 bg-black/50 hover:bg-black/80 rounded text-white backdrop-blur-sm"><Maximize2 size={14} /></button>
                  </div>
                </div>

                {cam.alert && (
                  <div className="absolute bottom-3 left-3 right-3 bg-red-500/90 backdrop-blur-md text-white text-xs p-2 rounded flex items-center gap-2 animate-pulse">
                    <AlertCircle size={14} />
                    <span>AI 识别异常: {cam.alertType}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 flex items-center justify-center text-slate-400">
            AI 抓拍图库加载中...
          </div>
        )}
      </div>
    </div>
  );
}
