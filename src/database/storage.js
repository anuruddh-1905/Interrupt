import * as SecureStore from 'expo-secure-store';

export const StorageKeys = {
  USER_PROFILE: 'user_profile',
};

/**
 * Saves the user profile object synchronously to device memory
 * @param {Object} profile - The user data payload
 */
export const saveUserProfile = (profile) => {
  SecureStore.setItem('user_profile', JSON.stringify(profile));
};

/**
 * Retrieves the user profile from device memory
 * @returns {Object|null} The parsed user profile or null if onboarding isn't complete
 */
export const getUserProfile = () => {
  const data = SecureStore.getItem('user_profile');
  return data ? JSON.parse(data) : null;
};