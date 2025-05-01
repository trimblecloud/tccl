// App.js
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  createTheme, 
  ThemeProvider, 
  Avatar, 
  IconButton,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  Brightness4 as Brightness4Icon, 
  Brightness7 as Brightness7Icon,
  NightlightRound as NightlightRoundIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Event as EventIcon,
  People as PeopleIcon,
  ViewList as FixturesIcon,
  Games as GameIcon,
  Close as CloseIcon,
  PhotoLibrary as PhotoLibraryIcon,
  EmojiEvents as EmojiEventsIcon,
  Assessment as ViewListIcon
} from '@mui/icons-material';
import Home from './components/Home';
import Events from './components/Events';
import Participants from './components/Participants';
import GuessGame from './components/GuessGame';
import Fixtures from './components/Fixtures';
import Gallery from './components/Gallery';
import Winners from './components/Winners';
import Scores from './components/Scores';
import logo from './components/logo/trimble-cloud-championship-league-logo.png';

// Navigation menu items definition
const menuItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'Events', path: '/events', icon: <EventIcon /> },
  { label: 'Fixtures', path: '/fixtures', icon: <FixturesIcon /> },
  { label: 'Winners', path: '/winners', icon: <EmojiEventsIcon /> },
  { label: 'Scores', path: '/scores', icon: <ViewListIcon /> },
  { label: 'House Members', path: '/participants', icon: <PeopleIcon /> },
  { label: 'Guess Game', path: '/guessgame', icon: <GameIcon /> },
  { label: 'Gallery', path: '/gallery', icon: <PhotoLibraryIcon /> },
];

// Navigation link component that handles active state
const NavLink = ({ to, children, isMobile, theme, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  if (isMobile) {
    return null; // Mobile menu is handled separately
  }
  
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        marginRight: '8px',
        textTransform: 'none',
        position: 'relative',
        fontWeight: isActive ? 'bold' : 'normal',
        '&::after': isActive ? {
          content: '""',
          position: 'absolute',
          bottom: '5px',
          left: '20%',
          width: '60%',
          height: '3px',
          backgroundColor: theme.palette.mode === 'light' ? '#1a237e' : '#90caf9',
          borderRadius: '2px'
        } : {},
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }
      }}
    >
      {children}
    </Button>
  );
};

function App() {
  const [mode, setMode] = useState(() => {
    // Check localStorage for saved theme preference, default to 'light' if none found
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || 'light';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1a237e' },
                secondary: { main: '#00bcd4' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
                text: { primary: '#000000', secondary: '#757575' },
              }
            : {
                primary: { main: '#90caf9' },
                secondary: { main: '#ce93d8' },
                background: { default: '#121212', paper: '#2E073F' },
                text: { primary: '#ffffff', secondary: '#b0bec5' },
              }),
        },
        typography: { fontFamily: ['Bree Serif', 'serif'].join(',') },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#43cea2' : 'rgba(30, 30, 30, 0.7)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              },
            },
          },
          MuiPaper: { styleOverrides: { root: { borderRadius: '12px' } } },
          MuiAvatar: { styleOverrides: { root: { borderRadius: '8px' } } },
        },
      }),
    [mode]
  );

  // Check if screen is mobile size
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      // Save the theme preference to localStorage
      localStorage.setItem('theme-mode', newMode);
      return newMode;
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  // Mobile drawer menu
  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: '70%',
          maxWidth: '300px',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          backgroundColor: mode === 'light' ? '#ffffff' : '#2E073F',
          backgroundImage: 'none',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pb: 1 }}>
        <Typography variant="h6" sx={{ fontFamily: theme.typography.fontFamily }}>
          Menu
        </Typography>
        <IconButton onClick={toggleMobileMenu} color="inherit">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => (
          <ListItemButton
            component={Link}
            to={item.path}
            key={item.path}
            onClick={handleMenuItemClick}
            sx={{
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px', color: theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ 
                sx: { fontFamily: theme.typography.fontFamily } 
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit" title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            {mode === 'light' ? <NightlightRoundIcon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static" sx={{ borderRadius: 0 }}>
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Avatar src={logo} alt="Trimble Cloud Championship League Logo" sx={{ width: 40, height: 40, marginRight: '16px' }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  color: mode === 'light' ? '#000000' : '#ffffff',
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                {isMobile ? 'TCCL' : 'Trimble Cloud Championship League'}
              </Typography>
            </Box>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <NavLink 
                    key={item.path} 
                    to={item.path} 
                    theme={theme} 
                    isMobile={isMobile}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <IconButton 
                  onClick={toggleColorMode} 
                  color="inherit" 
                  sx={{ ml: 1 }} 
                  title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                  {mode === 'light' ? <NightlightRoundIcon /> : <Brightness7Icon />}
                </IconButton>
              </Box>
            )}
            
            {/* Mobile Navigation */}
            {isMobile && (
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu"
                onClick={toggleMobileMenu}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        
        {/* Mobile Menu Drawer */}
        {mobileDrawer}
        
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/winners" element={<Winners />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/guessgame" element={<GuessGame />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Container>
        
        <Box
          component="footer"
          sx={{
            backgroundColor: mode === 'light' ? '#43cea2' : 'rgba(30, 30, 30, 0.7)',
            color: theme.palette.text.primary,
            padding: '16px',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">A Team Building Initiative</Typography>
          <Typography variant="body2">Trimble Cloud © 2025</Typography>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;