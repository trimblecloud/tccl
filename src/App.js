// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Paper, Grid, List, ListItem, ListItemText, createTheme, ThemeProvider, Avatar } from '@mui/material';
import Home from './components/Home';
import Events from './components/Events';
import Participants from './components/Participants';
import logo from './components/logo/trimble-cloud-championship-league-logo.png'; // Import your logo

function App() {
  // Define a theme based on the logo's color scheme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1a237e', // Dark blue from the logo
      },
      secondary: {
        main: '#00bcd4', // Light blue from the logo
      },
      background: {
        default: '#f5f5f5', // Light background
        paper: '#161b22', // Darker paper background
      },
      text: {
        primary: '#ffffff', // White text for contrast
        secondary: '#b3b3b3', // Lighter text for secondary elements
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(26, 35, 126, 0.7)', // Semi-transparent primary color
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow for depth
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px', // Smooth edges for paper components
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: '8px', // Smooth edges for avatars
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Avatar src={logo} alt="Trimble Cloud Championship League Logo" sx={{ width: 40, height: 40, marginRight: '16px' }} />
              <Typography variant="h6" component="div">
                Trimble Cloud Championship League
              </Typography>
            </Box>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '16px' }}>
              Home
            </Link>
            <Link to="/events" style={{ color: 'white', textDecoration: 'none', marginRight: '16px' }}>
              Events
            </Link>
            <Link to="/participants" style={{ color: 'white', textDecoration: 'none' }}>
              Participants
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/participants" element={<Participants />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;