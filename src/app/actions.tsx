'use server'
import { redirect } from 'next/navigation'
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { buffer } from 'stream/consumers';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';

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
  const fileBuffer = await sharp(file).resize({width: 500}).toBuffer()
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

export async function createEvent(formData: FormData) {
  let redirectPath : string | null = null;

  const user = await createUser();

  const date = formData.get("date");

  let image_url: any;

  console.log("SEVER ACTION!")

  console.log("FORM DATA", formData)
  // console.log("FILE:", file);


  try {
    const file = formData.get("image_url") as File;

    if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    image_url = await uploadFileToS3(buffer, file.name)
    console.log("THE FILE NAME", image_url)
    }

    const event = await prisma.event.create({
      data: {
        title: formData.get("title") as string,
        date: new Date(formData.get("date") as unknown as Date),
        doors_open: formData.get("doors_open") as string,
        start_time: formData.get("start_time") as string,
        description: formData.get("description") as string,
        venue_name: formData.get("venue_name") as string,
        address: formData.get("address") as string,
        image_url: image_url,
        ticket_link: formData.get("ticket_link") as string,
        ticket_price: formData.get("ticket_price") as string,
        userID: user.id
      }
    })

    redirectPath = `/shows/${event.id}`
    console.log("WE MADE IT TO EVENT SERVER")
  } catch (error) {
    console.error("ERROR", error);
    redirect('/shows')
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
  } catch (error) {
    console.error("ERROR!!!!", error);
  } finally {
    console.log("hello")
  }
}