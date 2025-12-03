import React, { useState } from 'react';
import { Plus, Search, Filter, RotateCcw } from 'lucide-react';
import { RuleModal } from '../components/RuleModal';
import { Rule } from '../types';

export const Rules: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock Data
  const rules: Rule[] = [
    { id: '1', name: 'Global Traffic Filter', status: 'active', note: '默认全站过滤规则', creator: 'Admin', createdAt: '2023-10-27 10:00:00' },
    { id: '2', name: 'US Only (Strict)', status: 'inactive', note: '仅允许美国 IP 访问', creator: 'Admin', createdAt: '2023-10-28 14:20:00' },
    { id: '3', name: 'Social Media Block', status: 'active', note: '拦截 FB/IG 爬虫', creator: 'System', createdAt: '2023-11-01 09:15:00' },
  ];

  return (
    <div className="p-6">
      
      {/* Header & Actions */}
      <div className="bg-white p-5 rounded-[4px] border border-[#E5E6EB] shadow-sm mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center space-x-3">
           <h2 className="text-lg font-medium text-[#1D2129]">规则列表</h2>
         </div>
         
         <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="请输入规则名称" 
                className="pl-3 pr-8 py-1.5 bg-white border border-[#E5E6EB] rounded-[2px] text-sm text-[#1D2129] focus:border-[#165DFF] focus:ring-1 focus:ring-[#165DFF] w-64 outline-none hover:border-[#C9CDD4] transition-all" 
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-[#86909C]" size={14} />
            </div>
            
            <button className="p-1.5 border border-[#E5E6EB] rounded-[2px] bg-white text-[#4E5969] hover:bg-[#F2F3F5] hover:text-[#165DFF] transition-colors">
              <RotateCcw size={16} />
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-1.5 bg-[#165DFF] hover:bg-[#4080FF] text-white text-sm rounded-[2px] transition-colors shadow-sm"
            >
              <Plus size={16} className="mr-1" />
              新建规则
            </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E6EB] rounded-[4px] shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F7F8FA] border-b border-[#E5E6EB]">
              <th className="px-5 py-3 text-xs font-medium text-[#86909C]">规则名称</th>
              <th className="px-5 py-3 text-xs font-medium text-[#86909C]">状态</th>
              <th className="px-5 py-3 text-xs font-medium text-[#86909C]">备注</th>
              <th className="px-5 py-3 text-xs font-medium text-[#86909C]">创建人</th>
              <th className="px-5 py-3 text-xs font-medium text-[#86909C]">创建时间</th>
              <th className="px-5 py-3 text-xs font-medium text-[#86909C] text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E6EB]">
            {rules.map(rule => (
              <tr key={rule.id} className="hover:bg-[#F2F3F5] transition-colors">
                 <td className="px-5 py-4">
                   <div className="text-sm text-[#1D2129] font-medium">{rule.name}</div>
                   <div className="text-xs text-[#86909C] mt-0.5">{rule.id}</div>
                 </td>
                 <td className="px-5 py-4">
                   {rule.status === 'active' ? (
                     <div className="flex items-center text-sm text-[#1D2129]">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#00B42A] mr-2"></span>
                       启用
                     </div>
                   ) : (
                     <div className="flex items-center text-sm text-[#86909C]">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#C9CDD4] mr-2"></span>
                       停用
                     </div>
                   )}
                 </td>
                 <td className="px-5 py-4 text-sm text-[#4E5969]">{rule.note}</td>
                 <td className="px-5 py-4 text-sm text-[#1D2129]">{rule.creator}</td>
                 <td className="px-5 py-4 text-sm text-[#86909C] font-mono">{rule.createdAt}</td>
                 <td className="px-5 py-4 text-right">
                   <button className="text-[#165DFF] text-sm hover:underline mr-3">编辑</button>
                   <button className="text-[#F53F3F] text-sm hover:underline">删除</button>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {rules.length === 0 && (
          <div className="p-12 text-center text-[#86909C] text-sm">暂无数据</div>
        )}
        
        {/* Pagination - Arco Style */}
        <div className="px-5 py-3 flex items-center justify-end space-x-2 border-t border-[#E5E6EB]">
           <span className="text-sm text-[#86909C]">共 {rules.length} 条</span>
           <button className="px-2 py-1 rounded-[2px] border border-[#E5E6EB] text-xs text-[#4E5969] disabled:opacity-50">上一页</button>
           <button className="px-2 py-1 rounded-[2px] border border-[#165DFF] text-xs text-[#165DFF]">1</button>
           <button className="px-2 py-1 rounded-[2px] border border-[#E5E6EB] text-xs text-[#4E5969]">下一页</button>
        </div>
      </div>

      <RuleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};