import Link from "next/link";
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Josefin_Sans } from 'next/font/google'

const doodle = Josefin_Sans({
  subsets: ['latin'],
  weight: "400"
})
const Nav = async () => {
  const session = await getServerSession(options);
  console.log("this is session!", session);
  return (
    <div className="mt-20">
      <nav className="flex justify-between items-center w-full px-6 py-4 bg-black text-gray-100 sticky top-0">
        <div className={`flex flex-col gap-10 ${doodle.className} text-2xl w-32`}>
          <Link href="/" className="hover:text-customGold">Home</Link>
          { session && session.user.role === "ADMIN" && <Link href="/dashboard" className="hover:text-customGold">Dashboard</Link> }
          <Link href="/shows" className="hover:text-customGold">Shows</Link>
          <Link href="https://nctrianglecomedy.notion.site/Open-Mic-Calendars-f11ea6fcbe7041bc98f3987c4870d648" className="hover:text-customGold">Open Mics</Link>
          <Link href="/form" className="hover:text-customGold">Create</Link>
          <Link href="/contact" className="hover:text-customGold">Contact</Link>
          {session ? 
            <Link href="/api/auth/signout?callbackUrl=/" className="hover:text-customGold">Logout</Link> :
            <Link href="/api/auth/signin?callbackUrl=/" className="hover:text-customGold">Login</Link>}
        </div>
      </nav>
   </div>
  );
};

export default Nav;