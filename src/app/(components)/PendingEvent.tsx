import { ApprovalStatus } from "@prisma/client";
import Link from "next/link";
import React from "react"

type PendingEventProps = {
  title: string | null;
  description: string | null;
  venue: string | null;
  eventId: number;
  approveHandler: (eventId: number, status: ApprovalStatus) => void;
  rejectHandler: (eventId: number, status: ApprovalStatus) => void;
}

const PendingEvent: React.FC<PendingEventProps> = ({eventId, title, description, venue, approveHandler, rejectHandler}) => {
  return (
    <>
    <div className="bg-white mb-5">
    <li>
      <div className="flex justify-between">
        <div>
          <Link href={`/shows/${eventId}`}>{title}</Link>
          <p>{description}</p>
          <p>{venue}</p>
          <p>{eventId}</p>
        </div>
        <div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => approveHandler(eventId, ApprovalStatus.APPROVED)}>Approve</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => rejectHandler(eventId, ApprovalStatus.REJECTED)}>Decline</button>
        </div>
      </div>
    </li>
    </div>
    </>
  )
}

export default PendingEvent;