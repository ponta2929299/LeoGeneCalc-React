import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'gray' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>
          〜 Leopard Geckos 〜
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
