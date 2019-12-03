import React, { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import Grid from "@material-ui/core/Grid"


const ProductList = props => {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        fetch(`http://localhost:8000/products`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(response => response.json())
            .then(setProducts)
    }
    useEffect(getProducts, [])


    return (
        <>
            <article className="productList">
                <Grid container justify="center" spacing={1} style={{ width:'100%', display: 'inline-flex', justifyContent: 'space-around' }}>
                    {
                        products.map(product =>
                            <ProductCard key={product.id}
                        product={product} {...props} />)
                    }
                </Grid>
            </article>
        </>
    )
}

export default ProductList
