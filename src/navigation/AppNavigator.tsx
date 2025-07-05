import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../services/AuthContext';
import { RootStackParamList, MainTabParamList } from '../types';
import { theme } from '../theme';
import { t } from '../utils/translations';

// Screen imports
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventRegistrationScreen from '../screens/EventRegistrationScreen';
import TicketsScreen from '../screens/TicketsScreen';
import TicketDetailScreen from '../screens/TicketDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import QRScannerScreen from '../screens/QRScannerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: t('home.welcome'),
          tabBarLabel: t('home.welcome'),
        }} 
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen} 
        options={{ 
          title: t('events.title'),
          tabBarLabel: t('events.title'),
        }} 
      />
      <Tab.Screen 
        name="Tickets" 
        component={TicketsScreen} 
        options={{ 
          title: t('tickets.title'),
          tabBarLabel: t('tickets.title'),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: t('profile.title'),
          tabBarLabel: t('profile.title'),
        }} 
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen 
              name="EventDetail" 
              component={EventDetailScreen}
              options={{
                headerShown: true,
                title: t('events.eventDetails'),
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="EventRegistration" 
              component={EventRegistrationScreen}
              options={{
                headerShown: true,
                title: t('events.register'),
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="TicketDetail" 
              component={TicketDetailScreen}
              options={{
                headerShown: true,
                title: t('tickets.ticketDetails'),
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="QRScanner" 
              component={QRScannerScreen}
              options={{
                headerShown: true,
                title: t('qrScanner.title'),
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{
                headerShown: true,
                title: t('settings.title'),
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen 
              name="About" 
              component={AboutScreen}
              options={{
                headerShown: true,
                title: t('about.title'),
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.background,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;