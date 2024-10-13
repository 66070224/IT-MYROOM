"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import Timetable from '../../components/Timetable';

function page() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }

  return (
    <div>
        <Link href="/reservation/creativereservation/creative-1_reservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">CREATIVE-1</Link>
        <Link href="/reservation/creativereservation/creative-2_reservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">CREATIVE-2</Link>
        <Link href="/reservation/creativereservation/creative-3_reservation" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">CREATIVE-3</Link>
    </div>
  )
}

export default page