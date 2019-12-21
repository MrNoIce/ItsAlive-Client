import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";





const useStyles = makeStyles(theme => ({

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    control: {
        padding: theme.spacing(2),
      },
}));

function transitionDown(props) {
    return<Slide {...props} direction="down" />;
}

const Product = props => {
    const { isAuthenticated } = useSimpleAuth()
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);


    const handleOrderClick = transition => {
        setTransition(() => transition);
        setOpen(true);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClose = () => {
        setOpen(false);
    }



    const addToOrder = (newOrder) => {
        fetch(`http://localhost:8000/orders`, {
            "method": "POST",
            headers :{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("itsalive_token")}`,
            },
            body: JSON.stringify(newOrder)
        })
        .then(response => response.json())
        .then(() => {
            props.history.push("/")
        })
    }

    const totalAvailable = props.product.quantity - props.product.total_sold
    return (
        <div className="card">
                <Card className={classes.card} key={props.product.id}>
                        <CardMedia
                            className={classes.media}
                            image={require("/Users/jakescott/workspace/ItsAlive/ItsAlive-Client/its_alive_client/src/static/images/kombuchaStock.jpg")}
                            title="Kombucha Stock Photo"
                            style={useStyles.media}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary" component="p">
                                    {props.product.name}
                            </Typography>
                                    ${props.product.price}
                        </CardContent>
                        <CardActions disableSpacing>
                            {isAuthenticated() ?
                                <Button
                                onClick={() => {
                                    addToOrder(props.product);
                                    handleOrderClick(transitionDown);
                                }}
                                color="primary" size='small'>
                                    Order
                                </Button>
                            : null
                            }
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            aria-controls="fade-menu"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Fade in={expanded} timeout="auto" unmountOnExit>
                            <ClickAwayListener onClickAway={handleExpandClick}>
                                <CardContent>
                                    <Typography paragraph>
                                        {props.product.description} -
                                        This kombooboo be hand crafted for sure
                                    </Typography>
                                </CardContent>
                            </ClickAwayListener>
                        </Fade>
                    </Collapse>
                </Card>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                autoHideDuration={900}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">"Product added to cart"</span>}
            />
        </div>
    )
}

export default Product


