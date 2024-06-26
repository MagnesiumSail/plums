import React, { useState, useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface CustomSelectProps {
  options: { id: string; title: string }[];
  onChange: (value: string) => void;
  value: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options = [], onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => setIsOpen(false));

  const handleSelect = (id: string) => {
    onChange(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full" ref={ref}>
      <button
        type="button"
        className="w-full border border-gray-300 rounded-lg p-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.id === value)?.title || '-- Select --'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => (
            <li
              key={option.id}
              className="p-2 hover:bg-purple-500  m-2 hover:text-white cursor-pointer"
              onClick={() => handleSelect(option.id)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
