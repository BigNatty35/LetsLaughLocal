import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { createOpenMic } from "../actions";
import { useFormState } from "react-dom";

const initialState = {
  title: "",
  startTime: "",
  signupTime: "",
  day: "",
  city: "",
  info: "",
  frequency: "",
  address: "",
  signupForm: "",
}

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

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === 'file' ? files[0] : value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission, e.g., send data to the server or perform further actions
  //   console.log('Form submitted:', formData);
  // };

  // const addEvent = async (formData: FormData) => {
  //   "use server"
  //     const date = formData.get("date");
  //     console.log(date)
  //      await prisma.event.create({
  //     data: {
  //       title: formData.get("title") as string,
  //       date: new Date(formData.get("date") as unknown as Date),
  //       doors_open: formData.get("doors_open") as string,
  //       start_time: formData.get("start_time") as string,
  //       description: formData.get("description") as string,
  //       venue_name: formData.get("venue_name") as string,
  //       address: formData.get("address") as string,
  //       image_url: "https://comedyshowbucket.s3.amazonaws.com/4357C8E7-4635-44C5-8DD8-9B446450414E.JPG",
  //       ticket_link: formData.get("ticket_link") as string,
  //       ticket_price: formData.get("ticket_price") as string,
  //       approvalStatus: 'PENDING',
  //       userID: 1
  //     }
  //   })
  //   revalidatePath("/")
  // }



  // }
 
  const [state, formAction] = useFormState(createOpenMic, initialState );

  return (
    <form action={formAction} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <label className="block mb-2">
        Title:
        <input type="text" name="title" className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Address:
        <input type="text" name="address" className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        City:
        <input type="text" name="city" className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Sign up time:
        <input type="time" name="signupTime" className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Start Time:
        <input type="time" name="startTime" className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Day of the week:
        <select name="day" id="day">
          {daysOfWeek.map(day => (
            <option key="day" value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        frequency:
        <input type="text" name="frequency"   className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Info:
        <textarea name="info"   className="form-textarea"></textarea>
      </label>

      <label className="block mb-2">
        Sign-up Link:
        <input type="url" name="signupForm"   className="form-input border p-2 ml-4" />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};


