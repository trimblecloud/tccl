// PageTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '../analytics';

const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Send pageview with the current location pathname
    pageview(location.pathname);
  }, [location]);

  return null;
};

export default PageTracker;
