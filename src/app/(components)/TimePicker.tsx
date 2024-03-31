"use client"

import React, { useState, useEffect, useRef } from 'react';

interface TimePickerProps {
  onChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange }) => {
  const [hour, setHour] = useState('08');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('PM'); // AM or PM

  const mounted = useRef(false);

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("THE HOUR IS:", e.target.value)
    setHour(e.target.value);
    // updateParent();
    // onChange(`${hour}:${minute} ${period}`)
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("THE Minute IS:", e.target.value)
    setMinute(e.target.value);
    // updateParent();
    // onChange(`${hour}:${minute} ${period}`)
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("THE PERIOD IS:", e.target.value)
    setPeriod(e.target.value);
    // updateParent();
    // onChange(`${hour}:${minute} ${period}`)
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      onChange(`${hour}:${minute} ${period}`);
    }
  }, [hour, minute, period, onChange]);

  return (
    <div className="flex space-x-2 items-center mb-2 mt-2">
      <select className="form-select p-1 rounded" value={hour} onChange={handleHourChange}>
        {Array.from({ length: 12 }, (_, i) => {
          const hourValue = i + 1; // 1 to 12
          return (
            <option key={hourValue} value={hourValue < 10 ? `0${hourValue}` : hourValue}>
              {hourValue}
            </option>
          );
        })}
      </select>
      <span>:</span>
      <select className="form-select p-1 rounded" value={minute} onChange={handleMinuteChange}>
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={i < 10 ? `0${i}` : i}>
            {i < 10 ? `0${i}` : i}
          </option>
        ))}
      </select>
      <select className="form-select p-1 rounded" value={period} onChange={handlePeriodChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimePicker;