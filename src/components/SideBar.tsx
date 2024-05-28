import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { NavLink } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';

const navItems = [
  { text: 'Officer Dashboard', path: '/officer/dashboard', icon: <SpaceDashboardIcon /> },
  { text: 'Patient Dashboard', path: '/patient/dashboard', icon: <SpaceDashboardIcon /> },
  { text: 'Officer Consultations', path: '/officer/consultations', icon: <AssignmentIcon /> },
  { text: 'Patient Consultations', path: '/patient/consultations', icon: <AssignmentIcon /> },
];

const SideNavBar: React.FC = () => {
  return (
    <Drawer variant="permanent">
      <List>
        {navItems.map((item, index) => (
          <ListItem button component={NavLink} to={item.path} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavBar;
