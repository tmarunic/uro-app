import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../services/AuthContext';
import { Event } from '../types';
import dataService from '../services/dataService';
import { theme } from '../theme';
import { t } from '../utils/translations';
import EventCard from '../components/EventCard';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [featured, upcoming] = await Promise.all([
        dataService.getFeaturedEvents(),
        dataService.getUpcomingEvents(),
      ]);
      setFeaturedEvents(featured);
      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const navigateToEvent = (eventId: string) => {
    navigation.navigate('EventDetail', { eventId });
  };

  const navigateToEvents = () => {
    navigation.navigate('Events');
  };

  const navigateToTickets = () => {
    navigation.navigate('Tickets');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dobro jutro';
    if (hour < 18) return 'Dobar dan';
    return 'Dobro veče';
  };

  const renderFeaturedEvent = ({ item }: { item: Event }) => (
    <EventCard
      event={item}
      onPress={() => navigateToEvent(item.id)}
      variant="featured"
    />
  );

  const renderUpcomingEvent = ({ item }: { item: Event }) => (
    <EventCard
      event={item}
      onPress={() => navigateToEvent(item.id)}
      variant="compact"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={theme.colors.gradient.primary}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>{user?.firstName}!</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person-outline" size={24} color={theme.colors.background} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.tagline}>{t('home.tagline')}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user?.registeredEvents.length || 0}</Text>
              <Text style={styles.statLabel}>Registracije</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{upcomingEvents.length}</Text>
              <Text style={styles.statLabel}>Nadolazeći</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{featuredEvents.length}</Text>
              <Text style={styles.statLabel}>Izdvojeni</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={navigateToEvents}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryLight]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="calendar-outline" size={24} color={theme.colors.background} />
            </LinearGradient>
            <Text style={styles.quickActionText}>{t('events.title')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={navigateToTickets}
          >
            <LinearGradient
              colors={[theme.colors.secondary, theme.colors.accent]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="ticket-outline" size={24} color={theme.colors.background} />
            </LinearGradient>
            <Text style={styles.quickActionText}>{t('tickets.title')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('QRScanner')}
          >
            <LinearGradient
              colors={[theme.colors.accent, theme.colors.primary]}
              style={styles.quickActionGradient}
            >
              <Ionicons name="qr-code-outline" size={24} color={theme.colors.background} />
            </LinearGradient>
            <Text style={styles.quickActionText}>QR Skener</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.featuredEvents')}</Text>
              <TouchableOpacity onPress={navigateToEvents}>
                <Text style={styles.seeAllText}>{t('home.seeAll')}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={featuredEvents}
              renderItem={renderFeaturedEvent}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.upcomingEvents')}</Text>
            <TouchableOpacity onPress={navigateToEvents}>
              <Text style={styles.seeAllText}>{t('home.seeAll')}</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingEvents.length > 0 ? (
            <View style={styles.upcomingList}>
              {upcomingEvents.slice(0, 5).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onPress={() => navigateToEvent(event.id)}
                  variant="compact"
                />
              ))}
              {upcomingEvents.length > 5 && (
                <Button
                  title={`Prikaži još ${upcomingEvents.length - 5} događaja`}
                  onPress={navigateToEvents}
                  variant="outline"
                  style={styles.showMoreButton}
                />
              )}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={theme.colors.textLight} />
              <Text style={styles.emptyText}>{t('home.noEvents')}</Text>
              <Text style={styles.emptySubtext}>Proveri ponovo kasnije</Text>
            </View>
          )}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <View style={styles.appInfoCard}>
            <View style={styles.appInfoHeader}>
              <Ionicons name="information-circle-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.appInfoTitle}>O nama</Text>
            </View>
            <Text style={styles.appInfoText}>
              {t('about.missionText')}
            </Text>
            <Button
              title={t('about.title')}
              onPress={() => navigation.navigate('About')}
              variant="text"
              size="small"
            />
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    ...theme.typography.body1,
    color: theme.colors.background,
    opacity: 0.9,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    ...theme.typography.body1,
    color: theme.colors.background,
    opacity: 0.9,
    marginBottom: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...theme.typography.h3,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.background,
    opacity: 0.8,
    marginTop: theme.spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    marginTop: -theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  quickActionGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.md,
  },
  quickActionText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  seeAllText: {
    ...theme.typography.body2,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  featuredList: {
    paddingLeft: theme.spacing.lg,
  },
  upcomingList: {
    paddingHorizontal: theme.spacing.lg,
  },
  showMoreButton: {
    marginTop: theme.spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  emptyText: {
    ...theme.typography.h4,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  emptySubtext: {
    ...theme.typography.body2,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  appInfo: {
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  appInfoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  appInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  appInfoTitle: {
    ...theme.typography.h4,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm,
  },
  appInfoText: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
});

export default HomeScreen;