import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

export async function PUT(req: Request, context: any) {
  const  { data: { approvalStatus} } = await req.json()
  const { params: {eventId} } = context;
  // console.log("WE MADE IT TO PUT ROUTE::", params.eventId)
  // console.log("APPROVAL:", approvalStatus)
  console.log("APPROVAL STATUS:", approvalStatus)
  try {
    await prisma.event.update({
      where: {
        id: parseInt(eventId)
      },
      data: {
        approvalStatus: approvalStatus
      }
    })
    revalidatePath('/shows')
    return NextResponse.json({
      status: "200 Ok",
      updatedEventId: eventId,
      approvalStatus
    })
  } catch (error) {
    return NextResponse.json({
      status: "NOT Ok",
      eventId
    })
  }
}