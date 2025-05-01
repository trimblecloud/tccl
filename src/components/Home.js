// components/Home.js
import React, { useEffect, useState } from 'react';
import { 
  Paper, Typography, Grid, List, ListItem, ListItemText, Box, 
  Avatar, useTheme, Divider, CircularProgress, Button,
  Badge
} from '@mui/material';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { 
  EmojiEvents,
  EmojiEventsOutlined,
  LooksOne as OneIcon,
  LooksTwo as TwoIcon,
  Looks3 as ThreeIcon,
  MoreHoriz as MoreHorizIcon
} from '@mui/icons-material';

// Import DetailedScores component
import DetailedScores from './DetailedScores';

// Import your house logos here
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';
import tcclLogo from './logo/trimble-cloud-championship-league-logo.png';
import tcclBanner from './logo/tccl-banner.jpg';
import { light } from '@mui/material/styles/createPalette';

const Home = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'light' ? '#000000' : '#FFFFFF';
  const secondaryTextColor = theme.palette.mode === 'light' ? '#000000' : '#000000'; // Always black for badge text
  const [openLeadershipInfo, setOpenLeadershipInfo] = useState(null);
  
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
  const sortedLeaderBoard = leaderBoard.sort((a, b) => b.points - a.points);  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
          mb: 4,
          backgroundColor: theme.palette.background.paper,
          height: { xs: '200px', sm: '250px', md: '300px' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
            }}
          >
            <Box sx={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${tcclBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
          transform: 'scale(1.1)', // Prevents blur edges from showing
            }} />
            
            <Box sx={{ 
          position: 'absolute', 
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
            }} />
            
            <Box sx={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center',
          width: '100%',
          p: { xs: 2, sm: 4 }
            }}>
          <Typography variant="h3" component="h1" sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg,#43cea2 ,#43cea2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
          }}>
            Trimble Cloud Championship League
          </Typography>
          <Typography variant="h5" sx={{ 
            color: theme.palette.mode === 'light'? '#02aab0 ':'#FFFFFF'  ,
            mb: 3,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
          }}>
            A team building initiative for Trimble Cloud engineering
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button 
              component={Link}
              to="/events"
              variant="contained" 
              sx={{ 
            backgroundColor: '#43cea2',
            color: '#000',
            '&:hover': {
              backgroundColor: '#00cdac',
            }
              }}
            >
              View Events
            </Button>
            <Button 
              component={Link}
              to="/winners"
              variant="contained" 
              sx={{ 
            backgroundColor: '#43cea2',
            color: '#000',
            '&:hover': {
              backgroundColor: '#00cdac',
            }
              }}
            >
              See Winners
            </Button>
          </Box>
            </Box>
          </Box>
        </Grid>      {/* Leaderboard Section */}
      <Grid item xs={12} md={10} lg={8} sx={{ mx: 'auto' }}>
        <Paper
          elevation={4}
          sx={{
            padding: { xs: '16px', sm: '24px' },
            backgroundColor: theme.palette.background.paper,
            color: textColor,
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            display: 'flex', 
            flexDirection: 'column'
          }}
        >
          {/* Background pattern for visual interest */}
          <Box 
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.03,
              backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          
          {/* Leaderboard Header with TCCL logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 2,
              position: 'relative',
              pb: 2,
              borderBottom: '2px solid rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                src={tcclLogo} 
                alt="TCCL Logo"
                sx={{
                  width: { xs: 36, sm: 48 },
                  height: { xs: 36, sm: 48 },
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg,rgb(26, 126, 114),rgb(228, 144, 54))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                }}
              >
                Leaderboard
              </Typography>
            </Box>
            
          </Box>
          
          {/* Trophy icon decorations */}
          <Box sx={{ 
            position: 'absolute', 
            right: -20, 
            bottom: -20, 
            opacity: 0.07, 
            fontSize: { xs: '80px', sm: '100px', md: '120px' },
            transform: 'rotate(15deg)',
            color: theme.palette.mode === 'light' ? '#000' : '#fff',
            zIndex: 0
          }}>
            <EmojiEvents fontSize="inherit" />
          </Box>

          <List sx={{ 
            position: 'relative', 
            zIndex: 1, 
            flexGrow: 1, 
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#bbb',
              borderRadius: '4px',
            }
          }}>
            {sortedLeaderBoard.map((item, index) => {
              // Get position badge component based on ranking
              const PositionBadge = () => {
                const position = index + 1;
                const colors = {
                  1: { bg: 'gold', text: theme.palette.mode === 'light' ?'#000' :'#fff'},
                  2: { bg: 'silver', text: theme.palette.mode === 'light' ?'#000' :'#fff' },
                  3: { bg: '#CD7F32', text: theme.palette.mode === 'light' ?'#000' :'#fff' } // Bronze
                };
                
                const getRankIcon = (pos) => {
                  switch(pos) {
                    case 1: return <OneIcon fontSize="small" />;
                    case 2: return <TwoIcon fontSize="small" />;
                    case 3: return <ThreeIcon fontSize="small" />;
                    default: return pos;
                  }
                };
                
                return (
                  <Avatar 
                    sx={{
                      width: { xs: 30, sm: 36 }, 
                      height: { xs: 30, sm: 36 }, 
                      bgcolor: colors[position]?.bg || '#9e9e9e',
                      color: colors[position]?.text || '#fff',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.8rem', sm: '1rem' },
                      marginRight: { xs: '12px', sm: '16px' },
                      border: '2px solid #fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      flexShrink: 0
                    }}
                  >
                    {getRankIcon(position)}
                  </Avatar>
                );
              };

              return (
                <motion.div
                  key={item.house}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <ListItem
                    sx={{
                      mb: 2,
                      py: 1,
                      px: { xs: 1, sm: 2 },
                      borderRadius: '12px',
                      backgroundColor: theme.palette.mode === 'light' 
                        ? index === 0 ? 'rgba(255, 215, 0, 0.1)' 
                        : index === 1 ? 'rgba(192, 192, 192, 0.1)'
                        : index === 2 ? 'rgba(205, 127, 50, 0.1)'
                        : 'transparent'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'light'
                        ? index === 0 ? 'rgba(255, 215, 0, 0.3)'
                        : index === 1 ? 'rgba(192, 192, 192, 0.3)'
                        : index === 2 ? 'rgba(205, 127, 50, 0.3)'
                        : 'transparent'
                        : 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease',
                        boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                      },
                    }}
                    disableGutters
                  >                    <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          width: '100%', 
                          justifyContent: 'space-between',
                          flexWrap: { xs: 'wrap', sm: 'nowrap' }
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          flexGrow: 1,
                          maxWidth: { xs: '70%', sm: '80%' }
                        }}>
                          <PositionBadge />
                          <Avatar
                            src={item.logo}
                            alt={`${item.houseName} Logo`}
                            sx={{
                              width: { xs: 40, sm: 48 },
                              height: { xs: 40, sm: 48 },
                              borderRadius: '8px',
                              marginRight: '16px',
                              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
                              flexShrink: 0
                            }}
                          />
                          <Box sx={{ minWidth: 0 }}>                            <Box sx={{ 
                              position: 'relative', 
                              '&:hover .captain-button': { 
                                opacity: 1,
                                visibility: 'visible'
                              } 
                            }}>
                              <Typography 
                                color={textColor} 
                                variant="body1" 
                                fontWeight="bold"
                                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg,rgb(26, 126, 114),rgb(228, 144, 54))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1rem', sm: '1.2rem' }
                                }}
                              >
                                {item.houseName}
                                {index === 0 && (
                                  <EmojiEvents fontSize="small" sx={{ color: 'gold', flexShrink: 0 }} />
                                )}
                              </Typography>
                              <Button 
                                className="captain-button"
                                size="small"
                                variant="text"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenLeadershipInfo(item.house === openLeadershipInfo ? null : item.house);
                                }}
                                sx={{ 
                                  p: 0,
                                  minWidth: 'auto',
                                  textTransform: 'none',
                                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                  color: 'text.secondary',
                                  opacity: openLeadershipInfo === item.house ? 1 : 0,
                                  visibility: openLeadershipInfo === item.house ? 'visible' : 'hidden',
                                  transition: 'opacity 0.2s ease, visibility 0.2s ease',
                                  '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: item.house === 1 ? '#FFD600' : item.house === 2 ? '#F44336' : '#2196F3',
                                  }
                                }}
                              >
                                {openLeadershipInfo === item.house ? 'Hide captains' : 'View captains'}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: { xs: '70px', sm: '80px' },
                            ml: 1
                          }}
                        >
                        <Typography variant="caption" fontWeight="medium" color="textSecondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                          POINTS
                        </Typography>
                        <Box
                          sx={{
                            padding: { xs: '4px 8px', sm: '6px 12px' },
                            backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : 'rgba(0,0,0,0.2)',
                            color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : textColor,
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: { xs: '1rem', sm: '1.2rem' },
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                            minWidth: { xs: '50px', sm: '60px' },
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
                          }}
                        >                          {item.points}
                        </Box>
                      </Box>                      
                      {/* Leadership Info - Display captains when clicked */}
                      {openLeadershipInfo === item.house && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box
                            sx={{
                              mt: 2,
                              pt: 2,
                              borderTop: '1px dashed',
                              borderColor: 'rgba(0,0,0,0.1)'
                            }}
                          >
                            {teamLeadership.find(team => team.house === item.house)?.leaders.map((leader, idx) => (
                              <Box 
                                key={idx}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  p: 1,
                                  mb: idx === 0 ? 1 : 0,
                                  bgcolor: item.house === 1 
                                    ? 'rgba(255, 214, 0, 0.05)' 
                                    : item.house === 2 
                                      ? 'rgba(244, 67, 54, 0.05)' 
                                      : 'rgba(33, 150, 243, 0.05)',
                                  borderRadius: '8px'
                                }}
                              >
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    {leader.role}
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {leader.name}
                                  </Typography>
                                </Box>
                                <Avatar 
                                  sx={{ 
                                    width: { xs: 24, sm: 28 }, 
                                    height: { xs: 24, sm: 28 }, 
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    ...(leader.role === 'Captain' 
                                      ? {
                                          bgcolor: item.house === 1 ? '#FFD600' : item.house === 2 ? '#F44336' : '#2196F3',
                                          color: item.house === 1 ? '#000' : '#fff'
                                        }
                                      : {
                                          bgcolor: 'transparent',
                                          border: '1px solid',
                                          borderColor: item.house === 1 ? '#FFD600' : item.house === 2 ? '#F44336' : '#2196F3',
                                          color: item.house === 1 ? '#FFD600' : item.house === 2 ? '#F44336' : '#2196F3'
                                        }
                                    )
                                  }}
                                >
                                  {leader.role === 'Captain' ? 'C' : 'VC'}
                                </Avatar>
                              </Box>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </Box>
                  </ListItem>
                </motion.div>
              );
            })}
          </List>{/* No button here in the leaderboard */}
        </Paper>
      </Grid>
      
      {/* View Detailed Scores button - centered at bottom */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 6}}>
        <Button 
          component={Link}
          to="/scores"
          variant="contained"
          startIcon={<MoreHorizIcon />}
          size="large"
          sx={{
            backgroundImage: 'linear-gradient(135deg, #43cea2,#185a9d)',
            borderRadius: '12px',
            padding: { xs: '10px 20px', sm: '12px 24px' },
            fontSize: { xs: '0.875rem', sm: '1rem' },
            transition: 'all 0.2s ease',
            '&:hover': {
            backgroundImage: 'linear-gradient(135deg,rgb(26, 147, 108),#185a9d)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }
          }}
        >
          View Detailed Tournament Scores
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;