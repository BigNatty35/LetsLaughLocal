import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { to12HourFormat } from "../../utils/global-utils"
import { DeleteEventButton} from "@/app/(components)/DeleteEventButton";
import Image from "next/image";
import Link from "next/link";
import { options } from "@/app/api/auth/[...nextauth]/options";

enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// interface Event {
//   title: string,
//   date: Date,
//   image_url: string,
//   ticket_price: string,
//   ticket_link: string,
//   doors_open: string,
//   start_time: string,
//   appovalStatus: ApprovalStatus,
//   address: string,
//   description: string,
//   venue_name: string
// }


export default async function ShowDetailsPage({ params }: { params: { id: string }}) {

  const session = await getServerSession(options)

  const addTimeStringToDate = (date: Date, timeString: String): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  }
  
  
  const event = (await prisma.event.findMany({where: {id: parseInt(params.id)}})).pop()
  let adjustedDate;
  // Adjust for the timezone offset to keep the date as intended in UTC
  if (event) {
    const userTimezoneOffset = event?.date.getTimezoneOffset() * 60000;
    adjustedDate = new Date(event?.date.getTime() + userTimezoneOffset);
  }
  // const formattedDate = event?.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const formattedDate = adjustedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  // const doorsOpenTime: Date = addTimeStringToDate(new Date(), event?.doors_open || "")
  const doorsOpenTime = to12HourFormat(event?.doors_open || "")
  const startTime = to12HourFormat(event?.start_time || "")

  console.log("THIS IS EVENT", event)
  console.log("FORMATTED DATE:", formattedDate)

  const renderDeleteButton = (eventId: number) => {
    if (!session) {
      return ""
    }

    if (session.user.role === "ADMIN") {
      return (
        <DeleteEventButton eventId={eventId}/>
      )
    }
    return null;
  }
 

  if (event) {
    return (
      <>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-lg overflow-hidden shadow-md flex mb-5">
          <Image src={`${event.image_url}`} alt="Event 1" width={500} height={500}/>
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">Date: {formattedDate}</p>
            <p className="text-gray-600 mb-2">Start: {startTime} / Doors: {doorsOpenTime}</p>
            <p className="text-gray-600 mb-2">Venue: {event.venue_name}</p>
            <p className="text-gray-600 mb-2">Address: {event.address}</p>
            <p className="font-bold mb-5">{event.description}</p>
            {event.ticket_link && (<a href={`${event.ticket_link}`} className="text-blue-500 hover:underline">Get Tickets (${event.ticket_price})</a>)}
            {!event.ticket_link && (<span className="text-black font-bold">FREE!</span>)}
          </div>
        </div>
        <div className="flex justify-between">
          {renderDeleteButton(event.id)}
          <div>
            <Link href="/shows">
              <div className="items-center justify-center text-black bg-gray-200 p-4 flex max-w-xs rounded-lg">
                <p>Back to Shows</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      </>
    )
  } else {
    return (
      <h1>Sorry no data</h1>
    )
  }
}