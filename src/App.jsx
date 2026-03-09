import { useState } from 'react';
import data from './commandsData.json';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Filter the data based on the search term
  const filteredCommands = data.filter((item) => {
    // Convert everything to lowercase so the search isn't case-sensitive
    const searchLower = searchTerm.toLowerCase();

    // Check if the search text matches the title, problem, OR tags
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.problem.toLowerCase().includes(searchLower) ||
      item.tags.toLowerCase().includes(searchLower)
    );
  });
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>System Commands Hub 💻</h1>

      {/* The Search Bar */}
      <input
        type="text"
        placeholder="Search for a problem or command... (e.g., DNS, Git)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />

      {/* The Filtered Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredCommands.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', color: 'gray', textTransform: 'uppercase' }}>{item.os}</span>
            <h3 style={{ margin: '5px 0' }}>{item.title}</h3>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{item.problem}</p>
            <code style={{ backgroundColor: '#f4f4f4', padding: '5px 10px', display: 'block', borderRadius: '4px' }}>
              {item.command}
            </code>
          </div>
        ))}
      </div>

      {/* Show a message if no results are found */}
      {filteredCommands.length === 0 && (
        <p style={{ textAlign: 'center', color: 'gray' }}>No commands found. Try a different search!</p>
      )}
    </div>
  );
}

export default App;