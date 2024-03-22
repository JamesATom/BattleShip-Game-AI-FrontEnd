// import React from 'react';
import { PrivateRouteProps } from './utils/interfaces/interfaces';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, allowedPath }: PrivateRouteProps) => {
    const isSignedIn = sessionStorage.getItem('name') ? true : false;
    const canAccess = sessionStorage.getItem('canAccess') === 'true';
    // console.log('isSignedIn: ', isSignedIn, 'canAccess: ', canAccess, '\tallowedPath: ', allowedPath);
    
    if (canAccess && isSignedIn) {
        return children;
    } else if (
        isSignedIn && 
        !canAccess && 
        allowedPath != '/battleship-gameBoard' && 
        allowedPath != '/battleship-gameOn' &&
        !allowedPath.startsWith(`/battleship-ai`)) {
        return children;
    } else {
        return <Navigate to="/" replace />;
    }
};
