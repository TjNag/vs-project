// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { NodeTemplate } from './BaseNodeTemplate';
import { FormField } from '../utils/FormField';
import { MdOutlineOutput } from 'react-icons/md';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <NodeTemplate
      id={id}
      name='Output'
      icon={<MdOutlineOutput />}
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
    >
      <FormField
        label='Name:'
        type='text'
        value={currName}
        onChange={handleNameChange}
      />
      <FormField
        label='Type:'
        type='select'
        value={outputType}
        onChange={handleTypeChange}
        options={[{ value: 'Text' }, { value: 'Image' }]}
      />
    </NodeTemplate>
  );
};
