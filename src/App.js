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
        marginRight: '4px',
        borderRadius: '20px',
        padding: '6px 12px',
        minWidth: 'auto',
        textTransform: 'none',
        fontSize: '0.9rem',
        letterSpacing: '0.3px',
        fontWeight: isActive ? 600 : 500,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: isActive 
          ? (theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)')
          : 'transparent',
        boxShadow: isActive 
          ? (theme.palette.mode === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.2)')
          : 'none',
        
        // Active indicator
        '&::after': isActive ? {
          content: '""',
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '3px',
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(90deg, #1a237e, #43cea2)'
            : 'linear-gradient(90deg, #90caf9, #ce93d8)',
          borderRadius: '3px',
          opacity: 1,
          transition: 'all 0.3s ease',
        } : {
          content: '""',
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '3px',
          background: theme.palette.mode === 'light' 
            ? 'linear-gradient(90deg, #1a237e, #43cea2)'
            : 'linear-gradient(90deg, #90caf9, #ce93d8)',
          borderRadius: '3px',
          opacity: 0,
          transition: 'all 0.3s ease',
        },
        
        // Hover styles
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.4)' 
            : 'rgba(255, 255, 255, 0.08)',
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 4px 10px rgba(0, 0, 0, 0.07)'
            : '0 4px 10px rgba(0, 0, 0, 0.15)',
        },
        
        // Hover indicator animation
        '&:hover::after': {
          width: '30px',
          opacity: 0.7,
        },
        
        // Ripple effect on click
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '5px',
          height: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          opacity: 0,
          borderRadius: '100%',
          transform: 'scale(1, 1) translate(-50%, -50%)',
          transformOrigin: '50% 50%',
        },
        
        '&:active::before': {
          animation: 'ripple 0.6s ease-out',
          '@keyframes ripple': {
            '0%': {
              opacity: 0.5,
            },
            '100%': {
              transform: 'scale(20, 20) translate(-50%, -50%)',
              opacity: 0,
            },
          },
        },
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
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
                backgroundImage: mode === 'light' 
                  ? 'linear-gradient(135deg, rgba(67, 206, 162, 0.85) 0%, rgba(24, 90, 157, 0.85) 100%)' 
                  : 'linear-gradient(135deg, rgba(45, 52, 71, 0.85) 0%, rgba(46, 7, 63, 0.85) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderBottom: mode === 'light' 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : '1px solid rgba(255, 255, 255, 0.05)',
                position: 'sticky',
                top: 0,
                transition: 'all 0.3s ease-in-out',
                zIndex: 1100,
              },
            },
          },
          MuiPaper: { styleOverrides: { root: { borderRadius: '12px' } } },
          MuiAvatar: { styleOverrides: { root: { borderRadius: '8px' } } },
          MuiButton: {
            styleOverrides: {
              root: {
                transition: 'all 0.3s ease',
              },
            },
          },
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
    // Use a small delay to prevent double triggering in touch events
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true);
    } else {
      // Add a small delay when closing to ensure smooth animation
      setTimeout(() => {
        setMobileMenuOpen(false);
      }, 50);
    }
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
    // Add overflow control to prevent unwanted horizontal scrolling
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.maxWidth = '100vw';
  }, [theme.palette.background.default]);

  // Mobile drawer menu
  const mobileDrawer = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      transitionDuration={{ enter: 400, exit: 300 }} // Control transition speed
      SlideProps={{ 
        easing: { enter: 'cubic-bezier(0.2, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 0.6, 1)' }
      }}
      disableScrollLock={false} // Prevent background scrolling when drawer is open
      BackdropProps={{
        sx: { backdropFilter: 'blur(3px)' }
      }}
      PaperProps={{
        sx: {
          width: { xs: '85%', sm: '75%', md: '60%' },
          maxWidth: '320px',
          borderTopLeftRadius: '24px',
          borderBottomLeftRadius: '24px',
          backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(46, 7, 63, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)' 
            : 'linear-gradient(135deg, rgba(46, 7, 63, 0.9) 0%, rgba(28, 5, 38, 0.9) 100%)',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'box-shadow 0.3s ease-in-out',
          padding: { xs: '12px 0', sm: '16px 0' }
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2.5, 
          pb: 1.5,
          borderBottom: '1px solid',
          borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
          mb: 1,
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: theme.typography.fontFamily,
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          Menu
        </Typography>
        <IconButton 
          onClick={toggleMobileMenu} 
          color="inherit"
          sx={{
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.07)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
            '&:hover': {
              backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.12)',
              transform: 'rotate(90deg)',
            },
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)'
          }}
        >
          <CloseIcon sx={{ fontSize: '1.3rem' }} />
        </IconButton>
      </Box>
      <List sx={{ pt: 0, px: 1 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            component={Link}
            to={item.path}
            key={item.path}
            onClick={handleMenuItemClick}
            sx={{
              py: 1.8,
              my: 0.5,
              borderRadius: '12px',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
              opacity: 1, // Set initial opacity to 1 to avoid flickering
              transform: 'translateX(0)', // Initialize with final position
              '&:hover': {
                backgroundColor: mode === 'light' 
                  ? 'rgba(67, 206, 162, 0.08)'
                  : 'rgba(144, 202, 249, 0.08)',
                transform: 'translateX(-4px)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                height: '60%',
                width: '4px',
                backgroundColor: mode === 'light' ? '#43cea2' : '#90caf9',
                transform: 'translateY(-50%) scaleY(0)',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease',
                borderRadius: '0 4px 4px 0',
              },
              '&:hover::before': {
                transform: 'translateY(-50%) scaleY(1)',
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: '44px', 
                color: theme.palette.text.primary,
                opacity: 0.85,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{ 
                sx: { 
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                } 
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ 
        my: 2, 
        opacity: 0.1, 
        mx: 2,
      }} />
      <Box sx={{ 
        p: 2, 
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between', 
          p: 1,
          borderRadius: '12px',
          backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)',
        }}>
          <Typography variant="body2" sx={{ 
            fontWeight: 500,
            letterSpacing: '0.2px',
          }}>
            Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Typography>
          <IconButton 
            onClick={toggleColorMode} 
            color="inherit" 
            title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            sx={{
              backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                transform: 'rotate(45deg)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {mode === 'light' ? <NightlightRoundIcon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ overflowX: 'hidden', width: '100%' }}>
        <AppBar 
          position="sticky" 
          elevation={scrolled ? 2 : 0} 
          className={scrolled ? 'navbar-scroll' : ''}
          sx={{ 
            borderRadius: 0,
            py: {
              xs: scrolled ? 0.1 : 0.3,
              sm: scrolled ? 0.2 : 0.5,
              md: scrolled ? 0.2 : 0.5
            },
            transition: 'all 0.3s ease-in-out',
            width: '100%',
            left: 0,
            right: 0
          }}>
          <Toolbar 
            disableGutters 
            sx={{ 
              flexWrap: 'nowrap',
              maxWidth: '1400px', 
              width: '100%', 
              mx: 'auto',
              px: { xs: 1.5, sm: 2, md: 3 },
              minHeight: {
                xs: '56px', // Smaller height on mobile
                sm: '64px' 
              },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative'
            }}>
            <Box 
              display="flex" 
              alignItems="center" 
              sx={{ 
                flexGrow: 1, 
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={logo} 
                  alt="Trimble Cloud Championship League Logo" 
                  sx={{ 
                    width: { xs: 34, sm: 38, md: 40 }, 
                    height: { xs: 34, sm: 38, md: 40 }, 
                    marginRight: { xs: '10px', sm: '12px', md: '16px' },
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px) scale(1.05)',
                      animation: 'pulse 1.5s infinite ease-in-out',
                    },
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }} 
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'flex-start', sm: 'flex-start' },
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 500,
                      color: mode === 'light' ? '#000000' : '#ffffff',
                      fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
                      letterSpacing: '0.5px',
                      textShadow: mode === 'light' ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease-in-out',
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: { xs: '120px', sm: '180px', md: '100%' }
                    }}
                  >
                    {isMobile ? 'TCCL' : 'Trimble Cloud Championship League'}
                  </Typography>
                  {!isMobile && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        color: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                        fontSize: { sm: '0.7rem', md: '0.75rem' },
                        letterSpacing: '0.3px',
                        mt: -0.5
                      }}
                    >
                      2025 Edition
                    </Typography>
                  )}
                </Box>
              </Link>
            </Box>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: { sm: 0.25, md: 0.5 },
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                  backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '28px',
                  padding: { sm: '3px 6px', md: '4px 8px' },
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  border: mode === 'light' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
                  overflow: 'auto',
                  flexWrap: { sm: 'nowrap', lg: 'wrap' },
                  maxWidth: { sm: 'calc(100vw - 220px)', md: 'none' },
                  msOverflowStyle: 'none', /* IE and Edge */
                  scrollbarWidth: 'none', /* Firefox */
                  '&::-webkit-scrollbar': { 
                    display: 'none' /* Chrome, Safari, Opera */
                  }
                }}
              >
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
                  sx={{ 
                    ml: 1,
                    backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                      transform: 'rotate(45deg)',
                    },
                  }} 
                  title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                  {mode === 'light' ? <NightlightRoundIcon /> : <Brightness7Icon />}
                </IconButton>
              </Box>
            )}
            
            {/* Mobile Navigation */}
            {isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: { xs: '42px', sm: '44px' },
                  mr: { xs: '2px', sm: '4px' }
                }}
              >
                <IconButton 
                  edge="end" 
                  color="inherit" 
                  aria-label="menu"
                  onClick={toggleMobileMenu}
                  sx={{ 
                    backgroundColor: mode === 'light' ? '#333333' : 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    width: { xs: '40px', sm: '42px' },
                    height: { xs: '40px', sm: '42px' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                    '&:hover': {
                      backgroundColor: mode === 'light' ? '#444444' : 'rgba(255, 255, 255, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <MenuIcon sx={{ fontSize: { xs: '1.4rem', sm: '1.5rem' }, color: '#ffffff' }} />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        
        {/* Mobile Menu Drawer */}
        {mobileDrawer}
        
        <Box 
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            overflow: 'hidden',
            paddingTop: '20px',
            maxWidth: '100vw',
          }}
        >
          <Container 
            maxWidth="md" 
            sx={{ 
              width: '100%',
              paddingLeft: { xs: '16px', sm: '24px' },
              paddingRight: { xs: '16px', sm: '24px' },
              overflowX: 'hidden',
            }}
          >
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
        </Box>
        
        <Box
          component="footer"
          sx={{
            backgroundColor: mode === 'light' ? '#43cea2' : 'rgba(30, 30, 30, 0.7)',
            color: theme.palette.text.primary,
            padding: '16px',
            marginTop: 'auto', /* Push footer to bottom */
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">A Team Building Initiative</Typography>
          <Typography variant="body2">Trimble Cloud © 2025</Typography>
        </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;