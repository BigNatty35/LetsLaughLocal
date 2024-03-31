"use client"
import toast from 'react-hot-toast';
import { useState } from 'react';
import { createOpenMic } from '../actions';
import TimePicker from './TimePicker';

export default function OpenMicForm({user}: any) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const [signupTime, setSignUpTime] = useState("");
  const [startTime, setStartTime] = useState("8:00PM");
  const [signup, setSignup] = useState(true);
  
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object. 


  const handleSignUpTimeChange = (newTime: string) => {
    setSignUpTime(newTime);
    console.log("NEWEST Start TIME!!!!!!", signupTime);
  };

  const handleStartTimeChange = (newTime: string) => {
    setStartTime(newTime);
    console.log("NEWEST Doors Open!!!!!!", startTime);
  };


  const clientAction = async (formData: FormData) => {
    console.log(formData)
    const startTime = formData.get("startTime") as string;
    const signupTime = formData.get("signupTime") as string;
    console.log(startTime >= signupTime)
    const response = await createOpenMic(formData);

    if (response?.error) {
      toast.error(response.error);
    }

  }
  return (
    <form action={clientAction} className="max-w-md mx-auto mt-8 px-6 py-8 bg-white shadow-md rounded-md flex flex-col items-start">
      <label className="block mb-2 font-bold">
        Title:
      </label>
        <input type="text" name="title" className="form-input border p-2 mb-4 " required/>

      <label className="block mb-2 font-bold">
        Address:
      </label>
        <input type="text" name="address" className="form-input border p-2 mb-4 " required/>

      <label className="block mb-2 font-bold">
        City:
      </label>
        <input type="text" className="form-input border p-2 mb-4" name="city" required/>

      <label className="block mb-2 mt-2 font-bold">
        Start Time:
      </label>
      <TimePicker onChange={handleStartTimeChange} />
      <input type="hidden" name="startTime" value={startTime} />
      <label className="block mb-2 mt-2 font-bold">
        Sign-up Time? (optional)
      </label>
      <div className='flex'>
        <div className='mr-4'>
          <label>
            <input type="radio"  className="m-2" checked={signup} onChange={() => setSignup(true)} />
            Yes
          </label>
        </div>
          <label>
            <input type="radio" className="m-2" checked={!signup} onChange={() => setSignup(false)} />
            No
          </label>
      </div>

      {signup && <TimePicker onChange={handleSignUpTimeChange} />}
      <input type="hidden" name="signupTime" value={signup ? signupTime : ""} />
      <label className="block mb-2 font-bold">
        Day of the week:
      </label>
        <select name="day" id="day" className='px-4 py-2 rounded mb-4' required>
          {daysOfWeek.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      <label className="block mb-2 font-bold">
        Frequency:
      </label>
        <input type="text" name="frequency" className="form-input border p-2 mb-4 " required />
      <label className="block mb-2 font-bold">
        Info:
      </label>
        <textarea name="info" className="form-textarea border" rows={4} cols={30}></textarea>

      <label className="block mb-2 font-bold">
        Sign-up Link: <span className='text-sm'>(optional)</span>
      </label>
        <input type="url" name="signupForm" className="form-input border p-2 mb-4 " />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit Open Mic</button>
    </form>
  );
};


