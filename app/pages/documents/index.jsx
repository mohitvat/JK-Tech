"use client"

import { useEffect, useState } from 'react';
import DocumentUpload from '@/app/components/DocumentUpload';
import DocumentList from '@/app/components/DocumentList';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
  
    setDocuments([
      { id: 1, name: 'ProjectProposal.pdf', uploadedAt: '2025-04-21' },
      { id: 2, name: 'Specs.docx', uploadedAt: '2025-04-20' },
    ]);
  }, []);

  const handleUpload = (newDoc) => {
    setDocuments([...documents, { ...newDoc, id: Date.now(), uploadedAt: new Date().toISOString().split('T')[0] }]);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Upload & Management</h1>
      <DocumentUpload onUpload={handleUpload} />
      <div className="mt-6">
        <DocumentList documents={documents} onDelete={handleDelete} />
      </div>
    </div>
  );
}
