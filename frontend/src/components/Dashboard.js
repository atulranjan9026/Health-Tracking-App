import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Assuming the username is stored in localStorage when the user logs in
    const storedUsername = localStorage.getItem("username");

    console.log("storedUsername :", storedUsername);
    
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token :", token);
        const res = await axios.get(
          "http://localhost:5000/api/health-records",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecords(res.data);
        setFilteredRecords(res.data);
      } catch (error) {
        console.error("Error fetching records", error);
      }
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    setFilteredRecords(
      records.filter(
        (record) =>
          record.date.includes(search) ||
          record.temperature.toString().includes(search) ||
          record.bloodPressure.includes(search) ||
          record.heartRate.toString().includes(search)
      )
    );
  }, [search, records]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("token :", token);
      await axios.delete(`http://localhost:5000/api/health-records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Health Metrics Dashboard</h1>

      {/* Displaying the username */}
      <div className="text-xl mb-4">
        Welcome, <span className="font-semibold">{username}</span>!
      </div>

      <SearchBar setSearch={setSearch} />

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Temperature (°C)</th>
            <th className="py-2 px-4 border">Blood Pressure</th>
            <th className="py-2 px-4 border">Heart Rate (bpm)</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record._id} className="border-t">
              <td className="py-2 px-4">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">{record.temperature} °C</td>
              <td className="py-2 px-4">{record.bloodPressure}</td>
              <td className="py-2 px-4">{record.heartRate} bpm</td>
              <td className="py-2 px-4">
                <Link
                  to={`/record/${record._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(record._id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Link
          to="/add"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add New Record
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
