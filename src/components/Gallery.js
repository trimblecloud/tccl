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
  Paper
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Close, 
  PhotoLibrary as PhotoIcon,
  EmojiEvents as EventIcon
} from '@mui/icons-material';
import yellowSparksLogo from './logo/yellow-sparks-logo.png';
import spartaLogo from './logo/sparta-logo.png';
import missionFunPossibleLogo from './logo/mission-fun-possible-logo.png';

// Function to import all images from a folder
const importAll = (r) => r.keys().map(r);

// Events data structure - extensible for adding more events
const events = [
  {
    id: 'tabletennis',
    name: 'Table Tennis',
    description: 'Highlights from our Table Tennis matches',
    icon: <EventIcon />,
    images: importAll(require.context('./gallery/tabletennis', false, /\.(png|jpe?g|JPG|svg)$/)),
    date: 'April 2025'
  }
  // Example for adding more events:
  // {
  //   id: 'cricket',
  //   name: 'Cricket Tournament',
  //   description: 'Images from our Cricket matches',
  //   icon: <EventIcon />,
  //   images: [], // Will be populated when you add images
  //   date: 'April 2025'
  // }
];

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
    <Box sx={{ padding: { xs: '15px', md: '20px' }, backgroundColor: theme.palette.background.default }}>
      {/* Page Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          padding: '20px', 
          mb: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
          borderRadius: '16px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <PhotoIcon sx={{ color: 'white', mr: 1, fontSize: '2rem' }} />
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Bree Serif, serif', color: 'white', mb: 0 }}>
            Event Gallery
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Explore photos from our exciting TCCL events
        </Typography>
      </Paper>

      {/* Event Tabs */}
      <Tabs 
        value={selectedEvent} 
        onChange={handleEventChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main,
            height: 3
          }
        }}
      >
        {events.map((event, index) => (
          <Tab 
            key={event.id} 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {event.icon}
                <Typography sx={{ ml: 1 }}>{event.name}</Typography>
              </Box>
            } 
          />
        ))}
      </Tabs>

      {/* Event Info and Images */}
      {events.map((event, eventIndex) => (
        <Box key={event.id} sx={{ display: selectedEvent === eventIndex ? 'block' : 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Bree Serif, serif' }}>
              {event.name}
            </Typography>
            <Chip 
              label={event.date} 
              variant="outlined" 
              color="primary"
              icon={<EventIcon sx={{ fontSize: '1rem' }} />}
            />
          </Box>
          
          <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
            {event.description}
          </Typography>
          
          <Grid container spacing={2}>
            {event.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Fade in={true} timeout={(index % 10) * 100 + 300}>
                  <Card 
                    raised
                    sx={{ 
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      }
                    }}
                  >
                    <CardActionArea onClick={() => handleClickOpen(index)}>
                      <CardMedia
                        component="img"
                        image={image}
                        alt={`${event.name} ${index + 1}`}
                        sx={{ 
                          height: 220,
                          objectFit: 'cover'
                        }}
                      />
                    </CardActionArea>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Image Viewer Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            bgcolor: 'rgba(0,0,0,0.9)'
          }
        }}
      >
        <DialogContent sx={{ position: 'relative', p: 0, textAlign: 'center', overflow: 'hidden' }}>
          {/* House logos decoration as badges on frame */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px',
              zIndex: 2,
              bgcolor: 'rgba(0,0,0,0.5)'
            }}
          >
            {/* Image counter moved to top left */}
            <Typography color="white" variant="body2" sx={{ alignSelf: 'center', fontWeight: 'bold' }}>
              {selectedImageIndex !== null && `Image ${selectedImageIndex + 1} of ${events[selectedEvent].images.length}`}
            </Typography>
            
            {/* Centered house logos */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Box
                component="img"
                src={yellowSparksLogo}
                alt="Yellow Sparks"
                sx={{ 
                  width: '40px', 
                  height: '40px',
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
                  width: '40px', 
                  height: '40px',
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
                  width: '40px', 
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid blue',
                  padding: '2px',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  boxShadow: '0 0 10px rgba(0,0,255,0.7)'
                }}
              />
            </Box>
            
            {/* Empty div to maintain space-between layout */}
            <Box sx={{ width: '100px' }}></Box>
          </Box>
          
          {/* Navigation buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '10px', 
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.3)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
              zIndex: 2
            }}
          >
            <ArrowBack />
          </IconButton>
          
          <IconButton
            onClick={handleNext}
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              right: '10px', 
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.3)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
              zIndex: 2
            }}
          >
            <ArrowForward />
          </IconButton>
          
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            sx={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px',
              bgcolor: 'rgba(255,255,255,0.3)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' },
              zIndex: 2
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
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.2)',
                  borderTop: '3px solid #fff',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              />
            </Box>
          )}
          
          {/* Image */}
          <Fade in={imageLoaded} timeout={300}>
            <Box
              component="img"
              src={selectedImageIndex !== null ? events[selectedEvent].images[selectedImageIndex] : ''}
              alt="Selected"
              onLoad={handleImageLoad}
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s'
              }}
            />
          </Fade>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Gallery;
