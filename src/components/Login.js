// Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password){
        setError("ユーザー名とパスワードを入力してください");
        return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      localStorage.setItem("access_token", response.data.access);
      
      alert("ログイン成功");
      navigate("/user");

    } catch (err) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <TextField
            label="ユーザー名"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
        />
        <TextField
            label="パスワード"
            variant="outlined"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginTop: 2 }}
            fullWidth
        />
        <Button 
          variant="contained" 
          color="warning" 
          onClick={handleSubmit} 
          sx={{ marginTop: 2 }}
        >
          ログイン
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
