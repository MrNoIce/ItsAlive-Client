import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';





const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
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
  avatar: {
    backgroundColor: red[500],
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

        <Card className={classes.card}>
            <CardActionArea>
                <div key={props.product.id} className="card-body">
                    <CardMedia
                        className={classes.media}
                        image={require("/Users/jakescott/workspace/ItsAlive/ItsAlive-Client/its_alive_client/src/static/images/kombuchaStock.jpg")}
                        title="Kombucha Stock Photo"
                        style={useStyles.media}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <Link className="nav-link" to={`/products/${props.product.id}`}>
                                <h5>{props.product.name}</h5>
                            </Link>
                        </Typography>
                        <p className="card-text">${props.product.price}</p>
                    </CardContent>
                    <CardActions>
                        {isAuthenticated() ?
                        <Button size='small' onClick={() => addToOrder(props.product)}
                         color="primary">
                            Get it
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
                        >
                        <ExpandMoreIcon />
                    </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                {props.product.description}
                                This kombooboo be hand crafted for sure
                            </Typography>
                            <Typography paragraph>
                                Ol Dudley makes this junk and its poppin. Its the best dang kombucha i done ever ever had
                            </Typography>
                            <Typography paragraph>
                                One drank and youll be hooked, its the truth for real
                            </Typography>
                            <Typography>
                                gone head and cop you some of this kombooboo
                            </Typography>
                        </CardContent>
                    </Collapse>
                </div>
            </CardActionArea>
        </Card>

    )
}

export default Product


