import React, { useState } from 'react';
import { Position } from 'reactflow';
import { NodeTemplate } from '../NodeTemplate';
import { FormField } from '../FormField';
import { IoIosCheckbox, IoIosAddCircle } from 'react-icons/io';

export const CheckboxNode = ({ id, data }) => {
  const [currNumberValue, setCurrNumberValue] = useState(data?.value || 1);
  const [newCheckboxLabel, setNewCheckboxLabel] = useState('');
  const [checkboxes, setCheckboxes] = useState([
    { id: 'checkbox1', label: 'enable-filter', checked: false },
  ]);

  const handleNumberValueChange = (e) => {
    setCurrNumberValue(Number(e.target.value)); // Ensure value is a number
  };

  const handleCheckboxChange = (id) => (e) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: e.target.checked }
          : checkbox
      )
    );
  };

  const addCheckBox = () => {
    if (newCheckboxLabel.trim() === '') return; // Avoid adding empty checkboxes

    const newCheckbox = {
      id: `checkbox-${Date.now()}`,
      label: newCheckboxLabel,
      checked: false,
    };

    setCheckboxes((prevCheckboxes) => [...prevCheckboxes, newCheckbox]);
    setNewCheckboxLabel(''); // Clear input after adding
  };

  const handleNewCheckboxLabelChange = (e) => {
    setNewCheckboxLabel(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default action (e.g., form submission)
      addCheckBox();
    }
  };

  return (
    <NodeTemplate
      id={id}
      name='Checkbox'
      icon={<IoIosCheckbox />}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    >
      <FormField
        label='Max Chunks Per Query'
        type='number'
        value={currNumberValue}
        onChange={handleNumberValueChange}
        min={1}
        step={1}
      />

<div className="w-full overflow-x-hidden whitespace-normal break-words">
      {checkboxes.map((checkbox) => (
        <FormField
          key={checkbox.id}
          label={checkbox.label}
          type='checkbox'
          checked={checkbox.checked}
          onChange={handleCheckboxChange(checkbox.id)}
          className='border-none p-0'
        />
      ))}
      </div>
      <div
        className='flex border border-black rounded-md overflow-y-auto max-h-32'
      >
        <FormField
          label='Add New Checkbox'
          type='text'
          value={newCheckboxLabel}
          onChange={handleNewCheckboxLabelChange}
          onKeyDown={handleKeyDown}
          className='border-none mb-0'
        />
        <IoIosAddCircle onClick={addCheckBox} className='self-center'/>
      </div>
    </NodeTemplate>
  );
};
