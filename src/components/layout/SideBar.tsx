// src/components/SideBar.tsx
import React, { useState } from 'react';
import { FILTER_MAP } from '../../utils/filterMap';
import { categories, priorities } from '../../utils/mocks';
import '../../App.css';
import NavLink from '../../routes/NavLink';
import { useTheme } from '../../Providers/ThemeProvider';
import CustomSwitch from '../shared/Switch';

const SideBar: React.FC = () => {
  const [showPriorities, setShowPriorities] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const mainFilters = ['all', 'active', 'completed'];
  const priorityFilters = Object.keys(FILTER_MAP).filter((filter) =>
    priorities.includes(filter),
  );
  const categoryFilters = Object.keys(FILTER_MAP).filter((filter) =>
    categories.includes(filter),
  );

  return (
    <div className="flex flex-col justify-between h-full w-64 bg-gray-200 dark:bg-gray-800">
      <div className="w-full p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
          Filters
        </h2>
        <div>
          {mainFilters.map((filter) => (
            <NavLink key={filter} to={`/${filter}`}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </NavLink>
          ))}

          <div className="mt-2">
            <button
              onClick={() => {
                setShowPriorities(!showPriorities);
              }}
              className="text-black dark:text-white font-bold w-full text-left ml-2"
            >
              Priorities
            </button>
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                showPriorities ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="ml-4">
                {priorityFilters.map((filter) => (
                  <NavLink key={filter} to={`/${filter}`}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2">
            <button
              onClick={() => {
                setShowCategories(!showCategories);
              }}
              className="text-black dark:text-white font-bold w-full text-left ml-2"
            >
              Categories
            </button>
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                showCategories ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="ml-4">
                {categoryFilters.map((filter) => (
                  <NavLink key={filter} to={`/${filter}`}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <CustomSwitch
          checked={isDarkMode}
          onChange={toggleTheme}
          label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        />
      </div>
    </div>
  );
};

export default SideBar;
