"use client";

import React from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function Page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }

  return (
    <div className="bg-white p-20 rounded-lg shadow-lg w-full justify-center">
        <h1 className="mb-20 text-center text-black font-bold text-2xl">Creative reservations</h1>
        <div className='mb-20 text-center'>
          <Link href="/reservation/creativereservation/creative-1_reservation" className="bg-[url('/c1.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">CREATIVE-1</Link>
          <Link href="/reservation/creativereservation/creative-2_reservation" className="bg-[url('/c2.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">CREATIVE-2</Link>
        </div>
        <div className='mt-40 text-center'>
        <Link href="/reservation/creativereservation/peer-tutur-1_reservation" className="bg-[url('/pt1.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">PEER-TUTUR-1</Link>
        <Link href="/reservation/creativereservation/peer-tutur-2_reservation" className="bg-[url('/pt2.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">PEER-TUTUR-2</Link>
        <Link href="/reservation/creativereservation/peer-tutur-3_reservation" className="bg-[url('/pt3.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">PEER-TUTUR-3</Link>
        </div>
    </div>
  )
}

export default Page