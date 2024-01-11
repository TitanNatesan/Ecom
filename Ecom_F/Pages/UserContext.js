import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState("");

  const updateUserID = (newUserID) => {
    setUserID(newUserID);
  };

  return (
    <UserContext.Provider value={{ userID, updateUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
