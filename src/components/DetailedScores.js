// components/DetailedScores.js
import React, { useState } from 'react';
import { 
  Typography, Box, Paper, useTheme, Button, 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Collapse, IconButton, Avatar
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, EmojiEvents } from '@mui/icons-material';

// Import house logos
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

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
    { id: "cards_tower_submission", name: "Cards Tower - Participants Submission" },
    { id: "logo_submission", name: "Game 6 - Build Your Logo - Participants Submission" },
    { id: "logo_main", name: "Game 6 - Build Your Logo" },
    // Badminton Men's Doubles Categories
    { id: "badminton_mens_r1_participation", name: "Game 7 - Badminton Mens Doubles - Round 1 Participation" },
    { id: "badminton_mens_r2_participation", name: "Game 7 - Badminton Mens Doubles - Round 2 Participation" },
    { id: "badminton_mens_r3_participation", name: "Game 7 - Badminton Mens Doubles - Round 3 Participation" },
    { id: "badminton_mens_semi_participation", name: "Game 7 - Badminton Mens Doubles - Semi Final Participation" },
    { id: "badminton_mens_runners", name: "Game 7 - Badminton Mens Doubles - Runners" },
    { id: "badminton_mens_winners", name: "Game 7 - Badminton Mens Doubles - Winners" },
    // Badminton Women's Doubles Categories
    { id: "badminton_womens_r1_participation", name: "Game 7 - Badminton Womens Doubles - Round 1 Participation" },
    { id: "badminton_womens_semi_participation", name: "Game 7 - Badminton Womens Doubles - Semi Final Participation" },
    { id: "badminton_womens_runners", name: "Game 7 - Badminton Womens Doubles - Runners" },
    { id: "badminton_womens_winners", name: "Game 7 - Badminton Womens Doubles - Winners" },
    // Badminton Mixed Doubles Categories
    { id: "badminton_mixed_r1_participation", name: "Game 7 - Badminton Mixed Doubles - Round 1 Participation" },
    { id: "badminton_mixed_r2_participation", name: "Game 7 - Badminton Mixed Doubles - Round 2 Participation" },
    { id: "badminton_mixed_semi_participation", name: "Game 7 - Badminton Mixed Doubles - Semi Final Participation" },    { id: "badminton_mixed_runners", name: "Game 7 - Badminton Mixed Doubles - Runners" },
    { id: "badminton_mixed_winners", name: "Game 7 - Badminton Mixed Doubles - Winners" },    // Football Categories
    { id: "football_runners", name: "Game 8 - Football - Runners" },
    { id: "football_winners", name: "Game 8 - Football - Winners" },
    // Tug of War Categories
    { id: "tug_of_war_participants", name: "Game 9 - Tug Of War Participants Submission" },
    { id: "tug_of_war", name: "Game 9 - Tug Of War" }
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
        "chess_semi_participation": 0,        "chess_runners": 0,
        "chess_winners": 0,
        "cards_tower": 0,
        "cards_tower_submission": 10,
        "logo_submission": 0,
        "logo_main": 0,
        // Badminton Men's Doubles
        "badminton_mens_r1_participation": 20,
        "badminton_mens_r2_participation": 60,
        "badminton_mens_r3_participation": 30,
        "badminton_mens_semi_participation": 40,
        "badminton_mens_runners": 70,
        "badminton_mens_winners": 0,
        // Badminton Women's Doubles
        "badminton_womens_r1_participation": 20,
        "badminton_womens_semi_participation": 40,
        "badminton_womens_runners": 0,
        "badminton_womens_winners": 100,
        // Badminton Mixed Doubles        "badminton_mixed_r1_participation": 30,
        "badminton_mixed_r2_participation": 20,
        "badminton_mixed_semi_participation": 80,
        "badminton_mixed_runners": 0,
        "badminton_mixed_winners": 0,        // Football
        "football_runners": 0,
        "football_winners": 200,
        // Tug of War
        "tug_of_war_participants": 10,
        "tug_of_war": 50
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
        "chess_semi_participation": 50,        "chess_runners": 80,
        "chess_winners": 120,
        "cards_tower": 100,
        "cards_tower_submission": 5,
        "logo_submission": 20,
        "logo_main": 100,
        // Badminton Men's Doubles
        "badminton_mens_r1_participation": 10,
        "badminton_mens_r2_participation": 60,
        "badminton_mens_r3_participation": 30,
        "badminton_mens_semi_participation": 0,
        "badminton_mens_runners": 0,
        "badminton_mens_winners": 100,
        // Badminton Women's Doubles
        "badminton_womens_r1_participation": 0,
        "badminton_womens_semi_participation": 0,
        "badminton_womens_runners": 70,
        "badminton_womens_winners": 0,
        // Badminton Mixed Doubles        "badminton_mixed_r1_participation": 0,
        "badminton_mixed_r2_participation": 40,
        "badminton_mixed_semi_participation": 0,
        "badminton_mixed_runners": 70,
        "badminton_mixed_winners": 0,        // Football
        "football_runners": 100,
        "football_winners": 0,
        // Tug of War
        "tug_of_war_participants": 20,
        "tug_of_war": 0
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
        "chess_semi_participation": 50,        "chess_runners": 0,
        "chess_winners": 0,
        "cards_tower": 50,
        "cards_tower_submission": 0,
        "logo_submission": 10,
        "logo_main": 50,
        // Badminton Men's Doubles
        "badminton_mens_r1_participation": 40,
        "badminton_mens_r2_participation": 40,
        "badminton_mens_r3_participation": 60,
        "badminton_mens_semi_participation": 40,
        "badminton_mens_runners": 0,
        "badminton_mens_winners": 0,
        // Badminton Women's Doubles
        "badminton_womens_r1_participation": 40,
        "badminton_womens_semi_participation": 40,
        "badminton_womens_runners": 0,
        "badminton_womens_winners": 0,
        // Badminton Mixed Doubles        "badminton_mixed_r1_participation": 40,
        "badminton_mixed_r2_participation": 20,
        "badminton_mixed_semi_participation": 0,
        "badminton_mixed_runners": 0,
        "badminton_mixed_winners": 100,        // Football
        "football_runners": 0,
        "football_winners": 0,
        // Tug of War
        "tug_of_war_participants": 0,
        "tug_of_war": 100
      }
    },
  ]
};

