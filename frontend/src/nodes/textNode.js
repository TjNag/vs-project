// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { NodeTemplate } from './BaseNodeTemplate';
import { FormField } from '../utils/FormField';
import { MdOutlineTextFields } from "react-icons/md";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState(
    data?.handles || [
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]
  );

  const handleTextChange = (e) => {
    const offsetHeight = e.target.offsetHeight + 20;
    setCurrText(e.target.value);

    const pattern = /\{\{(\w+)\}\}/g;
    let match;
    const newHandles = [
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ];

    while ((match = pattern.exec(e.target.value)) !== null) {
      const name = match[1];
      const handleId = `${id}-input-${name}`;

      newHandles.push({
        type: 'target',
        position: Position.Left,
        id: handleId,
        name: name,
      });
    }

    // Remove duplicates based on the id
    const filteredHandles = Array.from(
      new Map(newHandles.map((item) => [item.id, item])).values()
    );
    

    // Assign styles to handles for positioning
    const handleCount = filteredHandles.length - 1 || 1; // Prevent division by zero
    for (let i = 1; i < filteredHandles.length; i++) {
      filteredHandles[i].style = {
        top: `${(i * offsetHeight) / handleCount}px`,
      };
    }

    setHandles(filteredHandles);
  };

  return (
    <NodeTemplate
      id={id}
      name='Text'
      icon={<MdOutlineTextFields />}
      handles={handles}
    >
      <FormField
        id={id}
        label='Text:'
        type='text'
        value={currText}
        onChange={handleTextChange}
        rows='auto'
      />
    </NodeTemplate>
  );
};
