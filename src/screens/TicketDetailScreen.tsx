import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../theme';

const TicketDetailScreen = ({ route }: any) => {
  const { ticketId } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ticket Detail</Text>
        <Text style={styles.subtitle}>Ticket ID: {ticketId}</Text>
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

export default TicketDetailScreen;