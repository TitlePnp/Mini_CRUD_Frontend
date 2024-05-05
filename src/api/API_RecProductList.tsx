import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/product/ProductCard';

import styles from './API_RecProductList.module.css'

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

export default function API_AllRecProducts() {

    const [products, setProduct] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get<ProductType[]>(`http://localhost:3000/AllRecProducts`);
            setProduct(result.data);
        }

        fetchData();
    }, [])

    return (
        <div className={styles.container}>
             <h3>Recommend Product</h3>
            <div className={styles.productLayout}>
                {products.map(product => (
                    <div key={product.product_id} className={""}>
                        <a>
                            <ProductCard
                                product_id={product.product_id}
                                product_name={product.product_name}
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
