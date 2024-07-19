import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';

interface MessageProps {
  type: 'loading' | 'error' | 'noTodos';
  text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
  const { isDarkMode } = useTheme();

  const typeStyles = {
    loading: 'text-xl',
    error: 'text-xl',
    noTodos: 'text-xl',
  };

  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-600';

  return (
    <div className={`p-6 text-center ${typeStyles[type]} ${textColor}`}>
      {text}
    </div>
  );
};

export default Message;
