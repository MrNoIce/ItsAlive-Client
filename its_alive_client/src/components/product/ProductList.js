import React, { useEffect, useState } from "react"
import Product from "./Product"
import ProductCard from "./ProductCard"



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
                <ol>
            <article className="productList">
                {
                    products.map(product =>
                        <ProductCard key={product.id}
                            product={product} {...props} />)
                }
            </article>
                </ol>
        </>
    )
}

export default ProductList
