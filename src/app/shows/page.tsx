import { prisma } from "@/db";
import { Rubik_Dirt } from 'next/font/google'
import Link from 'next/link';
import ShowCard from "../components/ShowCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


const doodle = Rubik_Dirt({
  subsets: ['latin'],
  weight: "400"
})

export default async function ShowsPage() {
  const events = await prisma.event.findMany({ 
   orderBy: { date: 'asc' } 
  })

  const addTimeStringToDate = (date: Date, timeString: String) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    date.setHours(hours)
    date.setMinutes(minutes)
    return date

  }

  const eventsWithTime = events.map((event) => {
    // map through the events and add start time to date object
    addTimeStringToDate(event.date, event.start_time)
    return event
  })

  const orderedEvents = eventsWithTime.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <>
       <h1 className={`${doodle.className} text-white text-3xl bg-black text-center p-4`}>Shows</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-black rounded">
       {orderedEvents.map(event => <ShowCard key={event.id} event={event} />)}
      </div>
    </>
  )
}