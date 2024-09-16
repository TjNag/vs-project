import React from 'react';
import { Modal, Box } from '@mui/material';
import { RxCrossCircled } from "react-icons/rx";

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
        }}
        className='w-96 bg-white p-10 shadow-[0_8px_20px_rgba(122,125,243,0.75)] rounded-3xl'
      >
        <div className='text-7xl flex justify-center'>
          🎉
        </div>
        <h1 className='text-center text-violet-600'>Submission Successful!</h1>
        <p className='text-center text-violet-600'>
          Your graph has been submitted successfully
        </p>

        <p className='text-center text-violet-600'>Number of Nodes: {data.num_nodes}</p>
        <p className='text-center text-violet-600'>Number of Edges: {data.num_edges}</p>
        {data.is_dag ? (
          <p className='font-bold text-center text-violet-700'>
            Your Graph is a Directed Acyclic Graph (DAG)
          </p>
        ) : (
          <p className='font-bold text-center text-violet-700'>
            Your Graph is NOT a Directed Acyclic Graph (DAG)
          </p>
        )}
        <div className='absolute top-2 right-2 font-bold text-center'>
          <RxCrossCircled
            className='text-4xl cursor-pointer text-violet-600 hover:text-light-red'
            onClick={close}
          />
        </div>
      </Box>
    </Modal>
  );
};
