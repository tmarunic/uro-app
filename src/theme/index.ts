export const theme = {
  colors: {
    primary: '#4A90E2',
    primaryLight: '#6BA3F0',
    primaryDark: '#3578CC',
    secondary: '#87CEEB',
    accent: '#5BA3F5',
    background: '#FFFFFF',
    surface: '#F8FBFF',
    card: '#FFFFFF',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    textLight: '#BDC3C7',
    border: '#E3F2FD',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
    gradient: {
      primary: ['#4A90E2', '#87CEEB'],
      secondary: ['#87CEEB', '#B0E0E6'],
      accent: ['#5BA3F5', '#4A90E2']
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold' as const,
      lineHeight: 36
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28
    },
    body1: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24
    },
    body2: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24
    }
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    }
  }
};

export type Theme = typeof theme;