import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const audioHit = new Audio('/mp3/destroyed.mp3');
const audioMiss = new Audio('/mp3/waves.mp3');

export default function AttackToEnemyBoard(props: any) {
    const { myTurn, setOfPositions, attackSubscriptionData, setSetOfPositions, handleAttackToBoard } = props;
    const [grid, setGrid] = React.useState(Array(10).fill(Array(10).fill(null)));

    React.useEffect(() => {
        if (attackSubscriptionData == undefined) return;
        
        const isShip = attackSubscriptionData.attackToBoardSubscription.isHit;
        const positionId = attackSubscriptionData.attackToBoardSubscription.attackPosition;
        const newGrid = grid.map((row: any, rowIndex: number) => {
            return row.map((col: any, colIndex: number) => {
                const key = `${rowIndex}${colIndex}`;
                if (isShip && positionId == parseInt(key) && myTurn) {
                    audioHit.play();
                    return <Box
                        key={key}
                        sx={{
                            backgroundImage: 'url(/29.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: '90%',
                            width: '90%',
                            backgroundColor: 'black',
                        }} />
                } else if (!(isShip) && positionId == parseInt(key) && myTurn) {
                    audioMiss.play();
                    return <Box
                        key={key}
                        sx={{
                            backgroundImage: 'url(/water2.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: '100%',
                            width: '100%',
                        }} />
                } else {
                    return col;
                }
            });
        });
        setGrid(newGrid);
    }, [attackSubscriptionData]);

    const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
        if (setOfPositions.has(Number(event.currentTarget.id))) return;
        event.currentTarget.style.backgroundImage = 'linear-gradient(to right, #3c3b3f, #605c3c)';
    };
    
    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        event.currentTarget.style.backgroundImage = 'linear-gradient(to right, #ffffff, #f5f5dc)';
    };
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const currentTarget = Number(event.currentTarget.id);
        if (setOfPositions.has(currentTarget)) return;
        setSetOfPositions(new Set([...setOfPositions, currentTarget]));
        handleAttackToBoard({
            data: {
                roomId: sessionStorage.getItem('roomNumber')!,
                userId: sessionStorage.getItem('userId')!,
                attackPosition: String(currentTarget)
            }
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: { xs: '100%', sm: '100%', md: 400, lg: 400, xl: 400 },
            padding: '10px',
            opacity: myTurn ? 1 : 0.5
        }}>
            <Box sx={{
                backgroundColor: myTurn ? '#ca133f' : 'rgba(48, 63, 159, 0.9)',
                border: '1px solid #303f9f',
                height: '50px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
            }}>
                <Typography variant="h6" component='h1' sx={{ color: 'white' }}>
                    {myTurn ? 'Attack your opponent!' : "Your opponent's boat"}
                </Typography>
            </Box>

            <Box sx={{
                backgroundColor: 'white',
                height: '400px', 
                width: '100%', 
                margin: '0 auto', 
            }}>

                {grid.map((row, rowIndex) => (
                    <Box sx={{ display: 'flex' }} key={`row_${rowIndex}`}>

                        {row.map((col: any, colIndex: React.Key) => (
                            <Box 
                            id={`${rowIndex}${colIndex}`}
                            className='col'
                            sx={{
                                border: '0.5px solid black',
                                height: '40px', 
                                width: '40px', 
                                cursor: 'pointer',
                                backgroundImage: 'linear-gradient(to right, #ffffff, #f5f5dc)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            key={`${rowIndex}${colIndex}`}
                            onMouseEnter={myTurn ? handleHover : undefined}
                            onMouseLeave={myTurn ? handleLeave : undefined}
                            onClick={myTurn ? handleClick : undefined} >
                                {col}
                            </Box>
                        ))}

                    </Box>
                ))}

            </Box>
        </Box>
    )
}
