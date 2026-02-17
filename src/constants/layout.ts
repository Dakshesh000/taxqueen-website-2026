/**
 * Layout and behavior constants
 * Centralized location for magic numbers used throughout the app
 */

// Hero Section
export const HERO_LOCK_POINT = 280;
export const HERO_SNAP_THRESHOLD = 120;
export const HERO_MIN_PADDING = 16;
export const HERO_MAX_PADDING = 56;

// Quiz
export const QUIZ_TOTAL_STEPS = 9;
export const QUIZ_AUTO_ADVANCE_DELAY = 400;
export const QUIZ_CONTENT_MIN_HEIGHT = 520; // Accommodates tallest question (6-option MultiSelect)
export const QUIZ_CONTENT_MIN_HEIGHT_MOBILE = 480;

// Animations
export const WIGGLE_INTERVAL_MS = 5000;
export const WIGGLE_DURATION_MS = 1200;

// Validation
export const EMAIL_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.(?!con$)[a-zA-Z]{2,}$/;
export const PHONE_REGEX = /^\+\d{1,3}\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
