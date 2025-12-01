import React, { useState } from "react";

export default function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const sendCode = async () => {
    const res = await fetch("http://localhost:3001/api/debug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResult(data.fixed || data.error || "No response");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Platform-Aware CodeDebugger AI</h1>

      <textarea
        className="w-full h-40 p-3 border rounded"
        placeholder="Paste your code here…"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <button
        onClick={sendCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Fix My Code
      </button>

      <pre className="mt-6 p-4 bg-gray-200 rounded whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
}
