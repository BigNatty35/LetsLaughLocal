"use client"
import { useState } from "react";
import EventForm from "./EventForm";
import OpenMicForm from "./OpenMicForm";

export default function FormPage() {
  const [selectedForm, setSelectForm] = useState<string>('Show');
  const forms = ['Show', 'Open Mic'];


  
  const renderForm = () => {
    switch (selectedForm) {
      case 'Show':
        return <EventForm/>;
      case 'Open Mic':
        return <OpenMicForm />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col">
      <select value={selectedForm} onChange={(e) => {
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