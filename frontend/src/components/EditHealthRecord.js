import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHealthRecord = () => {
  const { id } = useParams();
  const [record, setRecord] = useState({
    date: "",
    temperature: "",
    bloodPressure: "",
    heartRate: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/health-records/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const formattedDate = new Date(res.data.date).toISOString().split('T')[0];
        setRecord({
          ...res.data,
          date: formattedDate
        });
      } catch (error) {
        console.error("Error fetching record", error);
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/health-records/${id}`,
        record,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      navigate(`/record/${id}`);
    } catch (error) {
      console.error("Error updating record", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Health Record</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={record.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Body Temperature (°C):</label>
          <input
            type="number"
            name="temperature"
            value={record.temperature}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Pressure (systolic/diastolic):</label>
          <input
            type="text"
            name="bloodPressure"
            value={record.bloodPressure}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm):</label>
          <input
            type="number"
            name="heartRate"
            value={record.heartRate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
          {/* <button
            type="button"
            onClick={() => navigate(`/record/${id}`)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default EditHealthRecord;
