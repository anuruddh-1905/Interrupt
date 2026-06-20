import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { saveUserProfile } from '../../database/storage';
import { getAllProtocols } from '../../database/protocols';

export default function OnboardingScreen({ navigation, onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedTargets, setSelectedTargets] = useState([]);

  // Fetch our 6 scientific protocols
  const protocols = getAllProtocols();

  const handleToggleTarget = (id) => {
    if (selectedTargets.includes(id)) {
      setSelectedTargets(selectedTargets.filter(t => t !== id));
    } else {
      setSelectedTargets([...selectedTargets, id]);
    }
  };

  const handleFinishSetup = () => {
    if (!name.trim() || selectedTargets.length === 0) return;

    // Construct the upgraded user profile with active targets
    const newProfile = {
      name: name.trim(),
      deviceId: `device_${Math.random().toString(36).substring(2, 11)}`,
      onboardingCompleted: true,
      activeTargets: selectedTargets, // Saves their specific urges
      metrics: {
        totalUrgesSurfed: 0,
        virtualScrollsIntercepted: 0,
        mentalTextsBurned: 0,
        currentStreakDays: 0,
      }
    };

    saveUserProfile(newProfile);
    
    // Support both direct prop calling or navigation routing
    if (onComplete) {
      onComplete();
    } else if (navigation) {
      navigation.replace('Main');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {step === 1 ? (
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
            onPress={() => setStep(2)}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>NEXT_</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inner}>
          <Text style={styles.stepTwoTitle}>IDENTIFY TARGETS</Text>
          <Text style={styles.subtitle}>Select the specific loops you want to break.</Text>

          <ScrollView style={styles.targetList} showsVerticalScrollIndicator={false}>
            {protocols.map((protocol) => {
              const isSelected = selectedTargets.includes(protocol.id);
              return (
                <TouchableOpacity
                  key={protocol.id}
                  style={[styles.targetCard, isSelected && styles.targetCardSelected]}
                  onPress={() => handleToggleTarget(protocol.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.targetTitle, isSelected && styles.textSelected]}>
                    {protocol.title}
                  </Text>
                  <Text style={styles.targetCategory}>{protocol.category} PROTOCOL</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity 
            style={[styles.button, selectedTargets.length === 0 && styles.buttonDisabled]} 
            onPress={handleFinishSetup}
            disabled={selectedTargets.length === 0}
          >
            <Text style={styles.buttonText}>INITIALIZE ENGINE</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  stepTwoTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 40,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 8,
    padding: 18,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  targetList: {
    flex: 1,
    marginBottom: 20,
  },
  targetCard: {
    backgroundColor: '#0A0A0A',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  targetCardSelected: {
    borderColor: '#FFF', // High contrast selection
    backgroundColor: '#1A1A1A',
  },
  targetTitle: {
    color: '#888',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  textSelected: {
    color: '#FFF',
  },
  targetCategory: {
    color: '#555',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#222',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
});