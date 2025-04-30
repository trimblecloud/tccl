// components/Home.js
import React, { useEffect, useState } from 'react';
import { 
  Paper, Typography, Grid, List, ListItem, ListItemText, Box, 
  Avatar, useTheme, Divider, CircularProgress, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Collapse, IconButton, Badge
} from '@mui/material';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { 
  KeyboardArrowDown, 
  KeyboardArrowUp, 
  EmojiEvents,
  EmojiEventsOutlined,
  Looks1 as OneIcon,
  Looks2 as TwoIcon,
  Looks3 as ThreeIcon 
} from '@mui/icons-material';

// Import your house logos here
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';
import tcclLogo from '../components/logo/trimble-cloud-championship-league-logo.png';

// Detailed scores data - structured for extensibility
const detailedScores = {
  categories: [
    { id: "house_details", name: "House Details Submission" },
    { id: "bet_your_brain_submission", name: "Game 1 - Bet Your Brain Participants Submission" },
    { id: "bet_your_brain", name: "Game 1 - Bet Your Brain" },
    { id: "tt_group_participation", name: "Game 2 - TT Doubles - Group Stage Participation" },
    { id: "tt_group_runners", name: "Game 2 - TT Doubles - Group Stage Runners" },
    { id: "tt_semis_participation", name: "Game 2 - TT Doubles - Semis Participation" },
    { id: "tt_semis_runners", name: "Game 2 - TT Doubles - Semis Runners" },
    { id: "tt_runners", name: "Game 2 - TT Doubles - Runners" },
    { id: "tt_winners", name: "Game 2 - TT Doubles - Winners" },
    { id: "carrom_r1_participation", name: "Game 3 - Carrom - Round 1 Participation" },
    { id: "carrom_r2_participation", name: "Game 3 - Carrom - Round 2 Participation" },
    { id: "carrom_r3_participation", name: "Game 3 - Carrom - Round 3 Participation" },
    { id: "carrom_semi_participation", name: "Game 3 - Carrom - Semi Final Participation" },
    { id: "carrom_runners", name: "Game 3 - Carrom - Runners" },
    { id: "carrom_winners", name: "Game 3 - Carrom - Winners" },
    { id: "chess_r1_participation", name: "Game 4 - Chess - Round 1 Participation" },
    { id: "chess_r2_participation", name: "Game 4 - Chess - Round 2 Participation" },
    { id: "chess_r3_participation", name: "Game 4 - Chess - Round 3 Participation" },
    { id: "chess_r4_participation", name: "Game 4 - Chess - Round 4 Participation" },
    { id: "chess_semi_participation", name: "Game 4 - Chess - Semi Final Participation" },
    { id: "chess_runners", name: "Game 4 - Chess - Runners" },
    { id: "chess_winners", name: "Game 4 - Chess - Winners" },
    { id: "cards_tower", name: "Cards Tower" },
    // Add new categories here
  ],
  houses: [
    { 
      id: "yellow_sparks", 
      name: "The Yellow Sparks", 
      logo: yellowSparksLogo,
      color: "#FFD600",
      points: {
        "house_details": 0,
        "bet_your_brain_submission": 10,
        "bet_your_brain": 100,
        "tt_group_participation": 10,
        "tt_group_runners": 20,
        "tt_semis_participation": 30,
        "tt_semis_runners": 80,
        "tt_runners": 0,
        "tt_winners": 0,
        "carrom_r1_participation": 30,
        "carrom_r2_participation": 40,
        "carrom_r3_participation": 30,
        "carrom_semi_participation": 80,
        "carrom_runners": 70,
        "carrom_winners": 0,
        "chess_r1_participation": 40,
        "chess_r2_participation": 100,
        "chess_r3_participation": 60,
        "chess_r4_participation": 0,
        "chess_semi_participation": 0,
        "chess_runners": 0,
        "chess_winners": 0,
        "cards_tower": 0,
      }
    },
    { 
      id: "sparta", 
      name: "Sparta", 
      logo: spartaLogo,
      color: "#F44336",
      points: {
        "house_details": 5,
        "bet_your_brain_submission": 5,
        "bet_your_brain": 0,
        "tt_group_participation": 30,
        "tt_group_runners": 20,
        "tt_semis_participation": 0,
        "tt_semis_runners": 0,
        "tt_runners": 70,
        "tt_winners": 100,
        "carrom_r1_participation": 30,
        "carrom_r2_participation": 60,
        "carrom_r3_participation": 30,
        "carrom_semi_participation": 0,
        "carrom_runners": 0,
        "carrom_winners": 0,
        "chess_r1_participation": 20,
        "chess_r2_participation": 120,
        "chess_r3_participation": 120,
        "chess_r4_participation": 120,
        "chess_semi_participation": 50,
        "chess_runners": 80,
        "chess_winners": 120,
        "cards_tower": 100,
      }
    },
    { 
      id: "mission_funpossible", 
      name: "Mission FunPossible", 
      logo: missionFunPossibleLogo,
      color: "#2196F3",
      points: {
        "house_details": 0,
        "bet_your_brain_submission": 0,
        "bet_your_brain": 50,
        "tt_group_participation": 20,
        "tt_group_runners": 80,
        "tt_semis_participation": 30,
        "tt_semis_runners": 0,
        "tt_runners": 0,
        "tt_winners": 0,  
        "carrom_r1_participation": 10,
        "carrom_r2_participation": 60,
        "carrom_r3_participation": 60,
        "carrom_semi_participation": 0,
        "carrom_runners": 0,
        "carrom_winners": 100,
        "chess_r1_participation": 70,
        "chess_r2_participation": 60,
        "chess_r3_participation": 60,
        "chess_r4_participation": 40,
        "chess_semi_participation": 50,
        "chess_runners": 0,
        "chess_winners": 0,
        "cards_tower": 50,
      }
    },
  ]
};

