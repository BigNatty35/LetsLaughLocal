import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { createUser } from "@/app/actions";
import { ApprovalStatus } from "@prisma/client";

export async function GET() {
  const events = await prisma.event.findMany({
    where: {
      approvalStatus: ApprovalStatus.PENDING
    }
  });
  return NextResponse.json({
   events
  })
}

export async function POST(req: Request) {
  const data = await req.json();

  const date = data.date
  console.log("MADE IT TO POST")
  console.log(date)


  const user = await createUser();
  // create a user before creating an event. 
  // check to see if formData has user ID. 
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        doors_open: data.doors_open,
        start_time: data.start_time,
        description: data.description,
        venue_name: data.venue_name,
        address: data.address,
        image_url: "https://comedyshowbucket.s3.amazonaws.com/4357C8E7-4635-44C5-8DD8-9B446450414E.JPG",
        ticket_link: data.ticket_link,
        ticket_price: data.ticket_price,
        userID: user.id
      }
    })
    return NextResponse.json({
      hello: "IT WORKED",
    })
  } catch (error) {
    console.error("ERROR:", error)
    return NextResponse.json({
      hello: "this didn't work"
    })
  }
}