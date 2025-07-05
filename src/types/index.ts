export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  registeredEvents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: Date;
  endDate?: Date;
  location: string;
  locationDetails?: string;
  capacity: number;
  registeredCount: number;
  image?: string;
  speakers: Speaker[];
  category: EventCategory;
  tags: string[];
  price: number;
  currency: string;
  registrationDeadline: Date;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  company?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
}

export interface EventRegistration {
  id: string;
  userId: string;
  eventId: string;
  registrationDate: Date;
  status: RegistrationStatus;
  ticketCode: string;
  qrCode: string;
  notes?: string;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  eventTitle: string;
  eventDate: Date;
  eventLocation: string;
  ticketCode: string;
  qrCode: string;
  status: TicketStatus;
  userName: string;
  userEmail: string;
  registrationDate: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  data?: any;
  createdAt: Date;
}

export enum EventCategory {
  TECHNOLOGY = 'technology',
  BUSINESS = 'business',
  EDUCATION = 'education',
  HEALTH = 'health',
  ARTS = 'arts',
  SPORTS = 'sports',
  OTHER = 'other'
}

export enum RegistrationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  WAITLISTED = 'waitlisted'
}

export enum TicketStatus {
  ACTIVE = 'active',
  USED = 'used',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum NotificationType {
  EVENT_REMINDER = 'event_reminder',
  REGISTRATION_CONFIRMED = 'registration_confirmed',
  EVENT_UPDATED = 'event_updated',
  EVENT_CANCELLED = 'event_cancelled',
  GENERAL = 'general'
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface EventFilters {
  category?: EventCategory;
  dateFrom?: Date;
  dateTo?: Date;
  location?: string;
  isFeatured?: boolean;
  searchQuery?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  EventDetail: { eventId: string };
  TicketDetail: { ticketId: string };
  Profile: undefined;
  Settings: undefined;
  About: undefined;
  QRScanner: undefined;
  EventRegistration: { eventId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Events: undefined;
  Tickets: undefined;
  Profile: undefined;
};

export type EventsStackParamList = {
  EventsList: undefined;
  EventDetail: { eventId: string };
  EventRegistration: { eventId: string };
};

export type TicketsStackParamList = {
  TicketsList: undefined;
  TicketDetail: { ticketId: string };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
  About: undefined;
};