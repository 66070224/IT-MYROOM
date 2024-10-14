"use client";

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

function Page() {

    const { data: session, status } = useSession();

    if (status === "loading") {
      return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
      redirect("/login");
    }
    if (!session?.user?.role === "staff") {
      redirect("/")
    }

  return (
    <div>page</div>
  )
}

export default Page