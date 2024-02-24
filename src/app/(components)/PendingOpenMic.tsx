import React from "react"

interface PendingOpenMicProps {
  openMicId: number;
  title: string | null;
  description: string | null;
  address: string | null;
  approveHandler: (openMicId: number) => void;
}

const PendingOpenMic: React.FC<PendingOpenMicProps> = ({openMicId, title, description, address, approveHandler}) => {
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
      <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => approveHandler(openMicId)}>Approve</button>
        <button>Decline</button>
      </div>
    </li>
    </div>
    </>
  )
}

export default PendingOpenMic;