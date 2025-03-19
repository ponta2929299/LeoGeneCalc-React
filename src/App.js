import React from 'react';
import Search from './components/Search/Search';  // Searchコンポーネントをインポート
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/SideBar/Sidebar';
import UserPage from './components/Userpage';
import Navbar from './components/NavBar';


function App(){
  return(
    <Router>
      <Navbar />
      <div>
        <Sidebar style={{display: 'flex',zIndex: 500,}}/>

        {/* 左側のコンテンツエリア */}
        <div style={{display: "flex", justifyContent:"flex-start",paddingTop:100, marginLeft: 50,marginRight: 50,}}>
          <Routes>
            <Route path="/" element={<Search />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;