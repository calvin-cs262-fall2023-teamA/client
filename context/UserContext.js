import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({ userID: '', userName: '' });

  const setUserID = (userID) => {
    setUserData(prevUserData => ({ ...prevUserData, userID }));
  };

  const setUserName = (userName) => {
    setUserData(prevUserData => ({ ...prevUserData, userName }));
  };

  return (
    <UserContext.Provider value={{ userData, setUserID, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}


export function useUser() {
  return useContext(UserContext);
}
