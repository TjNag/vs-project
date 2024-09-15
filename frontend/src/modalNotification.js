// modalNotification.js
import React from 'react';
import { Modal, Box } from '@mui/material';
import { IoIosClose } from 'react-icons/io';

export const ModalNotification = ({ close, data }) => {
  return (
    <Modal
      open={true}
      onClose={close}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px',
        }}
      >
        <div
          className='text-7xl flex justify-center'
        >
          🎉
        </div>
        <h1 className='text-center'>Submission Successful!</h1>
        <p className='text-center'>
          Your graph has been submitted successfully
        </p>

        <p className='text-center'>Number of Nodes: {data.num_nodes}</p>
        <p className='text-center'>Number of Edges: {data.num_edges}</p>
        {data.is_dag ? (
          <p className='font-bold text-center'>
            Your Graph is a Directed Acyclic Graph (DAG)
          </p>
        ) : (
          <p className='font-bold text-center'>
            Your Graph is NOT a Directed Acyclic Graph (DAG)
          </p>
        )}
        <div className='font-bold text-center'>
          <IoIosClose
            className='text-[2rem] cursor-pointer'
            onClick={close}
          />
        </div>
      </Box>
    </Modal>
  );
};
