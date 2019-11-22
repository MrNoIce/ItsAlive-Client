import React from "react"
import Product from "./Product"



const ProductList = props => {
    return (
        <>
                <ol>
            <article className="productList">
                {
                    props.products.map(product =>
                        <Product key={product.id}
                            product={product} {...props} />)
                }
            </article>
                </ol>
        </>
    )
}

export default ProductList
