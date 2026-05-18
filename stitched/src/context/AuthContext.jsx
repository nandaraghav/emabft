import { createContext, useContext, useState, useEffect } from 'react';
import { getUserByUsername } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('stitched_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('stitched_user'); }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const found = getUserByUsername(username);
    const isValidPass = (username === 'gopal' && password === 'admin') || (username === 'vaishnavi' && password === 'useruser');
    
    if (found && isValidPass) {
      const session = { id: found.id, name: found.name, username: found.username, role: found.role, avatar: found.avatar, bio: found.bio, location: found.location, memberSince: found.memberSince, stats: found.stats };
      setUser(session);
      localStorage.setItem('stitched_user', JSON.stringify(session));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stitched_user');
  };

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
