import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  ShieldCheck, 
  History, 
  Users, 
  BarChart3, 
  Link as LinkIcon, 
  ShoppingCart, 
  HelpCircle, 
  Puzzle,
  ChevronDown,
  ChevronRight,
  Shield
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: '工作台', icon: <LayoutDashboard size={16} /> },
    { 
      id: 'website_mgmt', 
      label: '网站管理', 
      icon: <Globe size={16} />, 
      hasSubmenu: true, 
      open: true,
      submenu: [
        { id: 'rules', label: '规则引擎', icon: <ShieldCheck size={14} /> },
        { id: 'websites', label: '网站列表', icon: <LinkIcon size={14} /> },
        { id: 'logs', label: '访客记录', icon: <History size={14} /> },
        { id: 'ip_list', label: 'IP名单', icon: <Users size={14} /> },
        { id: 'ip_stats', label: '访问统计', icon: <BarChart3 size={14} /> },
      ]
    },
    { id: 'free_links', label: '免费短链', icon: <LinkIcon size={16} /> },
    { id: 'rewards', label: '推广奖励', icon: <ShoppingCart size={16} /> },
    { id: 'tutorial', label: '新手教程', icon: <HelpCircle size={16} /> },
    { id: 'extensions', label: '扩展中心', icon: <Puzzle size={16} />, badge: true },
  ];

  return (
    <div className="w-60 h-screen flex flex-col fixed left-0 top-0 z-30 bg-white border-r border-[#E5E6EB]">
      {/* Branding - Arco Style */}
      <div className="h-16 flex items-center px-5 border-b border-[#E5E6EB]">
        <div className="w-8 h-8 bg-[#165DFF] rounded-[4px] flex items-center justify-center mr-3 shadow-sm">
           <Shield className="text-white" size={18} />
        </div>
        <span className="font-semibold text-lg text-[#1D2129]">神盾 Cloak</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
            <div 
              className={`px-3 py-2 flex items-center justify-between cursor-pointer rounded-[2px] transition-colors duration-200 group
                ${currentPage === item.id 
                  ? 'bg-[#E8F3FF] text-[#165DFF]' 
                  : 'text-[#4E5969] hover:bg-[#F2F3F5]'
                }`}
              onClick={() => !item.hasSubmenu && onNavigate(item.id)}
            >
              <div className="flex items-center">
                <span className={`mr-3 ${currentPage === item.id ? 'text-[#165DFF]' : 'text-[#86909C]'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.hasSubmenu && (
                  item.open ? <ChevronDown size={14} className="text-[#86909C]" /> : <ChevronRight size={14} className="text-[#86909C]" />
              )}
              {item.badge && <span className="w-1.5 h-1.5 rounded-full bg-[#F53F3F]"></span>}
            </div>
            
            {item.hasSubmenu && item.open && (
              <div className="mt-1 space-y-0.5">
                {item.submenu?.map((sub) => (
                  <div 
                    key={sub.id}
                    className={`pl-10 pr-3 py-2 flex items-center cursor-pointer rounded-[2px] transition-colors
                      ${currentPage === sub.id 
                        ? 'text-[#165DFF] bg-white font-medium relative after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-4 after:bg-[#165DFF]' 
                        : 'text-[#4E5969] hover:bg-[#F2F3F5]'
                      }`}
                    onClick={() => onNavigate(sub.id)}
                  >
                    <span className="text-sm">{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* User Profile - Bottom */}
      <div className="p-4 border-t border-[#E5E6EB]">
        <div className="flex items-center p-2 rounded hover:bg-[#F2F3F5] cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-[#165DFF] text-white flex items-center justify-center text-xs">
            AU
          </div>
          <div className="ml-3 overflow-hidden">
            <div className="text-sm font-medium text-[#1D2129] truncate">Admin User</div>
            <div className="text-xs text-[#86909C]">Enterprise</div>
          </div>
        </div>
      </div>
    </div>
  );
};