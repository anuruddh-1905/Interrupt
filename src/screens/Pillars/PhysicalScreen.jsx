import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';

export default function PhysicalScreen({ route, navigation }) {
  // Extract which sub-urge triggered this screen (e.g., "OVER-EATING")
  const { subUrge } = route.params || { subUrge: 'PHYSICAL PROTOCOL' };
  
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(true);

  // 10-Second Neuro-Delay Countdown to break the immediate impulsive loop
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Active Protocol State */}
        <View style={styles.alertHeader}>
          <Text style={styles.alertTag}>[ INTERRUPT TRIGGERED ]</Text>
          <Text style={styles.title}>{subUrge}</Text>
        </View>

        {/* The Circuit-Breaker Mechanism */}
        <View style={styles.breakerBox}>
          {seconds > 0 ? (
            <>
              <Text style={styles.timerNumber}>{seconds}s</Text>
              <Text style={styles.instruction}>DO NOT MOVE. Stand perfectly still and focus entirely on your feet pressed against the floor.</Text>
            </>
          ) : (
            <>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.instruction}>CIRCUIT BROKEN. Your prefrontal cortex has re-engaged. You are free to choose your next action consciously.</Text>
            </>
          )}
        </View>

        {/* Abort/Complete Action Target */}
        <Pressable 
          style={[styles.actionButton, seconds > 0 && styles.buttonDisabled]}
          disabled={seconds > 0}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>{seconds > 0 ? "HALTING SYSTEM..." : "RETURN TO MAIN"}</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#050505' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingVertical: 40 },
  alertHeader: { alignItems: 'center', marginTop: 40 },
  alertTag: { color: '#FF3B30', fontSize: 12, fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
  title: { color: '#FFF', fontSize: 28, fontWeight: '900', letterSpacing: 1, textAlign: 'center' },
  breakerBox: { 
    backgroundColor: '#0A0A0A', borderWidth: 1, borderColor: '#222', borderRadius: 16, 
    padding: 30, alignItems: 'center', justifyContent: 'center', minHeight: 250 
  },
  timerNumber: { color: '#FFF', fontSize: 64, fontWeight: '900', marginBottom: 16 },
  successIcon: { color: '#4CD964', fontSize: 64, fontWeight: '900', marginBottom: 16 },
  instruction: { color: '#AAA', fontSize: 16, lineHeight: 24, textAlign: 'center', letterSpacing: 0.5 },
  actionButton: { backgroundColor: '#FFF', width: '100%', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#1A1A1A' },
  buttonText: { color: '#000', fontSize: 14, fontWeight: '800', letterSpacing: 1.5 },
});