// Calculate total points for each house
detailedScores.houses.forEach(house => {
  house.totalPoints = Object.values(house.points).reduce((sum, points) => sum + points, 0);
});

const DetailedScoreTable = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const theme = useTheme();
    // Group categories by game
  const gameCategories = {
    'all': detailedScores.categories,
    'general': detailedScores.categories.filter(cat => cat.id.includes('house_details') || cat.id === 'cards_tower'),
    'game1': detailedScores.categories.filter(cat => cat.id.includes('bet_your_brain')),
    'game2': detailedScores.categories.filter(cat => cat.id.includes('tt_')),
    'game3': detailedScores.categories.filter(cat => cat.id.includes('carrom_')),
    'game4': detailedScores.categories.filter(cat => cat.id.includes('chess_')),
  };
    const gameLabels = {
    'all': 'All Events',
    'general': 'General',
    'game1': 'Bet Your Brain',
    'game2': 'Table Tennis Doubles',
    'game3': 'Carrom',
    'game4': 'Chess',
  };
  
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Button 
        variant="contained" 
        onClick={() => setOpen(!open)}
        startIcon={<EmojiEvents />}
        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        sx={{
          mb: 2,
          backgroundImage: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
          borderRadius: '12px',
          padding: '10px 20px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #F57C00 0%, #E65100 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }
        }}
      >
        {open ? "Hide Detailed Scores" : "View Detailed Scores"}
      </Button>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexDirection: {xs: 'column', sm: 'row'},
          gap: 2
        }}>
          <Typography variant="body1" gutterBottom sx={{ mb: {xs: 0, sm: 0}, fontWeight: 'medium' }}>
            <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '3px 8px', borderRadius: '4px', marginRight: '8px' }}>
              Updated
            </span>
            April 25, 2025
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            flexWrap: 'wrap',
            justifyContent: {xs: 'center', sm: 'flex-end'}
          }}>
            {Object.keys(gameLabels).map(tab => (
              <Button
                key={tab}
                variant={activeTab === tab ? "contained" : "outlined"}
                size="small"
                onClick={() => setActiveTab(tab)}
                sx={{
                  borderRadius: '20px',
                  minWidth: '80px',                  backgroundColor: activeTab === tab ? 
                    (tab === 'all' ? '#673AB7' : 
                     tab === 'game1' ? '#FF9800' : 
                     tab === 'game2' ? '#2196F3' : 
                     tab === 'game3' ? '#F44336' : 
                     tab === 'game4' ? '#4CAF50' : '#9C27B0') : 'transparent',
                  '&:hover': {
                    backgroundColor: activeTab === tab ? 
                      (tab === 'all' ? '#5E35B1' : 
                       tab === 'game1' ? '#FB8C00' : 
                       tab === 'game2' ? '#1E88E5' : 
                       tab === 'game3' ? '#E53935' : 
                       tab === 'game4' ? '#43A047' : '#8E24AA') : 'rgba(0,0,0,0.04)'
                  },
                  color: activeTab === tab ? '#fff' : theme.palette.text.primary,
                  textTransform: 'none',
                }}
              >
                {gameLabels[tab]}
              </Button>
            ))}
          </Box>
        </Box>
        
        <TableContainer 
          component={Paper} 
          elevation={4} 
          sx={{ 
            overflow: 'auto', 
            borderRadius: '16px',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.mode === 'light' ? '#f1f1f1' : '#333',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.mode === 'light' ? '#888' : '#555',
              borderRadius: '4px',
            }
          }}
        >
          <Table aria-label="detailed scores table">
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.mode === 'light' ? 
                  (activeTab === 'all' ? '#EDE7F6' : 
                   activeTab === 'game1' ? '#FFF3E0' : 
                   activeTab === 'game2' ? '#E1F5FE' : 
                   activeTab === 'game3' ? '#FFEBEE' : '#E8F5E9') : '#333',
              }}>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  position: 'sticky', 
                  left: 0, 
                  backgroundColor: theme.palette.mode === 'light' ? 
                    (activeTab === 'all' ? '#EDE7F6' : 
                     activeTab === 'game1' ? '#FFF3E0' : 
                     activeTab === 'game2' ? '#E1F5FE' : 
                     activeTab === 'game3' ? '#FFEBEE' : '#E8F5E9') : '#333',
                  zIndex: 1,
                }}>
                  Category
                </TableCell>
                {detailedScores.houses.map((house) => (
                  <TableCell key={house.id} align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar 
                        src={house.logo} 
                        alt={house.name} 
                        sx={{ 
                          width: 36, 
                          height: 36, 
                          mb: 1,
                          border: `2px solid ${house.color}`,
                        }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {house.name}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {gameCategories[activeTab].map((category) => (
                <TableRow 
                  key={category.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { 
                      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.05)' 
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.1)'
                    },
                  }}
                >
                  <TableCell 
                    component="th" 
                    scope="row"
                    sx={{ 
                      position: 'sticky', 
                      left: 0, 
                      backgroundColor: theme.palette.mode === 'light' ? 
                        'rgba(255, 255, 255, 0.95)' : 
                        'rgba(18, 18, 18, 0.95)',
                      zIndex: 1,                      borderLeft: `4px solid ${
                        category.id.includes('bet_your_brain') ? '#FF9800' : 
                        category.id.includes('tt_') ? '#2196F3' : 
                        category.id.includes('carrom_') ? '#F44336' : 
                        category.id.includes('chess_') ? '#4CAF50' :
                        category.id.includes('cards_tower') ? '#9C27B0' :
                        '#757575'
                      }`,
                      paddingLeft: '16px',
                    }}
                  >
                    {category.name}
                  </TableCell>
                  {detailedScores.houses.map((house) => (
                    <TableCell 
                      key={`${house.id}-${category.id}`} 
                      align="center"
                      sx={{ 
                        fontWeight: house.points[category.id] > 0 ? 'bold' : 'normal',
                        fontSize: house.points[category.id] > 50 ? '1rem' : '0.875rem',
                        color: house.points[category.id] > 0 ? 
                          (house.points[category.id] >= 100 ? '#4CAF50' :
                           house.points[category.id] >= 50 ? house.color :
                           theme.palette.mode === 'light' ? '#333' : '#fff') : 
                          theme.palette.text.secondary,
                        padding: '14px 16px',
                      }}
                    >
                      {house.points[category.id] > 0 ? (
                        <Box sx={{
                          display: 'inline-block',
                          minWidth: '40px',
                          padding: house.points[category.id] >= 50 ? '4px 8px' : '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: house.points[category.id] >= 100 ? 
                            'rgba(76, 175, 80, 0.15)' : 
                            house.points[category.id] >= 50 ? 
                              `${house.color}22` : 'transparent',
                        }}>
                          {house.points[category.id]}
                        </Box>
                      ) : (
                        '–'
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow sx={{ 
                backgroundColor: theme.palette.mode === 'light' ? 
                  (activeTab === 'all' ? '#EDE7F6' : 
                   activeTab === 'game1' ? '#FFF3E0' : 
                   activeTab === 'game2' ? '#E1F5FE' : 
                   activeTab === 'game3' ? '#FFEBEE' : '#E8F5E9') : '#102027',
                fontWeight: 'bold',
              }}>
                <TableCell 
                  component="th" 
                  scope="row" 
                  sx={{ 
                    fontWeight: 'bold',
                    position: 'sticky', 
                    left: 0, 
                    backgroundColor: theme.palette.mode === 'light' ? 
                      (activeTab === 'all' ? '#EDE7F6' : 
                       activeTab === 'game1' ? '#FFF3E0' : 
                       activeTab === 'game2' ? '#E1F5FE' : 
                       activeTab === 'game3' ? '#FFEBEE' : '#E8F5E9') : '#102027',
                    zIndex: 1,
                  }}
                >
                  TOTAL
                </TableCell>                {detailedScores.houses.map((house) => {
                  // Calculate subtotal based on active tab
                  let subtotal;
                  if (activeTab === 'all') {
                    // For total of all categories, sum up all points
                    subtotal = Object.values(house.points).reduce((sum, points) => sum + points, 0);
                  } else {
                    const relevantCategories = gameCategories[activeTab];
                    subtotal = relevantCategories.reduce((sum, category) => 
                      sum + (house.points[category.id] || 0), 0);
                  }
                  return (
                    <TableCell 
                      key={`${house.id}-${activeTab}-total`} 
                      align="center"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        color: house.color,
                        padding: '16px',
                      }}
                    >
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px',
                        height: '36px',
                        border: `2px solid ${house.color}`,
                        borderRadius: '18px',
                        backgroundColor: `${house.color}22`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}>
                        {subtotal}
                      </Box>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
};

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
          <Grid item xs={12}>
        <DetailedScoreTable />
      </Grid>
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