import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Search, ArrowLeft, Printer, Share2 } from 'lucide-react';

const reports = [
  { id: 'REP-001', name: '隆化顺达尾矿库2026年3月安全评估报告', type: '月度报告', date: '2026-03-01', size: '2.4 MB', author: '系统自动生成', status: '已审核' },
  { id: 'REP-002', name: '试点库隐患排查治理台账(第一季度)', type: '专项报告', date: '2026-03-05', size: '1.8 MB', author: '安全管理部', status: '待审核' },
  { id: 'REP-003', name: '金鑫矿业尾矿库生态修复进度周报', type: '周度报告', date: '2026-03-08', size: '5.1 MB', author: '工程项目组', status: '已审核' },
  { id: 'REP-004', name: '2025年度碳排放核算报告', type: '年度报告', date: '2026-01-15', size: '12.5 MB', author: '环保监测站', status: '已归档' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<any>(null);

  if (selectedReport) {
    return <ReportDetail report={selectedReport} onBack={() => setSelectedReport(null)} />;
  }

  return (
    <div className="h-full p-6 overflow-auto bg-slate-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">统计报表中心</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="搜索报表名称..." 
              className="bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64 text-slate-200"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
            <Calendar size={16} /> 日期范围
          </button>
          <button className="flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm text-slate-300 transition-colors">
            <Filter size={16} /> 报表类型
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition-colors shadow-lg shadow-blue-600/20">
            生成新报表
          </button>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700 text-sm text-slate-400">
              <th className="p-4 font-medium">报表名称</th>
              <th className="p-4 font-medium">类型</th>
              <th className="p-4 font-medium">生成时间</th>
              <th className="p-4 font-medium">文件大小</th>
              <th className="p-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {reports.map(report => (
              <tr 
                key={report.id} 
                className="hover:bg-slate-800/80 transition-colors group cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-400">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{report.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{report.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-300">
                  <span className="bg-slate-700 px-2 py-1 rounded text-xs">{report.type}</span>
                </td>
                <td className="p-4 text-sm text-slate-400 font-mono">{report.date}</td>
                <td className="p-4 text-sm text-slate-400 font-mono">{report.size}</td>
                <td className="p-4 text-right">
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-end gap-1 w-full"
                    onClick={(e) => { e.stopPropagation(); setSelectedReport(report); }}
                  >
                    查看详情
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

function ReportDetail({ report, onBack }: { report: any, onBack: () => void }) {
  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={16} /> 返回报表列表
        </button>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center text-blue-400">
                <FileText size={24} />
              </div>
              <h1 className="text-2xl font-bold text-white">{report.name}</h1>
              <span className={`px-2 py-0.5 rounded text-xs border ${
                report.status === '已审核' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                report.status === '已归档' ? 'bg-slate-700 text-slate-300 border-slate-600' :
                'bg-orange-500/20 text-orange-400 border-orange-500/30'
              }`}>
                {report.status}
              </span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400 ml-13">
              <span>报表编号: <span className="font-mono">{report.id}</span></span>
              <span>生成时间: <span className="font-mono">{report.date}</span></span>
              <span>编制人: {report.author}</span>
              <span>文件大小: <span className="font-mono">{report.size}</span></span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
              <Share2 size={16} /> 分享
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
              <Printer size={16} /> 打印
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm text-white transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20">
              <Download size={16} /> 下载 PDF
            </button>
          </div>
        </div>
      </div>

      {/* Content Preview Area */}
      <div className="flex-1 overflow-auto p-6 bg-slate-900/50 flex justify-center">
        <div className="w-full max-w-5xl bg-white rounded-sm shadow-2xl min-h-[1000px] p-12 text-slate-800 relative">
          {/* Simulated PDF Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <div className="transform -rotate-45 text-8xl font-bold whitespace-nowrap">
              承德市双滦区闭库尾矿库智慧监管数字孪生平台内部资料
            </div>
          </div>

          {/* Simulated Document Content */}
          <div className="relative z-10">
            <div className="text-center mb-12 border-b-2 border-slate-800 pb-6">
              <h2 className="text-3xl font-bold mb-4">{report.name}</h2>
              <div className="flex justify-center gap-8 text-sm text-slate-600">
                <span>报告周期: {report.date}</span>
                <span>编制单位: {report.author}</span>
                <span>密级: 内部公开</span>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  总体概述
                </h3>
                <p className="text-slate-700 leading-relaxed indent-8 text-justify">
                  本报告基于承德市双滦区闭库尾矿库智慧监管数字孪生平台采集的实时监测数据、AI视频分析结果及现场巡查记录编制。报告期内，试点库整体运行平稳，各项监测指标均在安全阈值范围内。生态修复工程按计划推进，复绿覆盖率稳步提升。
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  关键监测指标分析
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="border border-slate-200 rounded p-4 bg-slate-50">
                    <h4 className="font-bold text-slate-800 mb-2">坝体位移</h4>
                    <p className="text-sm text-slate-600">最大水平位移 25.6mm，最大垂直沉降 12.3mm。形变速率处于正常范围，未见加速趋势。</p>
                  </div>
                  <div className="border border-slate-200 rounded p-4 bg-slate-50">
                    <h4 className="font-bold text-slate-800 mb-2">浸润线埋深</h4>
                    <p className="text-sm text-slate-600">平均埋深 15.2m，满足设计要求。受近期降雨影响，局部有小幅波动，但未超警戒线。</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                  隐患排查与治理情况
                </h3>
                <table className="w-full border-collapse border border-slate-300 text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-2 text-left">隐患类型</th>
                      <th className="border border-slate-300 p-2 text-center">发现数量</th>
                      <th className="border border-slate-300 p-2 text-center">已整改</th>
                      <th className="border border-slate-300 p-2 text-center">整改率</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2">坝体表面裂缝</td>
                      <td className="border border-slate-300 p-2 text-center">2</td>
                      <td className="border border-slate-300 p-2 text-center">2</td>
                      <td className="border border-slate-300 p-2 text-center text-emerald-600 font-bold">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2">排洪设施堵塞</td>
                      <td className="border border-slate-300 p-2 text-center">1</td>
                      <td className="border border-slate-300 p-2 text-center">1</td>
                      <td className="border border-slate-300 p-2 text-center text-emerald-600 font-bold">100%</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2">违规作业行为 (AI识别)</td>
                      <td className="border border-slate-300 p-2 text-center">5</td>
                      <td className="border border-slate-300 p-2 text-center">4</td>
                      <td className="border border-slate-300 p-2 text-center text-orange-600 font-bold">80%</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
                  结论与建议
                </h3>
                <p className="text-slate-700 leading-relaxed indent-8 text-justify">
                  经综合评估，本期试点库安全等级评定为“安全”。建议下阶段重点加强汛期前的排洪系统全面清淤工作，并加快推进金鑫矿业尾矿库的生态复绿工程进度。
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
