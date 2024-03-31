"use client"

import { SubmitButton } from "../form/submit-button";
import { createEvent } from "../actions";
import { useState, useEffect, ChangeEvent } from 'react'
import TimePicker from "./TimePicker";
import toast from 'react-hot-toast';

export default function EventForm({user}: any) {
  // save the start time as string,
  // save doors_open as string
  // migrate 
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object.
  const [startTime, setStartTime] = useState('01:00 AM');
  const [error, setError] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState<number>(Date.now());
  const [doorsOpenTime, setDoorsOpenTime] = useState('01:00 AM');

  const handleStartTimeChange = (newTime: string) => {
    setStartTime(newTime);
    console.log("NEWEST Start TIME!!!!!!", startTime);
  };

  const handleDoorsOpenTimeChange = (newTime: string) => {
    setDoorsOpenTime(newTime);
    console.log("NEWEST Doors Open!!!!!!", doorsOpenTime);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const uploadedFile = files[0];
      const fileExtention = uploadedFile.name.split(".").pop()?.toLocaleLowerCase();

      if (fileExtention === 'heic' || fileExtention === 'heif') {
        setInputKey(Date.now());
        setError('HEIC/HEIF images are not supported. Please upload a different file.')
        setFile(null)
      } else {
        setError(null)
        setFile(uploadedFile)
      }
    }
  }

  const clientAction = async (formData: FormData) => {
    // await createEvent()
    console.log("CLIENT ACTION")
    const newEvent = {
        title: formData.get("title") as string,
        date: new Date(formData.get("date") as unknown as Date),
        doors_open: formData.get("doors_open") as string,
        start_time: formData.get("start_time") as string,
        description: formData.get("description") as string,
        venue_name: formData.get("venue_name") as string,
        address: formData.get("address") as string,
        image_url: formData.get("image_url") as File,
        ticket_link: formData.get("ticket_link") as string,
        ticket_price: formData.get("ticket_price") as string,
    }

    console.log(newEvent)


    const response = await createEvent(formData)
    console.log("RESPONSE!!", response);
    console.log("Hello")

    if (response?.error) {
      console.log("ERROR!!!!")
      toast.error(response.error)
    }
  } 
  return (
    <form action={clientAction} className="max-w-md mx-auto mt-8 px-6 py-8 bg-white shadow-md rounded-md flex flex-col items-start">
      <label className="block mb-2 font-bold">
        Title:
      </label>
        <input type="text" name="title" className="form-input border p-2 mb-4 " required />
      <label className="block mb-2 mt-2 font-bold">
        Date:
      </label>
        <input type="date" name="date" className="form-input border p-2 mb-4 " required/>

      <label className="block mb-2 mt-2 font-bold">
        Start Time:
      </label>
      <TimePicker onChange={handleStartTimeChange} />
      <input type="hidden" name="start_time" value={startTime} />
      <label className="block mb-2 mt-2 font-bold">
        Doors Open:
      </label>
      <TimePicker onChange={handleDoorsOpenTimeChange} />
      <input type="hidden" name="doors_open" value={doorsOpenTime} />
      <label className="block mb-2 mt-2 font-bold">
        Venue Name:
      </label>
        <input type="text" name="venue_name" className="form-input border p-2 mb-4 " required/>

      <label className="block mb-2 mt-2 font-bold">
        Address:
      </label>
        <input type="text" name="address" className="form-input border p-2 mb-4 " required/>

      <label className="block mb-2 mt-2 font-bold">
        Image Upload:
      </label>
        <input type="file" name="image_url" accept="images/*" className="form-input border p-2 mb-4 w-60" onChange={handleFileChange} key={inputKey} required/>
        {error && <div style={{color: 'red'}}>{error}</div>}
      <label className="block mb-2 mt-2 font-bold">
        Ticket Link:
      </label>
        <input type="url" name="ticket_link" className="form-input border p-2 mb-4 "/>

      <label className="block mb-2 mt-2 font-bold">
        Ticket Price:
      </label>
        <input type="text" name="ticket_price" className="form-input border p-2 mb-4 "/>
      <label className="mb-2 mt-2 block font-bold">
        Description:
      </label>
        <textarea name="description" className="form-textarea border block mb-4" rows={4} cols={30} required></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit Show</button>
    </form>
  );
};


