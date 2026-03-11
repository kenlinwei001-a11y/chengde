import React from 'react';
import { cn } from '../utils';
import { ChevronRight } from 'lucide-react';

export function Card({ title, children, className, onClick }: { title: string, children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col overflow-hidden shadow-lg", 
        onClick && "cursor-pointer hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300",
        className
      )}
    >
      <div className="text-base font-semibold text-white mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
          {title}
        </div>
        {onClick && <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />}
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
