import React, { useState, useEffect } from 'react';
import { fetchComboMorphs } from '../api'; 

function ComboMorphList() {
  const [combomorphs, setComboMorphs] = useState([]); 
  useEffect(() => {
    fetchComboMorphs()
      .then(data => {
        console.log("取得したデータ：",data);
        setComboMorphs(data);
      })
      .catch(error => console.error("Error fetching combomorphs:", error)); // エラーハンドリング
  }, []); // 初回レンダリング時のみ実行
  console.log("現在の combo-morphs", combomorphs)

  return (
    <div>
      <h1>ComboMorphs List</h1>
      <ul>
        {combomorphs.length > 0 ? (
          combomorphs.map(combomorph => (
            <li key={combomorph.combo_morph_name}>{combomorph.combo_morph_name}</li> 
          ))
        ) : (
          <p>Loading...</p> // データ取得中は「Loading...」を表示
        )}
      </ul>
    </div>
  );
}

export default ComboMorphList;
