import { Dispatch, SetStateAction, ReactNode } from 'react';

export interface MyJwtPayload {
    given_name: string;
    email: string;
    picture: string;
}

export interface ResponsiveVideoProps {
    videoSrc: string;
}

export interface PrivateRouteProps {
    children: React.ReactNode;
    allowedPath: string;
}

export interface AuthContextType {
    isAuthorized: boolean;
    setIsAuthorized: Dispatch<SetStateAction<boolean>>;
}

export interface AuthProviderProps {
    children: ReactNode;
}