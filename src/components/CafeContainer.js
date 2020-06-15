import React from 'react';
import Cafe from './Cafe'
import Searchbar from './Searchbar'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        // backgroundColor: theme.palette.background.paper,
        backgroundImage: 'url("https://images.wallpaperscraft.com/image/cup_black_white_135256_2560x1440.jpg")',
        backgroundSize: "105% auto",
        backgroundRepeat:"no-repeat",
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}))

export default function CafeContainer(props) {
    const classes = useStyles()
    const { cafes, search, searchChange } = props
    console.log(props)
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Searchbar cafes={cafes} searchChange={searchChange} search={search} />
            </AppBar>
            <main>
                <div className={classes.heroContent} >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Study Beans Partners
                        </Typography>
                        <Typography variant="h5" align="center" style={{color:'#8B4513'}} paragraph>
                            Welcome to Study Beans. A place for you to find a cafe to do your work. Check out the cafes below and reserve your seat when you find a cafe you fancy. Cheers!
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cafes.map((cafe) => (
                            <Grid item key={cafe.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <Cafe key={cafe.id} cafe={cafe} {...props.history}/>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    )
}

