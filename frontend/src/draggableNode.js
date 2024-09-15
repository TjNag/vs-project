// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
    className={`cursor-grab min-w-[80px] h-[60px] flex items-center rounded-[8px] text-[#7A7DF3] hover:text-text-dark-violate justify-center flex-col ${type} hover:shadow-[0_4px_10px_rgba(122,125,243,0.5)] transition-transform duration-300`}

      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        border: '1px solid #7A7DF3',
      }}
      draggable
    >
      <div
        className='flex flex-col justify-center items-center text-center w-fit'
      >
        <div className='self-center text-2xl'>{icon}</div>
        <div className='text-xs'>{label}</div>
      </div>
    </div>
  );
};
