import { useState, useEffect } from 'react';
import { signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut } from '@/services/auth';
import { User } from '@/types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // You might want to load the user from secure storage here
  useEffect(() => {
    // e.g., loadUserFromStorage().then(setUser);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const response = await apiSignIn(email, password);
    if (response.success && response.user) {
      setUser(response.user);
    }
    setLoading(false);
    return response;
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const response = await apiSignUp(email, password);
    if (response.success && response.user) {
      setUser(response.user);
    }
    setLoading(false);
    return response;
  };

  const signOut = async () => {
    setLoading(true);
    await apiSignOut();
    setUser(null);
    setLoading(false);
  };

  return { user, loading, signIn, signUp, signOut };
};
