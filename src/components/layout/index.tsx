import React from 'react';
import SideBar from './SideBar';
import Header from './Header';
import TodoRoutes from '../../routes/todoRoutes';
import { useTheme } from '../../providers/ThemeProvider';

const Layout: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex flex-col h-screen w-screen ${
        isDarkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <div
          className={`flex-1 overflow-y-auto ${
            isDarkMode ? 'bg-gray-600' : 'bg-white'
          }`}
        >
          <TodoRoutes />
        </div>
      </div>
    </div>
  );
};

export default Layout;
