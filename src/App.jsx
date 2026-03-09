import { useState } from 'react';
import data from './commandsData.json';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null); // New state to track what was copied

  const filteredCommands = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.problem.toLowerCase().includes(searchLower) ||
      item.tags.toLowerCase().includes(searchLower)
    );
  });

  // The function to handle the copy action
  const handleCopy = (id, commandText) => {
    navigator.clipboard.writeText(commandText); // Uses the browser's clipboard API
    setCopiedId(id); // Set the button to "Copied!"

    // Reset it back to "Copy" after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <header className="mb-12 text-center mt-8">
          <h1 className="text-4xl font-bold text-emerald-400 mb-3 tracking-tight">System Commands Hub 💻</h1>
          <p className="text-slate-400 text-lg">Search for standard settings and terminal commands.</p>
        </header>

        {/* Search Bar */}
        <div className="mb-10 relative">
          <input
            type="text"
            placeholder="What are you trying to fix? (e.g., DNS, Laravel, Git...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-lg shadow-lg placeholder-slate-500"
          />
        </div>

        {/* Filtered Cards */}
        <div className="flex flex-col gap-6">
          {filteredCommands.map((item) => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg hover:border-slate-500 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                  {item.os}
                </span>
              </div>
              <p className="text-slate-300 mb-5 leading-relaxed">{item.problem}</p>

              {/* Code Block & Copy Button */}
              <div className="relative group mt-4">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative flex justify-between items-center bg-black rounded-lg border border-slate-800 overflow-hidden">
                  <code className="text-emerald-400 p-4 font-mono text-sm overflow-x-auto w-full">
                    {item.command}
                  </code>

                  {/* The Interactive Button */}
                  <button
                    onClick={() => handleCopy(item.id, item.command)}
                    className={`px-4 py-2 mr-2 rounded font-semibold text-sm transition-all whitespace-nowrap ${copiedId === item.id
                        ? 'bg-emerald-500 text-black'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                  >
                    {copiedId === item.id ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredCommands.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-xl">No commands found. Try a different search!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;