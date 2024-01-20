import { prisma } from "@/db";
import { Rubik_Dirt } from 'next/font/google'
import Link from "next/link";
import UpcomingShows from "./components/UpcomingShows";

const doodle = Rubik_Dirt({
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
    <div className="bg-black">
      <UpcomingShows/>
    </div>
    </>
  )
}