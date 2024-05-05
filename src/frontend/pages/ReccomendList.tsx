import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar'

import axios from 'axios'

import styles from './ReccomendList.module.css'

type Product = {
    product_id: number,
    product_name: string,
    product_image: string,
    product_description: string,
    recommendation: string,
}

export default function ReccomendList() {

    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [selectedAll, setSelectedAll] = useState<boolean>(false)
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    const [product_id, setProduct_id] = useState<number>();
    const [recommendation, setRecommendation] = useState<string>('');
    const [alertText, setAlertText] = useState<string>('');

    const addRecProduct = async () => {
        if (recommendation === '' || product_id === null) {
            setAlertText('*Please fill all fields');
            return;
        }
        const haveProduct = await axios.get(`http://localhost:3000/GetProduct/${product_id}`);
        if (haveProduct.data.length === 0) {
            setAlertText('*Product ID not found');
            return;
        }
        const response = await axios.post<Product>('http://localhost:3000/AddRecProduct', { product_id, recommendation });
        if (response.status === 200) {
            alert('Add Recommend Product Successfully');
        }
        window.location.reload();
    }

    const delRecProduct = async (id: number) => {
        const response = await axios.delete(`http://localhost:3000/DelRecProduct/${id}`);
        if (response.status === 200) {
            alert('Delete Recommend Product Successfully');
        }

        window.location.reload();
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchResponse = await axios.get('http://localhost:3000/AllRecProducts');
            setProducts(fetchResponse.data);
            setCheckedItems(new Array(fetchResponse.data.length).fill(false));
        }
        fetchProducts();
    }, []);


    return (
        <div className={styles.container}>
            <Sidebar Selected={"ReccomendList"} />
            <div className={styles.content}>
                <div className={styles.filterBar}>
                    <p className={styles.methodName}>Reccomend List</p>
                </div>
                <div className={styles.addRecPart}>
                    <input type="text" placeholder="ID" value={product_id} onChange={(e) => setProduct_id(Number(e.target.value))} />
                    <input type="text" placeholder="Recommendation" value={recommendation} onChange={(e) => setRecommendation(e.target.value)} />
                    <button onClick={addRecProduct}>Add Recommend Product</button>
                    <p>{alertText}</p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>ProductName</th>
                            <th>Description</th>
                            <th>Recommendation</th>
                            <th>Delete</th>
                        </tr>
                        {products.map((product, index) => (
                            <tr>
                                <td>{product.product_id}</td>
                                <td><img src={product.product_image} alt="Product" width="100" height="100" /></td>
                                <td>{product.product_name}</td>
                                <td>{product.product_description.length > 12 ? product.product_description.slice(0, 12) + "..." : product.product_description}</td>
                                <td>{product.recommendation}</td>
                                <td className={styles.delIcon} onClick={() => delRecProduct(product.product_id)}><i className='bx bxs-trash'></i></td>                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )
}
