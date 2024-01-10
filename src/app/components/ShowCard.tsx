import Image from "next/image";

export default function ShowCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Image src="/Users/cjohnson/Desktop/CODE/letslaughlocal/public/jon-tyson-i3DzLRvUotU-unsplash.jpg" alt="Event 1" width={500} height={500} objectFit="cover"/>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Event Name 1</h2>
        <p className="text-gray-600 mb-2">Date and Time: August 15, 2023, 7:00 PM</p>
        <a href="#" className="text-blue-500 hover:underline">Get Tickets</a>
      </div>
    </div>
  )
}