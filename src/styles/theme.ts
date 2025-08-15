import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007aff',
      light: '#5babff',
      dark: '#0056d3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#667eea',
      light: '#9bb5ff',
      dark: '#4c63d2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff3b30',
    },
    warning: {
      main: '#ff9500',
    },
    success: {
      main: '#28ca42',
    },
    background: {
      default: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#8e8e93',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1d1d1f',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#1d1d1f',
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#8e8e93',
    },
    subtitle2: {
      fontSize: '0.875rem',
      color: '#8e8e93',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 16px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: '#007aff',
          '&:hover': {
            background: '#0056d3',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              '& fieldset': {
                borderColor: '#007aff',
                boxShadow: '0 0 0 3px rgba(0, 122, 255, 0.1)',
              },
            },
          },
        },
      },
    },
  },
});