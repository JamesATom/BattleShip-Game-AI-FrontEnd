import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/system';

// Styled components
export const StyledButton = styled(Button)`
  background-color: #4caf;
  color: white;
  &:hover {
    background-color: #ab003c;
  }
`;

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background-color: #f3f3f3;
    padding: 20px;
    border-radius: 10px;
  }

  &.MuiDialog-root {
    backdrop-filter: blur(5px);
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  color: #333;
  text-align: center;
`;

export const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: #4caf;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #4caf;
    }
  }
`;

export const StyledSubmitButton = styled(Button)`
  background-color: #4caf;
  color: white;
  &:hover {
    background-color: #357a38;
  }
`;

export const StyledCancelButton = styled(Button)`
  background-color: #f44336;
  color: white;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    color: theme.palette.mode === 'light' ? 'black' : 'white',
}));
    
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(130, 150, 150, 0.4)' : 'rgba(100, 100, 100, 0.4)',
        cursor: 'pointer'
    },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(50, 50, 50, 0.4)' : 'rgba(255, 255, 255, 0.4)',
}));