import { ITodo, NewTodo } from '../interfaces';
import { del, get, post, put } from './baseApi';

export const fetchTodosAPI = async () => {
  return await get<ITodo[]>('/todos');
};

export const updateTodoAPI = async (todo: ITodo) => {
  return await put<ITodo, ITodo>(`/todos/${todo.id}`, todo);
};

export const createTodoAPI = async (todo: NewTodo) => {
  return await post<NewTodo, NewTodo>('/todos', todo);
};

export const deleteTodoAPI = async (todo: ITodo) => {
  return await del(`/todos/${todo.id}`);
};

export const toggleCompletedTodoAPI = async (todo: ITodo) => {
  const todoUpdate: Partial<ITodo> = {
    completed: !todo.completed,
  };

  return await put<ITodo, Partial<ITodo>>(`/todos/${todo.id}`, todoUpdate);
};
