// llmNode.js

import { Position } from 'reactflow';
import { NodeTemplate } from '../NodeTemplate';
import { LuBrainCircuit } from 'react-icons/lu';

export const LLMNode = ({ id, data }) => {
  return (
    <NodeTemplate
      id={id}
      name='LLM'
      icon={<LuBrainCircuit />}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: { top: `${100 / 3}%` },
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: `${200 / 3}%` },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
        },
      ]}
    >
      <div>
        <span className='text-sm'>This is a LLM.</span>
      </div>
    </NodeTemplate>
  );
};
