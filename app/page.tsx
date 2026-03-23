"use client";

import { useState } from "react";

export default function Home() {
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEmail = async () => {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ purpose, tone, context }),
    });

    const data = await res.json();
    setOutput(data.output);

    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl space-y-4">

        <h1 className="text-3xl font-bold text-center">
          AI Email Generator
        </h1>

        <input
          className="w-full p-3 rounded bg-black border border-gray-700"
          placeholder="Purpose (e.g. Request internship)"
          onChange={(e) => setPurpose(e.target.value)}
        />

        <select
          className="w-full p-3 rounded bg-black border border-gray-700"
          onChange={(e) => setTone(e.target.value)}
        >
          <option>Professional</option>
          <option>Friendly</option>
        </select>

        <textarea
          className="w-full p-3 rounded bg-black border border-gray-700"
          placeholder="Context"
          rows={4}
          onChange={(e) => setContext(e.target.value)}
        />

        <button
          onClick={generateEmail}
          className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition"
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>

        {output && (
          <div className="bg-black border border-gray-700 p-4 rounded space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Generated Email</h2>
              <button
                onClick={copyText}
                className="text-sm bg-gray-800 px-2 py-1 rounded hover:bg-gray-700"
              >
                Copy
              </button>
            </div>

            <pre className="whitespace-pre-wrap text-sm">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}