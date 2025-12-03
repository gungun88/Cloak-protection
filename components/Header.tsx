import React from 'react';
import { Bell, Search, Settings, HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  breadcrumbs: string[];
}

export const Header: React.FC<HeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="h-16 flex items-center justify-between px-6 bg-white border-b border-[#E5E6EB] sticky top-0 z-20">
      <div className="flex items-center">
        <div className="flex items-center space-x-2 text-sm text-[#86909C]">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className={`hover:text-[#165DFF] cursor-pointer transition-colors ${index === breadcrumbs.length - 1 ? 'text-[#1D2129] font-medium' : ''}`}>
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && <span className="text-[#C9CDD4]">/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
           <input 
             type="text" 
             placeholder="搜索关键词" 
             className="pl-3 pr-8 py-1.5 bg-[#F2F3F5] rounded-[2px] text-sm border border-transparent hover:bg-[#E5E6EB] focus:bg-white focus:border-[#165DFF] focus:ring-1 focus:ring-[#165DFF] w-64 transition-all placeholder:text-[#86909C] outline-none" 
           />
           <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86909C]" />
        </div>
        
        <div className="h-6 w-px bg-[#E5E6EB]"></div>

        <button className="text-[#4E5969] hover:text-[#165DFF] transition-colors relative">
           <HelpCircle size={18} />
        </button>

        <button className="text-[#4E5969] hover:text-[#165DFF] transition-colors relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F53F3F] rounded-full text-[10px] text-white flex items-center justify-center border border-white">3</span>
        </button>
        
        <button className="text-[#4E5969] hover:text-[#165DFF] transition-colors">
           <Settings size={18} />
        </button>
      </div>
    </div>
  );
};