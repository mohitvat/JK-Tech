
"use client"
import { useState } from 'react';

export default function DocumentUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

  
    onUpload({ name: file.name });
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-50 space-y-4">
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Document
      </button>
    </form>
  );
}
