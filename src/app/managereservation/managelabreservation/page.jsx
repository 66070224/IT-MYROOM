"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function page() {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState([]);


  useEffect(() => {
    const fetchReservations = async () => {
        try {
            const response = await fetch("/api/reservation/lab/getreservationlab", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            const data = await response.json();
            setReservations(data.labroomreservations || []);
        } catch (error) {
            console.error("Error fetching reservations:", error);
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
  if (session?.user?.role !== "staff") {
    redirect("/")
  }

  const handleDelete = async (reservationId) => {
    try {
      const res = await fetch("/api/reservation/lab/deletereservationlab", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: reservationId })
      });

      if (res.ok) {
        setReservations((prev) => 
          prev.filter((reservation) => reservation._id !== reservationId)
        )
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full justify-center">
      <div className="mb-5">
      <h2 className="text-xl font-semibold mb-4">Lab Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Room Name</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Day</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td className="border px-4 py-2">{reservation.roomname}</td>
                <td className="border px-4 py-2">{reservation.username}</td>
                <td className="border px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{reservation.time}</td>
                <td className="border px-4 py-2"><button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(reservation._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  )
}

export default page