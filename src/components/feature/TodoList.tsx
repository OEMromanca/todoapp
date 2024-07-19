import React from 'react';
import { useParams } from 'react-router-dom';
import { useFilteredTodos } from '../../hooks/queries';
import { FILTER_MAP } from '../../utils/filterMap';
import SubmitForm from './SubmitForm';
import TodoItem from './TodoItem';
import Message from '../shared/Message';
import { transformText } from '../../utils/utils';
import { useTheme } from '../../providers/ThemeProvider';
import { ITodo } from '../../interfaces';

const TodoList: React.FC = () => {
  const { filter } = useParams<{ filter?: keyof typeof FILTER_MAP }>();
  const { data, isLoading, isError } = useFilteredTodos(filter ?? 'all');
  const { isDarkMode } = useTheme();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Message type="loading" text="Loading..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Message type="error" text="Error fetching data" />
      </div>
    );
  }

  return (
    <div className="p-5">
      <div
        className={`text-2xl font-bold rounded-md ${
          isDarkMode ? 'text-gray-100' : 'text-black'
        } mb-4`}
      >
        {transformText(filter ?? '', 'capitalizeFirst')}
      </div>
      {data && data.length === 0 ? (
        <Message type="noTodos" text="No todos available in this section." />
      ) : (
        data?.map((todo: ITodo) => <TodoItem key={todo.id} item={todo} />)
      )}
      <SubmitForm />
    </div>
  );
};

export default TodoList;
