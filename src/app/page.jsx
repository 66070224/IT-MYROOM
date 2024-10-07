import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="justify-center">
        <div className="mb-10 text-center">
          <Link href="/reservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl">Make Reservation</Link>
        </div>
        <div className="mb-10 text-center">
          <Link href="/viewreservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl">View</Link>
        </div>
      </div>
  );
}
