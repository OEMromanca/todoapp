import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface DropdownProps {
  options: { value: string; label: string }[] | string[];
  onSelect: (selected: string) => void;
  selectedOption: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedOption,
}) => {
  const handleSelect = (option: any) => {
    onSelect(option.value);
  };

  return (
    <Dropdown
      options={options}
      onChange={handleSelect}
      value={selectedOption}
      placeholder="Select an option"
      className="myClassName"
      controlClassName="rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2 h-10"
      menuClassName="myMenuClassName bg-white border border-gray-300 rounded-md shadow-lg mt-1"
      arrowClassName="myArrowClassName"
      placeholderClassName="myPlaceholderClassName"
    />
  );
};

export default CustomDropdown;