// Calculate total points for each house
detailedScores.houses.forEach(house => {
  if (house.id === "yellow_sparks") {
    house.totalPoints = 1480; // Fixed total for Yellow Sparks as per requirement
  } else if (house.id === "sparta") {
    house.totalPoints = 1705; // Fixed total for Sparta as per requirement
  } else if (house.id === "mission_funpossible") {
    house.totalPoints = 1320; // Fixed total for Mission FunPossible as per requirement
  } else {
    // Fallback calculation if new houses are added in the future
    house.totalPoints = Object.values(house.points).reduce((sum, points) => sum + points, 0);
  }
});

const DetailedScores = ({ showButton = true, initiallyOpen = false, containerSx = {} }) => {
  const [open, setOpen] = useState(initiallyOpen);
  const [activeTab, setActiveTab] = useState('all');
  const theme = useTheme();
    // Group categories by game
  const gameCategories = {
    'all': detailedScores.categories,
    'general': detailedScores.categories.filter(cat => cat.id.includes('house_details')),
    'game1': detailedScores.categories.filter(cat => cat.id.includes('bet_your_brain')),
    'game2': detailedScores.categories.filter(cat => cat.id.includes('tt_')),
    'game3': detailedScores.categories.filter(cat => cat.id.includes('carrom_')),
    'game4': detailedScores.categories.filter(cat => cat.id.includes('chess_')),
    'game5': detailedScores.categories.filter(cat => cat.id.includes('cards_tower')),
    'game6': detailedScores.categories.filter(cat => cat.id.includes('logo_')),
    'game7': detailedScores.categories.filter(cat => cat.id.includes('badminton_')),    'game8': detailedScores.categories.filter(cat => cat.id.includes('football_')),
    'game9': detailedScores.categories.filter(cat => cat.id.includes('tug_of_war'))
  };
  
  const gameLabels = {
    'all': 'All Events',
    'general': 'General',
    'game1': 'Bet Your Brain',
    'game2': 'Table Tennis Doubles',
    'game3': 'Carrom',
    'game4': 'Chess',
    'game5': 'Cards Tower',
    'game6': 'Build Your Logo',
    'game7': 'Badminton',
    'game8': 'Football',
    'game9': 'Tug Of War',
  };
  
  return (
    <Box sx={{ width: '100%', mb: 4, ...containerSx }}>
      {showButton && (
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
      )}
      
      <Collapse in={showButton ? open : true} timeout="auto" unmountOnExit>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexDirection: {xs: 'column', sm: 'row'},
          gap: 2
        }}>
          <Typography variant="body1" gutterBottom sx={{ mb: {xs: 0, sm: 0}, fontWeight: 'medium' }}>            <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '3px 8px', borderRadius: '4px', marginRight: '8px' }}>
              Updated
            </span>
            June 6, 2025
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
                  minWidth: '80px',                  
                  backgroundColor: activeTab === tab ? 
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
                      zIndex: 1,                      
                      borderLeft: `4px solid ${
                        category.id.includes('bet_your_brain') ? '#FF9800' : 
                        category.id.includes('tt_') ? '#2196F3' : 
                        category.id.includes('carrom_') ? '#F44336' : 
                        category.id.includes('chess_') ? '#4CAF50' :
                        category.id.includes('cards_tower') ? '#9C27B0' :
                        category.id.includes('logo_') ? '#dfff00' :
                        '#757575'
                      }`,
                      paddingLeft: '16px',
                    }}
                  >
                    {category.name}
                  </TableCell>
                  {detailedScores.houses.map((house) => (                    <TableCell 
                      key={`${house.id}-${category.id}`} 
                      align="center"
                      sx={{ 
                        fontWeight: house.points[category.id] > 0 ? 'bold' : 'normal',
                        fontSize: house.points[category.id] > 0 ? '0.95rem' : '0.875rem',
                        padding: '14px 16px',
                      }}
                    >                      {house.points[category.id] > 0 ? (
                        <Box sx={{
                          display: 'inline-block',
                          minWidth: '40px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: (() => {
                            // Special case for Bet Your Brain categories
                            if (category.id.includes('bet_your_brain')|| category.id.includes('cards_tower')|| category.id.includes('logo')||category.id.includes('tug')) {
                              // Find max score for this category across all houses
                              const scores = detailedScores.houses.map(h => h.points[category.id] || 0);
                              const maxScore = Math.max(...scores);
                              // Find second highest score
                              const sortedScores = [...scores].sort((a, b) => b - a);
                              const secondHighest = sortedScores[1];
                              
                              // This house has the highest score (winner)
                              if (house.points[category.id] === maxScore && maxScore > 0) {
                                return 'rgba(76, 175, 80, 0.15)'; // Winner - green
                              }
                              // This house has the second highest score (runner-up)
                              else if (house.points[category.id] === secondHighest && secondHighest > 0) {
                                return 'rgba(156, 39, 176, 0.15)'; // Runner-up - purple
                              }
                              // Other participants with points
                              else {
                                return 'rgba(97, 97, 97, 0.1)'; // Participants - gray
                              }
                            }
                            // Normal categories based on category names
                            else if (category.id.includes('winners')) {
                              return 'rgba(76, 175, 80, 0.15)'; // Winner - green
                            } else if (category.id.includes('runners')) {
                              return 'rgba(156, 39, 176, 0.15)'; // Runner-up - purple
                            } else if (category.id.includes('semi') || category.id.includes('r2') || 
                                      category.id.includes('r3') || category.id.includes('r4') || 
                                      category.id.includes('r5')) {
                              return 'rgba(255, 152, 0, 0.15)'; // Mid-Level - orange
                            } else {
                              return 'rgba(97, 97, 97, 0.1)'; // Participants - gray
                            }
                          })(),
                          color: (() => {
                            // Special case for Bet Your Brain categories
                            if (category.id.includes('bet_your_brain')|| category.id.includes('cards_tower')|| category.id.includes('logo')||category.id.includes('tug')) {
                              // Find max score for this category across all houses
                              const scores = detailedScores.houses.map(h => h.points[category.id] || 0);
                              const maxScore = Math.max(...scores);
                              // Find second highest score
                              const sortedScores = [...scores].sort((a, b) => b - a);
                              const secondHighest = sortedScores[1];
                              
                              // This house has the highest score (winner)
                              if (house.points[category.id] === maxScore && maxScore > 0) {
                                return '#4CAF50'; // Winner - green
                              }
                              // This house has the second highest score (runner-up)
                              else if (house.points[category.id] === secondHighest && secondHighest > 0) {
                                return '#9C27B0'; // Runner-up - purple
                              }
                              // Other participants with points
                              else {
                                return theme.palette.text.secondary; // Participants - gray
                              }
                            }
                            // Normal categories based on category names
                            else if (category.id.includes('winners')) {
                              return '#4CAF50'; // Winner - green
                            } else if (category.id.includes('runners')) {
                              return '#9C27B0'; // Runner-up - purple
                            } else if (category.id.includes('semi') || category.id.includes('r2') || 
                                      category.id.includes('r3') || category.id.includes('r4') || 
                                      category.id.includes('r5')) {
                              return '#FF9800'; // Mid-Level - orange
                            } else {
                              return theme.palette.text.secondary; // Participants - gray
                            }
                          })(),
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
                </TableCell>
                {detailedScores.houses.map((house) => {                  // Calculate subtotal based on active tab
                  let subtotal;
                  if (activeTab === 'all') {
                    // Use the fixed total points for the all tab
                    subtotal = house.totalPoints;
                  } else {
                    const relevantCategories = gameCategories[activeTab];
                    subtotal = relevantCategories.reduce((sum, category) => 
                      sum + (house.points[category.id] || 0), 0);
                  }
                  return (                    <TableCell 
                      key={`${house.id}-${activeTab}-total`} 
                      align="center"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        padding: '16px',
                      }}
                    >
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px',
                        height: '36px',
                        border: '2px solid',
                        borderColor: theme.palette.divider,
                        borderRadius: '18px',
                        backgroundColor: theme.palette.mode === 'light' 
                          ? 'rgba(0, 0, 0, 0.05)' 
                          : 'rgba(255, 255, 255, 0.05)',
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

export default DetailedScores;
