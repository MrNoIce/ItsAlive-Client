import React from "react"
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'


const Product = props => {
  const totalAvailable = props.product.quantity - props.product.total_sold
    return (
        <>


            <div className="card-body">
              <section className="product">
              </section>
              <p className="card-text">${props.product.price}</p>
              <p className="card-text"><b>{totalAvailable}</b> available</p>
                  <Link className="nav-link" to={`/products/${props.product.id}`}>
                      <h5>{props.product.name}</h5>
                  </Link>
              <Button variant="contained" color="primary">
            Get it
            </Button>
            </div>

        </>
    )
}

export default Product