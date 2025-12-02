// src/utils/colorExtractor.ts
export const extractImageColors = {
  primaryDark: '#1a365d',
  primaryMain: '#2563eb',
  primaryLight: '#3b82f6',
  secondaryDark: '#0f766e',
  secondaryMain: '#14b8a6',
  secondaryLight: '#5eead4',
  accentOrange: '#c2410c',
  accentAmber: '#f59e0b',
  accentGreen: '#10b981',
  neutral50: '#f8fafc',
  neutral100: '#f1f5f9',
  neutral200: '#e2e8f0',
  neutral800: '#1e293b',
  neutral900: '#0f172a',
  gradientPrimary: 'linear-gradient(135deg, #1a365d, #0f766e)',
  gradientAccent: 'linear-gradient(135deg, #c2410c, #f59e0b)'
};

export type CompanyColors = typeof extractImageColors;