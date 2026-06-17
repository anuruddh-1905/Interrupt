import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { getUserProfile } from './src/database/storage';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cast profile to any to bypass the TypeScript Object property constraint
   // Change this line to let TypeScript know profile can hold any property shape
const profile = getUserProfile();

if (profile && (profile).onboardingCompleted) {
  setIsOnboarded(true);
}
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>LOADING...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      
      {!isOnboarded ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <View style={styles.dashboardPlaceholder}>
          <Text style={styles.text}>Welcome to the Circuit Breaker Dashboard</Text>
          <Text style={styles.subtext}>Your data engine is synced and active.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: '700',
  },
  dashboardPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});