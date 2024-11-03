"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import Timetable from '@/app/components/Timetable';

function Page() {
    const { data: session, status } = useSession();

    const [schedule, setSchedule] = useState([]);

    const [roomavailable, setroomsavailable] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const username = session?.user?.username;

    const [day, setDay] = useState("Monday");
    const [time, setTime] = useState("8:00-9:00");

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("/api/reservation/creative/getreservationcreative", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({roomname: "creative-1"})
                });
                const data = await response.json();
                
                const initialSchedule = [
                    { day: 'Monday', reservation: [] },
                    { day: 'Tuesday', reservation: [] },
                    { day: 'Wednesday', reservation: [] },
                    { day: 'Thursday', reservation: [] },
                    { day: 'Friday', reservation: [] },
                ];

                data.creativeroomreservations.forEach(reservation => {
                    const { day, time, username } = reservation;
                    const timeParts = time.split("-");
                    const startTime = parseInt(timeParts[0].trim().split(":")[0])-8;
                    const endTime = parseInt(timeParts[1].trim().split(":")[0])-8;

                    const daySchedule = initialSchedule.find(d => d.day === day);
                    if (daySchedule) {
                        daySchedule.reservation.push({
                            name: username,
                            startTime,
                            endTime,
                            time
                        });
                    }
                });

                setSchedule(initialSchedule);
            } catch (error) {
                console.error("Error fetching reservations:", error);
                setError("Failed to load reservations");
            }
        };

        const fetchRoom = async () => {
            try {
                const response = await fetch("/api/room/creative/getcreativeroom", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({roomname: "CREATIVE-1"})
                });
                const data = await response.json();

                if (!data.creativerooms[0].available) {
                    setError("Room not available! Sorry.");
                }

            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError("Failed to load rooms");
            }
        };

        fetchRoom();
        fetchReservations();
        }, [session, status]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }
    
    const handleReservation = async (e) => {
        e.preventDefault();
        setSuccess("");
    
        try {

            if (!data.creativerooms[0].available) {
                setError("Room not available! Sorry.");
                return;
            }
    
            const resCheckCreativeRoom = await fetch("/api/reservation/creative/checkreservationcreative", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    roomname: "creative-1", 
                    day, 
                    time 
                })
            })
    
            const { creativeroomreservations } = await resCheckCreativeRoom.json();
    
            if (creativeroomreservations.length > 0) {
                setError("Already reservation");
                return;
            }
    
            const res = await fetch("/api/reservation/creative/makereservationcreative", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomname: "creative-1", 
                    username, 
                    day,
                    time
                })
            })
    
            const data = await res.json();
    
            if (res.ok) {
                const timeParts = time.split("-");
                const startTime = parseInt(timeParts[0].trim().split(":")[0])-8;
                const endTime = parseInt(timeParts[1].trim().split(":")[0])-8;
                setSchedule(prevSchedule => prevSchedule.map(daySchedule => {
                    if (daySchedule.day === day) {
                        return {
                            ...daySchedule,
                            reservation: [
                                ...daySchedule.reservation,
                                {
                                    name: username,
                                    startTime,
                                    endTime,
                                    time: `${timeParts[0]} - ${timeParts[1]}`
                                }
                            ]
                        };
                    }
                    return daySchedule;
                }));
                const form = e.target;
                setError("");
                setSuccess("Success!")
                form.reset();
            }
    
        } catch (error) {
            console.log("Error during make creative room reservation: ", error);
            setError("Error!!!");
        }
    }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
        <h2 className="text-center text-black font-bold mb-4">CREATIVE-1 RESERVATION</h2>
        <form onSubmit={handleReservation}>
            <div className="mb-4 text-center">
                <label className="mx-2">Day</label>    
                <select value={day} onChange={(e) => setDay(e.target.value)} className="p-2 border border-gray-300 rounded">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                </select>
            </div>  
            <div className="mb-4 text-center">
                <label className="mx-2">Time</label>
                <select value={time} onChange={(e) => setTime(e.target.value)} className="p-2 border border-gray-300 rounded">
                        <option>8:00-9:00</option>
                        <option>9:00-10:00</option>
                        <option>10:00-11:00</option>
                        <option>11:00-12:00</option>
                        <option>12:00-13:00</option>
                        <option>13:00-14:00</option>
                        <option>14:00-15:00</option>
                        <option>15:00-16:00</option>
                        <option>16:00-17:00</option>
                </select>
            </div>
            <div className="text-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit!</button>
            </div>
        </form>
        <div className=" bg-gray-50 p-10">
            <Timetable schedule={schedule} />
        </div>
    </div>
  )
}

export default Page