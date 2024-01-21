import Image from 'next/image';
import Link from 'next/link';
import { prisma } from "@/db";
import ShowCard from './ShowCard';
import EventForm from './EventForm';
import { Bangers } from 'next/font/google'

const doodle = Bangers({
  subsets: ['latin'],
  weight: "400"
})

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
    // map through the events and add start time to date object
    addTimeStringToDate(event.date, event.start_time)
    return event
  })

  const orderedEvents = await eventsWithTime.sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <>
    <div className='flex flex-col items-center'>
      <h1 className={`${doodle.className} text-white text-3xl bg-black text-center p-4`}>Upcoming Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       {orderedEvents.map(event => <ShowCard key={event.id} event={event} />)}
      </div>
      <div className="m-10">
        <Link  className={`${doodle.className} bg-customGold hover:bg-customRed hover:text-customGold text-customRed font-bold text-4xl py-4 px-8 rounded-full w-80 border-white border-8`} href="./shows">View More Shows</Link>
      </div>
    </div>
    </>
  )
}