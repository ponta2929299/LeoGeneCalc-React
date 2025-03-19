import React, { useEffect, useState } from 'react';
import { Drawer, ListItem, ListItemText,} from '@mui/material';
import { Link,useNavigate } from 'react-router-dom'; // ログインとサインアップのリンクを追加するためにreact-router-domを使用

const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // ローカルストレージからトークンを取得して、ログイン状態を判定
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token); // トークンがあればログイン状態にする
      },[localStorage.getItem("access_token")]);

      const handleLogout = () => {
        localStorage.removeItem("access_token"); // JWTトークン削除
        localStorage.removeItem("refresh_token"); // 必要ならrefreshトークンも削除
        setIsLoggedIn(false); // ログイン状態を更新
        navigate("/"); 
    };
    
    return(
        <Drawer
        sx={{
            width: 150,
            flexShrink: 0,
            '& .MuiDrawer-paper':{
                width: 150,
                top: 64,
                boxSizing: 'border-box',
            }
        }}
        variant='permanent'
        anchor='right'
        >
            {!isLoggedIn && (
                <>
                  <ListItem button component={Link} to="/">
                    <ListItemText primary="モルフ検索" sx={{ textAlign: 'center' }} />
                  </ListItem>
                  <ListItem button component={Link} to="/login">
                    <ListItemText primary="ログイン" sx={{ textAlign: 'center' }} />
                  </ListItem>
                  <ListItem button component={Link} to="/signup">
                    <ListItemText primary="新規登録" sx={{ textAlign: 'center' }} />
                  </ListItem>
                </>
            )}
            {isLoggedIn && (
                <>
                <ListItem button component={Link} to="/">
                  <ListItemText primary="モルフ検索" sx={{ textAlign: 'center' }} />
                </ListItem>
                <ListItem button component={Link} to="/user">
                  <ListItemText primary="プロフィール" sx={{ textAlign: 'center' }} />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <ListItemText primary="ログアウト" sx={{ textAlign: 'center' }} />
                </ListItem>
                </>
            )}
        </Drawer>
    );
};

export default Sidebar;