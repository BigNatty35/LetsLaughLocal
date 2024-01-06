import { prisma } from "@/db";
import Link from "next/link";

function getUsers() {
  return prisma.user.findMany();
}
export default async function Home() {
  // await prisma.user.create({data: {  username: "Mohdi", email: "pup@gmail", password: "pizza"}})  
  const users = await getUsers();
  return (
    <div className="flex flex-col">
      <h1>User Registration</h1>
      <div>
        <form action="" className="flex flex-col">
          <label htmlFor="">username</label>
          <input type="text" placeholder="username" />
          <label htmlFor="">password</label>
          <input type="password" placeholder="password" />
          <label htmlFor="">email</label>
          <input type="text" placeholder="email" />
        </form>

      </div>
    </div>
  )
}