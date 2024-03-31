import { prisma } from "@/db";
import { Josefin_Sans } from 'next/font/google'
import Link from 'next/link';
import ShowCard from "../(components)/ShowCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ApprovalStatus } from "@prisma/client";


const doodle = Josefin_Sans({
  subsets: ['latin'],
  weight: "400"
})

export default async function ShowsPage() {
  const events = await prisma.event.findMany({
    where: {
      approvalStatus: ApprovalStatus.APPROVED
    },
   orderBy: { date: 'asc' } 
  })

  // let user = await prisma.user.create({
  //   data: {
  //     username: "Big Nickle",
  //     email: "NickNick@hotmail.com",
  //     password: "123abc",
  //   }
  // })
  console.log("EVENTS!!!:", events)

  const addTimeStringToDate = (date: Date, timeString: String): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    console.log("This is events time:", date.getTime());
    const newDate = new Date(date.getTime());
    console.log("NEWEST DATE w/o time", newDate)
    newDate.setUTCHours(hours, minutes, 0, 0)
    console.log("NEW DATE!!!", newDate);
    return newDate
  }

  const eventsWithTime = events.map((event) => {
    const eventDate = new Date(event.date); 
    const newDate = addTimeStringToDate(eventDate, event.start_time);
    return { ...event, date: newDate };
  })

    // map through the events and add start time to date object
    // const eventDate = (event.date instanceof Date) ? event.date : new Date(event.date);

  console.log("EVENTS WITH TIME:", eventsWithTime);

  const orderedEvents = eventsWithTime.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="flex flex-wrap justify-center">
      <div className="text-3xl text-customGold border text-center px-5 py-8 mb-5 rounded w-box">
        <h1 className={`${doodle.className}`}>Shows</h1>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-black rounded">
       {orderedEvents.map(event => <ShowCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}