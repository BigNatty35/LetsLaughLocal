import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, context: any) {
  const  { data: { approvalStatus} } = await req.json()
  const { params: {openMicId} } = context;
  // console.log("WE MADE IT TO PUT ROUTE::", params.eventId)
  // console.log("APPROVAL:", approvalStatus)
  console.log("APPROVAL STATUS:", approvalStatus)
  try {
    await prisma.openMic.update({
      where: {
        id: parseInt(openMicId)
      },
      data: {
        approvalStatus: approvalStatus
      }
    })
    revalidatePath("/openMic")
    return NextResponse.json({
      status: "200 Ok",
      updatedOpenMicId: openMicId,
      approvalStatus
    })
  } catch (error) {
    return NextResponse.json({
      status: "NOT Ok",
      openMicId
    })
  }
}