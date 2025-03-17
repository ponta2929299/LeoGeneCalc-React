import React, { useState, useEffect } from 'react';
import { fetchGenes } from '../api';  // api.jsからインポート

function GeneList() {
  const [genes, setGenes] = useState([]);  // genesという状態を作成

  useEffect(() => {
    // APIからgenesを取得して状態を更新
    fetchGenes()
      .then(data => setGenes(data))  // データをgenesに設定
      .catch(error => console.error("Error fetching genes:", error));  // エラーハンドリング
  }, []);  // コンポーネントの初回レンダリング時のみ実行される

  return (
    <div>
      <h1>Genes List</h1>
      <ul>
        {genes.length > 0 ? (
          genes.map(gene => (
            <li key={gene.id}>{gene.name}</li>  // 各geneのnameを表示
          ))
        ) : (
          <p>Loading...</p>  // データが読み込まれるまで表示
        )}
      </ul>
    </div>
  );
}

export default GeneList;
