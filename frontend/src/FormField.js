import React, { useRef, useEffect } from 'react';
import { Position } from 'reactflow';

export const FormField = ({
  label,
  type,
  value,
  onChange,
  onKeyDown,
  options = [],
  checked = false,
  accept = '',
  min = undefined,
  max = undefined,
  step = undefined,
  rows = 0,
  multiple = false,
  style = {},
}) => {
  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    const textArea = textAreaRef.current;

    if (textArea) {
      textArea.style.height = '15px'; // Reset height to auto to calculate the new height
      textArea.style.height = `${textArea.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  const handleInput = (e) => {
    if (type === 'textarea' || type === 'text') {
      resizeTextArea();
    }
  };  

  return (
    <label
      style={{
        ...style,
      }}
      className='flex items-center text-[1rem] mb-[10px]'
    >
      {type === 'checkbox' ? (
        <>
          <input
            type={type}
            checked={checked}
            onChange={onChange}
            className='mr-2' // Add space between checkbox and label
          />
          <span>{label}</span>
        </>
      ) : (
        <div
          className='flex flex-col w-full'
        >
          <span
            className='text-xs mb-1 font-bold text-medium-dark-violate'
          >
            {label}
          </span>
          {type === 'select' ? (
            <select
              value={value}
              multiple={multiple}
              onChange={onChange}
              className='border-none outline-none'
            >
              {options.map((option, index) => (
                <option key={`${index}-${value}`} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          ) : type === 'textarea' || type === 'text' ? (
            <textarea
              ref={textAreaRef}
              value={value}
              onChange={onChange}
              onInput={handleInput}
              onKeyDown={onKeyDown}
              rows={rows}
              className="resize-none p-1 border border-medium-dark-violate rounded-lg outline-none bg-transparent overflow-y-auto max-h-48"
            />
          ) : (
            <input
              type={type}
              value={type === 'file' ? undefined : value}
              onChange={onChange}
              checked={type === 'checkbox' ? checked : undefined}
              accept={accept}
              min={type === 'number' || type === 'range' ? min : undefined}
              max={type === 'number' || type === 'range' ? max : undefined}
              step={type === 'number' || type === 'range' ? step : undefined}
              className='border-none outline-none bg-transparent'
            />
          )}
        </div>
      )}
    </label>
  );
};
