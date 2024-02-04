import React from 'react';
import { useParams, useNavigate } from "react-router-dom";

export default function AIGameBoard() {
    const { difficulty } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = '';
            sessionStorage.removeItem('canAccess');
            navigate('/', { replace: true });
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    React.useEffect(() => {
        const handlePopstate = (event: any) => {
            if (event.state != null) return;
            sessionStorage.removeItem('canAccess');
            navigate('/battleship-dashboard', { replace: true });
        };
        
        // window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    return (
        <div>AIGameBoard with {difficulty}</div>
    );
}
