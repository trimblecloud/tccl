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
  // Sort leaderboard by points in descending order
  const sortedLeaderBoard = leaderBoard.sort((a, b) => b.points - a.points);
  const captains = [
    { name: 'Sweatha S', house: 1, team_name: 'The Yellow Sparks' , logo: yellowSparksLogo },
    { name: 'Harivarthini R', house: 2, team_name: 'Sparta' , logo: spartaLogo},
    { name: 'Vishali Senniappan ', house: 3, team_name: 'Mission FunPossible', logo: missionFunPossibleLogo },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            background: 'linear-gradient(135deg, #FFEB3B 0%, #FF9800 100%)',
            color: '#000',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Leaderboard
          </Typography>
          <List>
            {sortedLeaderBoard.map((item) => (
              <ListItem
                key={item.house}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={item.logo}
                    alt={`${item.houseName} Logo`}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      marginRight: '16px',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
                    }}
                  />
                  <ListItemText
                    primary={item.houseName}
                    secondary={
                      <Box
                        sx={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          backgroundColor: '#ffffff',
                          color: '#000',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        Points: {item.points}
                      </Box>
                    }
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
            color: '#FFF',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Captains
          </Typography>
          <List>
            {captains.map((player, index) => (
              <ListItem
                key={index}
                sx={{
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={player.logo}
                    alt={`${player.house} Logo`}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                      marginRight: '16px',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
                    }}
                  />
                  <ListItemText
                    primary={player.name}
                    secondary={`House ${player.house} - ${player.team_name}`}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Home;