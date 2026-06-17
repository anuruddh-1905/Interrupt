import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { getUserProfile } from '../../database/storage';

export default function DashboardScreen({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = getUserProfile();
    setProfile(data);
  }, []);

  if (!profile) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header with Back Action */}
        <View style={styles.topBar}>
          <Pressable 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← BACK</Text>
          </Pressable>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>SYSTEM ACTIVE,</Text>
          <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
          <Text style={styles.subtitle}>Your neural interrupt engine is monitoring.</Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.metricValue}>{profile.metrics.currentStreakDays}</Text>
            <Text style={styles.metricLabel}>DAY STREAK</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.metricValue}>{profile.metrics.virtualScrollsIntercepted}</Text>
            <Text style={styles.metricLabel}>SCROLLS BLOCKED</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.metricValue}>{profile.metrics.totalUrgesSurfed}</Text>
            <Text style={styles.metricLabel}>URGES SURFED</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.metricValue}>{profile.metrics.mentalTextsBurned}</Text>
            <Text style={styles.metricLabel}>THOUGHTS BURNED</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
  },
  topBar: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#161616',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#262626',
  },
  backButtonText: {
    color: '#888',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  header: {
    marginBottom: 40,
  },
  greeting: {
    color: '#666',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  name: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 4,
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  metricLabel: {
    color: '#666',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
});