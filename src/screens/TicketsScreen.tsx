import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ticket } from '../types';
import dataService from '../services/dataService';
import { theme } from '../theme';
import { t } from '../utils/translations';

const TicketsScreen = ({ navigation }: any) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const userTickets = await dataService.getUserTickets();
      setTickets(userTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToTicket = (ticketId: string) => {
    navigation.navigate('TicketDetail', { ticketId });
  };

  const renderTicket = ({ item }: { item: Ticket }) => (
    <TouchableOpacity
      style={styles.ticketCard}
      onPress={() => navigateToTicket(item.id)}
    >
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketTitle} numberOfLines={1}>
          {item.eventTitle}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: theme.colors.success }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.ticketInfo}>
        <View style={styles.ticketRow}>
          <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.ticketText}>
            {item.eventDate.toLocaleDateString('sr-RS')}
          </Text>
        </View>
        <View style={styles.ticketRow}>
          <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.ticketText} numberOfLines={1}>
            {item.eventLocation}
          </Text>
        </View>
        <View style={styles.ticketRow}>
          <Ionicons name="ticket-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.ticketText}>{item.ticketCode}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('tickets.title')}</Text>
      </View>
      {tickets.length > 0 ? (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="ticket-outline" size={64} color={theme.colors.textLight} />
          <Text style={styles.emptyText}>{t('tickets.noTickets')}</Text>
        </View>
      )}
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
  list: {
    padding: theme.spacing.lg,
  },
  ticketCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  ticketTitle: {
    ...theme.typography.h4,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    ...theme.typography.caption,
    color: theme.colors.background,
    fontWeight: '600',
  },
  ticketInfo: {
    gap: theme.spacing.sm,
  },
  ticketRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketText: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.h4,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
});

export default TicketsScreen;