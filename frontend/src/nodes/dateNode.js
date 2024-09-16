import React, { useState } from 'react';
import { NodeTemplate } from '../NodeTemplate';
import { Position } from 'reactflow';
import { FormField } from '../FormField';
import { CiCalendarDate } from 'react-icons/ci';
import { IoIosTime, IoIosClose } from 'react-icons/io';

export const DateNode = ({ id, data }) => {
  const now = new Date();
  const todayDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const todayTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

  const [startDate, setStartDate] = useState(data?.startDate || todayDate);
  const [startTime, setStartTime] = useState(data?.startTime || todayTime);
  const [endDate, setEndDate] = useState(data?.endDate || '');
  const [endTime, setEndTime] = useState(data?.endTime || '');

  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const handleDateChange = (e, setter) => {
    setter(e.target.value);
  };

  return (
    <NodeTemplate
      id={id}
      name='Pick Date'
      icon={<CiCalendarDate />}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div className='flex flex-col text-medium-dark-color'>
        <FormField
          label='Start date:'
          type='date'
          value={startDate}
          onChange={(e) => handleDateChange(e, setStartDate)}
        />
        {showStartTime ? (
          <div className='relative'>
            <FormField
              label=''
              type='time'
              value={startTime}
              onChange={(e) => handleDateChange(e, setStartTime)}
            />
            <IoIosClose
              onClick={() => setShowStartTime(!showStartTime)}
              className='absolute top-0 right-0 -m-1'
            />
          </div>
        ) : (
          <IoIosTime
            onClick={() => setShowStartTime(true)}
            className='self-end mb-2 text-medium-dark-color'
          />
        )}
      </div>
      <div className='flex flex-col text-medium-dark-color'>
        <FormField
          label='End Date:'
          type='date'
          value={endDate}
          onChange={(e) => handleDateChange(e, setEndDate)}
        />
        {showEndTime ? (
          <div className='relative'>
            <FormField
              label=''
              type='time'
              value={endTime}
              onChange={(e) => handleDateChange(e, setEndTime)}
            />
            <IoIosClose
              onClick={() => setShowEndTime(!showEndTime)}
              className='absolute top-0 right-0 -m-1'
            />
          </div>
        ) : (
          <IoIosTime
            onClick={() => setShowEndTime(true)}
            className='self-end mb-[5px] text-medium-dark-color'
          />
        )}
      </div>
    </NodeTemplate>
  );
};
