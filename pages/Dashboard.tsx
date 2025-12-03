import React from 'react';
import { 
  Timer, 
  BookOpen, 
  History, 
  Crown, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { DistributionItem } from '../types';

export const Dashboard: React.FC = () => {
  
  // Mock Data for Charts
  const countryData: DistributionItem[] = [
    { name: '美国', value: 40, color: '#165DFF' }, // Arco Blue
    { name: '日本', value: 20, color: '#00B42A' }, // Arco Green
    { name: '德国', value: 15, color: '#FF7D00' }, // Arco Orange
    { name: '其他', value: 25, color: '#86909C' }, // Arco Gray
  ];

  const systemData: DistributionItem[] = [
    { name: 'Windows', value: 55, color: '#165DFF' },
    { name: 'iOS', value: 25, color: '#722ED1' }, // Arco Purple
    { name: 'Android', value: 15, color: '#00B42A' },
    { name: 'Mac OS', value: 5, color: '#86909C' },
  ];

  const deviceData: DistributionItem[] = [
    { name: 'Mobile', value: 60, color: '#165DFF' },
    { name: 'PC', value: 30, color: '#F53F3F' }, // Arco Red
    { name: 'Tablet', value: 10, color: '#FF7D00' },
  ];

  const interceptData: DistributionItem[] = [
    { name: '正常访问', value: 70, color: '#00B42A' },
    { name: '被拦截', value: 30, color: '#F53F3F' },
  ];

  const trendData = [
    { date: '12-01', valid: 400, block: 240 },
    { date: '12-02', valid: 300, block: 139 },
    { date: '12-03', valid: 200, block: 980 },
    { date: '12-04', valid: 278, block: 390 },
    { date: '12-05', valid: 189, block: 480 },
    { date: '12-06', valid: 239, block: 380 },
    { date: '12-07', valid: 349, block: 430 },
  ];

  // Helper component for stat items
  const StatItem = ({ label, value, colorClass = "text-[#1D2129]" }: { label: string, value: string | number, colorClass?: string }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-[#F7F8FA] rounded-[2px] border border-transparent hover:border-[#E5E6EB] transition-colors">
      <span className="text-xs text-[#86909C] mb-1">{label}</span>
      <span className={`text-xl font-semibold font-mono ${colorClass}`}>{value}</span>
    </div>
  );

  // Helper for Donut Chart
  const DonutChart = ({ data, title }: { data: DistributionItem[], title: string }) => (
    <div className="bg-white p-5 rounded-[4px] border border-[#E5E6EB] shadow-sm flex flex-col h-[320px]">
      <div className="flex items-center space-x-2 mb-4">
         <span className="w-1 h-4 bg-[#165DFF] rounded-r-[2px]"></span>
         <h3 className="text-sm font-medium text-[#1D2129]">{title}</h3>
      </div>
      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#fff', border: '1px solid #E5E6EB', borderRadius: '4px', fontSize: '12px' }}
            />
            <Legend 
               layout="vertical" 
               verticalAlign="middle" 
               align="right"
               iconType="circle"
               iconSize={8}
               wrapperStyle={{ fontSize: '12px', color: '#4E5969' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -ml-16">
           <span className="text-xs text-[#86909C]">暂无数据</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      
      {/* 1. Top Blue Banner */}
      <div className="bg-gradient-to-r from-[#4080FF] to-[#165DFF] rounded-[4px] text-white shadow-sm">
        <div className="grid grid-cols-5 divide-x divide-white/20">
           {/* Column 1 */}
           <div className="p-6 flex flex-col items-center justify-center">
              <div className="text-xs opacity-80 mb-2">会员到期时间</div>
              <div className="text-2xl font-bold font-mono">2026-01-01</div>
           </div>
           {/* Column 2 */}
           <div className="p-6 flex flex-col items-center justify-center">
              <div className="text-xs opacity-80 mb-2">网站数量</div>
              <div className="text-2xl font-bold font-mono">1</div>
           </div>
           {/* Column 3 */}
           <div className="p-6 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute -top-3 -right-8 bg-[#F53F3F] text-white text-[10px] py-1 px-8 rotate-45 shadow-sm z-10">永久免费</div>
              <div className="text-xs opacity-80 mb-2">短链接收数量</div>
              <div className="text-2xl font-bold font-mono">0</div>
           </div>
           {/* Column 4 */}
           <div className="p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <div className="text-xs opacity-80 mb-2">访客记录</div>
              <div className="flex items-center text-xl font-bold">
                 <History className="mr-2" size={20} />
                 点击查看
              </div>
           </div>
           {/* Column 5 */}
           <div className="p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
              <div className="text-xs opacity-80 mb-2">操作文档</div>
              <div className="flex items-center text-xl font-bold">
                 <BookOpen className="mr-2" size={20} />
                 点击学习
              </div>
           </div>
        </div>
      </div>

      {/* 2. World Clock Strip */}
      <div className="bg-white rounded-[4px] border border-[#E5E6EB] py-3 px-4 shadow-sm flex items-center text-xs text-[#4E5969] space-x-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
         <div className="flex items-center text-[#165DFF]">
            <Clock size={14} className="mr-2" />
            <span className="font-medium mr-1">北京时间</span>
            <span className="font-mono">2025/12/03 15:19:55</span>
         </div>
         <div className="w-px h-3 bg-[#E5E6EB]"></div>
         <div className="flex items-center">
            <span className="mr-2">🇺🇸</span>
            <span className="mr-1">美国洛杉矶</span>
            <span className="font-mono text-[#165DFF]">2025/12/02 23:19:55</span>
         </div>
         <div className="flex items-center">
            <span className="mr-2">🇩🇪</span>
            <span className="mr-1">德国柏林</span>
            <span className="font-mono text-[#165DFF]">2025/12/03 08:19:55</span>
         </div>
         <div className="flex items-center">
            <span className="mr-2">🇫🇷</span>
            <span className="mr-1">法国巴黎</span>
            <span className="font-mono text-[#165DFF]">2025/12/03 08:19:55</span>
         </div>
         <div className="flex items-center">
            <span className="mr-2">🇬🇧</span>
            <span className="mr-1">英国伦敦</span>
            <span className="font-mono text-[#165DFF]">2025/12/03 07:19:55</span>
         </div>
      </div>

      {/* 3. Main Stats & Member Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
         {/* Left: Visit Statistics */}
         <div className="lg:col-span-2 bg-white p-5 rounded-[4px] border border-[#E5E6EB] shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F2F3F5]">
               <h3 className="text-base font-medium text-[#1D2129]">访问统计 <span className="text-[#86909C] text-xs font-normal ml-2">(近10天数据)</span></h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Total Stats */}
               <div>
                  <h4 className="text-sm font-medium text-[#1D2129] mb-3 pl-2 border-l-2 border-[#165DFF]">总计</h4>
                  <div className="grid grid-cols-2 gap-3">
                     <StatItem label="总访问量" value="1" />
                     <StatItem label="正常访问量" value="1" />
                     <StatItem label="爬虫访问量" value="0" colorClass="text-[#FF7D00]" />
                     <StatItem label="总拦截数" value="0" colorClass="text-[#F53F3F]" />
                     <StatItem label="总通过数" value="1" />
                     <StatItem label="拦截率" value="0.00%" colorClass="text-[#00B42A]" />
                  </div>
               </div>

               {/* Today Stats */}
               <div>
                  <h4 className="text-sm font-medium text-[#1D2129] mb-3 pl-2 border-l-2 border-[#165DFF]">今日</h4>
                  <div className="grid grid-cols-2 gap-3">
                     <StatItem label="总访问量" value="0" />
                     <StatItem label="正常访问量" value="0" />
                     <StatItem label="爬虫访问量" value="0" colorClass="text-[#FF7D00]" />
                     <StatItem label="总拦截数" value="0" colorClass="text-[#F53F3F]" />
                     <StatItem label="总通过数" value="0" />
                     <StatItem label="拦截率" value="0.00%" colorClass="text-[#00B42A]" />
                  </div>
               </div>
            </div>
         </div>

         {/* Right: Member Info */}
         <div className="bg-white p-5 rounded-[4px] border border-[#E5E6EB] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-[#1D2129]">会员信息统计</h3>
              <span className="text-xs text-[#86909C]">(TG客服: @shendunduanlian)</span>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between bg-[#F7F8FA] p-3 rounded-[2px]">
                  <span className="text-sm text-[#4E5969] font-medium text-[#00B42A]">会员等级</span>
                  <span className="px-3 py-1 bg-[#FF7D00] text-white text-xs rounded-full">试用版</span>
               </div>

               <div className="flex items-center justify-between border-b border-[#F2F3F5] pb-3">
                  <span className="text-sm text-[#4E5969]">会员到期日</span>
                  <span className="text-sm font-bold text-[#1D2129] font-mono">2026-01-01</span>
               </div>

               <div className="flex items-center justify-between border-b border-[#F2F3F5] pb-3">
                  <span className="text-sm text-[#4E5969]">剩余天数</span>
                  <div className="flex items-center space-x-2">
                     <span className="px-2 py-0.5 bg-[#FFF7E8] text-[#FF7D00] text-xs rounded-[2px] border border-[#FFD591]">30天</span>
                     <button className="px-2 py-0.5 bg-[#165DFF] text-white text-xs rounded-[2px] hover:bg-[#4080FF]">立即续费</button>
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-xs text-[#86909C] mb-2">
                     <span>每日使用额度</span>
                     <span className="text-[#1D2129] font-mono font-bold">0/200</span>
                  </div>
                  <div className="w-full h-2 bg-[#F2F3F5] rounded-full overflow-hidden">
                     <div className="h-full bg-[#00B42A] w-[0%]"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 4. Charts Section (Distributions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <DonutChart title="国家分布" data={countryData} />
         <DonutChart title="系统类型分布" data={systemData} />
         <DonutChart title="设备类型分布" data={deviceData} />
         <DonutChart title="拦截统计" data={interceptData} />
      </div>

      {/* 5. Line Chart (Trend) */}
      <div className="bg-white p-5 rounded-[4px] border border-[#E5E6EB] shadow-sm">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-medium text-[#1D2129]">过去7天访问趋势</h3>
         </div>
         <div className="h-[300px]">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E6EB" />
               <XAxis 
                  dataKey="date" 
                  axisLine={{ stroke: '#E5E6EB' }} 
                  tickLine={false} 
                  tick={{ fill: '#86909C', fontSize: 12 }} 
                  dy={10}
               />
               <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#86909C', fontSize: 12 }} 
               />
               <Tooltip 
                  contentStyle={{ background: '#fff', border: '1px solid #E5E6EB', borderRadius: '4px' }}
               />
               <Legend iconType="circle" />
               <Line type="monotone" dataKey="valid" name="正常访问" stroke="#165DFF" strokeWidth={2} dot={{ r: 3, strokeWidth: 2 }} activeDot={{ r: 5 }} />
               <Line type="monotone" dataKey="block" name="爬虫访问" stroke="#F53F3F" strokeWidth={2} dot={{ r: 3, strokeWidth: 2 }} />
             </LineChart>
           </ResponsiveContainer>
         </div>
      </div>

    </div>
  );
};