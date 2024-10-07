"use client";

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
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
    <div>
        <Link href="/manage/labroommanage" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">Lab room manage</Link>
        <Link href="/manage/creativeroommanage" className="bg-blue-500 text-white px-5 py-3 rounded text-4xl mx-5">Creative room manage</Link>
    </div>
  )
}

export default page