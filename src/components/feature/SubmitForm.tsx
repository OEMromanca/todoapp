import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import moment, { Moment } from 'moment';
import 'react-datetime/css/react-datetime.css';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import { useCreateTodo } from '../../hooks/mutations';
import Input from '../shared/Input';

import { priorities, categories } from '../../utils/mocks';
import CustomDatePicker from '../shared/DatePicker';
import { ITodo } from '../../interfaces';

const schema = z.object({
  todo: z
    .string()
    .min(1, { message: 'Todo is required' })
    .max(20, { message: 'Todo must be less than 20 characters' }),
});

type FormData = z.infer<typeof schema>;

type NewTodo = Omit<ITodo, 'id'>;

const SubmitForm: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [selectedPriority, setSelectedPriority] = useState('low');
  const [dueDate, setDueDate] = useState<Moment | null>(moment());

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading, isError } = useCreateTodo();

  const onSubmit = (data: FormData) => {
    const formattedDueDate = dueDate ? dueDate.toISOString() : '';

    const newTodo: NewTodo = {
      title: data.todo,
      category: selectedCategory,
      duedate: formattedDueDate,
      completed: false,
      priority: selectedPriority,
    };

    mutate(newTodo, {
      onSuccess: () => {
        setIsFormVisible(false);
        reset();
      },
      onError: (error: Error) => {
        console.error('Error adding todo:', error);
      },
    });
  };

  return (
    <div className="mt-4">
      {!isFormVisible && (
        <Button
          variant="add"
          type="button"
          onClick={() => setIsFormVisible(true)}
        >
          Add task
        </Button>
      )}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <Input
            type="text"
            name="todo"
            placeholder="Enter todo"
            register={register}
            error={errors.todo?.message}
            onChange={() => clearErrors('todo')}
          />
          <div className="flex gap-2 mt-2">
            <Dropdown
              options={priorities}
              onSelect={(priority: string) => setSelectedPriority(priority)}
              selectedOption={selectedPriority}
            />
            <Dropdown
              options={categories}
              onSelect={(category: string) => setSelectedCategory(category)}
              selectedOption={selectedCategory}
            />
            <CustomDatePicker
              name="dueDate"
              value={dueDate ? dueDate.format('YYYY-MM-DD') : ''}
              onChange={(date: Moment) => setDueDate(date)}
              closeOnSelect={true}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="add"
              type="submit"
              disabled={!!errors.todo || isLoading}
              className={errors.todo ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Add task
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsFormVisible(false);
                reset();
              }}
              className="bg-gray-500"
              variant="cancel"
            >
              Cancel
            </Button>
          </div>
          {isError && <div className="text-red-500">Error adding todo</div>}
        </form>
      )}
    </div>
  );
};

export default SubmitForm;
