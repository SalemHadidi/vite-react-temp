// useAuth.ts
import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  loginPopupVisible: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    loginPopupVisible: false,
  });

  // Simulate checking authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Simulated check for authentication status
      const isLoggedIn = Boolean(localStorage.getItem('token'));
      setAuthState((prev) => ({ ...prev, isAuthenticated: isLoggedIn }));
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setAuthState({ isAuthenticated: true, loginPopupVisible: false });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ isAuthenticated: false, loginPopupVisible: false });
  };

  const showLoginPopup = () => {
    setAuthState((prev) => ({ ...prev, loginPopupVisible: true }));
  };

  const hideLoginPopup = () => {
    setAuthState((prev) => ({ ...prev, loginPopupVisible: false }));
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    loginPopupVisible: authState.loginPopupVisible,
    login,
    logout,
    showLoginPopup,
    hideLoginPopup,
  };
};

export default useAuth;