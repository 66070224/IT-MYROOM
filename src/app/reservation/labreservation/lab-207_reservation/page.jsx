"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function Page() {
    const { data: session, status } = useSession();

    const username = session?.user?.username;

    const [selectedTime, setSelectedTime] = useState('9:00-11:00');
    const [selectedSeat, setSelectedSeat] = useState(null);

    const [reservedSeats, setReservedSeats] = useState([]);

    const [available, setAvailable] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const timeSlots = [
        '9:00-11:00', '11:00-13:00', '14:00-16:00'
    ];

    const seats = Array.from({ length: 10 }, (_, rowIndex) =>
        Array.from({ length: 8 }, (_, colIndex) => {
            const seatNumber = rowIndex * 8 + colIndex + 1;
            return seatNumber.toString().padStart(9, 'Lab207-0');
        })
    );

    useEffect(() => {
        const fetchReservations = async () => {
            if (!selectedTime) return;

            try {
                const response = await fetch("/api/reservation/lab/getreservationlab", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roomname: "LAB-207", 
                        time: selectedTime
                    })
                });

                if (response.ok){
                    const data = await response.json();
                    const reservedSeats = data.labroomreservations.map(res => res.seat);
                    setReservedSeats(reservedSeats);
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        const fetchRoom = async () => {
            try {
                const response = await fetch("/api/room/lab/getlabroombyname", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({roomname: "LAB-207"})
                });
                const { data } = await response.json();

                if (data?.creativerooms[0]?.available === false) {
                    setAvailable(data?.creativerooms[0]?.available);
                    setError("Room not available! Sorry.");
                }

            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError("Failed to load rooms");
            }
        };

        fetchRoom();

        fetchReservations();
    }, [session, status, selectedTime]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }

    const handleSeatSelect = (seat) => {
        setSelectedSeat(seat);
    };

    const handleConfirm = async () => {
        setSuccess("");
        if (available === false) {
            setError("Room not available! Sorry.");
            return;
        }
        if (selectedSeat && selectedTime) {
            const today = new Date();
            today.setHours(today.getUTCHours()+14);
            
            try {
                const res = await fetch("/api/reservation/lab/makereservationlab", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roomname: "LAB-207",
                        seat: selectedSeat,
                        username,
                        date: today,
                        time: selectedTime,
                    })
                })
                setError("");
                setSuccess("Success!");
                setSelectedSeat(null);
                setReservedSeats([...reservedSeats, selectedSeat]);
            } catch (error) {
                setError("error!");
                console.log(error)
            }
        } else {
            alert("Please select both a seat and a time slot");
        }
    };

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

        <h2 className="text-center text-black font-bold mb-4">LAB-207 RESERVATION</h2>

        <div className="justify-center flex space-x-4 p-4">
                {timeSlots.map((slot, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${selectedTime === slot ? 'bg-green-500 text-white' : 'bg-yellow-500'}`}
                        onClick={() => setSelectedTime(slot)}
                    >
                        {slot}
                    </button>
                ))}
        </div>

        <div className="grid grid-cols-8 gap-4 my-4">
                {seats.map((row, rowIndex) => (
                    row.map((seat) => (
                        <button
                            key={seat}
                            className={`w-20 h-16 rounded 
                              ${reservedSeats.includes(seat) ? 'bg-red-500 text-white cursor-not-allowed' : ''}
                              ${selectedSeat === seat ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
                            onClick={() => handleSeatSelect(seat)}
                            disabled={reservedSeats.includes(seat)}
                        >
                            {seat}
                        </button>
                    ))
                ))}
        </div>
        <div className="mb-5 text-center">
            <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4"
                    onClick={handleConfirm}
                >
                    Confirm Reservation
            </button>
        </div>
    </div>
  )
}

export default Page