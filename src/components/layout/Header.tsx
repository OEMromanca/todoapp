// src/components/Header.tsx
import React from 'react';
import { useTheme } from '../../Providers/ThemeProvider';

const Header: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <header
      className={`h-[44px] flex items-center px-4 ${
        isDarkMode ? 'bg-purple-900' : 'bg-gray-300'
      }`}
    >
      <h1
        className={`text-xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        Todo App
      </h1>
    </header>
  );
};

export default Header;
