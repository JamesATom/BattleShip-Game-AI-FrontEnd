import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { StyledDialog, StyledDialogTitle } from '../styledComponentsUI/styledComponents';
import { styled, darken } from '@mui/system';

const StyledButton = styled(Button)`
  background-color: #;
  color: white;
  &:hover {
    background-color: #ab003c;
  }
`;

const StyledPopUpButton = styled(Button)`
    background-color: ${props => props.color || '#f50057'};
    color: white;
    &:hover {
    background-color: ${props => darken(props.color || '#f50057', 0.2)};
    }
`;

export const PlayWithRobot = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
  
    const handleSubmit = (difficulty: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sessionStorage.setItem('canAccess', 'true');
        handleCloseModal();
        navigate(`/battleship-ai/${difficulty}`);
    };
  
    return (
        <>
            <StyledButton variant='contained' onClick={handleOpenModal}>
                Play with Robot
            </StyledButton>

            <StyledDialog
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="join-room-title"
                aria-describedby="join-room-description" >
                <StyledDialogTitle id="join-room-title">
                    Choose Difficulty
                </StyledDialogTitle>

                <DialogContent>
                    <Stack direction="column" spacing={2}> 
                        <StyledPopUpButton variant='contained' sx={{ backgroundColor: '#4CAF50' }} onClick={handleSubmit('easy')}>
                            Novice Navigator
                        </StyledPopUpButton>
                        <StyledPopUpButton variant='contained' sx={{ backgroundColor: '#3F51B5' }} onClick={handleSubmit('medium')}>
                            Tactical Commander
                        </StyledPopUpButton>
                        <StyledPopUpButton variant='contained' sx={{ backgroundColor: '#F44336' }} onClick={handleSubmit('hard')}>
                            Neural Admiral
                        </StyledPopUpButton>
                    </Stack>
                </DialogContent>
            </StyledDialog>
        </>
    );
};
