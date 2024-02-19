'use server'
import { prisma } from "@/db";
import { revalidatePath } from "next/cache";
import { ApprovalStatus, eventType, openMicType } from "./types";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";



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
export async function createEvent(prevState: eventType, formData: FormData) {
  "use server"
    const date = formData.get("date");

    console.log(date)
    const user = await createUser();
    // create a user before creating an event. 
    // check to see if formData has user ID. 
    try {
      await prisma.event.create({
        data: {
          title: formData.get("title") as string,
          date: new Date(formData.get("date") as unknown as Date),
          doors_open: formData.get("doors_open") as string,
          start_time: formData.get("start_time") as string,
          description: formData.get("description") as string,
          venue_name: formData.get("venue_name") as string,
          address: formData.get("address") as string,
          image_url: "https://comedyshowbucket.s3.amazonaws.com/4357C8E7-4635-44C5-8DD8-9B446450414E.JPG",
          ticket_link: formData.get("ticket_link") as string,
          ticket_price: formData.get("ticket_price") as string,
          userID: user.id
        }
      })
      revalidatePath("/")
      return { 
        status: "sucess", 
        message: "File Has been Uploaded",
        title: "",
        date: new Date(),
        doors_open: "",
        start_time: "",
        description: "",
        venue_name: "",
        address: "",
        image_url: "",
        ticket_link: "",
        ticket_price: "",
        approvalStatus: ApprovalStatus.PENDING,
        userId: ""
      } 
    } catch (error) {
      return  { 
        status: "sucess", 
        message: "File Has been Uploaded",
        title: "",
        date: new Date(),
        doors_open: "",
        start_time: "",
        description: "",
        venue_name: "",
        address: "",
        image_url: "",
        ticket_link: "",
        ticket_price: "",
        approvalStatus: ApprovalStatus.PENDING,
        userId: 4
      } 
    }
     
  
}

export async function createOpenMic(prevState: openMicType, formData: FormData) {
  "use server"
    const user = await createUser();
    console.log("THIS IS USER IN OPENMIC:", user)
    console.log("OPENMIC FORMDATA:", formData)
    try {
      await prisma.openMic.create({
        data: {
          title: formData.get("title") as string,
          startTime: formData.get("startTime") as string,
          signupTime: formData.get("signupTime") as string,
          day: formData.get("day") as string,
          city: formData.get("city") as string,
          info: formData.get("info") as string,
          frequency: formData.get("frequency") as string,
          address: formData.get("address") as string,
          signupForm: formData.get("signupForm") as string,
          userID: user.id
        }
      })
      revalidatePath("/")
      return {
        status: "success",
        title: "",
        startTime: "",
        signupTime: "",
        day: "",
        city: "",
        info: "",
        frequency: "",
        address: "",
        signupForm: "",
      }
    } catch (error) {
      console.error("Error creating OpenMic:", error);
      return {
        status: "success",
        title: "",
        startTime: "",
        signupTime: "",
        day: "",
        city: "",
        info: "",
        frequency: "",
        address: "",
        signupForm: "",
      }
    }
}