import { prisma } from "@/db";
import { Bangers } from 'next/font/google'
import UpcomingShows from "./(components)/UpcomingShows";

const doodle = Bangers({
  subsets: ['latin'],
  weight: "400"
})

function getUsers() {
  return prisma.user.findMany();
}

async function getEvents() {
  const events = await prisma.event.findMany();
  console.log(events);
  return events
}

export default async function HomePage() {
  getEvents();
  return (
    <>
      <UpcomingShows/>
    </>
  )
}