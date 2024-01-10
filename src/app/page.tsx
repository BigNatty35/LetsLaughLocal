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

function getEvents() {
  return prisma.event.findMany();
}

export default async function HomePage() {
  return (
    <>
    <div className="flex flex-col justify-center items-center m-0 m-h-screen mb-10">
      <div className="mb-20">
        <h1 className={`${doodle.className} text-white text-8xl`}>Lets Laugh Local!</h1>
      </div>
      <div className="flex text-center space-x-8">
        <Link  className={`${doodle.className} bg-customGold hover:bg-customRed hover:text-customGold text-customRed font-bold text-4xl py-4 px-8 rounded-full w-80 border-white border-8`} href="./shows">Shows</Link>
        <Link className={` ${doodle.className} bg-customGold hover:bg-customRed hover:text-customGold text-customRed font-bold text-4xl py-4 px-8 w-80 border-white border-8 rounded-full`}href="./openmic">Open Mics</Link>
      </div>
    </div>
    <UpcomingShows/>
    </>
  )
}