import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHealthRecord = () => {
  const [date, setDate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("date :",date)
      const token = localStorage.getItem("token");
      console.log("token :", token); // Verify token is present
      await axios.post(
        "http://localhost:5000/api/health-records",
        { date, temperature, bloodPressure, heartRate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding record", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Add Health Record</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Body Temperature (°C):
          </label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Blood Pressure (systolic/diastolic):
          </label>
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Heart Rate (bpm):
          </label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            required
            className="w-full mb-6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHealthRecord;
