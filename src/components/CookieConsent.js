// CookieConsent.js
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Snackbar,
  Alert
} from '@mui/material';
import { Close as CloseIcon, Cookie as CookieIcon } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Consent state
  const [consents, setConsents] = useState({
    analytics: true,
    functional: true
  });

  useEffect(() => {
    // Check if user has already provided consent
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Parse stored consent
      try {
        const storedConsents = JSON.parse(hasConsent);
        setConsents(storedConsents);
        
        // If analytics consent was given, initialize GA
        if (storedConsents.analytics && window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        } else if (window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': 'denied'
          });
        }
      } catch (e) {
        console.error('Error parsing consent data', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsents = {
      analytics: true,
      functional: true
    };
    
    saveConsent(allConsents);
  };

  const handleSaveSettings = () => {
    saveConsent(consents);
    setShowSettings(false);
  };

  const saveConsent = (consentData) => {
    // Store consent preferences
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    
    // Update Google Analytics consent state
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consentData.analytics ? 'granted' : 'denied'
      });
      
      // Track consent action (only if analytics consent is given)
      if (consentData.analytics) {
        window.gtag('event', 'cookie_consent', {
          'event_category': 'consent',
          'event_label': 'Gave cookie consent',
          'analytics_consent': consentData.analytics,
          'functional_consent': consentData.functional
        });
      }
    }
    
    setOpen(false);
    setSuccess(true);
  };

  const handleChange = (type) => {
    setConsents(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <CookieIcon sx={{ mr: 1, color: 'primary.main' }} />
          Cookie Preferences
          <Button 
            onClick={() => setOpen(false)} 
            sx={{ ml: 'auto', minWidth: 'auto', p: 1 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies.
          </Typography>
          
          {showSettings ? (
            <Box sx={{ mt: 2 }}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle2">Essential Cookies</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Required for the website to function. Cannot be disabled.
                  </Typography>
                </Box>
                <Button disabled variant="contained" size="small">
                  Always Active
                </Button>
              </Paper>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle2">Analytics Cookies</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Help us improve by collecting anonymous usage information.
                  </Typography>
                </Box>
                <Button 
                  variant={consents.analytics ? "contained" : "outlined"} 
                  color={consents.analytics ? "primary" : "inherit"}
                  size="small"
                  onClick={() => handleChange('analytics')}
                >
                  {consents.analytics ? 'Enabled' : 'Disabled'}
                </Button>
              </Paper>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle2">Functional Cookies</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Remember your preferences and enhance functionality.
                  </Typography>
                </Box>
                <Button 
                  variant={consents.functional ? "contained" : "outlined"} 
                  color={consents.functional ? "primary" : "inherit"}
                  size="small"
                  onClick={() => handleChange('functional')}
                >
                  {consents.functional ? 'Enabled' : 'Disabled'}
                </Button>
              </Paper>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                View our <Link href="#" onClick={(e) => {e.preventDefault(); setShowSettings(true);}}>Cookie Policy</Link> for more information.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          {showSettings ? (
            <>
              <Button 
                variant="outlined" 
                onClick={() => setShowSettings(false)}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSaveSettings}
              >
                Save Preferences
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outlined" 
                onClick={() => setShowSettings(true)}
              >
                Customize
              </Button>
              <Button 
                variant="contained" 
                onClick={handleAcceptAll}
                color="primary"
              >
                Accept All
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Success message */}
      <Snackbar 
        open={success} 
        autoHideDuration={5000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Your cookie preferences have been saved!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CookieConsent;
