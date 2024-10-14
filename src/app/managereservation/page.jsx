"use client";

import React from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function page() {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }
    if (session?.user?.role !== "staff") {
        redirect("/")
    }
    

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full justify-center">
        <h1 className="mb-10 text-center text-black font-bold text-2xl">Manage reservations</h1>
        <Link href="/managereservation/managelabreservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">LAB</Link>
        <Link href="/managereservation/managecreativereservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">CREATIVE</Link>
    </div>
  )
}

export default page