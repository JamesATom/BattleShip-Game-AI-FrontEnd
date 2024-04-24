import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { PlayWithFriendButton } from './popUpInputHuman/popUpInputHuman';
import { PlayWithRobot } from './popUpInputRobot/popUpInputRobot';
import { StyledTableCell, StyledTableHead, StyledTableRow } from './styledComponentsUI/styledComponents';

function createData(
    avatar: string,
    name: string,
    score: number,
) {
  return { avatar, name, score };
}

export default function BattleShipDashBoard(props: any) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { subscriptionData = [] } = props;
    const { userAdded } = JSON.parse(sessionStorage.getItem('users') || '[]');
    const data = Array.isArray(subscriptionData) && subscriptionData.length > 0 ? subscriptionData : (Array.isArray(userAdded) ? userAdded : []);
    const [rows, setRows] = React.useState(data.map((d: any) => 
        createData(d.picture, d.name, d.score)
    ));

    React.useEffect(() => {
        setRows(data.map((d: any) => 
            createData(d.picture, d.name, d.score)
        ));
    }, [subscriptionData.userAdded]); // there is subscriptionData variable inside dependancy array
    
    React.useEffect(() => {
        const handlePopstate = (event: any) => {
            if (event.state != null) return;
            navigate('/', { replace: true });
        };
        
        window.addEventListener('popstate', handlePopstate);
    
        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    const handleSort = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
    
        setRows([...rows].sort((a, b) => {
            if (a.score < b.score) {
                return newDirection === 'asc' ? -1 : 1;
            }
            if (a.score > b.score) {
                return newDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }));
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
      
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            width: '100%' }}>
                <Snackbar 
                open={open} 
                autoHideDuration={5000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%', textAlign: 'center' }}>
                        Oops! The room you're trying to join is currently full. Please try joining a different room or check back later.
                    </Alert>
                </Snackbar>
            <TableContainer 
            component={Paper} 
            sx={{ width: isSmallScreen ? '100%' : 650 }}>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Table 
                    sx={{ minWidth: isSmallScreen ? '100%' : 650 }} 
                    size="small" 
                    aria-label="a dense table">
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableCell align='left'>Avatar</StyledTableCell>
                                <StyledTableCell 
                                align="left" 
                                style={{ paddingLeft: '60px' }}>Name</StyledTableCell>
                                <StyledTableCell 
                                align="right" 
                                style={{ paddingRight: '20px' }}
                                onClick={handleSort}>Score {sortDirection === 'asc' ? '↑' : '↓'}</StyledTableCell>
                            </TableRow>
                        </StyledTableHead>

                        <TableBody>
                        {rows.map((row: any, rowIndex: number) => (
                            <StyledTableRow 
                            key={rowIndex} 
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                <StyledTableCell align="left">
                                    <Avatar src={row.avatar} />
                                </StyledTableCell>
                                <StyledTableCell 
                                component="th" 
                                align='left' 
                                style={{ 
                                    paddingLeft: '60px', 
                                    textTransform: 'capitalize' 
                                    }} 
                                scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell 
                                align="right" 
                                style={{ paddingRight: '40px' }}>
                                    {row.score}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>

            <Box 
            style={{ 
                marginTop: '20px', 
                width: isSmallScreen ? '100%' : 'auto', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' }}>
                <PlayWithRobot />
                <PlayWithFriendButton setOpen={setOpen} />
            </Box>
        </div>
    );
}



