import { useMutation } from 'react-query';
import {
  createTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
  toggleCompletedTodoAPI,
} from '../api/api';
import useInvalidateQuery from './useInvalidateQuery';
import { ITodo, NewTodo } from '../interfaces';

export const useUpdateTodo = () => {
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<ITodo, Error, ITodo>(
    (updatedTodo: ITodo) => updateTodoAPI(updatedTodo),
    {
      onSuccess: () => {
        invalidateTodos();
      },
      onError: (error: Error) => {
        console.error('Update todo error:', error);
        alert('There was an error updating the todo');
      },
    },
  );
};

export const useCreateTodo = () => {
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<NewTodo, Error, NewTodo>(
    (newTodo: NewTodo) => createTodoAPI(newTodo),
    {
      onSuccess: () => {
        invalidateTodos();
      },
      onError: (error: Error) => {
        console.error('Create todo error:', error);
        alert('There was an error creating the todo');
      },
    },
  );
};

export const useDeleteTodo = () => {
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<void, Error, ITodo>(
    async (todo: ITodo) => {
      await deleteTodoAPI(todo);
    },
    {
      onSuccess: () => {
        console.log('Delete todo success');
        invalidateTodos();
      },
      onError: (error: Error) => {
        console.error('Delete todo error:', error);
        alert('There was an error deleting the todo');
      },
    },
  );
};

export const useToggleCompletedTodo = () => {
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<ITodo, Error, ITodo>(
    (todo: ITodo) => toggleCompletedTodoAPI(todo),
    {
      onSuccess: () => {
        console.log('Toggle completed todo success:');
        invalidateTodos();
      },
      onError: (error: Error) => {
        console.error('Toggle completed todo error:', error);
        alert('There was an error toggling the completed status of the todo');
      },
    },
  );
};
