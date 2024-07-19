import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'add' | 'cancel' | 'remove' | 'save';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  className,
  variant = 'default',
  children,
}) => {
  const { isDarkMode } = useTheme();

  const variantStyles = {
    default: 'text-black',
    add: 'bg-[#2F6A4C] text-white hover:bg-[#245D41] px-5 py-2',
    cancel: `text-${
      isDarkMode ? 'gray-400' : 'gray-600'
    } border border-transparent bg-transparent p-1 rounded cursor-pointer`,

    remove: `text-${
      isDarkMode ? 'gray-400' : 'gray-600'
    } text-sm border border-transparent bg-transparent p-1 rounded cursor-pointer`,
    save: 'bg-[#DD4B39] text-white hover:bg-[#C43D2F] px-5 py-2',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
