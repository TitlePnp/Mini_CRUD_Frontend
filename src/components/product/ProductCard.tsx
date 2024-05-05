import React from 'react';
import {Link} from "react-router-dom";

import styles from './ProductCard.module.css';

type ProductCardProps = {
    product_id: number;
    product_name: string;
    product_detail: string;
    product_image: string;
    product_price: number;
}


function ProductCard({product_id, product_name, product_detail, product_image, product_price}: ProductCardProps) {
    return (
        <div>
            <div className={styles.container}>
                <img src={product_image} alt={"ProductImage"}/>
                <label>
                    Add to Cart
                </label>
            </div>
            <div className={styles.detail}>
            <Link to={`/productDetail`}>
                <div>
                    <h2><b>{product_name.length > 25 ? product_name.slice(0, 25) + '...' : product_name}</b></h2>
                    <p>{product_detail.length > 60 ? product_detail.slice(0, 60) + '...' : product_detail}</p>
                    <p>Price: {product_price.toLocaleString()} ฿</p>
                </div>
            </Link>
            </div>
        </div>
    );
}

export default ProductCard;