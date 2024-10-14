"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

function page() {
  const { data: session, status } = useSession();
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
        try {
            const response = await fetch("/api/problem/getreport", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            const data = await response.json();
            setProblems(data.problems || []);
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

  const handleDelete = async (problemId) => {
    try {
      const res = await fetch("/api/problem/deletereport", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: problemId })
      });

      if (res.ok) {
        setProblems((prev) => 
        prev.filter((problem) => problem._id !== problemId)
        )
        setSelectedProblem(null);
      }
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  const handleViewDescription = (problem) => {
    setSelectedProblem(problem);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full justify-center">
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-4">User report</h2>
        {problems.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          <div className="overflow-auto max-h-64">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr key={problem._id}>
                    <td className="border px-4 py-2">{problem.username}</td>
                    <td className="border px-4 py-2">{new Date(problem.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{problem.title}</td>
                    <td className="border px-4 py-2"><button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleViewDescription(problem)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedProblem && (
        <div>
          <h3 className="text-lg font-semibold">Title: {selectedProblem.title}</h3>
          <p><strong>Username:</strong> {selectedProblem.username}</p>
          <p><strong>Date:</strong> {new Date(selectedProblem.date).toLocaleDateString()}</p>
          <p><strong>Description:</strong></p>
          <p className="whitespace-pre-line">{selectedProblem.describe}</p>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(selectedProblem._id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default page