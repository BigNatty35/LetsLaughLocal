'use server'
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
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
        userID: 4
      }
  })
  revalidatePath("/")
}

export async function createOpenMic(formData: FormData) {
  "use server"
    const  date = formData.get("day");

    console.log(date)
     await prisma.openMic.create({
    data: {
      title: formData.get("title") as string,
      startTime: formData.get("startTime") as string,
      signupTime: formData.get("signupTime") as string,
      day: formData.get("day") as string,
      city: formData.get("city") as string,
      info: formData.get("info") as string,
      frequency: formData.get("frequency") as string,
      address: formData.get("address") as string,
      signupForm: formData.get("signupForm") as string,
    }
  })
  revalidatePath("/")
}