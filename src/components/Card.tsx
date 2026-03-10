import React from 'react';
import { cn } from '../utils';

export function Card({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 flex flex-col overflow-hidden shadow-lg", className)}>
      <div className="text-base font-semibold text-white mb-3 flex items-center gap-2">
        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
        {title}
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
