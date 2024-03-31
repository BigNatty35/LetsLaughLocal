import { ApprovalStatus } from "@prisma/client";
import React from "react"

interface PendingOpenMicProps {
  openMicId: number;
  title: string | null;
  description: string | null;
  address: string | null;
  approveHandler: (openMicId: number, approvalStatus: ApprovalStatus) => void;
  rejectHandler: (openMicId: number, approvalStatus: ApprovalStatus) => void;
}

const PendingOpenMic: React.FC<PendingOpenMicProps> = ({openMicId, title, description, address, approveHandler, rejectHandler}) => {
  return (
    <>
    <div className="bg-white">
    <li>
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <p>{address}</p>
      </div>
      <div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => approveHandler(openMicId, ApprovalStatus.APPROVED)}>Approve</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => approveHandler(openMicId, ApprovalStatus.REJECTED)}>Decline</button>
      </div>
    </li>
    </div>
    </>
  )
}

export default PendingOpenMic;