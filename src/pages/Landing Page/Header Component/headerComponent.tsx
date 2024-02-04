import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@apollo/client';
import { USER_MUTATION } from '../../../utils/graphqlQuery/gql';
import { MyJwtPayload } from '../../../utils/interfaces/interfaces';
import '../landingPage.css';

export default function HeaderComponent() {
    const [createUser, { data: mutationData, error: mutationError }] = useMutation(USER_MUTATION);
    const [name, setName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [picture, setPicture] = React.useState<string>('');

    if (mutationError) return `Mutation error! ${mutationError.message}`;

    React.useEffect(() => {
        if (picture === '') {
            setName(sessionStorage.getItem('name')!);
            setEmail(sessionStorage.getItem('email')!);
            setPicture(sessionStorage.getItem('picture')! == null ? '' : sessionStorage.getItem('picture')!);
        }
    }, [name, email, picture]);

    React.useEffect(() => {
        if (mutationData) {
            sessionStorage.setItem('userId', String(mutationData.createUser.id));
        }
    }, [mutationData]);

    const decodeCredentials = (response: any): MyJwtPayload => {
        return jwtDecode(response.credential);
    };

    const updateStateAndSessionStorage = (decodedCredentials: any) => {
        setName(decodedCredentials.given_name);
        setEmail(decodedCredentials.email);
        setPicture(decodedCredentials.picture);
        sessionStorage.setItem('picture', decodedCredentials.picture);
        sessionStorage.setItem('name', decodedCredentials.given_name);
        sessionStorage.setItem('email', decodedCredentials.email);
    };

    const handleSuccess = (response: any) => {
        const decodedCredentials = decodeCredentials(response);
        updateStateAndSessionStorage(decodedCredentials);
        createUser({
            variables: {
                data: {
                    name: decodedCredentials.given_name,
                    email: decodedCredentials.email,
                    picture: decodedCredentials.picture
                }
            }
        });
    };

    const handleFailure = () => {
        console.log('Login Failed');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='header'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }} >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {sessionStorage.getItem('picture') != null ? 
                    <Avatar alt={name} src={picture} /> :
                    <GoogleLogin 
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                    useOneTap={true}
                    cancel_on_tap_outside={true}
                    text='continue_with'
                    type='standard'
                    theme='filled_black'
                    size='medium'
                    shape='circle' />}
                </Toolbar>
            </AppBar>
        </Box>
    )
}