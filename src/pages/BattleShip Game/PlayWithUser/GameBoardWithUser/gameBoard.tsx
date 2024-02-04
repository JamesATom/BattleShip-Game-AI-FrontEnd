import React from 'react';
import ShipContainer from './shipsContainer/shipsContainer';
import BoardOfSelf from './boardOfSelf/boardOfSelf';
import BoardOfEnemy from './boardOfEnemy/boardOfEnemy';
import { Ships } from './shipsContainer/shipsArray';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { LEAVE_ROOM_MUTATION, ROOM_SUBSCRIPTION } from '../../../../utils/graphqlQuery/gql';
import { useMutation, useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { containerStyle } from '../../../../utils/styles/styles';

export default function GameBoard() {
    const { data: subscriptionData, error: subscriptionError } = useSubscription(ROOM_SUBSCRIPTION, {
        variables: { roomId: sessionStorage.getItem('roomNumber')! }
    });
    const navigate = useNavigate();
    const [leaveRoom, { error: mutationError }] = useMutation(LEAVE_ROOM_MUTATION);
    const [ships, setShips] = React.useState(Ships);
    const [positionSetObject, setPositionSetObject] = React.useState(new Set());
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [orientation, setOrientation] = React.useState('vertical');
    const [open, setOpen] = React.useState<boolean>(false);
    const [alertText, setAlertText] = React.useState<string>('');

    if (subscriptionError) {
        console.error("Subscription error:", subscriptionError);
        return <div>Error</div>;
    }

    React.useEffect(() => {
        if (mutationError) {
            console.log('error', mutationError);
        }
    }, [mutationError]);
    
    React.useEffect(() => {
        const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = '';
            leaveRoom({
                variables: {
                    data: {
                        userId: sessionStorage.getItem('userId')!
                    }
                }
            });
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
            leaveRoom({
                variables: {
                    data: {
                        userId: sessionStorage.getItem('userId')!
                    }
                }
            });
            
            sessionStorage.removeItem('canAccess');
            navigate('/battleship-dashboard', { replace: true });
           
        };
        
        // window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    React.useEffect(() => {
        if (subscriptionData != undefined && 
            subscriptionData.shipPositionsSet.statusCode == 200) {
            setAlertText(subscriptionData.shipPositionsSet.message);
            setOpen(true);
        } 
        if (subscriptionData != undefined && 
            subscriptionData.shipPositionsSet.statusCode == 200) {

            setTimeout(() => {
                navigate(`/battleship-gameOn`); 
            }, 4000);
        }
    }, [subscriptionData]);

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

            <ShipContainer 
            ships={ships}
            orientation={orientation}
            positionSetObject={positionSetObject}
            setSelectedImage={setSelectedImage}
            setOrientation={setOrientation}
            setAlertText={setAlertText}
            setOpen={setOpen} />

            <BoardOfSelf 
            ships={ships}
            selectedImage={selectedImage}
            orientation={orientation}
            positionSetObject={positionSetObject}
            setPositionSetObject={setPositionSetObject}
            updateAmountOfShips={updateAmountOfShips} />

            <BoardOfEnemy />
        </Box>
    )
}

