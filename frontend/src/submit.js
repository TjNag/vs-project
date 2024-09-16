// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ModalNotification } from './modalNotification';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [submitted, setSubmitted] = useState(false);
  const [currData, setCurrData] = useState({});

  const handleClick = async () => {
    const data = { nodes: nodes, edges: edges };
    console.log(JSON.stringify(data));

    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const responseData = await response.json();
      setCurrData(responseData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div
      className='flex justify-center items-center w-full h-16 bg-violet-50'
    >
      {submitted && (
        <ModalNotification close={() => setSubmitted(false)} data={currData} />
      )}
      <button
        type='submit'
        onClick={handleClick}
        className='btn-grad cursor-pointer border-none px-8 py-3 rounded-md font-semibold '
      >
        Submit
      </button>
    </div>
  );
};

