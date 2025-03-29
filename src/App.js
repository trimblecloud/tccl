// App.js
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, createTheme, ThemeProvider, Avatar, IconButton } from '@mui/material';
import { Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon } from '@mui/icons-material';
import Home from './components/Home';
import Events from './components/Events';
import Participants from './components/Participants';
import GuessGame from './components/GuessGame';
import Fixtures from './components/Fixtures';
import logo from './components/logo/trimble-cloud-championship-league-logo.png';

function App() {
  const [mode, setMode] = useState('dark');

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
                backgroundColor: mode === 'light' ? '#FFCF50' : 'rgba(30, 30, 30, 0.7)',
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

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette.background.default]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static" sx={{ borderRadius: 0 }}>
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Avatar src={logo} alt="Trimble Cloud Championship League Logo" sx={{ width: 40, height: 40, marginRight: '16px' }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  color: mode === 'light' ? '#000000' : '#ffffff',
                }}
              >
                Trimble Cloud Championship League
              </Typography>
            </Box>
            <Link
              to="/"
              style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                marginRight: '16px',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Home
            </Link>
            <Link
              to="/events"
              style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                marginRight: '16px',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Events
            </Link>
            <Link
              to="/fixtures"
              style={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                marginRight: '16px',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              Fixtures
            </Link>
            <Link
              to="/participants"
              style={{ 
                color: theme.palette.text.primary, 
                textDecoration: 'none', 
                marginRight: '16px', 
                fontFamily: theme.typography.fontFamily 
              }}
            >
              House Members
            </Link>
            <Link
              to="/guessgame"
              style={{ 
                color: theme.palette.text.primary, 
                textDecoration: 'none', 
                marginRight: '16px', 
                fontFamily: theme.typography.fontFamily 
              }}
            >
              Guess Game
            </Link>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/guessgame" element={<GuessGame />} />
          </Routes>
        </Container>
        <Box
          component="footer"
          sx={{
            backgroundColor: mode === 'light' ? '#FFCF50' : 'rgba(30, 30, 30, 0.7)',
            color: theme.palette.text.primary,
            padding: '16px',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2">A Team Building Initiative</Typography>
          <Typography variant="body2">Trimble Cloud © 2025</Typography>
          {/* <Typography variant="body2">Tag us in House Chat if you would like to make this site better</Typography> */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;