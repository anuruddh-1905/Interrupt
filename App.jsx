import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getUserProfile } from './src/database/storage';

// Screens
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import MainScreen from './src/screens/Main/MainScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const profile = getUserProfile();
    // If they have a profile, skip onboarding and go straight to the Action Screen
    if (profile && profile.onboardingCompleted) {
      setInitialRoute('Main');
    } else {
      setInitialRoute('Onboarding');
    }
  }, []);

  if (!initialRoute) return null; // Wait for storage check

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <Stack.Navigator 
        initialRouteName={initialRoute}
        screenOptions={{ 
          headerShown: false, // We hide the default headers for our custom dark UI
          animation: 'fade',  // Smooth minimalist transitions
          contentStyle: { backgroundColor: '#050505' }
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}