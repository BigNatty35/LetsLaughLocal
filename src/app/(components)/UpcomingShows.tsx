import Image from 'next/image';
import Link from 'next/link';
import { prisma } from "@/db";
import ShowCard from './ShowCard';
import { Josefin_Sans } from 'next/font/google'
import { ApprovalStatus } from '@prisma/client';

const doodle = Josefin_Sans({
  subsets: ['latin'],
  weight: "400"
})

export default async function UpcomingShows() {
  // grab the first 8 events to display
  // const events = await prisma.event.findMany({ 
  //   take: 8, 
  //   orderBy: { date: 'asc' } 
  // })

  const events = await prisma.event.findMany({
    where: {
      approvalStatus: ApprovalStatus.APPROVED
    },
    take: 8,
    orderBy: { date: 'asc' } 
  })
  
  const addTimeStringToDate = (date: Date, timeString: String): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    console.log("This is events time:", date.getTime());
    const newDate = new Date(date.getTime());

    newDate.setUTCHours(hours, minutes, 0, 0)
    return newDate
  }

  const eventsWithTime = events.map((event) => {
    // map through the events and add start time to date object
    // const eventDate = (event.date instanceof Date) ? event.date : new Date(event.date);
    const eventDate = new Date(event.date); 
    const newDate = addTimeStringToDate(eventDate, event.start_time);
    return { ...event, date: newDate };
  })

  const orderedEvents = eventsWithTime.sort((a, b) => a.date.getTime() - b.date.getTime());
  // console.log(events)
  return (
    <>
    <div className='flex flex-wrap justify-center'>
      <div className="text-3xl text-customGold border text-center px-5 py-8 mb-5 rounded w-box">
        <h1 className={`${doodle.className}`}>Upcoming Shows</h1>
      </div>
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