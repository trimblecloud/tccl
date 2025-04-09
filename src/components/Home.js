// components/Home.js
import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, List, ListItem, ListItemText, Box, Avatar, useTheme, Divider, CircularProgress } from '@mui/material';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

// Import your house logos here
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

const Home = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'light' ? '#000000' : '#FFFFFF';
  const secondaryTextColor = theme.palette.mode === 'light' ? '#000000' : '#000000'; // Always black for badge text
  
  const [leaderBoard, setLeaderBoard] = useState(null); // Initially null to indicate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const docRef = doc(db, "leaderboard", "totalScore");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLeaderBoard([
            { house: 1, houseName: "The Yellow Sparks", points: data["The Yellow Sparks"] || 0, logo: yellowSparksLogo },
            { house: 2, houseName: "Sparta", points: data["Sparta"] || 0, logo: spartaLogo },
            { house: 3, houseName: "Mission FunPossible", points: data["Mission FunPossible"] || 0, logo: missionFunPossibleLogo },
          ]);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
        // Fallback to hardcoded values
        setLeaderBoard([
          { house: 1, houseName: "The Yellow Sparks", points: 210, logo: yellowSparksLogo },
          { house: 2, houseName: "Sparta", points: 60, logo: spartaLogo },
          { house: 3, houseName: "Mission FunPossible", points: 150, logo: missionFunPossibleLogo },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Sort leaderboard by points in descending order
  const sortedLeaderBoard = leaderBoard.sort((a, b) => b.points - a.points);
  
  // Updated captains list with vice captains
  const teamLeadership = [
    { 
      house: 1, 
      houseName: "The Yellow Sparks", 
      logo: yellowSparksLogo,
      leaders: [
        { name: 'Sweatha S', role: 'Captain' },
        { name: 'Vikash S R', role: 'Vice Captain' }
      ]
    },
    { 
      house: 2, 
      houseName: "Sparta", 
      logo: spartaLogo,
      leaders: [
        { name: 'Harivarthini R', role: 'Captain' },
        { name: 'Dharani Sanjai B', role: 'Vice Captain' }
      ]
    },
    { 
      house: 3, 
      houseName: "Mission FunPossible", 
      logo: missionFunPossibleLogo,
      leaders: [
        { name: 'Vishali Senniappan', role: 'Captain' },
        { name: 'Pranesh K', role: 'Vice Captain' }
      ]
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            background: 'linear-gradient(135deg, #FFEB3B 0%, #FF9800 100%)',
            color: textColor,
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Leaderboard
          </Typography>
          <List>
            {sortedLeaderBoard.map((item) => (
              <motion.div
                key={item.house}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.house * 0.2 }}
              >
                <ListItem
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
                      primary={
                        <Typography color={textColor} variant="body1" fontWeight="medium">
                          {item.houseName}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            backgroundColor: '#ffffff',
                            color: secondaryTextColor,
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
              </motion.div>
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
      color: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    }}
  >
    <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
      Team Leaders
    </Typography>

    <Grid container spacing={3}>
      {teamLeadership.map((team) => (
        <Grid item xs={12} sm={6} md={4} key={team.house}>
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              p: 2,
              pb: 3,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={1.5}
              sx={{
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <Avatar
                src={team.logo}
                alt={`${team.houseName} Logo`}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '8px',
                  marginRight: '12px',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
                }}
              />
              <Typography variant="h6" color="#FFFFFF" fontWeight="bold">
                {team.houseName}
              </Typography>
            </Box>

            <Divider sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              {team.leaders.map((leader, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="center"
                  sx={{
                    mb: idx === 0 ? 2 : 0,
                    p: 1.5,
                    borderRadius: '8px',
                    backgroundColor: leader.role === 'Captain' ? 'rgba(255, 215, 0, 0.15)' : 'transparent',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: leader.role === 'Captain' ? 'gold' : '#E0E0E0',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      mr: { xs: 0, sm: 2 },
                      mb: { xs: 1, sm: 0 },
                    }}
                  >
                    {leader.role === 'Captain' ? 'C' : 'VC'}
                  </Box>
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography color="#FFFFFF" variant="body1" fontWeight="medium">
                      {leader.name}
                    </Typography>
                    <Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
                      {leader.role}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Paper>
</Grid>
    </Grid>
  );
};

export default Home;