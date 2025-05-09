import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Dialog, 
  DialogContent, 
  IconButton, 
  Tabs, 
  Tab, 
  Card, 
  CardMedia, 
  CardActionArea,
  Fade,
  useTheme,
  Chip,
  Paper,
  Container,
  Badge,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Close, 
  PhotoLibrary as PhotoIcon,
  EmojiEvents as EventIcon,
  Apps as AppsIcon,
  CollectionsRounded,
  Casino as ChessIcon,
  Architecture as CardsTowerIcon,
  Brush as BrushIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

// Styled components for better theming
const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 72,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '0.875rem',
  borderRadius: '12px 12px 0 0',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(0, 0, 0, 0.04)' 
      : 'rgba(255, 255, 255, 0.08)',
    opacity: 1,
  },
  '&.Mui-selected': {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.mode === 'light' 
      ? theme.palette.primary.main 
      : theme.palette.primary.light,
  },
}));

const StyledImageCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.palette.mode === 'light' 
      ? '0 12px 24px rgba(0, 0, 0, 0.15)' 
      : '0 12px 24px rgba(0, 0, 0, 0.5)',
  },
}));

// Function to import all images from a folder
const importAll = (r) => r.keys().map(r);

// Events data structure - extensible for adding more events
const events = [
  {
    id: 'buildyourlogo',
    name: 'Build Your Logo',
    description: 'Creative logo building competition testing patience and precision',
    icon: <BrushIcon />,
    images: importAll(require.context('./gallery/buildyourlogo', false, /\.(png|jpe?g|JPG|svg)$/)),
    date: 'May 7, 2025',
    badge: {
      count: 0, // Will be set dynamically
      color: 'info'
    }
  },
  {
    id: 'tabletennis',
    name: 'Table Tennis',
    description: 'Highlights from our Table Tennis matches - April 2025',
    icon: <EventIcon />,
    images: importAll(require.context('./gallery/tabletennis', false, /\.(png|jpe?g|JPG|svg)$/)),
    date: 'April 2-4, 2025',
    badge: {
      count: 0, // Will be set dynamically
      color: 'primary'
    }
  },
  {
    id: 'carrom',
    name: 'Carrom',
    description: 'Exciting moments from the Carrom tournament with our best players',
    icon: <CollectionsRounded />,
    images: importAll(require.context('./gallery/carrom', false, /\.(png|jpe?g|JPG|svg)$/)),
    date: 'April 22-25, 2025',
    badge: {
      count: 0, // Will be set dynamically
      color: 'secondary'
    }
  },  {
    id: 'chess',
    name: 'Chess',
    description: 'Strategic battles from our Chess tournament showcasing skills and concentration',
    icon: <ChessIcon />,
    images: importAll(require.context('./gallery/chess', false, /\.(png|jpe?g|JPG|svg)$/)),
    date: 'April 26-28, 2025',
    badge: {
      count: 0, // Will be set dynamically
      color: 'success'
    }
  },
  {
    id: 'cardstower',
    name: 'Cards Tower',
    description: 'Creative card tower building competition testing patience and precision',
    icon: <CardsTowerIcon />,
    images: importAll(require.context('./gallery/cardstower', false, /\.(png|jpe?g|JPG|svg)$/)),
    date: 'April 30, 2025',
    badge: {
      count: 0, // Will be set dynamically
      color: 'info'
    }
  }
];

// Set image count for badges
events.forEach(event => {
  event.badge.count = event.images.length;
});

