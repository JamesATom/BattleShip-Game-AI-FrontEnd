import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const audioHit = new Audio('/mp3/destroyed.mp3');
const audioMiss = new Audio('/mp3/waves.mp3');

export default function AttackToSelfBoard(props: any) {
    const { myTurn, attackSubscriptionData } = props;
    const [grid, setGrid] = React.useState(Array(10).fill(Array(10).fill(null)));

    React.useEffect(() => {
        if (attackSubscriptionData == undefined) return;
        const isShip = attackSubscriptionData.attackToBoardSubscription.isHit;
        const positionId = attackSubscriptionData.attackToBoardSubscription.attackPosition;
        const newGrid = grid.map((row: any, rowIndex: number) => {
            return row.map((col: any, colIndex: number) => {
                const key = `${rowIndex}${colIndex}`;
                if (isShip && positionId == parseInt(key) && !(myTurn)) {
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
                } else if (!(isShip) && positionId == parseInt(key) && !(myTurn)) {
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

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: { xs: '100%', sm: '100%', md: 400, lg: 400, xl: 400 },
            padding: '10px',
            opacity: myTurn ? 0.5 : 1
        }}>
            <Box sx={{
                backgroundColor: myTurn ? 'rgba(48, 63, 159, 0.9)' : '#ca133f',
                border: '1px solid #303f9f',
                height: '50px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
            }}>
                <Typography variant="h6" component='h1' sx={{ color: 'white' }}>Your boats</Typography>
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
                                backgroundImage: 'linear-gradient(to right, #ffffff, #f5f5dc)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            key={`${rowIndex}${colIndex}`} >
                                {col}
                            </Box>
                        ))}

                    </Box>
                ))}

            </Box>
        </Box>
    )
}
