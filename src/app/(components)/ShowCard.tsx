import Image from "next/image";
import Link from 'next/link';

export default function ShowCard({ event }: any) {
  if (!event) {
    return (
      <h1 className="text-white">Sorry</h1>
    )
  }
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = event.date.toLocaleDateString('en-US', options);

  const getTime = (date: Date): string => {
    const hours: number = date.getHours();
    const minutes: number | string = date.getMinutes() > 0 ? date.getMinutes() : "00" ;
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    const formattedHours: number = hours % 12 || 12
    return `${formattedHours.toString()}:${minutes.toString()}${ampm}`
  }

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
          <p className="text-gray-600 mb-2">{formattedDate}</p>
          <p className="text-gray-600 mb-2">Start: {getTime(event.date)}</p>
          <a href={`${event.ticket_link}`} className="text-blue-500 hover:underline">Get Tickets (${event.ticket_price})</a>
        </div>
      </div>
    </>
  )
}