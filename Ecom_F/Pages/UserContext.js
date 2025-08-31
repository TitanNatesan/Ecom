import { createContext, useContext, useState } from 'react';
import Constants from 'expo-constants';

// Single source of truth for API base URL
// Priority: app.json extra.API_BASE_URL -> EXPO_PUBLIC_API_BASE_URL -> fallback
export const BASE_URL =
  (Constants?.expoConfig?.extra && Constants.expoConfig.extra.API_BASE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.EXPO_PUBLIC_API_BASE_URL) ||
  'http://10.207.140.11:8000';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const [login, setLogin] = useState(false);

  const updateUserID = (newUserID) => {
    setUserID(newUserID);
  };

  return (
    <UserContext.Provider value={{ userID, updateUserID, BASE_URL, login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
