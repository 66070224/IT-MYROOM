import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full justify-center">
        <h1 className="mb-10 text-center text-black font-bold text-2xl">Welcome to IT_MYROOM</h1>
        <div className="mb-10 text-center">
          <Link href="/reservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl">Make Reservation</Link>
        </div>
        <div className="mb-10 text-center">
          <Link href="/viewreservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl">View</Link>
        </div>
        <div className="mb-10 text-center">
          <Link href="/reportproblem" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl">Report</Link>
        </div>
      </div>
  );
}
