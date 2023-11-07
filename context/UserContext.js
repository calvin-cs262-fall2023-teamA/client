import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userID, setUserID] = useState(''); // Initialize with an empty string

  return (
    <UserContext.Provider value={{ userID, setUserID}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
