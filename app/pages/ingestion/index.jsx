"use client"

import { useEffect, useState } from 'react';

export default function IngestionPage() {
  const [documents, setDocuments] = useState([]);
  const [ingestions, setIngestions] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState('');

  useEffect(() => {
   
    setDocuments([
      { id: 'doc1', name: 'Report.pdf' },
      { id: 'doc2', name: 'Specs.docx' },
    ]);

    setIngestions([
      { id: 1, documentName: 'Report.pdf', status: 'completed' },
      { id: 2, documentName: 'Specs.docx', status: 'pending' },
    ]);
  }, []);

  const handleIngest = () => {
    if (!selectedDocId) return alert('Please select a document');

    const selectedDoc = documents.find(d => d.id === selectedDocId);
    const newIngestion = {
      id: Date.now(),
      documentName: selectedDoc.name,
      status: 'in_progress',
    };

    setIngestions([newIngestion, ...ingestions]);

    // Simulate processing
    setTimeout(() => {
      setIngestions((prev) =>
        prev.map((ing) =>
          ing.id === newIngestion.id ? { ...ing, status: 'completed' } : ing
        )
      );
    }, 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ingestion Management</h1>

      <div className="flex items-center space-x-4 mb-6">
        <select
          className="p-2 border rounded"
          value={selectedDocId}
          onChange={(e) => setSelectedDocId(e.target.value)}
        >
          <option value="">Select Document</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleIngest}
        >
          Trigger Ingestion
        </button>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Ingestion Jobs</h2>
        {ingestions.length === 0 ? (
          <p className="text-gray-500">No ingestion jobs yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Document</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ingestions.map((ing) => (
                <tr key={ing.id} className="border-t">
                  <td className="p-2">{ing.documentName}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        ing.status === 'completed'
                          ? 'bg-green-500'
                          : ing.status === 'in_progress'
                          ? 'bg-yellow-500'
                          : 'bg-gray-400'
                      }`}
                    >
                      {ing.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
