/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Activity, LayoutDashboard, FolderKanban, Video, FileText, Settings, Bell, Search, User, Leaf } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import Alerts from './pages/Alerts';
import VideoSurveillance from './pages/VideoSurveillance';
import Reports from './pages/Reports';
import Environment from './pages/Environment';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleNavigateToProject = (projectId: string) => {
    setSelectedProject(projectId);
    setCurrentPage('projects');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigateToProject={handleNavigateToProject} onNavigateToPage={setCurrentPage} />;
      case 'projects': return <ProjectList selectedProject={selectedProject} onSelectProject={setSelectedProject} />;
      case 'alerts': return <Alerts />;
      case 'video': return <VideoSurveillance />;
      case 'environment': return <Environment />;
      case 'reports': return <Reports />;
      default: return <Dashboard onNavigateToProject={handleNavigateToProject} onNavigateToPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">承德市双滦区闭库尾矿库智慧监管数字孪生平台</span>
          </div>
          
          <nav className="flex gap-1">
            <NavButton icon={<LayoutDashboard size={18} />} label="驾驶舱" active={currentPage === 'dashboard'} onClick={() => { setCurrentPage('dashboard'); setSelectedProject(null); }} />
            <NavButton icon={<FolderKanban size={18} />} label="项目管理" active={currentPage === 'projects'} onClick={() => { setCurrentPage('projects'); setSelectedProject(null); }} />
            <NavButton icon={<Bell size={18} />} label="监测预警" active={currentPage === 'alerts'} onClick={() => { setCurrentPage('alerts'); setSelectedProject(null); }} />
            <NavButton icon={<Video size={18} />} label="视频监控" active={currentPage === 'video'} onClick={() => { setCurrentPage('video'); setSelectedProject(null); }} />
            <NavButton icon={<Leaf size={18} />} label="生态环境" active={currentPage === 'environment'} onClick={() => { setCurrentPage('environment'); setSelectedProject(null); }} />
            <NavButton icon={<FileText size={18} />} label="统计报表" active={currentPage === 'reports'} onClick={() => { setCurrentPage('reports'); setSelectedProject(null); }} />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="全局搜索..." 
              className="bg-slate-800 border border-slate-700 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-64 transition-colors"
            />
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-full relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center overflow-hidden border border-slate-600 cursor-pointer">
            <User className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden">
        {renderPage()}
      </main>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-600/10 text-blue-400' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
