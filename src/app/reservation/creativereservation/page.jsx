"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';


function page() {
    const { data: session, status } = useSession();

    const [creativeRooms, setCreativeRooms] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [selectedRoomId, setSelectedRoomId] = useState();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const username = session?.user?.username;

    const [date, setDate] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    useEffect(() => {
        const fetchCreativeRooms = async () => {
            try {
                const response = await fetch("/api/room/creative/getcreativeroom", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                setCreativeRooms(data.creativerooms || []);
                if (Array.isArray(data.creativerooms)) {
                    setCreativeRooms(data.creativerooms);
                    setSelectedRoomId(data.creativerooms[0]._id);
                } else {
                    setCreativeRooms(data.creativerooms || []);
                }
            } catch (error) {
                console.error("Failed to fetch creative rooms:", error);
            }
        };

        fetchCreativeRooms();

        const fetchReservations = async () => {
            try {
                const response = await fetch("/api/reservation/creative/getreservationcreative", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setReservations(data.creativeroomreservations || []);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                setError("Failed to load reservations");
            }
        };

        fetchReservations();

    }, [session]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }

    const handleReservation = async (e) => {
        e.preventDefault();
        setSuccess("");
    
        if (!selectedRoomId) {
            setError("Please select room!");
            return;
        }

        const currentRoom = creativeRooms.find((room) => room._id === selectedRoomId);
    
        try {
    
            //const resCheckCreativeRoom = await fetch("/api/room/creative/checkcreativeroom", {
                //method: "POST",
                //headers: {
                    //"Content-Type": "application/json"
                //},
                //body: JSON.stringify({ roomname })
            //})
    
            //const { creativeroom } = await resCheckCreativeRoom.json();
    
            //if (creativeroom) {
                //setError("Creative room already exists!");
                //return;
            //}
    
            const res = await fetch("/api/reservation/creative/makereservationcreative", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomname: currentRoom.roomname, username, date, fromTime, toTime
                })
            })
    
            const data = await res.json();
    
            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("Success!")
                setReservations((prev) => [...prev, data.newReservation]);
                form.reset();
            }
    
        } catch (error) {
            console.log("Error during make creative room reservation: ", error);
            setError("Error!!!");
        }
    }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl justify-center">
        <div className="mb-5">
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
        </div>
        <h2 className="text-center text-black font-bold mb-4">CREATIVE ROOM RESERVATION</h2>
        <form onSubmit={handleReservation}>
            <div className="mb-4">
                <select value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                    {creativeRooms.length > 0 ? (
                        creativeRooms.filter((room) => room.available).map((room) => (
                            <option key={room._id} value={room._id}>
                                {room.roomname}
                            </option>
                        ))
                    ) : (
                        <option disabled>No rooms available</option>
                    )}
                </select>
            </div>
            <div className="mb-4">
                <label className="mx-2">Date</label>    
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full p-2 border border-gray-300 rounded"/>
            </div>  
            <div className="mb-4">
                <label className="mx-2">from</label>
                <input value={fromTime} onChange={(e) => setFromTime(e.target.value)} className="mx-2 p-2 border border-gray-300 rounded" type="time"/>
                <label className="mx-2">to</label>
                <input value={toTime} onChange={(e) => setToTime(e.target.value)} className="mx-2 p-2 border border-gray-300 rounded" type="time"/>
            </div>
            <div className="text-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit!</button>
            </div>
            <div className="mb-4">
                <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
                    <table className="w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Room Name</th>
                                <th className="border border-gray-300 px-4 py-2">Username</th>
                                <th className="border border-gray-300 px-4 py-2">Date</th>
                                <th className="border border-gray-300 px-4 py-2">From</th>
                                <th className="border border-gray-300 px-4 py-2">To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.length > 0 ? (
                                reservations.filter((reservation) => reservation.roomname === creativeRooms.find(room => room._id === selectedRoomId)?.roomname).map((reservation) => (
                                    <tr key={reservation._id}>
                                        <td className="border border-gray-300 px-4 py-2">{reservation.roomname}</td>
                                        <td className="border border-gray-300 px-4 py-2">{reservation.username}</td>
                                        <td className="border border-gray-300 px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-4 py-2">{reservation.fromTime}</td>
                                        <td className="border border-gray-300 px-4 py-2">{reservation.toTime}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 text-center" colSpan="5">
                                        No reservations available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
  )
}

export default page