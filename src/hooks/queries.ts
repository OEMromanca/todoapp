import { useQuery } from 'react-query';

import { FILTER_MAP } from '../utils/filterMap';
import { fetchTodosAPI } from '../api/api';

type FilterKey = keyof typeof FILTER_MAP;

export const useFilteredTodos = (filter: FilterKey) => {
  const fetchData = async () => {
    const fetchFunction = FILTER_MAP[filter];
    if (fetchFunction) {
      return await fetchFunction();
    } else {
      throw new Error(`Filter "${filter}" not found in FILTER_MAP`);
    }
  };

  return useQuery(['todos', filter], fetchData);
};

export const useAllTodos = () => {
  const fetchAllTodos = async () => {
    const todos = await fetchTodosAPI();
    return todos;
  };

  return useQuery('todos', fetchAllTodos);
};
