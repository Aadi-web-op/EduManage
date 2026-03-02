import { createContext } from 'react';

export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } });
export const ToastContext = createContext({ showToast: () => { } });
export const AuthContext = createContext({ user: null, login: () => { }, logout: () => { } });
export const SidebarContext = createContext({ isSidebarCollapsed: false, setSidebarCollapsed: () => { } });
