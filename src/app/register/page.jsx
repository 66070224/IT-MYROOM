"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function page() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {data: session} = useSession();
    if (session) redirect("/")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");

        if (password != confirmpassword) {
            setError("password not match!")
            return
        }

        if (!username || !password || !confirmpassword) {
            setError("Please complete all input");
            return;
        }

        try {

            const resCheckUser = await fetch("http://localhost:3000/api/checkuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            })

            const { user } = await resCheckUser.json();

            if (user) {
                setError("Username already exists!");
                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, password
                })
            })

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("Success!")
                form.reset();
            }

        } catch (error) {
            console.log("Error during register: ", error)
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

            <h2 className="text-center text-black font-bold mb-4">REGISTER</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" />
                    <input
                    onChange = {(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                    onChange = {(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder="confirm Password"
                    className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
                </div>
            </form>
        </div>
    )
}

export default page