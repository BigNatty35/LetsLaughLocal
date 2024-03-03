// "use client"

import { SubmitButton } from "../form/submit-button";
import { createEvent } from "../actions";

export default function EventForm({user}: any) {
  // save the start time as string,
  // save doors_open as string
  // migrate 
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object. 
  
  return (
    <div>
      
      <form action={createEvent} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <label className="block mb-2">
          Title:
          <input type="text" name="title" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-2">
          Date:
          <input type="date" name="date" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-2">
          Start Time:
          <input type="time" name="start_time" className="form-input border p-2 ml-4" />
        </label>
        <label className="block mb-2">
          Doors Open:
          <input type="time" name="doors_open" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-2">
          Description:
          <textarea name="description" className="form-textarea"></textarea>
        </label>

        <label className="block mb-2">
          Venue Name:
          <input type="text" name="venue_name" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-2">
          Address:
          <input type="text" name="address" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-2">
          Image Upload:
          <input type="file" name="image_url" accept="images/*" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-2">
          Ticket Link:
          <input type="url" name="ticket_link" className="form-input border p-2 ml-4" />
        </label>

        <label className="block mb-4">
          Ticket Price:
          <input type="text" name="ticket_price" className="form-input border p-2 ml-4" />
        </label>
      <SubmitButton/>
      </form>
    </div>
  );
};


