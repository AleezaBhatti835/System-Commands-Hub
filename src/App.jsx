import { useState } from 'react';
import data from './commandsData.json';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // NEW: State to track which category tab is currently active
  const [activeTab, setActiveTab] = useState("All");

  // NEW: Automatically extract unique categories from your data!
  // The 'Set' object in JavaScript automatically removes duplicates.
  const categories = ["All", ...new Set(data.map((item) => item.os))];

  // UPDATED: Filter by BOTH the search term AND the active category tab
  const filteredCommands = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();

    // 1. Check if it matches the search bar
    const matchesSearch =
      item.title.toLowerCase().includes(searchLower) ||
      item.problem.toLowerCase().includes(searchLower) ||
      item.tags.toLowerCase().includes(searchLower);

    // 2. Check if it matches the clicked category button
    const matchesTab = activeTab === "All" || item.os === activeTab;

    // It must match BOTH to show up on the screen
    return matchesSearch && matchesTab;
  });

  const handleCopy = (id, commandText) => {
    navigator.clipboard.writeText(commandText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-3xl mx-auto">

        <header className="mb-12 text-center mt-8">
          <h1 className="text-4xl font-bold text-emerald-400 mb-3 tracking-tight">System Commands Hub 💻</h1>
          <p className="text-slate-400 text-lg">Search for standard settings and terminal commands.</p>
        </header>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="What are you trying to fix? (e.g., DNS, backend, Git...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-lg shadow-lg placeholder-slate-500"
          />
        </div>

        {/* NEW: The Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${activeTab === category
                  ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

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

              <div className="relative group mt-4">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative flex justify-between items-center bg-black rounded-lg border border-slate-800 overflow-hidden">
                  <code className="text-emerald-400 p-4 font-mono text-sm overflow-x-auto w-full whitespace-nowrap">
                    {item.command}
                  </code>

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
            <p className="text-slate-500 text-xl">No commands found for this filter. Try clearing your search!</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;