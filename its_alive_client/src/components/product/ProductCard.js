import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Grid from "@material-ui/core/Grid"





const useStyles = makeStyles(theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
        spacing: "auto",
        },
    card: {
        maxWidth: 200,
    },
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

const Product = props => {
    const { isAuthenticated } = useSimpleAuth()
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



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
            <Grid spacing={3} justifyContent="space-around">
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
                                <Button onClick={() => addToOrder(props.product)}
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
                        <ClickAwayListener onClickAway={handleExpandClick}>
                            <CardContent>
                                <Typography paragraph>
                                    {props.product.description} -
                                    This kombooboo be hand crafted for sure
                                </Typography>
                                <Typography paragraph>
                                    Ol Dudley makes this junk and its poppin. Its the best dang kombucha I done ever ever had
                                </Typography>
                            </CardContent>
                        </ClickAwayListener>
                    </Collapse>
                </Card>
            </Grid>
    )
}

export default Product


