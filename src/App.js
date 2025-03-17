import React from 'react';
import Search from './components/search';  // Searchコンポーネントをインポート

function find() {
  return (
    <div className="find">
      <h1>Search Morphs and ComboMorphs</h1>
      <Search />  {/* Seachコンポーネントを表示 */}
    </div>
  );
}

export default find;
