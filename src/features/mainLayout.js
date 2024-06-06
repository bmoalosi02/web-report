import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Divider, Drawer, List, ListItem, ListItemText, Toolbar, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ReportIcon from '@mui/icons-material/Assessment';
import SalesIcon from '@mui/icons-material/BarChart';
import UserIcon from '@mui/icons-material/Group';

// Define the styled components
const drawerWidth = 240;
const miniDrawerWidth = 60;

const RootContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: '#f0f0f0', // Gray background color
  minHeight: '100vh',
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : miniDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : miniDrawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
}));

const DrawerPaper = styled('div')({
  borderRadius: '0 24px 24px 0', // Rounded corners for the drawer
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ContentContainer = styled(Box)(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: open ? drawerWidth : miniDrawerWidth,
  transition: theme.transitions.create('margin-left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const LogoContainer = styled(Box)(({ theme, open }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '100%',
  height: open ? 'auto' : 40,
  overflow: 'hidden',
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const LogoImg = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const NavigationLink = styled(ListItem)(({ theme, current }) => ({
  fontWeight: current ? 'bold' : 'normal',
  backgroundColor: current ? '#e0e0e0' : 'transparent',
  justifyContent: 'center',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

export const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <RootContainer>
      {/* Side Navigation */}
      <StyledDrawer variant="permanent" open={open}>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <DrawerPaper>
          <LogoContainer open={open}>
            <LogoImg src="/path/to/company-logo.png" alt="Company Logo" />
          </LogoContainer>
          <Divider />
          <List>
            <NavigationLink
              button
              component={Link}
              to="/reports-page"
              current={location.pathname === '/reports-page'}
            >
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Stock Movement Report" />}
            </NavigationLink>
            <NavigationLink
              button
              component={Link}
              to="/sales-history"
              current={location.pathname === '/sales-history'}
            >
              <ListItemIcon>
                <SalesIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Sales History" />}
            </NavigationLink>
            <NavigationLink
              button
              component={Link}
              to="/user-management-page"
              current={location.pathname === '/user-management-page'}
            >
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              {open && <ListItemText primary="User Management" />}
            </NavigationLink>
          </List>
        </DrawerPaper>
      </StyledDrawer>

      {/* Content Area */}
      <ContentContainer component="main" open={open}>
        {children}
      </ContentContainer>
    </RootContainer>
  );
};
