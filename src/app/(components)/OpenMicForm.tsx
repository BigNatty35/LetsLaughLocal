import { createOpenMic } from '../actions';

export default function OpenMicForm({user}: any) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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


  return (
    <form action={createOpenMic} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <label className="block mb-2">
        Title:
        <input type="text" name="title" className="form-input border p-2 ml-4"/>
      </label>

      <label className="block mb-2">
        Address:
        <input type="text" name="address" className="form-input border p-2 ml-4"/>
      </label>

      <label className="block mb-2">
        City:
        <input type="text" className="form-input border p-2 ml-4" name="city"/>
      </label>

      <label className="block mb-2">
        Sign up time:
        <input type="time" className="form-input border p-2 ml-4" name="signupTime"/>
      </label>
      <label className="block mb-2">
        Start Time:
        <input type="time" className="form-input border p-2 ml-4" name="startTime"/>
      </label>
      <label className="block mb-2">
        Day of the week:
        <select name="day" id="day">
          {daysOfWeek.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        frequency:
        <input type="text" name="frequency" className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Info:
        <textarea name="info" className="form-textarea"></textarea>
      </label>

      <label className="block mb-2">
        Sign-up Link:
        <input type="url" name="signupForm" className="form-input border p-2 ml-4" />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};


