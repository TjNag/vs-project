// toolbar.js
import { DraggableNode } from './draggableNode';
import { MdOutlineInput, MdOutlineOutput } from 'react-icons/md';
import { LuBrainCircuit } from 'react-icons/lu';
import { BsCalendar2RangeFill } from "react-icons/bs";
import { FaNoteSticky } from 'react-icons/fa6';
import { MdOutlineTextFields } from "react-icons/md";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { FaFileUpload } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";

export const PipelineToolbar = () => {
  return (
    <div className='p-2 bg-cyan-50'>
      <div
        className='flex flex-wrap gap-3 my-1 justify-center'
      >
        <DraggableNode
          type='customInput'
          label='Input'
          icon={<MdOutlineInput />}
        />
        <DraggableNode
          type='llm'
          label='LLM'
          icon={<LuBrainCircuit />}
        />
        <DraggableNode
          type='customOutput'
          label='Output'
          icon={<MdOutlineOutput />}
        />
        <DraggableNode
          type='text'
          label='Text'
          icon={<MdOutlineTextFields />}
        />
        <DraggableNode
          type='checkbox'
          label='Checkbox'
          icon={<IoMdCheckbox />}
        />
        <DraggableNode
          type='fileUpload'
          label='File Upload'
          icon={<FaFileUpload />}
        />

        <DraggableNode
          type='multiSelect'
          label='Multi-Select'
          icon={<RiCheckboxMultipleFill />}
        />
        <DraggableNode
          type='customDate'
          label='Date Range'
          icon={<BsCalendar2RangeFill />}
        />
        <DraggableNode
          type='notes'
          label='Notes'
          icon={<FaNoteSticky />}
        />
      </div>
    </div>
  );
};
