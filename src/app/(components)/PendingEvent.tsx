import React from "react"

type PendingEventProps = {
  title: string | null;
  description: string | null;
  venue: string | null;
  eventId: number;
  approveHandler: (eventId: number) => void;
}

const PendingEvent: React.FC<PendingEventProps> = ({eventId, title, description, venue, approveHandler}) => {
  return (
    <>
    <div className="bg-white mb-5">
    <li>
      <div className="flex justify-between">
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <p>{venue}</p>
          <p>{eventId}</p>
        </div>
        <div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => approveHandler(eventId)}>Approve</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md">Decline</button>
        </div>
      </div>
    </li>
    </div>
    </>
  )
}

export default PendingEvent;