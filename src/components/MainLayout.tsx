import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Toolbar, AppBar, Typography, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { NavItem, officerNavItems, patientNavItems } from './navItems';
import SideNavBar from './SideBar';


const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const { user } = useAuth();

  let navItems: NavItem[] = [];
  if (user?.role_name === 'officer') {
    navItems = officerNavItems;
  } else if (user?.role_name === 'patient') {
    navItems = patientNavItems;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Healthcare Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <SideNavBar navItems={navItems} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8, ml: `${drawerWidth}px` }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
