import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Event } from '../types';
import { theme } from '../theme';
import { t } from '../utils/translations';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

const { width } = Dimensions.get('window');

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onPress, 
  variant = 'default' 
}) => {
  const formatDate = (date: Date) => {
    return format(date, 'dd.MM.yyyy');
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm');
  };

  const availableSpots = event.capacity - event.registeredCount;
  const isAlmostFull = availableSpots <= 10;
  const isFull = availableSpots <= 0;

  if (variant === 'featured') {
    return (
      <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.9}>
        <LinearGradient
          colors={theme.colors.gradient.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredGradient}
        />
        {event.image && (
          <Image source={{ uri: event.image }} style={styles.featuredImage} />
        )}
        <View style={styles.featuredOverlay}>
          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={16} color={theme.colors.warning} />
              <Text style={styles.featuredBadgeText}>{t('events.featured')}</Text>
            </View>
            <Text style={styles.featuredTitle}>{event.title}</Text>
            <Text style={styles.featuredDescription} numberOfLines={2}>
              {event.shortDescription}
            </Text>
            <View style={styles.featuredInfo}>
              <View style={styles.featuredInfoItem}>
                <Ionicons name="calendar-outline" size={16} color={theme.colors.background} />
                <Text style={styles.featuredInfoText}>
                  {formatDate(event.date)} • {formatTime(event.date)}
                </Text>
              </View>
              <View style={styles.featuredInfoItem}>
                <Ionicons name="location-outline" size={16} color={theme.colors.background} />
                <Text style={styles.featuredInfoText} numberOfLines={1}>
                  {event.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'compact') {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.compactContent}>
          <View style={styles.compactHeader}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {event.title}
            </Text>
            <View style={styles.compactPrice}>
              <Text style={styles.compactPriceText}>
                {event.price === 0 ? t('events.free') : `${event.price} ${event.currency}`}
              </Text>
            </View>
          </View>
          <Text style={styles.compactDescription} numberOfLines={2}>
            {event.shortDescription}
          </Text>
          <View style={styles.compactInfo}>
            <View style={styles.compactInfoItem}>
              <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.compactInfoText}>
                {formatDate(event.date)}
              </Text>
            </View>
            <View style={styles.compactInfoItem}>
              <Ionicons name="people-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.compactInfoText}>
                {availableSpots} {t('events.available')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        {event.image && (
          <Image source={{ uri: event.image }} style={styles.cardImage} />
        )}
        <View style={styles.cardImageOverlay}>
          <View style={styles.cardBadges}>
            {event.isFeatured && (
              <View style={styles.featuredBadge}>
                <Ionicons name="star" size={12} color={theme.colors.warning} />
                <Text style={styles.badgeText}>{t('events.featured')}</Text>
              </View>
            )}
            <View style={[styles.priceBadge, event.price === 0 && styles.freeBadge]}>
              <Text style={[styles.badgeText, event.price === 0 && styles.freeBadgeText]}>
                {event.price === 0 ? t('events.free') : `${event.price} ${event.currency}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={3}>
          {event.shortDescription}
        </Text>
        
        <View style={styles.cardInfo}>
          <View style={styles.cardInfoRow}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.cardInfoText}>
              {formatDate(event.date)} • {formatTime(event.date)}
            </Text>
          </View>
          <View style={styles.cardInfoRow}>
            <Ionicons name="location-outline" size={16} color={theme.colors.primary} />
            <Text style={styles.cardInfoText} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
          <View style={styles.cardInfoRow}>
            <Ionicons name="people-outline" size={16} color={theme.colors.primary} />
            <Text style={[
              styles.cardInfoText,
              isAlmostFull && styles.warningText,
              isFull && styles.errorText
            ]}>
              {isFull ? t('events.full') : `${availableSpots} ${t('events.available')}`}
            </Text>
          </View>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.speakers}>
            {event.speakers.slice(0, 3).map((speaker, index) => (
              <View key={speaker.id} style={[styles.speakerAvatar, { marginLeft: index * -8 }]}>
                {speaker.avatar ? (
                  <Image source={{ uri: speaker.avatar }} style={styles.speakerImage} />
                ) : (
                  <View style={styles.speakerPlaceholder}>
                    <Text style={styles.speakerInitial}>
                      {speaker.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
            {event.speakers.length > 3 && (
              <View style={[styles.speakerAvatar, styles.speakerMore, { marginLeft: event.speakers.length * -8 }]}>
                <Text style={styles.speakerMoreText}>+{event.speakers.length - 3}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>
              {t(`categories.${event.category}`)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Featured card styles
  featuredCard: {
    width: width * 0.85,
    height: 200,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.sm,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  featuredGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: theme.spacing.lg,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  featuredBadgeText: {
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  featuredTitle: {
    ...theme.typography.h3,
    color: theme.colors.background,
    marginBottom: theme.spacing.xs,
  },
  featuredDescription: {
    ...theme.typography.body2,
    color: theme.colors.background,
    opacity: 0.9,
    marginBottom: theme.spacing.md,
  },
  featuredInfo: {
    gap: theme.spacing.xs,
  },
  featuredInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredInfoText: {
    ...theme.typography.body2,
    color: theme.colors.background,
    marginLeft: theme.spacing.xs,
    flex: 1,
  },

  // Compact card styles
  compactCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  compactContent: {
    flex: 1,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  compactTitle: {
    ...theme.typography.h4,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  compactPrice: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  compactPriceText: {
    ...theme.typography.caption,
    color: theme.colors.background,
    fontWeight: '600',
  },
  compactDescription: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  compactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compactInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactInfoText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },

  // Default card styles
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  cardHeader: {
    position: 'relative',
    height: 160,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  cardBadges: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  priceBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  freeBadge: {
    backgroundColor: theme.colors.success,
  },
  badgeText: {
    ...theme.typography.caption,
    color: theme.colors.background,
    fontWeight: '600',
  },
  freeBadgeText: {
    color: theme.colors.background,
  },
  cardContent: {
    padding: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  cardInfo: {
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInfoText: {
    ...theme.typography.body2,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  warningText: {
    color: theme.colors.warning,
  },
  errorText: {
    color: theme.colors.error,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speakers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.background,
    overflow: 'hidden',
  },
  speakerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  speakerPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakerInitial: {
    color: theme.colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  speakerMore: {
    backgroundColor: theme.colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakerMoreText: {
    color: theme.colors.background,
    fontSize: 10,
    fontWeight: '600',
  },
  categoryTag: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryTagText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default EventCard;