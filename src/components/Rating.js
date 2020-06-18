import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import { FaStar } from 'react-icons/fa'
import '../App.css'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}))


export default function Rating(props) {
    const classes = useStyles();
    const { rating, cafe, currentUser, toggleDelete } = props
    const renderDelete = <Button color="primary" onClick={() => toggleDelete(rating)}>Delete</Button>
    console.log('rating',rating)
    console.log('currentUser', currentUser)

    
    const stars =
        <div>
            {[...Array(rating.stars)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <label>
                        <FaStar className='star' color="#ffc107" size={20}/>
                    </label>
                )
            })}
        </div>


    return (
        <List className={classes.root} style={{border: "1px solid black", margin: "0 auto",backgroundColor:"#F4E2D2"}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={rating.user===undefined? currentUser.avatar : rating.user.avatar } />
                </ListItemAvatar>
                <ListItemText
                    primary={stars}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {rating.comments}
                            </Typography>
                            {currentUser && currentUser.id === rating.user_id ? renderDelete : null}
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}