const Gallery = () => {
  const theme = useTheme();
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle event tab change
  const handleEventChange = (event, newValue) => {
    setSelectedEvent(newValue);
  };

  const handleClickOpen = (index) => {
    setSelectedImageIndex(index);
    setImageLoaded(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    setImageLoaded(false);
    setSelectedImageIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % events[selectedEvent].images.length;
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setImageLoaded(false);
    setSelectedImageIndex((prevIndex) => {
      const prevImageIndex = (prevIndex - 1 + events[selectedEvent].images.length) % events[selectedEvent].images.length;
      return prevImageIndex;
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ 
        padding: { xs: '15px', md: '20px' }, 
        backgroundColor: theme.palette.background.default,
        borderRadius: '16px',
      }}>
        {/* Page Header */}
        <Paper 
          elevation={3} 
          sx={{ 
            padding: { xs: '16px', sm: '20px' }, 
            mb: 3,
            textAlign: 'center',
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)' 
              : 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)',
            borderRadius: '16px',
            boxShadow: theme.shadows[8]
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
            <PhotoIcon sx={{ color: 'white', mr: 1, fontSize: { xs: '1.8rem', sm: '2.2rem' } }} />
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontFamily: 'Bree Serif, serif', 
                color: 'white', 
                mb: 0,
                fontSize: { xs: '1.8rem', sm: '2.2rem' }
              }}
            >
              Event Gallery
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Explore photos from our exciting TCCL events
          </Typography>
        </Paper>

        {/* Event Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={selectedEvent} 
            onChange={handleEventChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            TabIndicatorProps={{
              style: { height: 3 }
            }}
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
              },
              '& .MuiTabs-scrollButtons': {
                color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light
              }
            }}
          >
            {events.map((event, index) => (
              <StyledTab 
                key={event.id} 
                label={
                  <Badge 
                    badgeContent={event.badge.count} 
                    color={event.badge.color}
                    max={99}
                    sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                      <Box sx={{ mr: { xs: 0, sm: 1 }, mb: { xs: 0.5, sm: 0 } }}>
                        {event.icon}
                      </Box>
                      <Typography sx={{ 
                        fontWeight: selectedEvent === index ? 'bold' : 'normal',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                      }}>
                        {event.name}
                      </Typography>
                    </Box>
                  </Badge>
                }
              />
            ))}
          </Tabs>
        </Box>

        {/* Event Info and Images */}
        {events.map((event, eventIndex) => (
          <Box 
            key={event.id} 
            sx={{ 
              display: selectedEvent === eventIndex ? 'block' : 'none',
              minHeight: '50vh' // Ensure consistent height even with no images
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2, 
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Typography variant="h5" sx={{ 
                fontFamily: 'Bree Serif, serif',
                color: theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light
              }}>
                {event.name}
              </Typography>
              <Chip 
                label={event.date} 
                variant="outlined" 
                color="primary"
                icon={<EventIcon sx={{ fontSize: '1rem' }} />}
                sx={{ 
                  borderRadius: '16px', 
                  fontWeight: 'medium',
                  boxShadow: theme.palette.mode === 'light' ? 'none' : '0 0 5px rgba(255,255,255,0.2)'
                }}
              />
            </Box>
            
            <Typography variant="body1" sx={{ 
              mb: 3, 
              color: theme.palette.text.secondary,
              fontSize: '1rem',
              maxWidth: '800px'
            }}>
              {event.description}
            </Typography>
            
            {event.images.length > 0 ? (
              <Grid container spacing={2}>
                {event.images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Fade in={true} timeout={(index % 10) * 100 + 300}>
                      <StyledImageCard raised>
                        <CardActionArea 
                          onClick={() => handleClickOpen(index)}
                          sx={{ height: '100%' }}
                        >
                          <CardMedia
                            component="img"
                            image={image}
                            alt={`${event.name} ${index + 1}`}
                            sx={{ 
                              height: { xs: 180, sm: 200, md: 220 },
                              objectFit: 'cover'
                            }}
                          />
                        </CardActionArea>
                      </StyledImageCard>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ 
                py: 8, 
                textAlign: 'center',
                borderRadius: '12px',
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
              }}>
                <AppsIcon sx={{ fontSize: '3rem', color: 'text.disabled', mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary">
                  No images available yet
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                  Check back after the event for photos
                </Typography>
              </Box>
            )}
          </Box>
        ))}

        {/* Image Viewer Dialog */}
        <Dialog 
          open={open} 
          onClose={handleClose} 
          maxWidth="xl"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              overflow: 'hidden',
              bgcolor: 'rgba(0,0,0,0.95)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
            }
          }}
        >
          <DialogContent sx={{ position: 'relative', p: 0, textAlign: 'center', overflow: 'hidden' }}>
            {/* Top bar with logos and image counter */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: { xs: '8px', sm: '12px' },
                zIndex: 2,
                bgcolor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Image counter moved to top left */}
              <Typography color="white" variant="body2" sx={{ 
                alignSelf: 'center', 
                fontWeight: 'bold',
                px: 2
              }}>
                {selectedImageIndex !== null && `Image ${selectedImageIndex + 1} of ${events[selectedEvent].images.length}`}
              </Typography>
              
              {/* Centered house logos */}
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                justifyContent: 'center'
              }}>
                <Box
                  component="img"
                  src={yellowSparksLogo}
                  alt="Yellow Sparks"
                  sx={{ 
                    width: { xs: '32px', sm: '40px' }, 
                    height: { xs: '32px', sm: '40px' },
                    borderRadius: '50%',
                    border: '2px solid gold',
                    padding: '2px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    boxShadow: '0 0 10px rgba(255,215,0,0.7)'
                  }}
                />
                <Box
                  component="img"
                  src={spartaLogo}
                  alt="Sparta"
                  sx={{ 
                    width: { xs: '32px', sm: '40px' }, 
                    height: { xs: '32px', sm: '40px' },
                    borderRadius: '50%',
                    border: '2px solid red',
                    padding: '2px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    boxShadow: '0 0 10px rgba(255,0,0,0.7)'
                  }}
                />
                <Box
                  component="img"
                  src={missionFunPossibleLogo}
                  alt="Mission FunPossible"
                  sx={{ 
                    width: { xs: '32px', sm: '40px' }, 
                    height: { xs: '32px', sm: '40px' },
                    borderRadius: '50%',
                    border: '2px solid blue',
                    padding: '2px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    boxShadow: '0 0 10px rgba(0,0,255,0.7)'
                  }}
                />
              </Box>
              
              {/* Empty div to maintain space-between layout */}
              <Box sx={{ width: { xs: '70px', sm: '100px' } }}></Box>
            </Box>
            
            {/* Navigation buttons */}
            <IconButton
              onClick={handlePrev}
              aria-label="Previous image"
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: { xs: '5px', sm: '10px' }, 
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                zIndex: 2,
                width: { xs: '40px', sm: '48px' },
                height: { xs: '40px', sm: '48px' }
              }}
            >
              <ArrowBack />
            </IconButton>
            
            <IconButton
              onClick={handleNext}
              aria-label="Next image"
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                right: { xs: '5px', sm: '10px' }, 
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                zIndex: 2,
                width: { xs: '40px', sm: '48px' },
                height: { xs: '40px', sm: '48px' }
              }}
            >
              <ArrowForward />
            </IconButton>
            
            {/* Close button */}
            <IconButton
              onClick={handleClose}
              aria-label="Close"
              sx={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px',
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                zIndex: 3
              }}
            >
              <Close />
            </IconButton>
            
            {/* Loading indicator */}
            {!imageLoaded && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CircularProgress 
                  size={50} 
                  thickness={4} 
                  sx={{ color: theme.palette.primary.light }}
                />
              </Box>
            )}
            
            {/* Image */}
            <Fade in={imageLoaded} timeout={400}>
              <Box
                component="img"
                src={selectedImageIndex !== null ? events[selectedEvent].images[selectedImageIndex] : ''}
                alt="Selected"
                onLoad={handleImageLoad}
                sx={{
                  width: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out',
                  py: { xs: '60px', sm: '20px' } // Add padding to prevent image from being hidden behind top/bottom bars
                }}
              />
            </Fade>
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Gallery;
