import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import moment, { Moment } from 'moment';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import CustomDatePicker from '../shared/DatePicker';
import Input from '../shared/Input';
import { categories, priorities } from '../../utils/mocks';
import {
  useDeleteTodo,
  useToggleCompletedTodo,
  useUpdateTodo,
} from '../../hooks/mutations';
import { formatDate } from '../../utils/utils';
import CustomSwitch from '../shared/Switch';
import { useTheme } from '../../Providers/ThemeProvider';

interface ITodo {
  id: string;
  title: string;
  category: string;
  duedate: string;
  completed: boolean;
  priority: string;
}

type FormData = z.infer<typeof schema>;

interface TodoItemProps {
  item: ITodo;
}

const schema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(20, { message: 'Title must be less than 20 characters' }),
});

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const {
    mutate: deleteTodo,
    isLoading: isDeleting,
    isError: deleteError,
  } = useDeleteTodo();
  const { mutate: updateTodo, isLoading: isUpdating } = useUpdateTodo();
  const { mutate: toggleCompleteTodo } = useToggleCompletedTodo();

  const { isDarkMode } = useTheme(); // Access theme

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(item.category);
  const [selectedPriority, setSelectedPriority] = useState(item.priority);
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const [dueDate, setDueDate] = useState<Moment | null>(
    item.duedate ? moment(item.duedate) : null,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item.title || '',
    },
  });

  const onSubmit = (data: FormData) => {
    const updatedTodo: ITodo = {
      ...item,
      title: data.title,
      category: selectedCategory,
      priority: selectedPriority,
      completed: isCompleted,
      duedate: dueDate ? dueDate.format('YYYY-MM-DD') : '',
    };
    updateTodo(updatedTodo, {
      onSuccess: () => {
        setIsEditing(false);
        reset();
      },
    });
  };

  return (
    <div
      className={`text-sm border-b ${
        isDarkMode ? 'border-gray-100' : 'border-gray-200'
      } flex flex-col relative cursor-pointer py-2 mt-4 w-full`}
    >
      {!isEditing ? (
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col flex-1">
            <div className="flex items-center mb-2 w-full">
              <CustomSwitch
                checked={item.completed}
                onChange={() => toggleCompleteTodo(item)}
              />
              <h3
                className={`flex-1 truncate ml-7 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}
              >
                {item.title}
              </h3>
            </div>
          </div>
          <div className="flex flex-col ml-4">
            <div className="flex gap-4 mb-2">
              <div className="flex flex-col">
                <p
                  className={`font-semibold ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-700'
                  }`}
                >
                  Category:
                </p>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {item.category}
                </p>
              </div>
              <div className="flex flex-col">
                <p
                  className={`font-semibold ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-700'
                  }`}
                >
                  Priority:
                </p>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {item.priority}
                </p>
              </div>
              <div className="flex flex-col">
                <p
                  className={`font-semibold ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-700'
                  }`}
                >
                  Date:
                </p>
                <p
                  className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {formatDate(item.duedate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <div className="flex mb-2 w-full">
            <div className="flex flex-1">
              <CustomSwitch
                checked={isCompleted}
                onChange={() => setIsCompleted(!isCompleted)}
              />
              <div className="ml-7">
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  register={register}
                  error={errors.title?.message}
                  onChange={() => clearErrors('title')}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Dropdown
              options={categories}
              onSelect={setSelectedCategory}
              selectedOption={selectedCategory}
            />
            <Dropdown
              options={priorities}
              onSelect={setSelectedPriority}
              selectedOption={selectedPriority}
            />
            <CustomDatePicker
              name="duedate"
              value={dueDate ? dueDate.format('YYYY-MM-DD') : ''}
              onChange={setDueDate}
              closeOnSelect={true}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              disabled={isUpdating || !!errors.title}
              className={`flex-none ${
                errors.title ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              variant="save"
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
              variant="cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {deleteError && <p className="text-red-500">Error deleting todo</p>}
      {!isEditing && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="save"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            type="button"
            onClick={() => deleteTodo(item)}
            disabled={isDeleting}
            variant="remove"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
