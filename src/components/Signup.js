// Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box} from "@mui/material"

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email){
      setError("全てのフィールドを入力してください");
      return;
    }

    // メール形式の確認
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError("正しいメールアドレスを入力してください");
      return;
    }

    // パスワードの強度チェック（例：8文字以上）
    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      return;
    }
    
    try {
      await axios.post("http://localhost:8000/api/signup/", {
        username,
        password,
        email,
      });
      alert("ユーザー登録成功");
      navigate("/")

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "ユーザー登録に失敗しました");
      } else {
        setError("サーバーエラーが発生しました");
      }
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
      <Box sx={{marginRight: 2 }}>
        <TextField
          label="ユーザー名"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginRight: 10}} 
          fullWidth
        />
        <TextField
          label="Eメール"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginRight: 2 }} 
          fullWidth
        />
        <TextField
          label="パスワード"
          variant="outlined"
          value={password}
          type="password"
          onChange={(e) => setUsername(e.target.value)}
          sx={{ marginRight: 2 }} 
          fullWidth
        />
       <Button 
                 variant="contained" 
                 color="warning" 
                 onClick={handleSubmit} 
                 sx={{ marginTop: 2 }}
               >
                 登録する
               </Button>
      </Box>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
