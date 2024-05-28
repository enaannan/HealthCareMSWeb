import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, Toolbar, AppBar, Typography, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { NavItem, officerNavItems, patientNavItems, practitionerNavItems } from './navItems';
import SideNavBar from './SideBar';
import { Roles } from '../types/roles';

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const { user } = useAuth();

  let navItems: NavItem[] = [];
  if (user?.role_name === Roles.DOCTOR || user?.role_name === Roles.NURSE || user?.role_name === Roles.PHARMACIST) {
    navItems = practitionerNavItems;
  } else if (user?.role_name === Roles.PATIENT) {
    navItems = patientNavItems;
  } else if (user?.role_name === Roles.OFFICER) {
    navItems = officerNavItems;
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
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          width: `calc(100% - ${drawerWidth}px)`,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
