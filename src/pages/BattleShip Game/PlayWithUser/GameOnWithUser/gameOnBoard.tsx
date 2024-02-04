import React from 'react';
import { useMutation, useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { 
    LEAVE_ROOM_DURING_GAME_MUTATION,
    LEAVE_ROOM_DURING_GAME_SUBSCRIPTION,
    ATTACK_TO_BOARD_MUTATION,
    ATTACK_TO_BOARD_SUBSCRIPTION,
    YOU_WIN_MUTATION,
    YOU_WIN_SUBSCRIPTION  } from '../../../../utils/graphqlQuery/gql';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import AttackToEnemyBoard from './boardOfEnemyAttack/attackToEnemy';
import AttackToSelfBoard from './boardOfSelfAttack/attackToSelf';
import { containerStyle } from '../../../../utils/styles/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function GameOnBoard() {
    const navigate = useNavigate();
    const [leaveRoomDuringGame, { error: mutationError }] = useMutation(LEAVE_ROOM_DURING_GAME_MUTATION);
    const [attackToBoard, { error: attackError }] = useMutation(ATTACK_TO_BOARD_MUTATION);
    const [youWin] = useMutation(YOU_WIN_MUTATION);
    const { data: subscriptionData, error: subscriptionError } = useSubscription(LEAVE_ROOM_DURING_GAME_SUBSCRIPTION, {
        variables: { roomId: sessionStorage.getItem('roomNumber')! }
    });
    const { data: attackSubscriptionData, error: attackSubscriptionError } = useSubscription(ATTACK_TO_BOARD_SUBSCRIPTION, {
        variables: { roomId: sessionStorage.getItem('roomNumber')! }
    });
    const { data: youWinData, error: youWinError } = useSubscription(YOU_WIN_SUBSCRIPTION, {
        variables: { 
            roomId: sessionStorage.getItem('roomNumber')!
        }
    });
    const [open, setOpen] = React.useState<boolean>(false);
    const [myTurn, setMyTurn] = React.useState<boolean>(sessionStorage.getItem('myTurn') == 'true' ? true : false);
    const [setOfPositions, setSetOfPositions] = React.useState<Set<number>>(new Set());
    const [counter, setCounter] = React.useState<number>(0);
    const [alertText, setAlertText] = React.useState<string>('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (subscriptionError) {
        console.error("Subscription error:", subscriptionError);
        return <div>Error</div>;
    }

    if (attackSubscriptionError) {
        console.error("Attack Subscription error:", attackSubscriptionError);
        return <div>Error</div>;
    }

    if (youWinError) {
        console.error("You Win Subscription error:", youWinError);
        return <div>Error</div>;
    }

    React.useEffect(() => {
        if (mutationError) {
            console.log('error', mutationError);
        }
    }, [mutationError]);

    React.useEffect(() => {
        if (attackError) {
            console.log('error', attackError);
        }
    }, [attackError]);

    React.useEffect(() => {
        if (counter > 14) {
            setAlertText('You have won the game. Redirecting to dashboard...');
            setOpen(true);
            youWin({
                variables: {
                    data: {
                        roomId: sessionStorage.getItem('roomNumber')!,
                        userId: sessionStorage.getItem('userId')!
                    }
                }
            });
            
            setTimeout(() => {
                sessionStorage.removeItem('myTurn');
                sessionStorage.removeItem('canAccess');
                navigate(`/`, { replace: true }); 
            }, 4000);
         
        }
    }, [counter]);

    React.useEffect(() => {
        const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
            event.preventDefault();
            event.returnValue = '';
            leaveRoomDuringGame({
                variables: {
                    data: {
                        userId: sessionStorage.getItem('userId')!
                    }
                }
            });
            
            sessionStorage.removeItem('canAccess');
            sessionStorage.removeItem('myTurn');
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
            leaveRoomDuringGame({
                variables: {
                    data: {
                        userId: sessionStorage.getItem('userId')!
                    }
                }
            });

            sessionStorage.removeItem('canAccess');
            sessionStorage.removeItem('myTurn');
            navigate('/battleship-dashboard', { replace: true });
         
        };

        // window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    React.useEffect(() => {
        if (subscriptionData && 
            sessionStorage.getItem('userId') != subscriptionData.leaveRoomDuringGameSubscription.userId) {
            
            setAlertText('Opponent has left the game. Redirecting to dashboard...');
            setOpen(true);
            setTimeout(() => {
                sessionStorage.removeItem('myTurn');
                sessionStorage.removeItem('canAccess');
                navigate(`/`, { replace: true }); 
            }, 4000);
        }
    }, [subscriptionData]);

    React.useEffect(() => {
        if (attackSubscriptionData) {
            if (myTurn && attackSubscriptionData.attackToBoardSubscription.isHit) {
                setCounter((prev) => prev + 1);
            }
            setMyTurn(!myTurn);
        }
    }, [attackSubscriptionData]);

    React.useEffect(() => {
        if (youWinData &&  youWinData.youWinSubscription && youWinData.youWinSubscription.statusCode != sessionStorage.getItem('userId')) {
            
            setAlertText(youWinData.youWinSubscription.message + ' Redirecting to dashboard...');
            setOpen(true);
            setTimeout(() => {
                sessionStorage.removeItem('canAccess');
                sessionStorage.removeItem('myTurn');
                navigate(`/`, { replace: true }); 
            }, 4000);
        }
    }, [youWinData]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleAttackToBoard = (data: any) => {
        attackToBoard({ variables: data });
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
                severity={youWinData && youWinData.youWinSubscription && youWinData.youWinSubscription.statusCode != sessionStorage.getItem('userId') ? 'info' : 'success'}
                sx={{ width: '100%', textAlign: 'center' }}>
                    {alertText}
                </Alert>
            </Snackbar>
            
            {isMobile ? (
                myTurn ? 
                <AttackToSelfBoard 
                myTurn={myTurn}
                attackSubscriptionData={attackSubscriptionData}
                 /> : 
                <AttackToEnemyBoard 
                myTurn={myTurn}
                setOfPositions={setOfPositions}
                attackSubscriptionData={attackSubscriptionData}
                setSetOfPositions={setSetOfPositions}
                handleAttackToBoard={handleAttackToBoard} />
            ) : (
                <>
                    <AttackToEnemyBoard 
                    myTurn={myTurn}
                    setOfPositions={setOfPositions}
                    attackSubscriptionData={attackSubscriptionData}
                    setSetOfPositions={setSetOfPositions}
                    handleAttackToBoard={handleAttackToBoard} />
                    <AttackToSelfBoard 
                    myTurn={myTurn}
                    attackSubscriptionData={attackSubscriptionData} />
                </>
            )}
            
        </Box>
    )
}
