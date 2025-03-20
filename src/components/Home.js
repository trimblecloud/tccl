// components/Home.js
import React from 'react';
import { Paper, Typography, Grid, List, ListItem, ListItemText, Box, Avatar } from '@mui/material';

// Import your house logos here
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

const Home = () => {
  const leaderBoard = [
    { house: 1, houseName: "The Yellow Sparks", points: 110, logo: yellowSparksLogo },
    { house: 2, houseName: "Sparta", points: 10, logo: spartaLogo },
    { house: 3, houseName: "Mission FunPossible", points: 50, logo: missionFunPossibleLogo },
  ];

  const topPlayers = [
    { name: 'Alice', house: 1, event: 'Badminton' },
    { name: 'Bob', house: 2, event: 'Chess' },
    { name: 'Charlie', house: 1, event: 'Table Tennis' },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Leaderboard
          </Typography>
          <List>
            {leaderBoard.map((item) => (
              <ListItem key={item.house}>
                <Box display="flex" alignItems="center">
                  <Avatar src={item.logo} alt={`${item.houseName} Logo`} sx={{ width: 40, height: 40, borderRadius: '8px', marginRight: '16px' }} />
                  <ListItemText primary={item.houseName} secondary={`Points: ${item.points}`} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Top Players (Recent Event)
          </Typography>
          <List>
            {topPlayers.map((player, index) => (
              <ListItem key={index}>
                <ListItemText primary={player.name} secondary={`House ${player.house} - ${player.event}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;