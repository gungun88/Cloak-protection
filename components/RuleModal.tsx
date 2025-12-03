import React, { useState } from 'react';
import { X, Globe, Smartphone, Shield, Activity, Share2, Bot, AlertTriangle, Monitor, Info } from 'lucide-react';
import { RuleTab } from '../types';

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleModal: React.FC<RuleModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<RuleTab>(RuleTab.BASIC);

  if (!isOpen) return null;

  const tabs = [
    { id: RuleTab.BASIC, label: '基础信息', icon: <Activity size={16} /> },
    { id: RuleTab.SOURCE, label: '来源过滤', icon: <Share2 size={16} /> },
    { id: RuleTab.DEVICE, label: '设备控制', icon: <Smartphone size={16} /> },
    { id: RuleTab.GEO, label: '地理位置', icon: <Globe size={16} /> },
    { id: RuleTab.NETWORK, label: '网络环境', icon: <Monitor size={16} /> },
    { id: RuleTab.CRAWLER, label: '爬虫拦截', icon: <Bot size={16} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1D2129]/60 transition-opacity">
      <div className="bg-white w-[880px] h-[640px] rounded-[4px] shadow-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="h-14 border-b border-[#E5E6EB] flex items-center justify-between px-6 bg-white">
          <div className="text-base font-medium text-[#1D2129]">新建流量规则</div>
          <button onClick={onClose} className="text-[#86909C] hover:text-[#1D2129] transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex h-full overflow-hidden">
           {/* Sidebar Tabs */}
           <div className="w-56 bg-[#F7F8FA] border-r border-[#E5E6EB] py-4">
              {tabs.map((tab) => (
                <div key={tab.id} className="px-3 mb-1">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-[2px] text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#E8F3FF] text-[#165DFF] font-medium'
                        : 'text-[#4E5969] hover:bg-[#E5E6EB]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                </div>
              ))}
           </div>

           {/* Content Area */}
           <div className="flex-1 bg-white p-8 overflow-y-auto">
             
             {/* Info Alert */}
             <div className="mb-6 p-3 rounded-[2px] bg-[#E8F3FF] border border-[#B7D9FF] flex items-start space-x-3">
               <Info className="text-[#165DFF] mt-0.5" size={16} />
               <div className="text-sm">
                 <span className="font-medium text-[#1D2129]">策略提示：</span>
                 <span className="text-[#4E5969] ml-1">规则按照“从上至下”的顺序执行，未命中的流量将默认执行【允许访问】策略。</span>
               </div>
             </div>

             {activeTab === RuleTab.BASIC && (
               <div className="space-y-6 max-w-lg">
                 <div className="space-y-2">
                   <label className="text-sm text-[#4E5969]">规则名称 <span className="text-[#F53F3F]">*</span></label>
                   <input type="text" placeholder="请输入规则名称" className="w-full px-3 py-2 rounded-[2px] border border-[#E5E6EB] text-sm text-[#1D2129] focus:border-[#165DFF] focus:ring-1 focus:ring-[#165DFF] outline-none transition-all placeholder:text-[#C9CDD4]" />
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-sm text-[#4E5969]">规则状态</label>
                   <div className="flex items-center space-x-8">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="status" className="hidden peer" defaultChecked />
                        <span className="w-4 h-4 border border-[#C9CDD4] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#165DFF] peer-checked:bg-[#165DFF] transition-all">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        </span>
                        <span className="text-sm text-[#1D2129]">启用</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="status" className="hidden peer" />
                        <span className="w-4 h-4 border border-[#C9CDD4] rounded-full mr-2 flex items-center justify-center peer-checked:border-[#165DFF] peer-checked:bg-[#165DFF] transition-all">
                           <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        </span>
                        <span className="text-sm text-[#1D2129]">禁用</span>
                      </label>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-sm text-[#4E5969]">备注信息</label>
                   <textarea className="w-full px-3 py-2 rounded-[2px] border border-[#E5E6EB] text-sm text-[#1D2129] focus:border-[#165DFF] focus:ring-1 focus:ring-[#165DFF] outline-none h-24 resize-none placeholder:text-[#C9CDD4]" placeholder="请输入备注..."></textarea>
                 </div>
               </div>
             )}

             {activeTab === RuleTab.DEVICE && (
               <div className="space-y-0 divide-y divide-[#E5E6EB] border border-[#E5E6EB] rounded-[2px]">
                 {['iOS', 'Android', 'Windows', 'Mac', 'Linux'].map((os) => (
                   <div key={os} className="flex items-center justify-between py-3 px-4 bg-white hover:bg-[#F7F8FA] transition-colors">
                     <span className="text-sm text-[#1D2129]">{os} 系统访问</span>
                     <div className="flex items-center space-x-4">
                       <label className="text-sm text-[#4E5969] flex items-center space-x-2">
                          <input type="radio" name={`os-${os}`} className="accent-[#165DFF]" defaultChecked /> <span>允许</span>
                       </label>
                       <label className="text-sm text-[#4E5969] flex items-center space-x-2">
                          <input type="radio" name={`os-${os}`} className="accent-[#165DFF]" /> <span>禁止</span>
                       </label>
                     </div>
                   </div>
                 ))}
                 
                 <div className="p-4 bg-[#F7F8FA]">
                    <label className="text-sm text-[#4E5969] mb-2 block">指定设备品牌拦截</label>
                    <input type="text" placeholder="输入品牌名称，例如 Huawei, Samsung..." className="w-full px-3 py-2 rounded-[2px] border border-[#E5E6EB] text-sm focus:border-[#165DFF] outline-none" />
                 </div>
               </div>
             )}

             {activeTab === RuleTab.NETWORK && (
               <div className="space-y-4">
                  <div className="p-4 rounded-[2px] bg-[#FFF7E8] border border-[#FFD591] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="text-[#FF7D00]" size={18} />
                      <div className="text-sm text-[#1D2129] font-medium">高级网络探测需要开通 VIP 会员</div>
                    </div>
                    <button className="text-xs bg-[#FF7D00] text-white px-3 py-1 rounded-[2px]">立即升级</button>
                  </div>

                  <div className="border border-[#E5E6EB] rounded-[2px] divide-y divide-[#E5E6EB]">
                    {['VPN (虚拟专用网)', 'Tor (洋葱路由)', 'Proxy (代理服务器)'].map((item) => (
                      <div key={item} className="flex items-center justify-between p-4 hover:bg-[#F7F8FA]">
                         <span className="text-sm text-[#1D2129]">{item}</span>
                         <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-9 h-5 bg-[#C9CDD4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#165DFF]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
               </div>
             )}

             {activeTab === RuleTab.CRAWLER && (
               <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium text-[#1D2129]">反爬虫配置</h3>
                    <button className="text-xs text-[#165DFF] hover:text-[#4080FF]">全选 / 反选</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Google Bot', 'Facebook Bot', 'Twitter Bot', 'Telegram Bot', 'WhatsApp', 'Baidu Spider'].map(bot => (
                      <label key={bot} className="flex items-center p-3 rounded-[2px] border border-[#E5E6EB] bg-white hover:border-[#165DFF] cursor-pointer transition-all">
                         <input type="checkbox" className="w-4 h-4 accent-[#165DFF]" defaultChecked />
                         <span className="ml-2 text-sm text-[#4E5969]">{bot}</span>
                      </label>
                    ))}
                  </div>
               </div>
             )}
             
             {(activeTab === RuleTab.GEO || activeTab === RuleTab.SOURCE) && (
               <div className="flex flex-col items-center justify-center h-full text-[#C9CDD4]">
                 <div className="w-16 h-16 bg-[#F2F3F5] rounded-full flex items-center justify-center mb-4">
                   <Monitor size={24} className="text-[#86909C]" />
                 </div>
                 <p className="text-sm text-[#86909C]">配置项加载中...</p>
               </div>
             )}
           </div>
        </div>

        {/* Footer */}
        <div className="h-16 border-t border-[#E5E6EB] px-6 flex items-center justify-end space-x-3 bg-white">
           <button onClick={onClose} className="px-4 py-1.5 rounded-[2px] text-sm text-[#4E5969] border border-[#E5E6EB] hover:border-[#C9CDD4] hover:bg-[#F2F3F5] transition-all">取消</button>
           <button onClick={onClose} className="px-6 py-1.5 rounded-[2px] text-sm text-white bg-[#165DFF] hover:bg-[#4080FF] transition-all shadow-sm">
             确定
           </button>
        </div>
      </div>
    </div>
  );
};