import {
  fetchActiveTodos,
  fetchAllTodos,
  fetchCompletedTodos,
  fetchTodoCategories,
  fetchTodoPriorities,
} from '../api/services';

export const FILTER_MAP = {
  all: fetchAllTodos,
  active: fetchActiveTodos,
  completed: fetchCompletedTodos,
  low: () => fetchTodoPriorities('low'),
  middle: () => fetchTodoPriorities('middle'),
  high: () => fetchTodoPriorities('high'),
  home: () => fetchTodoCategories('home'),
  shopping: () => fetchTodoCategories('shopping'),
  school: () => fetchTodoCategories('school'),
  sport: () => fetchTodoCategories('sport'),
};

export const FILTER_NAMES = Object.keys(
  FILTER_MAP,
) as (keyof typeof FILTER_MAP)[];
