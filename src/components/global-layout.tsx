import { ReactNode } from "react";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col md:w-[800px] w-full min-h-screen px-5 mx-auto">
        <header className="p-4 font-bold text-[#e50914] text-[20px]">
          <Link href={'/'}>🎥 ONEBITE CINEMA</Link>
        </header>

        <main className="flex-grow px-4">
          {children}
        </main>

        <footer className="mt-8 p-4 text-sm text-gray-500">
          © 2025 제작: YEONWOOCHOI
        </footer>
      </div>
    </div>
  )
}