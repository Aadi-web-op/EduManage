import { createContext } from 'react';

export const AppContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    currentView: 'events',
    setView: () => { },
    notifications: [],
    markAllRead: () => { },
    selectedEvent: null,
    setSelectedEvent: () => { },
    teamMembers: [],
    addTeamMember: () => { },
    removeTeamMember: () => { }
});
