import Image from "next/image";
import Link from 'next/link';
import moment from 'moment-timezone';
import { to12HourFormat } from "../utils/global-utils"

export default function ShowCard({ event }: any) {
  if (!event) {
    return (
      <h1 className="text-white">Sorry</h1>
    )
  }
  
  // console.log(event)
  // Adjust for the timezone offset to keep the date as intended in UTC
  let adjustedDate;

  const formatDate = (dateString: string) => {
    // Assuming dateString is in ISO format like "2024-03-31T00:00:00.000Z"
    return moment.tz(dateString, 'America/New_York').format('dddd, MMMM D, YYYY'); // Customize format as needed
  };
  
  // Use formatDate when displaying the date in your component
  const displayDate = formatDate(event.date);
  
  // Adjust for the timezone offset to keep the date as intended in UTC
  if (event) {
    const userTimezoneOffset = event?.date.getTimezoneOffset() * 60000;
    adjustedDate = new Date(event?.date.getTime() + userTimezoneOffset);
  }
  const formattedDate = adjustedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  // const formattedDate = event?.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  console.log("This is the event in the card", event)
  console.log("CARD FORMATTED DATE:", formattedDate)
  // const getTime = (date: Date): string => {
  //   const hours: number = date.getHours();
  //   const minutes: number | string = date.getMinutes() > 0 ? date.getMinutes() : "00" ;
  //   const ampm: string = hours >= 12 ? 'pm' : 'am';
  //   const formattedHours: number = hours % 12 || 12
  //   return `${formattedHours.toString()}:${minutes.toString()}${ampm}`
  // }

  return (
    <>
      <div className="bg-black rounded-lg overflow-hidden shadow-md flex flex-col justify-between items-center max-w-xs mx-auto p-4">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden mb-4">
          <Link key={event.id} href={`/shows/${event.id}`}>
            <Image src={`${event.image_url}`} alt="Event 1" width={500} height={500}/>
          </Link>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-white">{event.title}</h2>
          <p className="text-gray-600 mb-2">{displayDate}</p>
          <p className="text-gray-600 mb-2">Start: {to12HourFormat(event.start_time)}</p>
          {event.ticket_link && (<a href={`${event.ticket_link}`} className="text-blue-500 hover:underline">Get Tickets (${event.ticket_price})</a>)}
          {!event.ticket_link && (<span className="text-white">FREE!</span>)}
        </div>
      </div>
    </>
  )
}