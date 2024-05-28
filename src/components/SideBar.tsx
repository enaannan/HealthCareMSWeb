import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { NavItem } from './navItems';

interface SideNavBarProps {
  navItems: NavItem[];
}

const drawerWidth = 240;

const SideNavBar: React.FC<SideNavBarProps> = ({ navItems }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', top: 64 },
      }}
    >
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
