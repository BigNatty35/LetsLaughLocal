"use client"

import { SubmitButton } from "../form/submit-button";
import { createEvent } from "../actions";
import toast from 'react-hot-toast';
import { z } from "zod";
import axios from 'axios';
import { Event, EventSchema } from "../types";


export default function EventForm({user}: any) {
  // save the start time as string,
  // save doors_open as string
  // migrate 
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object.
 
  const clientAction = async (formData: FormData) => {
    // await createEvent()
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

    // // // if there is an error, there will be message in result object
    // const result = EventSchema.safeParse(newEvent);
    // // console.log("CLIENT RESULT", result.data);
    // console.log("HELLO!!!!")

   

    // console.log("RESULT DATA", result.data)
    
    // try {
    //   console.log("TRY CATCH")
    //   await createEvent(result.data)
    //   // console.log("RESPONSE", response)
    // } catch (error) {
    //   console.error("error!!!!", error)
    // }
    // console.log("formData", formData)
    // const result = EventSchema.parse(formData);
    // console.log(result)

    const response = await createEvent(formData)
    console.log("RESPONSE!!", response);
    console.log("Hello")

    //  if (!result.success) {
    //   let errorMessage = "";

    //   result.error.issues.forEach((issue) => {
    //     errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    //   })

    //   console.log(result.error.issues)
    //   // console.log(newEvent);
    //   console.log("we shoujld get error toast")
    //   toast.error(errorMessage)
    //   return
    // }

    // const response = await createEvent(result.data)

    if (response?.error) {
      console.log("ERROR!!!!")
      toast.error(response.error)
    }
    // console.log(" HELLO response")
    // await axios.post("/api/event", {data: { ...result.data }})
    // await createEvent(formData)
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
        <input type="time" name="start_time" className="form-input border p-2 mb-4 " required/>
      <label className="block mb-2 mt-2 font-bold">
        Doors Open:
      </label>
        <input type="time" name="doors_open" className="form-input border p-2 mb-4 " required/>
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
        <input type="file" name="image_url" accept="images/*" className="form-input border p-2 mb-4 " required/>

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


