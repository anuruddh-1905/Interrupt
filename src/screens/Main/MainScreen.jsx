import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// A reusable high-performance animated button component
const ActionButton = ({ title, subtitle, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95, { damping: 10, stiffness: 300 }))}
      onPressOut={() => (scale.value = withSpring(1, { damping: 10, stiffness: 300 }))}
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <Animated.View style={[styles.actionButton, animatedStyle]}>
        <Text style={styles.buttonTitle}>{title}</Text>
        <Text style={styles.buttonSubtitle}>{subtitle}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top Header with Hidden Profile Card Trigger */}
      <View style={styles.header}>
        <Text style={styles.logo}>CIRCUIT BREAKER</Text>
        <Pressable 
          style={styles.profileTrigger}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.profileText}>DATA</Text>
        </Pressable>
      </View>

      {/* The 3 Main Intervention Buttons */}
      <View style={styles.container}>
        <ActionButton 
          title="[01] PHYSICAL" 
          subtitle="Anchor your body. Move to break the loop."
          onPress={() => console.log('Route to Physical')}
        />
        <ActionButton 
          title="[02] VIRTUAL" 
          subtitle="Deploy the screen barrier."
          onPress={() => console.log('Route to Virtual')}
        />
        <ActionButton 
          title="[03] MENTAL" 
          subtitle="Burn intrusive thoughts instantly."
          onPress={() => console.log('Route to Mental')}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050505',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logo: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  profileTrigger: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  profileText: {
    color: '#E0E0E0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    gap: 20, // Adds clean spacing between buttons natively
  },
  buttonWrapper: {
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  buttonSubtitle: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
});