// components/Winners.js
import React, { useState } from 'react';
import { 
  Typography, Box, Paper, useTheme, styled, Grid, Avatar, Chip, Divider,
  Card, CardHeader, CardContent, Tabs, Tab
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PsychologyIcon from '@mui/icons-material/Psychology';

// Import house logos
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

// Import participant photos - Bet Your Brain
import senthilKumarPhoto from './images/participants/participant_senthil_kumar_palanivelu.jpg';
import aravinthKarthikeyanPhoto from './images/participants/participant_aravinth_karthikeyan.jpg';
import beulahMercyPhoto from './images/participants/participant_beulah_mercy_paul_manickam.jpg';
import vivekTSPhoto from './images/participants/participant_vivek_t_s.jpg';
import hemaDharshiniPhoto from './images/participants/participant_hema_priya_dharshini_v.jpg';
import vikashSRPhoto from './images/participants/participant_vikash_s_r.jpg';
import sivakumarSPhoto from './images/participants/participant_sivakumar_soundarapandian.jpg';
import nikhileshSPPhoto from './images/participants/participant_nikhilesh_s_p.jpg';
import jayanthBalakrishnanPhoto from './images/participants/participant_jayanth_balakrishnan.jpg';
import priyaRousiniPhoto from './images/participants/participant_priya_rousini_duraiazhagan.jpg';
import kamalakkannanRPhoto from './images/participants/participant_kamalakkannan_r.jpg';
import rajkumarSPhoto from './images/participants/participant_rajkumar_s.jpg';

// Import participant photos - Table Tennis Doubles
import sathishkumarSPhoto from './images/participants/participant_sathishkumar_sampathkumar.jpg';
import sathyakumarSPhoto from './images/participants/participant_sathyakumar_seshachalam.jpg';
import raviThangaduraiPhoto from './images/participants/participant_ravi_thangadurai.jpg';
import krithickSPhoto from './images/participants/participant_krithick_s.jpg';

// Import participant photos - Carrom
import praneshKPhoto from './images/participants/participant_pranesh_k.jpg';
import madhanBabuSPhoto from './images/participants/participant_madhan_babu_s.jpg';
import karthikKPhoto from './images/participants/participant_karthik_k.jpg';

// Styled components
const EventCard = styled(Card)(({ theme, color }) => ({
  marginBottom: '24px',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
  }
}));

