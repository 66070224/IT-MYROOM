import React from 'react'
import Link from 'next/link'

function Page() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full justify-center">
        <h1 className="mb-10 text-center text-black font-bold text-2xl">My reservations</h1>
        <Link href="/viewreservation/viewlabreservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">LAB</Link>
        <Link href="/viewreservation/viewcreativereservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">CREATIVE</Link>
    </div>
  )
}

export default Page