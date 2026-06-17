import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { saveUserProfile } from '../../database/storage';

export default function OnboardingScreen({ onComplete }) {
  const [name, setName] = useState('');

  const handleGetStarted = () => {
    if (!name.trim()) return;

    // Construct the fresh, baseline user profile object
    const newProfile = {
      name: name.trim(),
      deviceId: `device_${Math.random().toString(36).substring(2, 11)}`,
      onboardingCompleted: true,
      metrics: {
        totalUrgesSurfed: 0,
        virtualScrollsIntercepted: 0,
        mentalTextsBurned: 0,
        currentStreakDays: 0,
      }
    };

    // Save synchronously to MMKV storage instance
    saveUserProfile(newProfile);
    
    // Trigger top-level state change to refresh app layout instantly
    if (onComplete) onComplete();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>CIRCUIT BREAKER</Text>
        <Text style={styles.subtitle}>Take back control of your nervous system.</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity 
          style={[styles.button, !name.trim() && styles.buttonDisabled]} 
          onPress={handleGetStarted}
          disabled={!name.trim()}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A', // Premium stark dark mode background
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 40,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#161616',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 8,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFF', // High contrast minimalist call-to-action
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#333',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});