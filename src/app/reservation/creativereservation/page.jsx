"use client";

import React from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function Page() {
    const { data: session, status } = useSession();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const fetchRooms = async () => {
          try {
              const response = await fetch('/api/room/creative/getcreativeroom');
              const data = await response.json();
              setRooms(data);
          } catch (error) {
              console.error("Failed to fetch rooms:", error);
          }
      };
      fetchRooms();
    }, []);

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (!session && status === "unauthenticated") {
        redirect("/login");
    }

  return (
    <div className="bg-white p-20 rounded-lg shadow-lg w-full justify-center">
        <h1 className="mb-20 text-center text-black font-bold text-2xl">Creative reservations</h1>
        {rooms.slice(0, 2).map((room) => (
                    <Link
                        key={room._id}
                        href={room.available ? `/reservation/creativereservation/${room.roomname.toLowerCase().replace(/\s/g, '_')}_reservation` : '#'}
                        className={`bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5 ${room.available ? 'bg-blue-500' : 'bg-red-500 cursor-not-allowed'}`}
                        style={{ backgroundImage: `url(${room.roomname === 'CREATIVE-1' ? '/c1.jpg' : '/c2.jpg'})` }}
                    >
                        {room.roomname}
                    </Link>
                ))}
        {rooms.slice(2).map((room) => (
                    <Link
                        key={room._id}
                        href={room.available ? `/reservation/creativereservation/${room.roomname.toLowerCase().replace(/\s/g, '_')}_reservation` : '#'}
                        className={`bg-cover bg-center filter text-white px-5 py-10 rounded text-4xl mx-5 ${room.available ? 'bg-blue-500' : 'bg-red-500 cursor-not-allowed'}`}
                        style={{ backgroundImage: `url(${room.roomname === 'PEER-TUTER-1' ? '/pt1.jpg' : room.roomname === 'PEER-TUTER-2' ? '/pt2.jpg' : '/pt3.jpg'})` }}
                    >
                        {room.roomname}
                    </Link>
                ))}
    </div>
  )
}

export default Page