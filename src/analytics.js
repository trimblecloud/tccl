// analytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Initialize Google Analytics
export const initGA = (id) => {
  if (typeof window !== 'undefined') {
    // Check consent first
    const hasConsent = localStorage.getItem('cookie-consent');
    let analyticsConsent = true;
    
    if (hasConsent) {
      try {
        const consentData = JSON.parse(hasConsent);
        analyticsConsent = consentData.analytics;
      } catch (e) {
        console.error('Error parsing consent data', e);
      }
    }
    
    // Create script tag
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    
    // Set default consent state
    gtag('consent', 'default', {
      'analytics_storage': analyticsConsent ? 'granted' : 'denied'
    });
    
    gtag('config', id, {
      send_page_view: false, // We'll handle this with our hook
      anonymize_ip: true,
    });

    window.gtag = gtag;
  }
};

// Track page views
export const pageview = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Hook to track page views
export const usePageTracking = () => {
  const location = useLocation();
  
  useEffect(() => {
    pageview(location.pathname);
  }, [location]);

  return null;
};
