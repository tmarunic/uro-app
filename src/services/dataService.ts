import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, User, Ticket, EventRegistration, LoginData, RegisterData, EventFilters, TicketStatus, RegistrationStatus } from '../types';
import { mockEvents, mockUser, mockTickets } from './mockData';

class DataService {
  private static instance: DataService;
  private currentUser: User | null = null;
  private events: Event[] = mockEvents;
  private tickets: Ticket[] = mockTickets;

  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Authentication methods
  async login(credentials: LoginData): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          this.currentUser = mockUser;
          this.saveUserToStorage(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error('Neispravni podaci za prijavu'));
        }
      }, 1000);
    });
  }

  async register(userData: RegisterData): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          registeredEvents: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.currentUser = newUser;
        this.saveUserToStorage(newUser);
        resolve(newUser);
      }, 1000);
    });
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    await AsyncStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
        return this.currentUser;
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
    
    return null;
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.currentUser) {
          this.currentUser = { ...this.currentUser, ...userData, updatedAt: new Date() };
          this.saveUserToStorage(this.currentUser);
          resolve(this.currentUser);
        } else {
          reject(new Error('Korisnik nije prijavljen'));
        }
      }, 500);
    });
  }

  private async saveUserToStorage(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  // Event methods
  async getEvents(filters?: EventFilters): Promise<Event[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredEvents = [...this.events];

        if (filters) {
          if (filters.category) {
            filteredEvents = filteredEvents.filter(event => event.category === filters.category);
          }
          
          if (filters.dateFrom) {
            filteredEvents = filteredEvents.filter(event => event.date >= filters.dateFrom!);
          }
          
          if (filters.dateTo) {
            filteredEvents = filteredEvents.filter(event => event.date <= filters.dateTo!);
          }
          
          if (filters.location) {
            filteredEvents = filteredEvents.filter(event => 
              event.location.toLowerCase().includes(filters.location!.toLowerCase())
            );
          }
          
          if (filters.isFeatured !== undefined) {
            filteredEvents = filteredEvents.filter(event => event.isFeatured === filters.isFeatured);
          }
          
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filteredEvents = filteredEvents.filter(event => 
              event.title.toLowerCase().includes(query) ||
              event.description.toLowerCase().includes(query) ||
              event.tags.some(tag => tag.toLowerCase().includes(query))
            );
          }
        }

        // Sort by date (upcoming first)
        filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
        
        resolve(filteredEvents);
      }, 500);
    });
  }

  async getEventById(eventId: string): Promise<Event | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = this.events.find(e => e.id === eventId);
        resolve(event || null);
      }, 300);
    });
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const featuredEvents = this.events
          .filter(event => event.isFeatured && event.isActive)
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 5);
        resolve(featuredEvents);
      }, 300);
    });
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const upcomingEvents = this.events
          .filter(event => event.date > now && event.isActive)
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(0, 10);
        resolve(upcomingEvents);
      }, 300);
    });
  }

  // Registration methods
  async registerForEvent(eventId: string): Promise<EventRegistration> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.currentUser) {
          reject(new Error('Korisnik nije prijavljen'));
          return;
        }

        const event = this.events.find(e => e.id === eventId);
        if (!event) {
          reject(new Error('Događaj nije pronađen'));
          return;
        }

        if (event.registeredCount >= event.capacity) {
          reject(new Error('Događaj je popunjen'));
          return;
        }

        if (new Date() > event.registrationDeadline) {
          reject(new Error('Registracija je zatvorena'));
          return;
        }

        if (this.currentUser.registeredEvents.includes(eventId)) {
          reject(new Error('Već ste registrovani za ovaj događaj'));
          return;
        }

        // Generate ticket code
        const ticketCode = `UTO-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        
        // Create registration
        const registration: EventRegistration = {
          id: Date.now().toString(),
          userId: this.currentUser.id,
          eventId: eventId,
          registrationDate: new Date(),
          status: RegistrationStatus.CONFIRMED,
          ticketCode: ticketCode,
          qrCode: `${ticketCode}-QR`,
          checkedIn: false,
        };

        // Create ticket
        const ticket: Ticket = {
          id: Date.now().toString(),
          eventId: eventId,
          userId: this.currentUser.id,
          eventTitle: event.title,
          eventDate: event.date,
          eventLocation: event.location,
          ticketCode: ticketCode,
          qrCode: `${ticketCode}-QR`,
          status: TicketStatus.ACTIVE,
          userName: `${this.currentUser.firstName} ${this.currentUser.lastName}`,
          userEmail: this.currentUser.email,
          registrationDate: new Date(),
        };

        // Update user's registered events
        this.currentUser.registeredEvents.push(eventId);
        this.saveUserToStorage(this.currentUser);

        // Update event's registered count
        event.registeredCount++;

        // Add ticket to tickets array
        this.tickets.push(ticket);
        this.saveTicketsToStorage();

        resolve(registration);
      }, 1000);
    });
  }

  async cancelRegistration(eventId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.currentUser) {
          reject(new Error('Korisnik nije prijavljen'));
          return;
        }

        const eventIndex = this.currentUser.registeredEvents.indexOf(eventId);
        if (eventIndex === -1) {
          reject(new Error('Niste registrovani za ovaj događaj'));
          return;
        }

        // Remove from user's registered events
        this.currentUser.registeredEvents.splice(eventIndex, 1);
        this.saveUserToStorage(this.currentUser);

        // Update event's registered count
        const event = this.events.find(e => e.id === eventId);
        if (event) {
          event.registeredCount--;
        }

        // Cancel ticket
        const ticket = this.tickets.find(t => t.eventId === eventId && t.userId === this.currentUser!.id);
        if (ticket) {
          ticket.status = TicketStatus.CANCELLED;
          this.saveTicketsToStorage();
        }

        resolve();
      }, 500);
    });
  }

  // Ticket methods
  async getUserTickets(): Promise<Ticket[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.currentUser) {
          reject(new Error('Korisnik nije prijavljen'));
          return;
        }

        const userTickets = this.tickets.filter(ticket => ticket.userId === this.currentUser!.id);
        resolve(userTickets);
      }, 300);
    });
  }

  async getTicketById(ticketId: string): Promise<Ticket | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticket = this.tickets.find(t => t.id === ticketId);
        resolve(ticket || null);
      }, 300);
    });
  }

  async validateTicket(ticketCode: string): Promise<{ valid: boolean; ticket?: Ticket; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticket = this.tickets.find(t => t.ticketCode === ticketCode);
        
        if (!ticket) {
          resolve({ valid: false, message: 'Karta nije pronađena' });
          return;
        }

        if (ticket.status !== TicketStatus.ACTIVE) {
          resolve({ valid: false, ticket, message: 'Karta nije važeća' });
          return;
        }

        const now = new Date();
        if (now > ticket.eventDate) {
          resolve({ valid: false, ticket, message: 'Događaj je završen' });
          return;
        }

        resolve({ valid: true, ticket, message: 'Karta je važeća' });
      }, 500);
    });
  }

  async checkInTicket(ticketCode: string): Promise<{ success: boolean; ticket?: Ticket; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticket = this.tickets.find(t => t.ticketCode === ticketCode);
        
        if (!ticket) {
          resolve({ success: false, message: 'Karta nije pronađena' });
          return;
        }

        if (ticket.status !== TicketStatus.ACTIVE) {
          resolve({ success: false, ticket, message: 'Karta nije važeća' });
          return;
        }

        // Mark ticket as used
        ticket.status = TicketStatus.USED;
        this.saveTicketsToStorage();

        resolve({ success: true, ticket, message: 'Uspešno prijavljeno' });
      }, 500);
    });
  }

  private async saveTicketsToStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem('tickets', JSON.stringify(this.tickets));
    } catch (error) {
      console.error('Error saving tickets to storage:', error);
    }
  }

  private async loadTicketsFromStorage(): Promise<void> {
    try {
      const ticketsData = await AsyncStorage.getItem('tickets');
      if (ticketsData) {
        this.tickets = JSON.parse(ticketsData);
      }
    } catch (error) {
      console.error('Error loading tickets from storage:', error);
    }
  }

  // Check if user is registered for an event
  async isUserRegisteredForEvent(eventId: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.currentUser) {
          resolve(false);
          return;
        }
        resolve(this.currentUser.registeredEvents.includes(eventId));
      }, 100);
    });
  }

  // Get registration status for an event
  async getEventRegistrationStatus(eventId: string): Promise<'not_registered' | 'registered' | 'full' | 'closed'> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = this.events.find(e => e.id === eventId);
        if (!event) {
          resolve('not_registered');
          return;
        }

        if (new Date() > event.registrationDeadline) {
          resolve('closed');
          return;
        }

        if (event.registeredCount >= event.capacity) {
          resolve('full');
          return;
        }

        if (this.currentUser && this.currentUser.registeredEvents.includes(eventId)) {
          resolve('registered');
          return;
        }

        resolve('not_registered');
      }, 200);
    });
  }

  // Initialize the service
  async initialize(): Promise<void> {
    await this.loadTicketsFromStorage();
  }
}

export default DataService.getInstance();