import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { createUser } from "@/app/actions";
import { ApprovalStatus } from "@prisma/client";
import { S3Client } from "@aws-sdk/client-s3";

const bucketRegion = process.env.NEXT_AWS_S3_REGION ?? "";
const accessKey = process.env.NEXT_AWS_S3_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY ?? "";
const bucketName = process.env.NEXT_AWS_S3_BUCKET_NAME ?? "";

const s3Client = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
      } 
    });


export async function GET() {
  const events = await prisma.event.findMany({
    where: {
      approvalStatus: ApprovalStatus.PENDING
    }
  });
  return NextResponse.json({
   events
  })
}

export async function POST(req: Request) {
  // console.log("REQ!!!", await req.json())
  const data = await req.json();
  console.log(req.body);
  const date = data.date
  console.log("MADE IT TO POST")
  console.log(date)


  const user = await createUser();
  // create a user before creating an event. 
  // check to see if formData has user ID.
  try {
    console.log("THIS IS IMG:", data.image_url) 
    console.log("THIS IS DATA:", data) 
    // await prisma.event.create({
    //   data: {
    //     title: data.title,
    //     date: new Date(data.date),
    //     doors_open: data.doors_open,
    //     start_time: data.start_time,
    //     description: data.description,
    //     venue_name: data.venue_name,
    //     address: data.address,
    //     image_url: data.image_url,
    //     ticket_link: data.ticket_link,
    //     ticket_price: data.ticket_price,
    //     userID: user.id
    //   }
    // })
    return NextResponse.json({
      hello: "IT WORKED",
    })
  } catch (error) {
    console.error("ERROR:", error)
    return NextResponse.json({
      hello: "this didn't work"
    })
  }
}