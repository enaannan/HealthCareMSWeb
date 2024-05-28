import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Toolbar, AppBar, Typography, Box } from '@mui/material';
import SideNavBar from './SideBar';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Healthcare Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <SideNavBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: '200px' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
