'use server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { buffer } from 'stream/consumers';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { EventSchema, OpenMicSchema } from './types';

const bucketRegion = process.env.NEXT_AWS_S3_REGION ?? "";
const secretAccessKey = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY ?? "";
const accessKey = process.env.NEXT_AWS_S3_ACCESS_KEY_ID ?? "";

const s3Client = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  }
});

export async function createUser() {
  console.log("HELLO FROM USER!")
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

async function uploadFileToS3(file: any, fileName: string) {
  const fileBuffer = await sharp(file).resize(300, 300).toBuffer()
  const uniqueFileName = `${fileName}${Date.now()}`
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${uniqueFileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg"
  }

  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);
    console.log("File uploaded succesfully:", response)
    return `https://comedyshowbucket.s3.amazonaws.com/${uniqueFileName}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createEvent(eventData: FormData) {
  let redirectPath : string | null = null;
  
  const user = await createUser();

  let image_url: any;

  const newEvent = {
    title: eventData.get("title") as string,
    date: new Date(eventData.get("date") as unknown as Date),
    doors_open: eventData.get("doors_open") as string,
    start_time: eventData.get("start_time") as string,
    description: eventData.get("description") as string,
    venue_name: eventData.get("venue_name") as string,
    address: eventData.get("address") as string,
    image_url: eventData.get("image_url") as File,
    ticket_link: eventData.get("ticket_link") as string,
    ticket_price: eventData.get("ticket_price") as string,
  }

  // valitdate eventData to find errors
  const result = EventSchema.safeParse(newEvent);

  // if there are errors, return object with errors to display on client
  // with Toast.
  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    })
    console.log("we shoujld get error toast")
    return {
      error: errorMessage
    }
  }

  try {
    const file = result.data["image_url"] as File;

    if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    image_url = await uploadFileToS3(buffer, file.name)
    console.log("THE FILE NAME", image_url)
    }

    const event = await prisma.event.create({
      data: {
        ...result.data,
        image_url: image_url,
        userID: user.id,
        ticket_link: result.data["ticket_url"] as string,
        ticket_price: result.data["ticket_price"] as string,
      }
    })

    console.log("EVENTID", event.id)
    redirectPath = `/shows/${event.id}`
    console.log("WE MADE IT TO EVENT SERVER")
    return { message: "successfully created new event"}
  } catch (error) {
    console.error("ERROR", error);
    redirect('/shows')
    return { error: "The was an error creating your event"}
  } finally {
    if (redirectPath) {
      redirect(redirectPath)
    }
  }
}

export async function createOpenMic(formData: FormData) {
  let redirectPath : string | null = null;
  const user = await createUser();
  const date = formData.get("date");
  console.log("SEVER ACTION!")
  console.log("USER OPENMIC!", user)
  
  const newOpenMic = {
    title: formData.get("title") as string,
    startTime:  formData.get("startTime") as string,
    signupTime:  formData.get("signupTime") as string,
    info:  formData.get("info") as string,
    address:  formData.get("address") as string,
    signupForm: formData.get("signupForm") as string,
    day:  formData.get("day") as string,
    frequency:  formData.get("frequency") as string,
    city:  formData.get("city") as string,
  }

  const result = OpenMicSchema.safeParse(newOpenMic);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    })
    console.log("we shoujld get error toast")
    return {
      error: errorMessage
    }
  }


  try {
    const openMic = await prisma.openMic.create({
      data: {
        title: formData.get("title") as string,
        startTime:  formData.get("startTime") as string,
        signupTime:  formData.get("signupTime") as string,
        info:  formData.get("info") as string,
        address:  formData.get("address") as string,
        signupForm: formData.get("signupForm") as string,
        day:  formData.get("day") as string,
        frequency:  formData.get("frequency") as string,
        city:  formData.get("city") as string,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    })
    console.log("WE MADE IT. OPEN MIC", openMic);
    redirect('/openMic')
  } catch (error) {
    console.error("ERROR!!!!", error);
    return {
      error: "Something went wrong."
    }
  } finally {
    console.log("hello, finally")
  }
}