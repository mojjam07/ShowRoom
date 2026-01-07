/**
 * Centralized API Configuration
 * Automatically handles production vs development URLs
 */

// Get the configured API URL from environment variables
const configuredApiUrl = import.meta.env.VITE_API_URL;

// Detect if we're running in production
const isProduction = import.meta.env.PROD;

// Detect Vercel deployment
const isVercel = import.meta.env.VERCEL === 'true';

/**
 * Get the appropriate API URL based on environment
 * - Production: Uses relative /api path (Vercel rewrites to backend)
 * - Development: Uses localhost:5000 proxy
 */
export function getApiUrl() {
  // If VITE_API_URL is explicitly set, use it (overrides all other logic)
  if (configuredApiUrl) {
    return configuredApiUrl;
  }

  // In production or on Vercel, use relative path
  // Vercel's vercel.json will rewrite /api/* to the backend
  if (isProduction || isVercel) {
    return '/api';
  }

  // Development: Use local proxy
  return '/api';
}

/**
 * Get the base URL for the API without the /api prefix
 */
export function getBaseUrl() {
  const apiUrl = getApiUrl();
  
  // If it's a full URL, return it
  if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
    return apiUrl;
  }
  
  // If it's just a path like '/api', return empty (will use relative URL)
  return '';
}

/**
 * API URL constant for backward compatibility
 * Use this in your components: import { API_URL } from '../config/api';
 */
export const API_URL = getApiUrl();

/**
 * Check if we're in production mode
 */
export const IS_PRODUCTION = isProduction || isVercel;

export default {
  API_URL,
  IS_PRODUCTION,
  getApiUrl,
  getBaseUrl
};

