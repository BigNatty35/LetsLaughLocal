import Image from 'next/image';
import Link from 'next/link';
import { prisma } from "@/db";
import ShowCard from './ShowCard';
import EventForm from './EventForm';

enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
interface Event {
  title: string,
  date: Date,
  image_url: string,
  ticket_price: string,
  ticket_link: string,
  doors_open: string,
  start_time: string,
  appovalStatus: ApprovalStatus,
  address: string,
  description: string,
  venue_name: string
}

export default async function UpcomingShows() {
  // grab the first 8 events to display
  const events = await prisma.event.findMany({ 
    take: 8, 
    orderBy: { date: 'asc' } 
  })
  
  const addTimeStringToDate = (date: Date, timeString: String) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    date.setHours(hours)
    date.setMinutes(minutes)
    return date

  } 
  const eventsWithTime = events.map((event) => {
    addTimeStringToDate(event.date, event.start_time)
    return event
  })

  const compareDates = (a: Event, b: Event): Number => { 
    return a.date.getTime() - b.date.getTime() 
  }

  const orderedEvents = eventsWithTime.sort((a, b) => a.date.getTime() - b.date.getTime());
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {orderedEvents.map(event => <ShowCard key={event.id} event={event} />)}
      </div>
      <div>
        <Link className='text-white text-2xl' href={"../shows"}>View More Shows</Link>
      </div>
    </>
  )
}