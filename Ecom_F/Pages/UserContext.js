import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState("");
  const BASE_URL = `http://64.227.134.220:8000`
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
