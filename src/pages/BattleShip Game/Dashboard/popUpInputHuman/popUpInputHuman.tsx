import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DialogContent from '@mui/material/DialogContent';
import { 
    StyledButton, 
    StyledDialog, 
    StyledDialogTitle, 
    StyledTextField, 
    StyledSubmitButton, 
    StyledCancelButton 
} from '../styledComponentsUI/styledComponents';
import { JOIN_ROOM_MUTATION } from '../../../../utils/graphqlQuery/gql';
import { useMutation } from '@apollo/client';

export const PlayWithFriendButton = (props: any) => {
    const { setOpen } = props;
    const [joinRoom, { error: mutationError }] = useMutation(JOIN_ROOM_MUTATION);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [roomNumber, setRoomNumber] = React.useState<number>(0);
    const [roomNumberError, setRoomNumberError] = React.useState<boolean>(false);
    
    if (mutationError) return `Mutation error! ${mutationError.message}`;

    React.useEffect(() => {
        if (roomNumber < 1 || roomNumber > 9999) {
            setRoomNumberError(true);
        } else {
            setRoomNumberError(false);
        }
    }, [roomNumber]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    const handleRoomNumberChange = (event: 
        { target: 
            { value: React.SetStateAction<string>; }; 
        }) => {
        setRoomNumber(Number(event.target.value));
    };

    const handleSubmit = async (e: { preventDefault: () => void; }): Promise<void> => {
        e.preventDefault();
        handleCloseModal();
        await joinRoom({
            variables: {
                data: {
                    userId: String(sessionStorage.getItem('userId')!),
                    roomId: String(roomNumber),
                }
            }
        })
        .then((response) => {
            if (response.data.joinRoom.statusCode == 200) {
                sessionStorage.setItem('canAccess', 'true');
                sessionStorage.setItem('roomNumber', String(roomNumber));
                setTimeout(() => {
                    return navigate(`/battleship-gameBoard`);
                }, 500); 
            } else if (response.data.joinRoom.statusCode == 403) {
                setOpen(true);
            }
        })
        .catch((error) => {
            console.log('Network Error: ', error);
        });
    };
  
    return (
        <>
            <StyledButton variant='contained' onClick={handleOpenModal}>
                Play with Friend
            </StyledButton>

            <StyledDialog
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="join-room-title"
                aria-describedby="join-room-description" >
                <StyledDialogTitle id="join-room-title">
                    Join a Room
                </StyledDialogTitle>

                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <StyledTextField
                        id="room-number"
                        name="room-number"
                        label="Room Number"
                        variant="outlined"
                        autoComplete="off"
                        value={roomNumber}
                        onChange={handleRoomNumberChange}
                        required
                        error={roomNumberError}
                        helperText={roomNumberError ? "Invalid room number" : ""}
                        fullWidth
                        margin="dense" />
                        <Box display="flex" justifyContent="space-between" margin='10px 0px 0px 0px'>
                            <StyledCancelButton onClick={handleCloseModal}>
                                Cancel
                            </StyledCancelButton>
                            <StyledSubmitButton type="submit" variant="contained" disabled={roomNumberError}>
                                Join Room
                            </StyledSubmitButton>
                        </Box>
                    </form>
                </DialogContent>
            </StyledDialog>
        </>
    );
};
