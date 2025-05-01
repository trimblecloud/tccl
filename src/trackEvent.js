// trackEvent.js
import { event } from './analytics';
import { getAnalytics, logEvent } from 'firebase/analytics';

/**
 * Enhanced track event function that sends events to both Google Analytics and Firebase Analytics
 * 
 * @param {string} category - Event category (e.g., 'UI', 'User', 'Navigation')
 * @param {string} action - Event action (e.g., 'Click', 'Submit', 'View')
 * @param {string} label - Event label (e.g., 'Home Button', 'Submit Form', 'Details Page')
 * @param {number} value - Event value (optional numeric value)
 * @param {Object} additionalParams - Optional additional parameters for Firebase Analytics
 */
const trackEvent = (category, action, label, value = null, additionalParams = {}) => {
  // Track with standard Google Analytics
  event({
    category,
    action,
    label,
    value
  });
  
  // Track with Firebase Analytics if available
  try {
    const analytics = getAnalytics();
    if (analytics) {
      logEvent(analytics, action, {
        event_category: category,
        event_label: label,
        value: value,
        ...additionalParams
      });
    }
  } catch (error) {
    // Firebase analytics may not be initialized yet, just log to console in dev
    if (process.env.NODE_ENV === 'development') {
      console.log('Firebase analytics not available:', error.message);
    }
  }
};

/**
 * Track page views
 * @param {string} pageName - Name of the page
 * @param {string} pageUrl - URL of the page
 */
export const trackPageView = (pageName, pageUrl) => {
  trackEvent('page_view', 'view', pageName, null, {
    page_title: pageName,
    page_location: pageUrl,
    page_path: pageUrl
  });
};

/**
 * Track user engagement
 * @param {string} type - Type of engagement (e.g. 'click', 'scroll', 'time_spent')
 * @param {string} content - Content that was engaged with
 */
export const trackEngagement = (type, content) => {
  trackEvent('engagement', type, content);
};

export default trackEvent;
