# Učи Расти Остани - Mobile App

A modern React Native mobile application for the NGO "Учи Расти Остани" (Learn, Grow, Stay) built with Expo. This app enables young people to discover, register for, and attend educational seminars organized by the NGO.

## 🎯 About the NGO

Udruženje УЧИ РАСТИ ОСТАНИ is a non-governmental and non-profit organization founded for an indefinite period to achieve goals in the field of youth education by organizing seminars with the participation of successful and inspiring individuals who will share their experiences and knowledge and motivate young people to develop and utilize their potential in their own country through personal and professional development.

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure authentication with form validation
- Beautiful gradient-based UI design

### 🎓 Events Management
- Browse upcoming and featured events
- Search and filter events by category, date, and location
- View detailed event information including speakers, agenda, and capacity
- Event registration with ticket generation

### 🎫 Digital Tickets
- QR code ticket generation for registered events
- Digital ticket management and storage
- Ticket scanning capability for event check-ins
- Offline ticket access

### 🏠 Home Dashboard
- Personalized greeting and user stats
- Featured events carousel
- Quick action buttons for easy navigation
- Recent activity overview

### 👤 User Profile
- Profile management and settings
- Event registration history
- Account information management

### 🎨 Modern Design
- White and light blue color scheme appealing to young people
- Modern, bold, and visually attractive interface
- Smooth animations and transitions
- Responsive design for all screen sizes

### 🌍 Localization
- Complete Serbian language support
- Date and time formatting for Serbian locale

## 🛠 Technical Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript for type safety
- **Navigation**: React Navigation 6 with stack and tab navigation
- **Styling**: Styled Components with custom theme system
- **State Management**: React Context API for authentication
- **Storage**: AsyncStorage for local data persistence
- **Icons**: Expo Vector Icons (Ionicons)
- **QR Codes**: React Native QR SVG for QR code generation
- **Gradients**: Expo Linear Gradient for beautiful UI effects
- **Calendar**: React Native Calendars for date selection

## 📱 App Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Custom button component
│   └── EventCard.tsx    # Event display card
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx # Main navigation setup
├── screens/             # App screens
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── EventsScreen.tsx
│   ├── TicketsScreen.tsx
│   └── ProfileScreen.tsx
├── services/            # Business logic and data management
│   ├── AuthContext.tsx  # Authentication context
│   ├── dataService.ts   # Data management service
│   └── mockData.ts      # Sample data for development
├── theme/               # Design system
│   └── index.ts         # Colors, spacing, typography
├── types/               # TypeScript type definitions
│   └── index.ts
└── utils/               # Utility functions
    └── translations.ts  # Serbian translations
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uro-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Press 'w' for web browser

### Demo Credentials

For testing the app, you can use these demo credentials:
- **Email**: test@example.com
- **Password**: password

## 📋 Key App Flows

### 1. User Registration
- New users can create accounts with email, name, and password
- Form validation ensures data integrity
- Automatic login after successful registration

### 2. Event Discovery
- Browse featured events on the home screen
- View all events in the events tab
- Search and filter by various criteria
- View detailed event information

### 3. Event Registration
- Select events to register for
- Generate QR code tickets automatically
- Receive confirmation and ticket details
- Store tickets locally for offline access

### 4. Ticket Management
- View all registered event tickets
- Display QR codes for event check-in
- Track ticket status (active, used, expired)
- Access ticket details and event information

## 🎨 Design System

### Color Palette
- **Primary**: #4A90E2 (Light Blue)
- **Secondary**: #87CEEB (Sky Blue)
- **Background**: #FFFFFF (White)
- **Text**: #2C3E50 (Dark Blue-Gray)
- **Accent**: #5BA3F5 (Bright Blue)

### Typography
- **Headers**: Bold, modern sans-serif
- **Body Text**: Regular weight for readability
- **Captions**: Smaller text for secondary information

### Components
- **Buttons**: Gradient backgrounds with smooth animations
- **Cards**: Clean white backgrounds with subtle shadows
- **Icons**: Consistent Ionicons throughout the app

## 🔧 Configuration

### Environment Setup
The app uses mock data for development. To connect to a real backend:

1. Update `src/services/dataService.ts` with your API endpoints
2. Replace mock authentication with real API calls
3. Configure push notifications if needed
4. Set up deep linking for event sharing

### Customization
- **Theme**: Modify `src/theme/index.ts` for design changes
- **Translations**: Update `src/utils/translations.ts` for text changes
- **Mock Data**: Edit `src/services/mockData.ts` for sample content

## 📱 Supported Features

### Core Features ✅
- User authentication and registration
- Event browsing and filtering
- Event registration with QR tickets
- User profile management
- Serbian language support
- Modern responsive design

### Planned Features 🚧
- Push notifications for event reminders
- Event calendar integration
- Social sharing capabilities
- Event feedback and ratings
- Advanced search and recommendations
- Dark mode support

## 🐛 Known Issues

- Some packages may show TypeScript errors during development (this is normal for the development environment)
- Camera permissions need to be configured for QR scanning in production builds
- Some animations may not work perfectly on older devices

## 🤝 Contributing

This app was created for the NGO "Учи Расти Остани". For contributions or modifications:

1. Follow the existing code structure and patterns
2. Maintain TypeScript types for all new code
3. Update translations for any new text
4. Test on both iOS and Android devices
5. Ensure accessibility compliance

## 📄 License

This project is created for the NGO "Учи Расти Остани" educational purposes.

## 📞 Support

For technical support or questions about the app:
- Check the existing code documentation
- Review the component structure in the source files
- Test functionality using the demo credentials provided

---

**Built with ❤️ for young people in Serbia to learn, grow, and stay in their homeland while pursuing personal and professional development.**