import React, { Component } from 'react'
import '../App.css'

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
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

export default function Cafe(props) {
    const classes = useStyles()
    const { cafe } = props
    return (
        <div className="cafe-card" /*style={{ border: "1px solid purple" }}*/ >
            <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title={cafe.name}
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                    {cafe.name}
                </Typography>
                <Typography>
                    Insert cafe bio in here 
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => props.push(`/cafes/${cafe.id}`)}>
                    View
                </Button>
            </CardActions>
        </div>
    )
}