const EventCardHeader = styled(CardHeader)(({ theme, color }) => ({
  background: `linear-gradient(135deg, ${color[0]} 0%, ${color[1]} 100%)`,
  color: '#FFF',
  padding: '16px',
  '& .MuiCardHeader-title': {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  '& .MuiCardHeader-subheader': {
    color: 'rgba(255, 255, 255, 0.8)',
  }
}));

const TeamCard = styled(Paper)(({ theme, houseColor }) => ({
  padding: '16px',
  borderRadius: '12px',
  height: '100%',
  background: theme.palette.mode === 'light' ? '#fff' : '#2d2d2d',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `4px solid ${houseColor}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '40px',
    height: '40px',
    opacity: '0.15',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
  }
}));

// We no longer need this styled component as we're using inline styles directly
// in the renderTeamMembers function with the proper sizing and border

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'none',
  minWidth: '100px',
  borderRadius: '8px 8px 0 0',
  '&.Mui-selected': {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
  }
}));

const Winners = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // House data
  const houses = {
    'house1': {
      name: 'The Yellow Sparks',
      logo: yellowSparksLogo,
      color: '#FFD700',
    },
    'house2': {
      name: 'Sparta',
      logo: spartaLogo,
      color: '#FF4C4C',
    },
    'house3': {
      name: 'Mission FunPossible',
      logo: missionFunPossibleLogo,
      color: '#4C70FF',
    }
  };
  // Winners data for each event
  const eventsData = [
    {
      id: 'bet-your-brain',
      name: 'Bet Your Brain',
      icon: <PsychologyIcon />,
      colors: ['#FF9800', '#F57C00'],
      description: 'A quiz competition that tests knowledge and quick thinking',
      winners: {
        house: 'house1',
        members: [
          { name: 'Senthil Kumar Palanivelu', photo: senthilKumarPhoto },
          { name: 'Aravinth Karthikeyan', photo: aravinthKarthikeyanPhoto },
          { name: 'Beulah Mercy Paul Manickam', photo: beulahMercyPhoto },
          { name: 'Vivek T S', photo: vivekTSPhoto },
          { name: 'Hema Priya Dharshini V', photo: hemaDharshiniPhoto },
          { name: 'Vikash S R', photo: vikashSRPhoto }
        ]
      },
      runners: {
        house: 'house3',
        members: [
          { name: 'Sivakumar Soundarapandian', photo: sivakumarSPhoto },
          { name: 'Nikhilesh S P', photo: nikhileshSPPhoto },
          { name: 'Jayanth Balakrishnan', photo: jayanthBalakrishnanPhoto },
          { name: 'Priya Rousini Duraiazhagan', photo: priyaRousiniPhoto },
          { name: 'Kamalakkannan R', photo: kamalakkannanRPhoto },
          { name: 'Rajkumar S', photo: rajkumarSPhoto }
        ]
      }
    },
    {
      id: 'table-tennis',
      name: 'Table Tennis Doubles',
      icon: <SportsTennisIcon />,
      colors: ['#E91E63', '#C2185B'],
      description: 'Doubles tournament with knockout format',
      winners: {
        house: 'house2',
        members: [
          { name: 'Sathishkumar Sampathkumar', photo: sathishkumarSPhoto },
          { name: 'Sathyakumar Seshachalam', photo: sathyakumarSPhoto }
        ]
      },
      runners: {
        house: 'house2',
        members: [
          { name: 'Ravi Thangadurai', photo: raviThangaduraiPhoto },
          { name: 'Krithick S', photo: krithickSPhoto }
        ]
      }
    },
    {
      id: 'carrom',
      name: 'Carrom',
      icon: <CasinoIcon />,
      colors: ['#FF9800', '#F57C00'],
      description: 'Doubles tournament with knockout format',
      winners: {
        house: 'house3',
        members: [
          { name: 'Jayanth Balakrishnan', photo: jayanthBalakrishnanPhoto },
          { name: 'Pranesh K', photo: praneshKPhoto }
        ]
      },
      runners: {
        house: 'house1',
        members: [
          { name: 'Madhan Babu S', photo: madhanBabuSPhoto },
          { name: 'Karthik K', photo: karthikKPhoto }
        ]
      }
    }
  ];

  // Filtered events based on tab selection
  const displayEvents = selectedTab === 0 
    ? eventsData 
    : eventsData.filter((event, index) => index === selectedTab - 1);
  const renderTeamMembers = (members, houseColor) => (
    <Box sx={{ mt: 1 }}>
      {members.map((member, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Avatar 
            src={member.photo} 
            alt={member.name}
            sx={{ 
              width: 45, 
              height: 45, 
              marginRight: '12px',
              border: `2px solid ${houseColor}`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
          <Typography variant="body2" fontWeight="medium">
            {member.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Paper elevation={3} sx={{ 
      padding: { xs: '16px', sm: '24px' }, 
      borderRadius: '16px',
      background: theme.palette.mode === 'light' 
        ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)' 
        : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="bold" 
          sx={{ 
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mb: 1
          }}
        >
          <EmojiEventsIcon fontSize="large" color="primary" />
          Event Winners & Runners-up
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Congratulations to all the winners and participants
        </Typography>
      </Box>

      {/* Tab navigation */}
      <Tabs 
        value={selectedTab} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          mb: 3, 
          borderBottom: 1, 
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 3
          }
        }}
      >
        <StyledTab label="All Events" />
        {eventsData.map((event, idx) => (
          <StyledTab 
            key={event.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 24, height: 24, bgcolor: event.colors[0] }}>
                  {React.cloneElement(event.icon, { fontSize: 'small' })}
                </Avatar>
                {event.name}
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* Event cards */}
      {displayEvents.map((event) => (
        <EventCard key={event.id} color={event.colors}>
          <EventCardHeader
            color={event.colors}
            avatar={
              <Avatar sx={{ bgcolor: '#fff' }}>
                {React.cloneElement(event.icon, { sx: { color: event.colors[0] } })}
              </Avatar>
            }
            title={event.name}
            subheader={event.description}
          />
          <CardContent>
            <Grid container spacing={3}>              {/* Winners */}
              <Grid item xs={12} md={6}>
                <TeamCard houseColor={houses[event.winners.house].color}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: -16,
                        width: 'calc(100% + 32px)',
                        height: '1px',
                        backgroundColor: theme.palette.divider,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        mr: 2
                      }}
                    >
                      <Avatar 
                        src={houses[event.winners.house].logo} 
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          border: `3px solid ${houses[event.winners.house].color}`,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                        }} 
                      />
                      <Avatar
                        sx={{
                          position: 'absolute',
                          bottom: -10,
                          right: -10,
                          width: 28,
                          height: 28,
                          bgcolor: 'gold',
                          color: '#000',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          fontSize: '0.8rem'
                        }}
                      >
                        1st
                      </Avatar>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {houses[event.winners.house].name}
                        </Typography>
                        <Chip 
                          label="WINNERS" 
                          size="small" 
                          color="success" 
                          sx={{ fontWeight: 'bold', height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {renderTeamMembers(event.winners.members, houses[event.winners.house].color)}
                </TeamCard>
              </Grid>

              {/* Runners */}
              <Grid item xs={12} md={6}>
                <TeamCard houseColor={houses[event.runners.house].color}>
                  <Box 
                    sx={{ 
                      position: 'relative',
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      pb: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: -16,
                        width: 'calc(100% + 32px)',
                        height: '1px',
                        backgroundColor: theme.palette.divider,
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'relative',
                        mr: 2
                      }}
                    >
                      <Avatar 
                        src={houses[event.runners.house].logo} 
                        sx={{ 
                          width: 60, 
                          height: 60,
                          border: `3px solid ${houses[event.runners.house].color}`,
                          boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                        }} 
                      />
                      <Avatar
                        sx={{
                          position: 'absolute',
                          bottom: -10,
                          right: -10,
                          width: 28,
                          height: 28,
                          bgcolor: 'silver',
                          color: '#000',
                          border: '2px solid #fff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          fontSize: '0.8rem'
                        }}
                      >
                        2nd
                      </Avatar>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" fontWeight="bold">
                          {houses[event.runners.house].name}
                        </Typography>
                        <Chip 
                          label="RUNNERS-UP" 
                          size="small" 
                          color="primary" 
                          sx={{ fontWeight: 'bold', height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {renderTeamMembers(event.runners.members, houses[event.runners.house].color)}
                </TeamCard>
              </Grid>
            </Grid>
          </CardContent>
        </EventCard>
      ))}
    </Paper>
  );
};

export default Winners;
