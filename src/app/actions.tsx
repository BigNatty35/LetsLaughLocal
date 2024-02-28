'use server'
import { redirect } from 'next/navigation'
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export async function createUser() {
  const { user: {name, email, googleId} } = await getServerSession(options);
  const user = await prisma.user.findUnique({where: { email: email}});

  if (user) {
    console.log("Found User:", user);
    return user;
  } else {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        googleId: googleId
      }
    })
    console.log("Created New User:", newUser);
    return newUser;
  }
}

export async function createEvent(formData: FormData) {
  let redirectPath : string | null = null;
  const user = await createUser();
  const date = formData.get("date");
  console.log("SEVER ACTION!")

  try {
    const event = await prisma.event.create({
      data: {
        title: formData.get("title") as string,
        date: new Date(formData.get("date") as unknown as Date),
        doors_open:  formData.get("doors_open")as string,
        start_time:  formData.get("start_time") as string,
        description:  formData.get("description") as string,
        venue_name:  formData.get("venue_name") as string,
        address:  formData.get("address") as string,
        image_url: "https://comedyshowbucket.s3.amazonaws.com/4357C8E7-4635-44C5-8DD8-9B446450414E.JPG",
        ticket_link:  formData.get("ticket_link") as string,
        ticket_price:  formData.get("ticket_price") as string,
        userID: user.id,
      }
    })
    redirectPath = `/shows/${event.id}`
    console.log(event)
  } catch (error) {
    console.error("ERROR", error);
    redirect('/shows')
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}