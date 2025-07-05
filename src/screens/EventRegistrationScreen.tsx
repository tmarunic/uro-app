import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../theme';

const EventRegistrationScreen = ({ route }: any) => {
  const { eventId } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Event Registration</Text>
        <Text style={styles.subtitle}>Event ID: {eventId}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.colors.textSecondary,
  },
});

export default EventRegistrationScreen;