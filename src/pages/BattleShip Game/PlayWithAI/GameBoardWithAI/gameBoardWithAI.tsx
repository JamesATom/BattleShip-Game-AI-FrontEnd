import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ShipContainerAI from './shipContainerAI/shipContainerAI';
import BoardOfSelfAI from './boardOfSelfAI/boardOfSelfAI';
import BoardOfEnemyAI from './boardOfEnemyAI/boardOfEnemyAI';
import { Ships } from '../../../../utils/gameData/shipsArray';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { containerStyle } from '../../../../utils/styles/styles';

export default function AIGameBoard() {
    const { difficulty } = useParams();
    const navigate = useNavigate();
    const [ships, setShips] = React.useState(Ships);
    const [positionSetObject, setPositionSetObject] = React.useState(new Set());
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [orientation, setOrientation] = React.useState('vertical');
    const [open, setOpen] = React.useState<boolean>(false);
    const [alertText, setAlertText] = React.useState<string>('');

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
        
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    const updateAmountOfShips = (name: string, amount: number) => {
        const tempShips = ships.map((ship) => {
            if (ship.name === name) {
                return {
                    ...ship,
                    amount: amount,
                };
            }
            return ship;
        });
        setShips(tempShips);
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box style={{...containerStyle}}>
            <Snackbar 
            open={open} 
            autoHideDuration={3500} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert 
                onClose={handleClose} 
                severity={alertText == 'Starting the game!' ? 'success' : 'info'} 
                sx={{ width: '100%', textAlign: 'center' }}>
                    {alertText}
                </Alert>
            </Snackbar>

            <ShipContainerAI 
            ships={ships}
            orientation={orientation}
            positionSetObject={positionSetObject}
            setSelectedImage={setSelectedImage}
            setOrientation={setOrientation}
            setAlertText={setAlertText}
            setOpen={setOpen} />

            <BoardOfSelfAI 
            ships={ships}
            selectedImage={selectedImage}
            orientation={orientation}
            positionSetObject={positionSetObject}
            setPositionSetObject={setPositionSetObject}
            updateAmountOfShips={updateAmountOfShips} />

            <BoardOfEnemyAI 
            difficulty={difficulty} />
        </Box>
    );
}
