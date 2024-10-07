import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
        <Link href="/reservation/labreservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">LAB</Link>
        <Link href="/reservation/creativereservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">CREATIVE</Link>
    </div>
  )
}

export default page