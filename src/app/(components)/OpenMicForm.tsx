"use client"

import { useForm } from 'react-hook-form';
import axios from 'axios';

export type FormData = {
  title: string;
  startTime: string;
  signupTime: string;
  day: string;
  city: string;
  info: string;
  frequency: string;
  address: string;
  signupForm: string;
}

export default function OpenMicForm({user}: any) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const { register, handleSubmit } = useForm<FormData>();

  // save the start time as string,
  // save doors_open as string
  // migrate 
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object. 

// date.toLocaleDateString('en-us', { weekday: 'long'})
  // const [formData, setFormData] = useState({
  //   title: '',
  //   date: '',
  //   doors_open: '',
  //   description: '',
  //   venue_name: '',
  //   address: '',
  //   image: null,
  //   ticket_link: '',
  //   ticket_price: '',
  // });

 
  function onSubmit(data: FormData) {
    console.log(data);
    console.log("Hello world")
    try {
      axios.post("/api/openMic", data).then(res => {
        console.log("reponse:", res.data);
      })
      
    } catch (error) {
      console.error("Error making post request", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <label className="block mb-2">
        Title:
        <input type="text" className="form-input border p-2 ml-4"
        {...register('title', {required: true})} />
      </label>

      <label className="block mb-2">
        Address:
        <input type="text" className="form-input border p-2 ml-4" 
        {...register('address', {required: true})}/>
      </label>

      <label className="block mb-2">
        City:
        <input type="text" className="form-input border p-2 ml-4" 
        {...register('city', {required: true})}/>
      </label>

      <label className="block mb-2">
        Sign up time:
        <input type="time" className="form-input border p-2 ml-4" 
        {...register('signupTime', {required: true})}/>
      </label>
      <label className="block mb-2">
        Start Time:
        <input type="time" className="form-input border p-2 ml-4" 
        {...register('startTime', {required: true})}/>
      </label>
      <label className="block mb-2">
        Day of the week:
        <select {...register('day', {required: true})} id="day">
          {daysOfWeek.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        frequency:
        <input type="text" {...register('frequency', {required: true})} className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Info:
        <textarea {...register('info', {required: true})} className="form-textarea"></textarea>
      </label>

      <label className="block mb-2">
        Sign-up Link:
        <input type="url" {...register('signupForm', {required: false})}   className="form-input border p-2 ml-4" />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};


