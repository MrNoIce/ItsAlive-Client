import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  const styles =
  {

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  }
    };

const Product = props => {
    const { isAuthenticated } = useSimpleAuth()
    const classes = useStyles();


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
            //   <section className="product">
        <>
        <Card className={classes.card}>
            <CardActionArea>
            <div key={props.product.id} className="card-body">
            <CardMedia
                className={classes.media}
                image={require("/Users/jakescott/workspace/ItsAlive/ItsAlive-Client/its_alive_client/src/static/images/kombuchaStock.jpg")}
                title="Kombucha Stock Photo"
                style={styles.media}
            />
              <p className="card-text">${props.product.price}</p>
              <p className="card-text"><b>{totalAvailable}</b> available</p>
                <Link className="nav-link" to={`/products/${props.product.id}`}>
                    <h5>{props.product.name}</h5>
                </Link>
                {isAuthenticated() ?
                <Button onClick={() => addToOrder(props.product)}
                variant="contained" color="primary">
                    Get it
                </Button>
                : null
            }

            </div>
            </CardActionArea>
        </Card>
        </>
            // </section>
    )
}

export default Product


