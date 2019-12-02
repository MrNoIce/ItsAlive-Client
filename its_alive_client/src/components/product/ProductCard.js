import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Button from '@material-ui/core/Button'


const Product = props => {
    const { isAuthenticated } = useSimpleAuth()

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
              <section className="product">
        <>


            <div key={props.product.id} className="card-body">
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

        </>
            </section>
    )
}

export default Product