import React, { useState } from 'react';
import SearchResults from "./SearchResult";
import { Button, TextField } from "@mui/material"
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search/?search=${searchTerm}`);
      const data = await response.json();
      console.log('Data:', data);
      setResults(data);  // 検索結果を更新
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div>
      <div>
        <TextField
          label="モルフを探す"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
        <Button 
          variant="contained" 
          color="warning" 
          endIcon={<SavedSearchIcon/>}
          onClick={handleSearch} 
          sx={{ marginTop: 2 }}
        >
          検索
        </Button>
      </div>

        <SearchResults results={results}/>
    </div>
  );
}

export default Search;
