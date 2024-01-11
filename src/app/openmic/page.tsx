import { prisma } from "@/db";
import Link from "next/link";
import { Rubik_Dirt } from 'next/font/google'
import { ReactElement } from "react";

const doodle = Rubik_Dirt({
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
  const mics = await prisma.openMic.findMany();
  console.log(mics)
  return mics;
}

export default async function OpenMic() {
  // fetch for all open mics
  // Pass each mic to a micComponent, and store in corisponding object eg:
  // map through weekDays Object, pass each key to a <WeekDay day={} ...value/>
  

  // const startTime = new Date()
  // startTime.setHours(20, 30, 0, 0)

  // await prisma.openMic.create({
  //   data: {
  //     title: "Vault Comedy Open Mic",
  //     address: "518 W South St",
  //     signupForm: "https://docs.google.com/forms/d/1C5YJPjlTgF7D60z56LBShzT70uoS8lB2ANX3WJl60AQ/viewform?edit_requested=true",
  //     startTime: startTime,
  //     city: "Raleigh",
  //     info: "4min sets, list capped at 25. final list sent out friday morning (*signing up doesn't guarantee a spot*)",
  //     frequency: "bi-weekly",
  //     day: "Friday"
  //   }
  // })

  // await prisma.openMic.update({
  //   where: { id: 8},
  //   data: {
  //     signupForm: "https://docs.google.com/forms/d/1eRn-2LFzCpyAiK_BDJEv183GLlgqOcgpDZWZMBCiQOE/viewform?edit_requested=true",
  //   }
  // })


  
  const weekDays: DayOfWeekSchedule = {}


  const getDayOrder = (day: string) => {
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

  const orderedDays = Object.keys(weekDays).sort((a,b) => getDayOrder(a) - getDayOrder(b))

  const getTime = (date: Date): string => {
    const hours: number = date.getHours();
    const minutes: number | string = date.getMinutes() > 0 ? date.getMinutes() : "00" ;
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    const formattedHours: number = hours % 12 || 12
    return `${formattedHours.toString()}:${minutes.toString()}${ampm}`
  }

  const signUp = (openMic: OpenMic): String | ReactElement => {
    if (openMic.signupForm) {
      return <a className="text-1xl text-blue-600 underline"href={openMic.signupForm}>sign up here</a>
    }
    return getTime(openMic.signupTime)
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-0 m-h-screen mb-10">
        <div className="text-6xl text-white border text-center bg-black px-5 py-8 mb-5">
          <p className={`${doodle.className}`}>Open Mic List</p>
        </div>
        <div>
          {orderedDays.map(day => (
            <div key={day}>
                <div className="p-4 inline-block bg-black">
                  <h1 className={`${doodle.className} text-white text-4xl`}>{day}</h1>
                </div>
                <ul>
                  {weekDays[day].map(openMic => {
                    
                    return (
                      <li key={openMic.id}>
                        <div className="bg-slate-300 mb-3 mt-3 px-12 py-6 text-center">
                          <strong>{openMic.title}</strong>
                          <p>Address: {openMic.address}</p>
                          <p>Sign up: {signUp(openMic)}</p>
                          <p>Start: {getTime(openMic.startTime)}</p>
                          <p>Frequency: {openMic.frequency}</p>
                          <p className="bg-white text-black p-2">Info: {openMic.info}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
            </div>))}
        </div>
      </div>
    </>
  )}