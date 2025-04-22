export default function DocumentList({ documents, onDelete }) {
    if (!documents.length) return <p className="text-gray-500">No documents uploaded yet.</p>;
  
    return (
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Uploaded At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-t">
              <td className="p-2">{doc.name}</td>
              <td className="p-2">{doc.uploadedAt}</td>
              <td className="p-2">
                <button
                  onClick={() => onDelete(doc.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  