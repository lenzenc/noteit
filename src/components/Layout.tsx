import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightPanel from './RightPanel';

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <TopBar onMenuClick={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
            minWidth: 0, // Allow flexbox to shrink below content width
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              p: 4,
              minWidth: 0, // Allow flexbox to shrink below content width
            }}
          >
            <Outlet />
          </Box>
          <RightPanel />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;