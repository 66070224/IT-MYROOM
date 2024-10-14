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
        <h1 className="mb-20 text-center text-black font-bold text-2xl">Lab Reservations</h1>
        <Link href="/reservation/labreservation/lab-203_reservation" className="bg-[url('/lab203bg.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">LAB-203</Link>
        <Link href="/reservation/labreservation/lab-205_reservation" className="bg-[url('/lab205bg.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">LAB-205</Link>
        <Link href="/reservation/labreservation/lab-207_reservation" className="bg-[url('/lab207bg.jpg')] bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5">LAB-207</Link>
    </div>
  )
}

export default Page