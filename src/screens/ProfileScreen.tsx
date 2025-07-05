import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../services/AuthContext';
import { theme } from '../theme';
import { t } from '../utils/translations';

const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const profileOptions = [
    { 
      title: t('settings.title'), 
      icon: 'settings-outline', 
      onPress: () => navigation.navigate('Settings') 
    },
    { 
      title: t('about.title'), 
      icon: 'information-circle-outline', 
      onPress: () => navigation.navigate('About') 
    },
    { 
      title: t('auth.logout'), 
      icon: 'log-out-outline', 
      onPress: handleLogout 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile.title')}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color={theme.colors.background} />
          </View>
          <Text style={styles.name}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <Ionicons name={option.icon as any} size={24} color={theme.colors.primary} />
              <Text style={styles.optionText}>{option.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: theme.colors.card,
    margin: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
  },
  optionsContainer: {
    margin: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionText: {
    ...theme.typography.body1,
    color: theme.colors.text,
    flex: 1,
    marginLeft: theme.spacing.md,
  },
});

export default ProfileScreen;