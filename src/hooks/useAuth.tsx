import { useAuthenticator } from '@aws-amplify/ui-react';
import { useState } from 'react';

export const useAuth = () => {
  const { user, authStatus, signOut } = useAuthenticator((context) => [context.user, context.authStatus]);
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);

  const isAuthenticated = authStatus === 'authenticated';

  const showLoginPopup = ():void => {
    setLoginPopupVisible(true);
  };

  const hideLoginPopup = ():void => {
    setLoginPopupVisible(false);
  };

  return {
    user,
    isAuthenticated,
    authStatus,
    loginPopupVisible,
    showLoginPopup,
    hideLoginPopup,
    signOut,
  };
};
