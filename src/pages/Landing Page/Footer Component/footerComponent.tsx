import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import AppStore from '../../../assets/appStore.svg';
import GooglePlay from '../../../assets/googlePlay.svg';
import '../landingPage.css';

export default function FooterComponent() {
    return (
        <Box 
        component="footer" 
        className="footer"
        sx={{
            display: ['flex', 'flex'],
            alignItems: ['center', 'center'],
            justifyContent: ['center', 'center'],
        }}>
            <Grid 
            container 
            spacing={0}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ textAlign: ['center', 'center']}}>
                        © Your Website Name 2023. All Rights Reserved.
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Grid 
                    container 
                    justifyContent="flex-end" 
                    sx={{
                        display: ['flex', 'flex'], 
                        alignItems: ['center', 'center'],
                        justifyContent: ['center', 'center'],
                    }}>
                        <Grid item>
                            <Link href="" target="_blank" rel="noopener noreferrer">
                                <img src={AppStore} alt="Descriptive text" />
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="" target="_blank" rel="noopener noreferrer">
                                <img src={GooglePlay} alt="Descriptive text" />
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}


