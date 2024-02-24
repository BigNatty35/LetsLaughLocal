import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ApprovalStatus } from "@prisma/client";

export async function GET() {
  const openMics = await prisma.openMic.findMany({
    where: {
      approvalStatus: ApprovalStatus.PENDING
    }
  });
  return NextResponse.json({
   openMics
  })
}

async function createUser() {
  const { user: {name, email, googleId} } = await getServerSession(options);
  const user = await prisma.user.findUnique({where: { email: email}});

  if (user) {
    console.log("Found User:", user);
    return user;
  } else {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        googleId: googleId
      }
    })
    console.log("Created New User:", newUser);
    return newUser;
  }
  
}

export async function POST(req: Request) {
  const data  = await req.json()
  console.log("THIS IS ON SERVER DATA:", data);
  try {
    const user = await createUser();
    await prisma.openMic.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        signupTime: data.signupTime,
        day: data.day,
        city: data.city,
        info: data.info,
        frequency: data.frequency,
        address: data.address,
        signupForm: data.signupForm,
        userID: user.id
      }
    })
    return NextResponse.json({
      hello: "hello, it worked!"
    })
  } catch (error) {
    return NextResponse.json({
      hello: "jello"
    })
  }
}