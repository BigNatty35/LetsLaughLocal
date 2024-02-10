// "use client"
import { prisma } from "@/db";
import { useState } from 'react';
import { revalidatePath } from "next/cache";
import FormPage from "../(components)/FormPage";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import OpenMicForm from "../(components)/OpenMicForm";


export default async function FormHomePage() {

  const session = await getServerSession(options)
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/form")
  }
  return (
    <FormPage/>
  )
};


