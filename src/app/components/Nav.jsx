"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  const [reservationIsOpen, reservationSetIsOpen] = useState(false);
  const [userIsOpen, userSetIsOpen] = useState(false);

  return (
    <ul className="navbar flex justify-center bg-blue-700 text-white font-medium relative">
      <div className="flex-1">
        <li className="btn btn-ghost text-xl mx-5">
          <Link href="/">IT Myroom</Link>
        </li>
      </div>
      <li className="mx-5 relative">
        <button
          onClick={() => reservationSetIsOpen(!reservationIsOpen)}
          className="focus:outline-none"
        >
          Reservation
          <span
            className={`ml-1 transform transition-transform duration-200 ${reservationIsOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            ▼
          </span>
        </button>
        {reservationIsOpen && (
          <div className="absolute bg-blue-700 text-white rounded-lg shadow-md mt-2 z-20">
            <ul className="p-2">
              <li>
                <Link href="/reservation/labreservation">Lab</Link>
              </li>
              <li>
                <Link href="/reservation/creativereservation">Creative</Link>
              </li>
              {session?.user?.role === "staff" && (
                <li>
                  <Link href="/managereservation">Manage</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </li>
      {!session ? (
        <li className="mx-5">
          <Link href="/login">Login</Link>
        </li>
      ) : (
        <li className="mx-5 relative">
          <button
            onClick={() => userSetIsOpen(!userIsOpen)}
            className="focus:outline-none"
          >
            {session?.user?.username}
            <span
              className={`ml-1 transform transition-transform duration-200 ${userIsOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              ▼
            </span>
          </button>
          {userIsOpen && (
            <div className="absolute bg-blue-700 text-white rounded-lg shadow-md mt-2 z-20">
              <ul className="p-2">
                <li>
                  <Link href="/viewreservation">View</Link>
                </li>
                {session?.user?.role === "staff" && (
                  <li>
                    <Link href="/manage">Manage</Link>
                  </li>
                )}
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </li>
      )}
    </ul>
  );
}

export default Nav;
