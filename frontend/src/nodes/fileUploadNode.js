import React, { useState } from 'react';
import { NodeTemplate } from './BaseNodeTemplate';
import { Position } from 'reactflow';
import { FormField } from '../utils/FormField';
import { FaFileUpload } from 'react-icons/fa';

export const FileUploadNode = ({ id, data }) => {
  const [, setFile] = useState(data?.file || null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <NodeTemplate
      id={id}
      name='Upload File'
      icon={<FaFileUpload />}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <FormField
        label='Upload File'
        type='file'
        accept='.jpg, .png, .pdf'
        onChange={handleFileChange}
      />
    </NodeTemplate>
  );
};
