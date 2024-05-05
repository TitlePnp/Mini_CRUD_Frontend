import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/product/ProductCard';

import styles from './API_ShowAllProducts.module.css'

type ProductType = {
    recommend_id: number,
    recommendation: string,
    product_id: number,
    product_name: string,
    product_image: string,
    product_description: string,
    product_price: number,
    product_quantity: number,
    product_status: string,
    type_id: number,
    creation_date: string,
    update_date: string
}


export default function API_ShowAllProduct() {
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchResponse = await axios.get<ProductType[]>('http://localhost:3000/AllProducts');
            setProducts(fetchResponse.data);
        }

        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <h3>Product</h3>
            <div className={styles.productLayout}>
                {products.map(product => (
                    <div key={product.product_id} className={""}>
                        <a>
                            <ProductCard
                                product_id={product.product_id}
                                product_name={product.product_name.length > 20 ? product.product_name.substring(0, 20) + "..." : product.product_name}
                                product_detail={product.product_description}
                                product_image={product.product_image}
                                product_price={product.product_price}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
