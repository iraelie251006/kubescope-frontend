import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d6dae3',
          300: '#b1b9c8',
          400: '#828ca3',
          500: '#5e6883',
          600: '#454d66',
          700: '#363c52',
          800: '#1f2335',
          900: '#13162a',
          950: '#0a0c1c',
        },
        brand: {
          50: '#eef4ff',
          100: '#d9e5ff',
          200: '#bcd0ff',
          300: '#8fb1ff',
          400: '#5e85ff',
          500: '#3b5dff',
          600: '#2a3fe6',
          700: '#2330b8',
          800: '#202b91',
          900: '#1f2974',
          950: '#141843',
        },
        accent: {
          400: '#7ef0c8',
          500: '#3ddfa9',
          600: '#19b888',
        },
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(59, 93, 255, 0.55)',
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.08)',
        card: '0 1px 0 rgba(15, 23, 42, 0.04), 0 12px 32px -16px rgba(15, 23, 42, 0.16)',
        ring: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 60px -24px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'grid-light':
          'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,93,255,0.25), transparent 60%)',
      },
      backgroundSize: {
        grid: '36px 36px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-slow': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(20px,-14px,0) scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.95' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-slow': 'fade-in-slow 0.9s ease-out both',
        'scale-in': 'scale-in 0.5s ease-out both',
        float: 'float 8s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        marquee: 'marquee 30s linear infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        glow: 'glow 3.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
