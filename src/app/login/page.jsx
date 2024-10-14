"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function Page() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {data: session} = useSession();
    if (session) redirect("/")

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !password) {
            setError("Please input both username and password!");
            return;
        }

        try {
            const res = await signIn("credentials", {
                username, password
            });
            if (res.error) {
                setError("Login invalid")
                return;
            }

            if (res.ok) {
                redirect("/");
            }
        } catch (error) {
            console.log(error)
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

            <h2 className="text-center text-black font-bold mb-4">LOGIN</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
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
                    <Link href="/register">register</Link>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Page