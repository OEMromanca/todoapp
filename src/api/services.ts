import { fetchTodosAPI } from './api';

export const fetchAllTodos = async () => {
  const todos = await fetchTodosAPI();
  const allTodos = todos.map((todo) => todo);
  return allTodos;
};

export const fetchTodoPriorities = async (priority: string) => {
  const todos = await fetchTodosAPI();
  const filteredTodos = todos.filter((todo) => todo.priority === priority);
  return filteredTodos;
};

export const fetchCompletedTodos = async () => {
  const todos = await fetchTodosAPI();
  const completedTodos = todos.filter((todo) => todo.completed);
  return completedTodos;
};

export const fetchActiveTodos = async () => {
  const todos = await fetchTodosAPI();
  const activeTodos = todos.filter((todo) => !todo.completed);
  return activeTodos;
};

export const fetchTodoCategories = async (category: string) => {
  const todos = await fetchTodosAPI();
  const filteredTodos = todos.filter((todo) => todo.category === category);
  return filteredTodos;
};
