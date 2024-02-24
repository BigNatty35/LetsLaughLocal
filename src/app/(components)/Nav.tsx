import Link from "next/link";
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Bangers } from 'next/font/google'

const doodle = Bangers({
  subsets: ['latin'],
  weight: "400"
})

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className={`${doodle.className} text-3xl hover:text-customGold`}>Lets Laugh Local</div>
        <div className={`flex gap-10 ${doodle.className} text-3xl`}>
          <Link href="/" className="hover:text-customGold">Home</Link>
          <Link href="/dashboard" className="hover:text-customGold">Dashboard</Link>
          <Link href="/shows" className="hover:text-customGold">Shows</Link>
          <Link href="/openmic" className="hover:text-customGold">Open Mics</Link>
          <Link href="/form" className="hover:text-customGold">Add Show/Mic</Link>
          <Link href="/contact" className="hover:text-customGold">Contact</Link>
          {session ? 
            <Link href="/api/auth/signout?callbackUrl=/" className="hover:text-customGold">Logout</Link> :
            <Link href="/api/auth/signin?callbackUrl=/" className="hover:text-customGold">Login</Link>}
        </div>
      </nav>
    </header>
  );
};

export default Nav;