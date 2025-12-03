import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Rules } from './pages/Rules';
import { Logs } from './pages/Logs';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'rules':
        return <Rules />;
      case 'logs':
        return <Logs />;
      default:
        // Fallback for pages not fully implemented in this demo
        return (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-slate-50 text-slate-400 flex-col">
            <h2 className="text-2xl font-bold mb-2">Comming Soon</h2>
            <p>The page "{currentPage}" is under development.</p>
          </div>
        );
    }
  };

  const getBreadcrumbs = () => {
     switch(currentPage) {
       case 'dashboard': return ['我的面板'];
       case 'rules': return ['我的面板', '网站管理', '规则管理'];
       case 'logs': return ['我的面板', '网站管理', '访客记录'];
       default: return ['我的面板', currentPage];
     }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <div className="flex-1 ml-64 flex flex-col">
        <Header title="神盾短链" breadcrumbs={getBreadcrumbs()} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;