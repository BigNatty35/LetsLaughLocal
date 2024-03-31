"use client"
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import EventForm from "./EventForm";
import OpenMicForm  from './OpenMicForm';

export default function FormPage({user}: any) {
  // const [selectedForm, setSelectForm] = useState<string>('Create Show');
  // const [selectedOption, setSelectedOption] = useState('Create Show');

  // const forms = ['Create Show', 'Create Open Mic'];

  // const handleRadioChange = (event: any) => {
  //   setSelectedOption(event.target.value);
  // };

  
  // const renderForm = () => {
  //   switch (selectedOption) {
  //     case 'Create Show':
  //       return <EventForm user={user}/>;
  //     case 'Create Open Mic':
  //       return <OpenMicForm user={user} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="flex flex-col">
      <div className="text-white"> Create Show </div>
      <EventForm user={user}/>
    </div>
  )
}