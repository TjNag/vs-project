import React, { useState } from "react";
import { NodeTemplate } from "./BaseNodeTemplate";
import { Position } from "reactflow";
import { FormField } from "../utils/FormField";
import { IoIosClose } from "react-icons/io";
import { RiCheckboxMultipleFill } from "react-icons/ri";

export const MultiSelectNode = ({ id, data }) => {
  const [selectedOptions, setSelectedOptions] = useState(data?.selected || []);

  const options = [
    { value: "option1", label: "Option 1", checked: false },
    { value: "option2", label: "Option 2", checked: false },
    { value: "option3", label: "Option 3", checked: false },
  ];

  const handleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedOptions(values);

    const updatedSelections = values.reduce((acc, value) => {
      if (selectedOptions.includes(value)) {
        return acc.filter((item) => item !== value);
      } else {
        return [...acc, value];
      }
    }, selectedOptions);

    setSelectedOptions(updatedSelections);
  };

  const handleRemoveSelection = (value) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((option) => option !== value)
    );
  };

  return (
    <NodeTemplate
      id={id}
      name="Multi-Select Dropdown"
      icon={<RiCheckboxMultipleFill />}
      handles={[
        { type: "target", position: Position.Left, id: `${id}-input` },
        { type: "source", position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {selectedOptions.map((selection) => (
          <div
            key={selection}
            className="w-fit px-4 py-2 rounded-[40px] flex items-center justify-between bg-color-100"
          >
            <span className="text-sm font-medium text-center flex-1">
              {selection}
            </span>
            <span
              onClick={() => handleRemoveSelection(selection)}
              className="cursor-pointer ml-2 text-sm text-red-500 font-bold"
            >
              <IoIosClose />
            </span>
          </div>
        ))}
      </div>
      <FormField
        label="Select Options"
        type="select"
        value={selectedOptions}
        onChange={handleChange}
        options={options}
      />
    </NodeTemplate>
  );
};
