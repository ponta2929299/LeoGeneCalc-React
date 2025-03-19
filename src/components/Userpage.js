import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button } from '@mui/material';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // APIからユーザー情報を取得
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');

          if (!token){
            console.error('トークンが見つかりません。ログインしてください。');
                setError('認証エラー: トークンがありません');
                setLoading(false);
                return;
            }

          try {
            const response = await fetch('http://127.0.0.1:8000/api/user/', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,  // 正しいJWTトークン設定
                'Content-Type': 'application/json',  // ヘッダーにJSON指定を追加
            },
        });
    
            if (response.ok) {
              const data = await response.json();
              setUser(data);  // ユーザー情報をセット
            } else {
              console.error(`Error fetching user data: ${response.status}`);
              setError(`ユーザー情報の取得に失敗しました (エラーコード: ${response.status})`);
            }
          } catch (error) {
            console.error('Fetch error:', error);
            setError('ネットワークエラーが発生しました');
          }finally{
            setLoading(false);
          }
        };
    
        fetchUser();
      }, []);

      const handleDeleteAccount = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            alert('ログインしていません。');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/delete/', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('アカウントが削除されました。');
                localStorage.removeItem('access_token');  // ログアウト
                window.location.href = '/';  // トップページにリダイレクト
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'アカウントの削除に失敗しました');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('ネットワークエラーが発生しました');
        }
    };
    
      if (loading) {
        return <CircularProgress />;  // ロード中はスピナー表示
      }

      if (error) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

      return(
        <Box>
            <Box sx={{ maxWidth: 600, width: '100%' }}>
                <Typography variant='h4'>
                    {user.username}
                </Typography>
                {user ? (
                    <Box sx={{ display: 'block', marginTop: 2 }}>
                        <Typography variant='h6' paddingTop={2}>ユーザー名: {user.username}</Typography>
                        <Typography variant='h6'>Eメール: {user.email}</Typography>
                        <Typography variant='body1' sx={{ marginTop: 2 }}>所有モルフ</Typography>
                        <Typography variant='body1' sx={{ marginTop: 2 }}>お気に入りのモルフ</Typography>
                        <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteAccount}
                        sx={{ marginTop: 2 }}
                    >
                        アカウント削除
                    </Button>
                    </Box>
                  ):(
                    <Typography>No user data found</Typography>
                  )}
            </Box>
        </Box>
      );
    };

export default UserPage;