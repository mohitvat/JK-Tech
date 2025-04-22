"use client"
import { useState } from 'react';

export default function QAInterface() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    setSources([]);

    // Simulate API call
    setTimeout(() => {
      setAnswer("This is a mock answer generated based on your documents.");
      setSources([
        {
          documentName: 'report.pdf',
          excerpt: 'This section discusses the impact of market volatility on projected revenues.',
        },
        {
          documentName: 'proposal.docx',
          excerpt: 'The main objective is to improve efficiency by 40% through automation.',
        },
      ]);
      setLoading(false);
    }, 2000);

   
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Q&A Interface</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow border p-2 rounded"
        />
        <button
          onClick={handleAsk}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ask
        </button>
      </div>

      {loading && <p className="text-gray-500">Generating answer...</p>}

      {answer && (
        <div className="mt-4 bg-white border rounded p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Answer</h2>
          <p className="text-gray-800">{answer}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Sources</h2>
          <ul className="space-y-3">
            {sources.map((src, idx) => (
              <li key={idx} className="p-3 border rounded bg-gray-50">
                <p className="text-sm text-gray-500">{src.documentName}</p>
                <p className="text-gray-700">{src.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
