import Link from "next/link";
import { Bangers } from 'next/font/google'
const doodle = Bangers({
  subsets: ['latin'],
  weight: "400"
})

const Nav = () => {
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className={`${doodle.className} text-3xl hover:text-customGold`}>Lets Laught Local</div>
        <div className={`flex gap-10 ${doodle.className} text-3xl`}>
          <Link href="/" className="hover:text-customGold">Home</Link>
          <Link href="/shows" className="hover:text-customGold">Shows</Link>
          <Link href="/openmic" className="hover:text-customGold">Open Mics</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;