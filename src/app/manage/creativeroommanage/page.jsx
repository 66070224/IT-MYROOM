"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

function Page() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [roomname, setRoomname] = useState("");
  const [available, setAvailable] = useState(false);

  const [selectedRoomIdUpdate, setSelectedRoomIdUpdate] = useState();
  const [selectedRoomIdDelete, setSelectedRoomIdDelete] = useState();

  const [newAvailability, setNewAvailability] = useState(true);

  const { data: session, status } = useSession();

  const [creativeRooms, setCreativeRooms] = useState([]);

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
                setSelectedRoomIdUpdate(data.creativerooms[0]._id);
                setNewAvailability(data.creativerooms[0].available);
            } else {
                setCreativeRooms(data.creativerooms || []);
            }
        } catch (error) {
            console.error("Failed to fetch creative rooms:", error);
        }
    };

    fetchCreativeRooms();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!selectedRoomIdUpdate) {
      setError("Please select a room");
      return;
    }

    const currentRoom = creativeRooms.find((room) => room._id === selectedRoomIdUpdate);
  
    try {
      const res = await fetch("/api/room/creative/updatecreativeroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedRoomIdUpdate,
          available: newAvailability,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setSuccess("Room updated successfully!");
        setCreativeRooms((prev) => 
          prev.map((room) => (room._id === data.updatedRoom._id ? data.updatedRoom : room))
        );
      } else {
        setError(data.error || "Failed to update room");
      }
    } catch (error) {
      setError("An error occurred while updating the room");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm justify-center">
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
          <div>
            <h2 className="text-center text-black font-bold mb-4">Update creative room</h2>
              <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                      <select value={selectedRoomIdUpdate} onChange={(e) => setSelectedRoomIdUpdate(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                        {creativeRooms.length > 0 ? (
                          creativeRooms.map((room) => (
                              <option key={room._id} value={room._id}>
                                  {room.roomname}
                              </option>
                          ))
                        ) : (
                            <option disabled>Add room first!</option>
                        )}
                      </select>
                  </div>
                  <div className="mb-4">
                    <input
                      type="checkbox"
                      checked={newAvailability}
                      onChange={(e) => setNewAvailability(e.target.checked)}
                    />
                    <label>Available?</label>
                  </div>
                  <div className="text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">Update!</button>
                  </div>
              </form>
            </div>
    </div>
  )
}

export default Page