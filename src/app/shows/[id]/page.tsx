import { prisma } from "@/db";
import Image from "next/image";
import Link from "next/link";

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


export default async function ShowDetailsPage({ params }: { params: { id: string }}) {
  const addTimeStringToDate = (date: Date, timeString: String): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  }
  
  

  const getTime = (date: Date): string => {
    const hours: number = date.getHours();
    const minutes: number | string = date.getMinutes() > 0 ? date.getMinutes() : "00" ;
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    const formattedHours: number = hours % 12 || 12
    return `${formattedHours.toString()}:${minutes.toString()}${ampm}`
  }

  const event = (await prisma.event.findMany({where: {id: parseInt(params.id)}})).pop()
  const formattedDate = event?.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const doorsOpenTime: Date = addTimeStringToDate(new Date(), event?.doors_open || "")

  if (event) {
    return (
      <>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-lg overflow-hidden shadow-md flex mb-5">
          <Image src={`${event.image_url}`} alt="Event 1" width={500} height={500}/>
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">Date: {formattedDate}</p>
            <p className="text-gray-600 mb-2">Start: {getTime(event.date)} / Doors: {getTime(doorsOpenTime)}</p>
            <p className="text-gray-600 mb-2">Venue: {event.venue_name}</p>
            <p className="text-gray-600 mb-2">Address: {event.address}</p>
            <p className="font-bold mb-5">{event.description}</p>
            <a href={`${event.ticket_link}`} className="text-blue-500 hover:underline ">Get Tickets (${event.ticket_price})</a>
          </div>
        </div>
        <Link href="/shows">
          <div className="items-center justify-center text-black bg-gray-200 p-4 flex max-w-xs rounded-lg">
            <p>Back to Shows</p>
          </div>
        </Link>
      </div>
      </>
    )
  } else {
    return (
      <h1>Sorry no data</h1>
    )
  }
}