import React from 'react';
import { Search, RefreshCw, Smartphone, Monitor, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import { VisitLog } from '../types';

export const Logs: React.FC = () => {
  const logs: VisitLog[] = [
    {
       id: '1',
       time: '14:50:05',
       ip: '38.181.81.118',
       location: 'Los Angeles, USA',
       shortLink: 'hBvbX7VT',
       result: 'allow',
       device: 'Macintosh',
       system: 'macOS 14.2',
       browser: 'Chrome 120',
       visitUrl: 'http://example.com/promo',
       jumpUrl: 'http://moneypage.com'
    },
    {
       id: '2',
       time: '14:52:12',
       ip: '102.33.22.11',
       location: 'London, UK',
       shortLink: 'hBvbX7VT',
       result: 'block',
       device: 'iPhone',
       system: 'iOS 17.1',
       browser: 'Safari',
       visitUrl: 'http://example.com/promo',
       jumpUrl: 'http://safepage.com'
    }
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
       <div className="flex items-center justify-between mb-4">
         <h2 className="text-lg font-medium text-[#1D2129]">访客日志</h2>
         <div className="flex items-center space-x-3">
            <span className="text-xs text-[#165DFF] bg-[#E8F3FF] px-2 py-1 rounded-[2px] flex items-center border border-[#B7D9FF]">
              <span className="w-1.5 h-1.5 bg-[#165DFF] rounded-full mr-1.5 animate-pulse"></span>
              实时监控中
            </span>
            <button className="p-1.5 bg-white border border-[#E5E6EB] rounded-[2px] text-[#4E5969] hover:text-[#165DFF] transition-colors">
              <RefreshCw size={14} />
            </button>
         </div>
       </div>

       {/* Filter Bar */}
       <div className="bg-white rounded-[4px] p-4 border border-[#E5E6EB] mb-4 flex flex-wrap gap-3 items-center shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#4E5969]">IP 地址:</span>
            <input type="text" placeholder="请输入 IP" className="bg-white border border-[#E5E6EB] rounded-[2px] text-sm px-3 py-1.5 w-48 focus:border-[#165DFF] outline-none transition-colors" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#4E5969]">检测结果:</span>
            <select className="bg-white border border-[#E5E6EB] rounded-[2px] text-sm px-3 py-1.5 text-[#1D2129] focus:border-[#165DFF] outline-none">
               <option>全部</option>
               <option>通过 (Allow)</option>
               <option>拦截 (Block)</option>
            </select>
          </div>
          <div className="flex-1"></div>
          <button className="px-5 py-1.5 bg-[#165DFF] text-white text-sm rounded-[2px] hover:bg-[#4080FF] transition-all">
             查询
          </button>
          <button className="px-5 py-1.5 bg-[#F2F3F5] text-[#4E5969] text-sm rounded-[2px] hover:bg-[#E5E6EB] transition-all">
             重置
          </button>
       </div>

       {/* Logs List */}
       <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="bg-white rounded-[4px] p-4 border border-[#E5E6EB] hover:shadow-md hover:border-[#C9CDD4] transition-all duration-200">
               <div className="flex items-center justify-between">
                  
                  {/* Left: Status & IP */}
                  <div className="flex items-center space-x-4 min-w-[200px]">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.result === 'allow' ? 'bg-[#E8FFEA] text-[#00B42A]' : 'bg-[#FFECE8] text-[#F53F3F]'}`}>
                        {log.result === 'allow' ? <Shield size={16} /> : <AlertCircle size={16} />}
                     </div>
                     <div>
                        <div className="flex items-center space-x-2">
                           <span className="font-medium text-[#1D2129] text-sm">{log.ip}</span>
                        </div>
                        <div className="text-xs text-[#86909C] mt-0.5">{log.location}</div>
                     </div>
                  </div>

                  {/* Middle: Device Info */}
                  <div className="flex items-center space-x-6">
                     <div className="flex items-center space-x-2 text-[#4E5969]">
                        {log.device.includes('Phone') ? <Smartphone size={16} /> : <Monitor size={16} />}
                        <div className="text-xs">
                           <div className="text-[#1D2129]">{log.device}</div>
                           <div className="text-[#86909C] scale-90 origin-left">{log.system} / {log.browser}</div>
                        </div>
                     </div>
                  </div>

                  {/* Right: Path */}
                  <div className="flex items-center space-x-3 text-right">
                     <div className="flex flex-col items-end">
                       <span className="text-xs text-[#86909C] mb-0.5">短链ID</span>
                       <span className="text-xs font-mono text-[#165DFF] bg-[#E8F3FF] px-1.5 py-0.5 rounded-[2px]">{log.shortLink}</span>
                     </div>
                     <ArrowRight size={14} className="text-[#C9CDD4]" />
                     <div className="flex flex-col items-start max-w-[200px]">
                        <span className="text-xs text-[#86909C] mb-0.5">跳转目标</span>
                        <span className="text-xs text-[#1D2129] truncate w-full" title={log.jumpUrl}>{log.jumpUrl}</span>
                     </div>
                  </div>
                  
                  <div className="text-xs text-[#86909C] font-mono pl-4 border-l border-[#E5E6EB] ml-4">
                    {log.time}
                  </div>

               </div>
            </div>
          ))}
       </div>
    </div>
  );
};