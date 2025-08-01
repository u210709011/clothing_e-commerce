import { Alert } from 'react-native';
import { User } from '@/types/auth';

interface AuthResponse {
  success: boolean;
  user?: User;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // TODO: Replace with actual API call
    console.log('Signing in with:', email, password);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, user: { email } };
  } catch (error) {
    Alert.alert('Sign In Failed', 'Invalid email or password.');
    return { success: false };
  }
};

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // TODO: Replace with actual API call
    console.log('Signing up with:', email, password);
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, user: { email } };
  } catch (error) {
    Alert.alert('Sign Up Failed', 'Could not create an account.');
    return { success: false };
  }
};

export const signOut = async (): Promise<{ success: boolean }> => {
  try {
    // TODO: Replace with actual API cal
    console.log('Signing out');
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  } catch (error) {
    Alert.alert('Sign Out Failed', 'Could not sign out.');
    return { success: false };
  }
};
