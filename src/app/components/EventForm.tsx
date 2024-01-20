import { prisma } from "@/db";
import { revalidatePath } from "next/cache";


export default async function EventForm() {

  // save the start time as string,
  // save doors_open as string
  // migrate 
  //  we are saving them as strings (e.g. "HH:mm AM/PM")
  // when we receive object from DB, we will just display the string, 
  // if we want to order, we will convert to date object. 

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

  const addEvent = async (formData: FormData) => {
    "use server"
      const date = formData.get("date");
      console.log(date)
       await prisma.event.create({
      data: {
        title: formData.get("title") as string,
        date: new Date(formData.get("date") as unknown as Date),
        doors_open: formData.get("doors_open") as string,
        start_time: formData.get("start_time") as string,
        description: formData.get("description") as string,
        venue_name: formData.get("venue_name") as string,
        address: formData.get("address") as string,
        image_url: "https://comedyshowbucket.s3.amazonaws.com/4357C8E7-4635-44C5-8DD8-9B446450414E.JPG",
        ticket_link: formData.get("ticket_link") as string,
        ticket_price: formData.get("ticket_price") as string,
        approvalStatus: 'PENDING',
        userID: 1
      }
    })
    revalidatePath("/")
  }



  // }

  return (
    <form action={addEvent} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <label className="block mb-2">
        Title:
        <input type="text" name="title"   className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Date:
        <input type="date" name="date"   className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Start Time:
        <input type="time" name="start_time"   className="form-input border p-2 ml-4" />
      </label>
      <label className="block mb-2">
        Doors Open:
        <input type="time" name="doors_open"   className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Description:
        <textarea name="description"   className="form-textarea"></textarea>
      </label>

      <label className="block mb-2">
        Venue Name:
        <input type="text" name="venue_name"   className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Address:
        <input type="text" name="address"   className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Image Upload:
        <input type="file" name="image"  className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-2">
        Ticket Link:
        <input type="url" name="ticket_link"   className="form-input border p-2 ml-4" />
      </label>

      <label className="block mb-4">
        Ticket Price:
        <input type="text" name="ticket_price"   className="form-input border p-2 ml-4" />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
    </form>
  );
};


