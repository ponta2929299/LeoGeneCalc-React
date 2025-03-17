import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ morphs: [], combo_morphs: [] });

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?search=${searchTerm}`);
      const data = await response.json();
      setResults(data);  // 検索結果を更新
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Morphs or ComboMorphs"
      />
      <button onClick={handleSearch}>Search</button>
    
      <div>
        <h3>Morphs</h3>
        <ul>
          {results.morphs.length > 0? (
            results.morphs.map((morph) => (
              <li key={morph.id}>{morph.morph_name}</li>
          ))
        ):(
            <p>No morphs found</p>
        )}
        </ul>
      </div>

      <div>
        <h3>ComboMorphs</h3>
        <ul>
          {results.combo_morphs.length > 0 ?(
            results.combo_morphs.map((combo) => (
            <li key={combo.combo_morph_name}>
              {combo.combo_morph_name}
            </li>
            ))
          ) : (
            <p>No combo morphs found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Search;
