import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notes as NotesIcon,
  TaskAlt as TaskIcon,
  Schedule as ScheduleIcon,
  Description as FileIcon,
  ShoppingCart as CartIcon,
  PhoneAndroid as PhoneIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  SmartToy as AIIcon,
  Code as CodeIcon,
  Architecture as ArchitectureIcon,
  Group as TeamIcon,
} from '@mui/icons-material';
import type { NavigationSection } from '../types';

const drawerWidth = 280;

const navigationSections: NavigationSection[] = [
  {
    title: 'Navigation',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
      { id: 'notes', label: 'All Notes', icon: '📝', path: '/notes' },
      { id: 'tasks', label: 'Tasks', icon: '✅', path: '/tasks' },
      { id: 'due-today', label: 'Due Today', icon: '⏰', path: '/due-today' },
      { id: 'textmate', label: 'TextMate Files', icon: '📄', path: '/textmate' },
    ],
  },
  {
    title: 'Projects',
    items: [
      { id: 'ecommerce', label: 'E-commerce Platform', icon: '🛒', path: '/projects/ecommerce' },
      { id: 'mobile', label: 'Mobile App Refresh', icon: '📱', path: '/projects/mobile' },
      { id: 'security', label: 'Security Audit', icon: '🔒', path: '/projects/security' },
      { id: 'cloud', label: 'Cloud Migration', icon: '☁️', path: '/projects/cloud' },
      { id: 'ai', label: 'AI Integration', icon: '🤖', path: '/projects/ai' },
    ],
  },
  {
    title: 'Categories',
    items: [
      { id: 'development', label: 'Development', icon: '💻', path: '/categories/development' },
      { id: 'architecture', label: 'Architecture', icon: '🏗️', path: '/categories/architecture' },
      { id: 'team', label: 'Team Management', icon: '👥', path: '/categories/team' },
      { id: 'analytics', label: 'Analytics', icon: '📊', path: '/categories/analytics' },
    ],
  },
];

const getIconComponent = (icon: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    '📊': <DashboardIcon />,
    '📝': <NotesIcon />,
    '✅': <TaskIcon />,
    '⏰': <ScheduleIcon />,
    '📄': <FileIcon />,
    '🛒': <CartIcon />,
    '📱': <PhoneIcon />,
    '🔒': <SecurityIcon />,
    '☁️': <CloudIcon />,
    '🤖': <AIIcon />,
    '💻': <CodeIcon />,
    '🏗️': <ArchitectureIcon />,
    '👥': <TeamIcon />,
  };
  return iconMap[icon] || <span>{icon}</span>;
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, pt: 2 }}>
      {navigationSections.map((section, index) => (
        <Box key={section.title}>
          {index > 0 && <Divider sx={{ my: 2 }} />}
          <Typography
            variant="caption"
            sx={{
              px: 3,
              py: 1,
              display: 'block',
              color: '#8e8e93',
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {section.title}
          </Typography>
          <List>
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      px: 3,
                      py: 1,
                      position: 'relative',
                      backgroundColor: isActive ? 'rgba(0, 122, 255, 0.15)' : 'transparent',
                      color: isActive ? '#007aff' : '#1d1d1f',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 122, 255, 0.08)',
                      },
                      '&::after': isActive
                        ? {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: 3,
                            backgroundColor: '#007aff',
                          }
                        : {},
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: 'inherit',
                        opacity: 0.8,
                      }}
                    >
                      {getIconComponent(item.icon)}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'relative',
            height: '100%',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;