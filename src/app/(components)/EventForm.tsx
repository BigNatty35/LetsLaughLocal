// "use client"

import { ApprovalStatus } from "@prisma/client";
import { SubmitButton } from "../form/submit-button";
import axios from "axios";
import { useForm } from "react-hook-form";


export type FormData =  { 
  title: string;
  date: Date,
  doors_open: string;
  start_time: string;
  description: string;
  venue_name: string;
  address: string;
  image_url: string;
  ticket_link: string;
  ticket_price: string;
  approvalStatus: ApprovalStatus;
} ;

export default function EventForm({user}: any) {

  // save the start time as string,
  // save doors_open as string
  // migrate 
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object. 
  function onSubmit(data: FormData) {
    console.log("THIS DATA:", data)
    try {
      axios.post("/api/event", data).then(res => {
        console.log(res.data)
      })
    } catch (error) {
      console.error("Error:", error)      
    }
  }

  const {register, handleSubmit} = useForm<FormData>()
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <label className="block mb-2">
        Title:
        <input type="text" {...register('title', {required: true})} className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Date:
        <input type="date" {...register('date', {required: true})} className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Start Time:
        <input type="time" {...register('start_time', {required: true})} className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Doors Open:
        <input type="time" {...register('doors_open', {required: true})} className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Description:
        <textarea {...register('description', {required: true})} className="form-textarea"></textarea>
      </label>

      <label className="block mb-2">
        Venue Name:
        <input type="text" {...register('venue_name', {required: true})} className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Address:
        <input type="text" {...register('address', {required: true})} className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Image Upload:
        <input type="file" {...register('image_url', {required: false})} accept="images/*" className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Ticket Link:
        <input type="url" {...register('ticket_link', {required: true})} className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-4">
        Ticket Price:
        <input type="text" {...register('ticket_price', {required: true})} className="form-input border p-2 ml-4" />
      </label>
     <SubmitButton/>
    </form>
  );
};


