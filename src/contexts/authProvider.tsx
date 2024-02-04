import React from 'react';
import { AuthContextType, AuthProviderProps } from '../utils/interfaces/interfaces';

export const AuthContext = React.createContext<AuthContextType>({
    isAuthorized: false,
    setIsAuthorized: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthorized, setIsAuthorized] = React.useState(false);

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
}
