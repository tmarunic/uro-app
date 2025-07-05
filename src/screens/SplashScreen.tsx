import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { t } from '../utils/translations';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={theme.colors.gradient.primary}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={[theme.colors.background, theme.colors.surface]}
            style={styles.logoGradient}
          >
            <Ionicons 
              name="school-outline" 
              size={64} 
              color={theme.colors.primary} 
            />
          </LinearGradient>
        </View>
        
        <Text style={styles.title}>{t('about.appName')}</Text>
        <Text style={styles.subtitle}>{t('home.tagline')}</Text>
        
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.loadingDot,
              {
                opacity: fadeAnim,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.loadingDot,
              styles.loadingDotDelay1,
              {
                opacity: fadeAnim,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.loadingDot,
              styles.loadingDotDelay2,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.background,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    fontWeight: 'bold',
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.colors.background,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: theme.spacing.xxl,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.xs,
  },
  loadingDotDelay1: {
    opacity: 0.7,
  },
  loadingDotDelay2: {
    opacity: 0.5,
  },
});

export default SplashScreen;