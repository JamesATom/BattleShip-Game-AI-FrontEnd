import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BoardOfEnemy() {
    const [grid] = React.useState(Array(10).fill(Array(10).fill(null)));
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2, 
                width: { xs: '100%', sm: '100%', md: 400, lg: 400, xl: 400 },
                padding: 1, 
            }}>
            <Box
                sx={{
                    backgroundColor: 'rgba(48, 63, 159, 0.9)',
                    border: '1px solid #303f9f',
                    height: '50px',
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h6" component="h1" color="white">
                    Board of Enemy
                </Typography>
            </Box>

            <Box
                sx={{
                    backgroundColor: 'white',
                    height: 400, 
                    width: '100%', 
                    margin: 'auto', 
                }}
            >
                {grid.map((row, rowIndex) => (
                    <Box key={`row_${rowIndex}`} sx={{ display: 'flex' }}>
                        {row.map((col: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, colIndex: any) => (
                            <Box
                                id={`${rowIndex}${colIndex}`}
                                key={`col_${rowIndex}_${colIndex}`}
                                sx={{
                                    border: 0.5, 
                                    borderColor: 'black',
                                    height: 40, 
                                    width: 40, 
                                    position: 'relative',
                                    backgroundImage: 'linear-gradient(to right, #ffffff, #f5f5dc)',
                                }}
                            >
                                {col}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
