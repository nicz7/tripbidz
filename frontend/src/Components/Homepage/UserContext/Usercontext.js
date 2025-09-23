// src/Components/Services/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// 1️⃣  Create the context so any component can do:
//     const { user, setUser } = useContext(UserContext);
export const UserContext = createContext();

// 2️⃣  Provider component that wraps <Router> (or your top‑level <App />)
export const UserProvider = ({ children }) => {
  // Pull saved session (if any) from localStorage
  const storedUser = JSON.parse(localStorage.getItem('tripbidz_user'));

  // user = null when logged out; otherwise an object like { name, email, ... }
  const [user, setUser] = useState(storedUser);

  // 3️⃣  Keep localStorage in sync whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('tripbidz_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tripbidz_user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

/*
🔖 Usage example
----------------
import { UserProvider } from './Components/Services/UserContext';

function App() {
  return (
    <UserProvider>
      <Router> ...your Routes... </Router>
    </UserProvider>
  );
}

Inside any component:
const { user, setUser } = useContext(UserContext);
setUser({ name: 'Carolus' }); // login
setUser(null);                // logout
*/
