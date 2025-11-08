"use client";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function AdditionalCertifications() {
  return (
    <div className={`${spaceGrotesk.className} bg-black text-[#fefeff] min-h-screen`}>
      {/* Home Tab at the Top Left */}
      <nav className="fixed top-8 left-4 md:left-8 z-50">
        <Link href="/">
          <div className="flex items-center text-[#fefeff] cursor-pointer hover:text-gray-400 transition-colors">
            <AiOutlineHome size={24} />
            <span className="ml-2 hidden md:inline">Home</span>
          </div>
        </Link>
      </nav>

      <main className="px-4 md:px-24 py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-medium mb-12 text-center">
            Additional Certifications
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {/* You can add your certifications here */}
              {/* Example:
              <div>
                <h3 className="text-2xl font-medium text-[#fefeff]">Certification Name</h3>
                <p className="font-mono text-sm text-[#969696]">Issuing Organization</p>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}