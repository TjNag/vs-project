import React, { useEffect } from 'react';
import { Handle, useUpdateNodeInternals, useReactFlow } from 'reactflow';
import { RxCrossCircled } from "react-icons/rx";
import { useStore } from './store';

export const NodeTemplate = ({
  id,
  name,
  icon,
  handles = [],
  style,
  children,
}) => {
  const updateNodeInternals = useUpdateNodeInternals();

  const onElementsRemove = useStore(state => state.onElementsRemove);

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, id, updateNodeInternals]);

  const handleClose = () => {
    onElementsRemove([{ id, type: 'node' }]); // Remove the node by its ID
  };

  return (
    <div
      style={{
        border: '1px solid black',
        padding: '3px',
        borderRadius: '8px',
        // backgroundColor: 'rgba(29, 23, 74, 1)',
        background:
          'linear-gradient(222deg, rgba(51,36,89,1) 0%, rgba(89,64,135,1) 35%, rgba(211,160,254,1) 100%)',
      }}
    >
      <div
        style={{
          width: 250,
          height: 'fit-content',
          border: '1px solid black',
          borderRadius: '8px',
          backgroundColor: 'white',
          ...style,
          // padding: '5px 20px 20px 20px',
        }}
      >
        {handles.map((handle, index) => (
          <div key={`${id}-${index}`}>
            <Handle
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={{
                width: '8px',
                height: '8px',
                backgroundColor:
                  handle.position === 'left'
                    ? 'rgba(60, 21, 115, 1)'
                    : '#ce94e8',
                ...handle.style,
              }}
              name={handle.name}
            />
            {handle.name && (
              <div
                style={{
                  position: 'absolute',
                  top: `${parseFloat(handle.style.top) - 15}px`,
                  left: `-${handle.name.length * 7}px`,
                  color: 'rgba(60, 21, 115, 1)',
                  fontSize: '12px',
                }}
              >
                {handle.name}
              </div>
            )}
          </div>
        ))}
        <div
          style={{
            borderBottom: '0.5px rgba(60, 21, 115, 1) solid',
            padding: '5px',
            fontSize: '14px',
            fontWeight: '700',
          }}
        >
          <div style={{ display: 'flex', gap: '5px' }}>
            {icon}
            {name}
          </div>
        </div>
        <div className='mx-4 my-3 rounded-lg nodrag'>
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            cursor: 'pointer',
          }}
          onClick={handleClose}
        >
          <RxCrossCircled size={20} />
        </div>
      </div>
    </div>
  );
};
