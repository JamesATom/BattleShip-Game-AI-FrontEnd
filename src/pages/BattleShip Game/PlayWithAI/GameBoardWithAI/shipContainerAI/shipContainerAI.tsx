import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function ShipContainerAI(props: any) {
    const { 
        ships, orientation, 
        positionSetObject, 
        setSelectedImage, 
        setOrientation, 
        setAlertText,
        setOpen } = props;
    const [selectedShip, setSelectedShip] = React.useState(null);
    const [isReady, setIsReady] = React.useState(false);

    React.useEffect(() => {
        if (positionSetObject.size == 15) {
            setIsReady(true);
        }
    }, [positionSetObject.size]);

    const handleBoxClick = (ship: any) => {
        setSelectedShip(ship);
        setSelectedImage(ship);
    };

    const toggleOrientation = () => {
        setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal');
    };

    const handleClick = () => {
        console.log('hello from container AI');
    }

    return (
        <>
            <Box 
            sx={{ 
                borderRadius: '5px',
                width: '300px', 
                boxShadow: { xs: '0px 2px 4px rgba(0, 0, 0, 0.15)' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} >

                <Grid 
                container 
                spacing={0} 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    }}>

                    {ships.map((ship: any, index: React.Key | null | undefined) => (
                        <Grid item xs={12} sm={6} md={4} key={index} 
                        onClick={() => handleBoxClick(ship.name)}
                        sx={{
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: ship.amount < 1 ? 0.4 : 1,
                            boxShadow: {
                                xs: '0px 2px 4px rgba(0, 0, 0, 0.15)',
                            },
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            background: selectedShip === ship.name && ship.amount > 0 ?
                            'linear-gradient(to right, #108010, #a9a57c)' : 'none',
                            '&:hover': {
                                transform: 'translateY(-15px)',
                            },
                        }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                {Array(ship.size).fill(null).map((_, i) => (
                                    <Box 
                                    key={i} 
                                    
                                    sx={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        border: '1px solid black',
                                        background: 'linear-gradient(to right, #808080, #a9a57c)' }} />
                                ))}
                            </Box>
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}>
                            
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                
            </Box>
            <Box
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} >
                <Button onClick={toggleOrientation} variant='outlined' style={{ width: '180px', marginTop: '10px' }}>
                    {orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
                </Button>
                <Button 
                variant='outlined' 
                color='secondary' 
                style={{ width: '180px', marginTop: '10px' }} 
                disabled={!isReady}
                onClick={handleClick}>
                    Ready to Fight!
                </Button>
            </Box>
        </>
    );
};


                        