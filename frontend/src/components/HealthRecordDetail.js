import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const HealthRecordDetail = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/health-records/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecord(res.data);
      } catch (error) {
        console.error("Error fetching record", error);
      }
    };

    fetchRecord();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      // await axios.delete(
      //   `http://localhost:5000/api/health-records/${id}`,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!record) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Health Record Details</h1>
      <div className="space-y-4 text-lg">
        <p className="text-gray-700">
          <span className="font-medium">Date:</span> {new Date(record.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Body Temperature:</span> {record.temperature} °C
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Blood Pressure:</span> {record.bloodPressure}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Heart Rate:</span> {record.heartRate} bpm
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handleEdit}
          className="inline-flex items-center px-6 py-2 text-lg font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-6 py-2 text-lg font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default HealthRecordDetail;
