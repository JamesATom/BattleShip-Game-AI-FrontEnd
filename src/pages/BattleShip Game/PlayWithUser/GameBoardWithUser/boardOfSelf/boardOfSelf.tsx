import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { boxStyle } from '../../../../../utils/styles/styles';

export default function BoardOfSelf(props: any) {
    const { ships, selectedImage, orientation, 
            positionSetObject, setPositionSetObject, 
            updateAmountOfShips } = props;
    const [grid, setGrid] = React.useState(Array(10).fill(Array(10).fill(null)));

    const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedImage === null) return;
        if (positionSetObject.size == 15) return;
        const tempUrl = ships.find((ship: { name: string; }) => ship.name === selectedImage);
        const currentId = parseInt(event.currentTarget.id);
        if (tempUrl.size === 1) {
            event.currentTarget.style.backgroundImage = 'linear-gradient(to right, #3c3b3f, #605c3c)';
        } else if (tempUrl.size != 1 && orientation === 'vertical') {
            if (!((90 + (currentId % 10)) - ((tempUrl.size - 1) * 10) >= currentId)) return;
            event.currentTarget.style.backgroundImage = 'linear-gradient(to right, #3c3b3f, #605c3c)';
            let counter = 10;
            let counter2 = 1;

            Array.from(document.getElementsByClassName('col')).forEach((element: any) => {
                if (element.id == parseInt(event.currentTarget.id) + counter && counter2 < tempUrl.size) {
                    counter += 10;
                    counter2 += 1;
                    element.style.backgroundImage = 'linear-gradient(to right, #3c3b3f, #605c3c)';
                } 
            });
        } else if (tempUrl.size != 1 && orientation === 'horizontal') {
            if (!((currentId % 10) + tempUrl.size <= 10)) return;
            event.currentTarget.style.backgroundImage = 'linear-gradient(to right, #3c3b3f, #605c3c)';
            let counter = 1;
            let counter2 = 1;
            
            Array.from(document.getElementsByClassName('col')).forEach((element: any) => {
                if (element.id == parseInt(event.currentTarget.id) + counter && counter2 < tempUrl.size) {
                    counter += 1;
                    counter2 += 1;
                    element.style.backgroundImage = 'linear-gradient(to right, #3c3b3f, #605c3c)';
                } 
            });
        }
    };
    
    const handleLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedImage === null) return;
        const tempUrl = ships.find((ship: { name: string; }) => ship.name === selectedImage);
        event.currentTarget.style.backgroundImage = 'linear-gradient(to right, #ffffff, #f5f5dc)';
        
        if (tempUrl.size != 1 && orientation === 'vertical') {
            let counter = 10;
            let counter2 = 1;
            
            Array.from(document.getElementsByClassName('col')).forEach((element: any) => {
                if (element.id == parseInt(event.currentTarget.id) + counter && counter2 < tempUrl.size) {
                    counter += 10;
                    counter2 += 1;
                    element.style.backgroundImage = 'linear-gradient(to right, #ffffff, #f5f5dc)';
                } 
            });
        } else if (tempUrl.size != 1 && orientation === 'horizontal') {
            let counter = 1;
            let counter2 = 1;
            
            Array.from(document.getElementsByClassName('col')).forEach((element: any) => {
                if (element.id == parseInt(event.currentTarget.id) + counter && counter2 < tempUrl.size) {
                    counter += 1;
                    counter2 += 1;
                    element.style.backgroundImage = 'linear-gradient(to right, #ffffff, #f5f5dc)';
                } 
            });
        }
    };
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (selectedImage === null) return;
        const tempUrl = ships.find((ship: { name: string; }) => ship.name === selectedImage);
        if (!(tempUrl.amount > 0)) {
            return;
        }
        
        const currentId = parseInt(event.currentTarget.id);
        const positionsToCheck = [currentId];
        if (tempUrl.size > 1) {
            if (orientation === 'vertical') {
                for (let i = 1; i < tempUrl.size; i++) {
                    positionsToCheck.push(currentId + i * 10);
                }
            } else if (orientation === 'horizontal') {
                for (let i = 1; i < tempUrl.size; i++) {
                    positionsToCheck.push(currentId + i);
                }
            }
        }

        if (positionsToCheck.some(position => positionSetObject.has(position))) {
            return;
        }
            
        const newSet = new Set(positionSetObject);
        positionsToCheck.forEach(position => newSet.add(position));
        setPositionSetObject(newSet);
        let newGrid: any;

        if (tempUrl.size == 1) {
            newGrid = grid.map((row, rowIndex) => {
                return row.map((col: any, colIndex: any) => {
                    const key = `${rowIndex}${colIndex}`;
                    if (parseInt(`${rowIndex}${colIndex}`) == currentId) {
                        return <Box 
                        key={key}
                        sx={boxStyle}
                        />;
                    } else {
                        return col;
                    }
                });
            });

        } else if (tempUrl.size !== 1) {
            if (orientation === 'vertical') {
                if (!((90 + (currentId % 10)) - ((tempUrl.size - 1) * 10) >= currentId)) return;
                
                let counter = 10;
                let counter2 = 1;
                newGrid = grid.map((row, rowIndex) => {
                    return row.map((col: any, colIndex: any) => {
                        const key = `${rowIndex}${colIndex}`;
                        if (parseInt(`${rowIndex}${colIndex}`) == currentId) {
                            return <Box
                                key={key}
                                style={boxStyle} />
                        } else if (parseInt(`${rowIndex}${colIndex}`) == currentId + counter && counter2 < tempUrl.size) {
                            counter += 10;
                            counter2 += 1;
                            return <Box 
                                key={key}
                                style={boxStyle} />
                        } else {
                            return col;
                        }
                    });
                    
                });
                
            } else if (orientation === 'horizontal') {
                if (!((currentId % 10) + tempUrl.size <= 10)) return;
                let counter = 1;
                let counter2 = 1;
            
                newGrid = grid.map((row, rowIndex) => {

                    return row.map((col: any, colIndex: any) => {
                        const key = `${rowIndex}${colIndex}`;
                        if (parseInt(`${rowIndex}${colIndex}`) === currentId) {
                            return <Box 
                                key={key} 
                                style={boxStyle} />

                        } else if (parseInt(`${rowIndex}${colIndex}`) === currentId + counter && counter2 < tempUrl.size) {
                            counter += 1;
                            counter2 += 1;
                         
                            return <Box 
                                key={key}
                                style={boxStyle} />
                        } else {
                            return col;
                        }
                    });

                });

            }
        } 
        setGrid(newGrid);
        if (tempUrl.amount > 0) {
            updateAmountOfShips(tempUrl.name, tempUrl.amount - 1);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: { xs: '100%', sm: '100%', md: 400, lg: 400, xl: 400 },
            padding: '10px'
        }}>
            <Box sx={{
                backgroundColor: 'rgba(48, 63, 159, 0.9)',
                border: '1px solid #303f9f',
                height: '50px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
            }}>
                <Typography variant="h6" component='h1' sx={{ color: 'white' }}>Board of Self</Typography>
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
                                backgroundImage: 'linear-gradient(to right, #ffffff, #f5f5dc)'
                            }}
                            key={`${rowIndex}${colIndex}`}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleLeave}
                            onClick={handleClick} >
                                {col}
                            </Box>
                        ))}

                    </Box>
                ))}

            </Box>
        </Box>
    )
}

 