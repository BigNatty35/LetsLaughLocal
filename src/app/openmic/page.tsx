import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Josefin_Sans } from 'next/font/google'
import { ReactElement } from "react";
import { POST } from "../api/auth/[...nextauth]/route";
import { ApprovalStatus } from "@prisma/client";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { DeleteOpenMicButton } from "../(components)/DeleteOpenMicButton";

const doodle = Josefin_Sans({
  subsets: ['latin'],
  weight: "400"
})

interface OpenMic {
  id: number | null,
  title: string | null,
  address: string | null,
  city: string | null,
  day: string | null,
  frequency: string | null,
  signupForm: any,
  startTime: Date | any,
  signupTime: Date | any,
  info: string | null
}

interface TimeObject {
  hours: number,
  mins: number,
  ampm: string,
  formattedTime: string
}

type DayOfWeekSchedule = {
  [day: string]: OpenMic []
}

type DayOrder = {
  [day: string]: number
}

async function getMics() {
  const mics = await prisma.openMic.findMany({
    where: {approvalStatus: ApprovalStatus.APPROVED}
  });
  return mics;
}

export default async function OpenMic() {
  // fetch for all open mics
  // Pass each mic to a micComponent, and store in corisponding object eg:
  // map through weekDays Object, pass each key to a <WeekDay day={} ...value/>
  
  // Tap Yard, 3rd wed, signup 8:30, start: 9pm, 1610 automotive way, raleigh, wednesday
  // Comedy Worx
  // Komona 
  // hoppy house
  // 

  const session = await getServerSession(options)
  const weekDays: DayOfWeekSchedule = {}


  const getDayOrder = (day: string): number => {
    const order: DayOrder = {
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6,
      "Sunday": 7,
    };
    return order[day];
  }

  const mics = await getMics();

  mics.forEach(mic => {
    const day = mic.day;
    if(!weekDays[day]) {
      weekDays[day] = []
    }
    weekDays[day].push(mic)
  })

  const orderedDays: string[] = Object.keys(weekDays).sort((a,b) => getDayOrder(a) - getDayOrder(b))

  const getTime = (time: string): string => {
    const [hours, mins] = time.split(":").map( el => parseInt(el));
    console.log("time:", time)
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    const formattedHours: number = hours % 12 || 12
    const formattedMins: string = mins >= 10 ? mins.toString() : "0" + mins.toString();
    return `${formattedHours.toString()}:${formattedMins}${ampm}`
  }

  const signUp = (openMic: OpenMic): String | ReactElement => {
    if (openMic.signupForm) {
      return <a className="text-1xl text-blue-600 underline"href={openMic.signupForm}>sign up here</a>
    } else if (openMic.signupTime) {
      return getTime(openMic.signupTime)
    }
    return "--"
  }

  const renderDeleteButton = (openMicId: number) => {
    if (!session) {
      return ""
    }

    if (session.user.role === "ADMIN") {
      return (
        <DeleteOpenMicButton openMicId={openMicId}/>
      )
    }
    return null;
  }
 

  return (
    <>
      <div className="flex flex-col justify-center items-center m-0 m-h-screen mb-10">
        <div className="text-3xl text-customGold border text-center px-5 py-8 mb-5 rounded w-box">
          <p className={`${doodle.className}`}>Open Mic List</p>
        </div>
        <div>
          {orderedDays.map(day => (
            <div key={day}>
                <div className="p-4 text-center bg-black rounded">
                  <h1 className={`${doodle.className} text-white text-4xl`}>{day}</h1>
                </div>
                <ul>
                  {weekDays[day].map(openMic => {
                    
                    return (
                      <li key={openMic.id}>
                        <div className="bg-slate-300 mb-3 mt-3 px-12 py-6 text-center rounded">
                          <strong className="underline text-2xl">{openMic.title}</strong>
                          <p className="mb-2 mt-2">Address: {openMic.address}</p>
                          <p className="mb-2 mt-2">City: {openMic.city}</p>
                          <p className="mb-2">Sign up: {signUp(openMic)}</p>
                          <p className="mb-2">Start: {getTime(openMic.startTime)}</p>
                          <p className="mb-2">Frequency: {openMic.frequency}</p>
                          <p className="bg-white text-black p-2 rounded">Info: {openMic.info}</p>
                        </div>
                        <DeleteOpenMicButton openMicId={openMic.id}/>
                      </li>
                    )
                  })}
                </ul>
            </div>))}
        </div>
      </div>
    </>
  )}