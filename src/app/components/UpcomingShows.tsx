import Image from 'next/image';
import ShowCard from './ShowCard';

export default function UpcomingShows() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ShowCard/>
      <ShowCard/>
      <ShowCard/>
      <ShowCard/>
      <ShowCard/>
      <ShowCard/>
      <ShowCard/>
      <ShowCard/>
    </div>
  )
}