"use client"
import { useState } from "react";
import EventForm from "./EventForm";
import OpenMicForm  from './OpenMicForm';

export default function FormPage({user}: any) {
  const [selectedForm, setSelectForm] = useState<string>('Show');
  const forms = ['Create Show', 'Create Open Mic'];


  
  const renderForm = () => {
    switch (selectedForm) {
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
      <select className="p-5 text-center text-2xl text-white bg-black appearance-none" value={selectedForm} onChange={(e) => {
        setSelectForm(e.target.value) 
      }}>
        {forms.map((form) => (
          <option key={form} value={form}>
            {form}
          </option>
        ))}
      </select>
      {renderForm()}
    </div>
  )
}