import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useTheme } from '../../providers/ThemeProvider';

interface InputProps {
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  name,
  register,
  error,
  onChange,
}) => {
  const { isDarkMode } = useTheme();

  const variantClasses: { [key in InputProps['type']]: string } = {
    text: `${
      isDarkMode
        ? 'border-gray-600 text-gray-300'
        : 'border-gray-300 text-gray-700'
    } bg-transparent outline-none`,
    password: `${
      isDarkMode
        ? 'border-gray-600 text-gray-300'
        : 'border-gray-300 text-gray-700'
    } focus:border-blue-500 focus:ring-blue-500`,
    email: `${
      isDarkMode
        ? 'border-gray-600 text-gray-300'
        : 'border-gray-300 text-gray-700'
    } focus:border-blue-500 focus:ring-blue-500`,
  };

  return (
    <div className="mb-4 relative flex items-center h-full">
      {error && (
        <p className="absolute top-6 left-0 text-red-500 text-sm">{error}</p>
      )}
      <input
        type={type}
        placeholder={
          type === 'text' || type === 'password' || type === 'email'
            ? placeholder
            : undefined
        }
        value={value}
        {...register(name)}
        className={`${variantClasses[type]} ${
          error ? 'border-red-500' : ''
        } rounded-md`}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
