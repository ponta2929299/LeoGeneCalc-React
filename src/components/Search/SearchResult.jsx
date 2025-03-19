import { useState } from "react";
import {Paper} from "@mui/material";

function SearchResults({ results }) {
  const [selectedMorph, setSelectedMorph] = useState(null);

  const handleClick = (morph) => {
    setSelectedMorph(morph);
  };

  console.log(results);
  const allResults = [...(results.morphs || []), ...(results.combo_morphs || [])];

  return (
    <div>
      <h2>検索結果</h2>
      
      {allResults.length >0 ? (
      <ul>
        {allResults.map((morph) => (
          <li key={morph.id || morph.combo_morph_name} onClick={() => handleClick(morph)}>
            {morph.morph_name || morph.combo_morph_name}
          </li>
        ))}
      </ul>
      ):(
        <p>該当するデータがありません。</p>
      )}
      
      <div>
      {selectedMorph && (
        <Paper style={{padding:'16px'}}>
          <h3>詳細情報</h3>
          {selectedMorph.combo_morph_name ? (
            <p><strong>コンボモルフ内容: </strong>{selectedMorph.description}</p>
          ) : (
            <>
             <p><strong>モルフ名: </strong> {selectedMorph.morph_name || selectedMorph.combo_morph_name}</p>
             <p><strong>遺伝子型: </strong> {selectedMorph.gene_type?.gene_type_display}</p>
             <p><strong>備考: </strong> {selectedMorph.morph_detail || selectedMorph.combo_detail}</p>
            </>
          )}
        </Paper>
      )}
      </div>
    </div>
  );
}

export default SearchResults;