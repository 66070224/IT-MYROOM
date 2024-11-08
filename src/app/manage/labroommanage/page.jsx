"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

function Page() {
  const [addIsOpen, addSetIsOpen] = useState(true);
  const [updateIsOpen, updateSetIsOpen] = useState(false);
  const [deleteIsOpen, deleteSetIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [roomname, setRoomname] = useState("");
  const [available, setAvailable] = useState(false);

  const [selectedRoomIdUpdate, setSelectedRoomIdUpdate] = useState();
  const [selectedRoomIdDelete, setSelectedRoomIdDelete] = useState();

  const [newRoomname, setNewRoomname] = useState("");
  const [newAvailability, setNewAvailability] = useState(true);

  const { data: session, status } = useSession();

  const [labRooms, setLabRooms] = useState([]);

  useEffect(() => {
    const fetchLabRooms = async () => {
        try {
            const response = await fetch("/api/room/lab/getlabroom", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setLabRooms(data.labrooms || []);
            if (Array.isArray(data.labrooms)) {
                setLabRooms(data.labrooms);
                setSelectedRoomIdUpdate(data.labrooms[0]._id);
                setSelectedRoomIdDelete(data.labrooms[0]._id);
            } else {
                setLabRooms(data.labrooms || []);
            }
        } catch (error) {
            console.error("Failed to fetch lab rooms:", error);
        }
    };

    fetchLabRooms();
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

  const handleAdd = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!roomname) {
        setError("Please input room name!");
        return;
    }

    try {

        const resCheckLabRoom = await fetch("/api/room/lab/checklabroom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roomname })
        })

        const { labroom } = await resCheckLabRoom.json();

        if (labroom) {
            setError("lab room already exists!");
            return;
        }

        const res = await fetch("/api/room/lab/addlabroom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomname, available
            })
        })

        const data = await res.json();

        if (res.ok) {
            const form = e.target;
            setError("");
            setSuccess("Success!")
            setLabRooms((prev) => [...prev, data.newRoom]);
            form.reset();
        }

    } catch (error) {
        console.log("Error during add lab room: ", error)
        setError("Error!!!");
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!selectedRoomIdUpdate) {
      setError("Please select a room");
      return;
    }

    const currentRoom = labRooms.find((room) => room._id === selectedRoomIdUpdate);
    const updatedRoomname = newRoomname ? newRoomname : currentRoom.roomname;
  
    try {
      const res = await fetch("/api/room/lab/updatelabroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedRoomIdUpdate,
          roomname: updatedRoomname,
          available: newAvailability,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setSuccess("Room updated successfully!");
        setLabRooms((prev) => 
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

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!selectedRoomIdUpdate) {
      setError("Please select a room");
      return;
    }
  
    try {
      const res = await fetch("/api/room/lab/deletelabroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedRoomIdDelete
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setSuccess("Room deleted successfully!");
        setLabRooms((prev) => 
          prev.filter((room) => room._id !== data.deletedRoom._id)
        );
      } else {
        setError(data.error || "Failed to delete room");
      }
    } catch (error) {
      setError("An error occurred while deleting the room");
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
      <div className="items-center mb-4">
        <button type="button" className="bg-green-500 text-white px-4 py-2 rounded text-xl mx-3" onClick={() => {addSetIsOpen(true), updateSetIsOpen(false), deleteSetIsOpen(false)}}>Add</button>
        <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded text-xl mx-3" onClick={() => {addSetIsOpen(false), updateSetIsOpen(true), deleteSetIsOpen(false)}}>Update</button>
        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded text-xl mx-3" onClick={() => {addSetIsOpen(false), updateSetIsOpen(false), deleteSetIsOpen(true)}}>Delete</button>
      </div>
      {addIsOpen && (
        <div>
          <h2 className="text-center text-black font-bold mb-4">Add new lab room</h2>
            <form onSubmit={handleAdd}>
                <div className="mb-4">
                    <input type="text" onChange = {(e) => setRoomname(e.target.value)} placeholder="Room name" className="w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className="mb-4">
                  <input type="checkbox" className="mr-2" onChange={(e) => setAvailable(e.target.checked)} checked={available} />
                  <label>Available?</label>
                </div>
                <div className="text-center mb-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add!</button>
                </div>
            </form>
          </div>
        )}
        {updateIsOpen && (
          <div>
            <h2 className="text-center text-black font-bold mb-4">Update lab room</h2>
              <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                      <select value={selectedRoomIdUpdate} onChange={(e) => setSelectedRoomIdUpdate(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                        {labRooms.length > 0 ? (
                          labRooms.map((room) => (
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
                      type="text"
                      value={newRoomname}
                      onChange={(e) => setNewRoomname(e.target.value)}
                      placeholder="New room name"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
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
          )}
        {deleteIsOpen && (
          <div>
            <h2 className="text-center text-black font-bold mb-4">Delete lab room</h2>
              <form onSubmit={handleDelete}>
                  <div className="mb-4">
                      <select value={selectedRoomIdDelete} onChange={(e) => setSelectedRoomIdDelete(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                        {labRooms.length > 0 ? (
                          labRooms.map((room) => (
                              <option key={room._id} value={room._id}>
                                  {room.roomname}
                              </option>
                          ))
                        ) : (
                            <option disabled>Add room first!</option>
                        )}
                      </select>
                  </div>
                  <div className="text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">Delete!</button>
                  </div>
              </form>
            </div>
          )}
    </div>
  )
}

export default Page