"use client"
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import EventForm from "./EventForm";
import OpenMicForm  from './OpenMicForm';

export default function FormPage({user}: any) {
  const [selectedForm, setSelectForm] = useState<string>('Create Show');
  const [selectedOption, setSelectedOption] = useState('Create Show');

  const forms = ['Create Show', 'Create Open Mic'];

  const handleRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  
  const renderForm = () => {
    switch (selectedOption) {
      case 'Create Show':
        return <EventForm user={user}/>;
      case 'Create Open Mic':
        return <OpenMicForm user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div>
          <label className="text-2xl p-4 text-black bg-customGold flex">
              <input
              className="m-2"
                type="radio"
                value="Create Show"
                checked={selectedOption === 'Create Show'}
                onChange={handleRadioChange}
              />
              Create Show
            </label>
        </div>
        <div>
          <label className="text-2xl p-4 text-black bg-customGold flex items-center">
            <input
              className="m-2"
              type="radio"
              value="Create Open Mic"
              checked={selectedOption === 'Create Open Mic'}
              onChange={handleRadioChange}
            />
            Create Open Mic
          </label>

        </div>
      </div>
      {renderForm()}
    </div>
  )
}