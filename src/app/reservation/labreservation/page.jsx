"use client";

import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function page() {
    const {data: session} = useSession();
    if (!session) redirect("/login")
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm justify-center">
        <h2 className="text-center text-black font-bold mb-4">LAB RESERVATION</h2>
        <form>
            <div className="mb-4">
                <input
                type="text"
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Finish!</button>
            </div>
        </form>
    </div>
  )
}

export default page