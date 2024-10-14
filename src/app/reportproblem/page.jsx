"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function page() {

    const { data: session, status } = useSession();

    const username = session?.user?.username;

    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        const today = new Date();
        today.setHours(today.getUTCHours()+14);

        if (!title || !describe) {
            setError("Please complete all input");
            return;
        }

        try {

            const res = await fetch("api/problem/submitreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, date: today, title, describe })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("Success!")
                form.reset();
            }

        } catch (error) {
            console.log("Error during submit: ", error)
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm justify-center">

            {error && (
                <div className="flex justify-center">
                    <div className="bg-red-500 text-sm text-white py-1 px-3 rounded mt-2 text-center">
                        {error}
                    </div>
                </div>
            )}

            {success && (
                <div className="flex justify-center">
                    <div className="bg-green-500 text-sm text-white py-1 px-3 rounded mt-2 text-center">
                        {success}
                    </div>
                </div>
            )}

            <h2 className="text-center text-black font-bold mb-4">Report Problem</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" />
                    <input
                    onChange = {(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                    onChange = {(e) => setDescribe(e.target.value)}
                    placeholder="Describe"
                    rows="5"
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default page