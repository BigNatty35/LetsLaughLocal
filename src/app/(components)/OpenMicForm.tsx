"use client"
import toast from 'react-hot-toast';
import { createOpenMic } from '../actions';

export default function OpenMicForm({user}: any) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object. 


  const clientAction = async (formData: FormData) => {
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

      <label className="block mb-2 font-bold">
        Sign up time <span className='text-sm'>(optional)</span> :
      </label>
        <input type="time" className="form-input border p-2 mb-4" name="signupTime"/>
      <label className="block mb-2 font-bold">
        Start Time:
      </label>
        <input type="time" className="form-input border p-2 mb-4" required name="startTime"/>
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


