import React, {useEffect, useState } from 'react'

import axios from 'axios'

import styles from './API_ProductList.module.css'
import { Link } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar'

type Product = {
    product_id: number,
    product_name: string,
    product_image: string,
    product_description: string,
    product_price: number,
    product_quantity: number,
    product_status: string,
    type_id: number,
    creation_date: string,
    update_date: string,
}

export default function API_ProductList() {
    const [products, setProducts] = useState<Product[]>([])

    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [selectedAll, setSelectedAll] = useState<boolean>(false)
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    const [delID, setDelID] = useState<number>(0);

    const isAnyProductSelected = checkedItems.some(item => item);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchResponse = await axios.get<Product[]>('http://localhost:3000/AllProducts');
            setProducts(fetchResponse.data);
            setCheckedItems(new Array(fetchResponse.data.length).fill(false));
        }

        fetchProducts();
    }, []);

    const handleCheckboxChange = (index: number) => {
        setCheckedItems(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }

    const clearSearch = async () => {
        const fetchResponse = await axios.get<Product[]>('http://localhost:3000/AllProducts');
        setProducts(fetchResponse.data);
        setSearchValue('');
    }

    const handleSelectedAll = () => {
        setSelectedAll(!selectedAll);
        setCheckedItems(new Array(products.length).fill(!selectedAll));
    }

    const handleSearch = async () => {
        if (searchValue === '') {
            const fetchResponse = await axios.get<Product[]>('http://localhost:3000/AllProducts');
            setProducts(fetchResponse.data);
            return;
        }

        const fetchResponse = await axios.get<Product[]>(`http://localhost:3000/SearchProduct/${searchValue}`);
        setProducts(fetchResponse.data);
    }

    const delProduct = async (id: number) => {
        const response = await axios.delete(`http://localhost:3000/DelProduct/${id}`);
        if (response.status === 200) {
            alert('Delete Product Successfully');
            window.location.reload();
        }
    }

    const delProducts = async () => {
        const selectedProducts = products.filter((product, index) => checkedItems[index]);
        if (selectedProducts.length === 0) {
            alert('Please select at least one product to delete');
            return;
        }

        if (!window.confirm('Are you sure you want to delete the selected products?')) {
            return;
        }

        for (const product of selectedProducts) {
            const response = await axios.delete(`http://localhost:3000/DelProduct/${product.product_id}`);
            if (response.status === 200) {
            }
        }
        alert('Delete Product Successfully');

        window.location.reload()
    }

    return (
        <div className={styles.container}>
            <Sidebar Selected={"ShowProduct"} />
            <div className={styles.content}>
                <div className={styles.filterBar}>
                    <p className={styles.methodName}>All Products</p>
                    <div>
                        <input type="text" placeholder="🔍Search..." className={styles.searchBar} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                        <button className={styles.clearSearchButton} onClick={clearSearch}>Clear Search</button>
                        {/* <button className={styles.delButton} onClick={delProducts}>Delete</button> */}
                        {isAnyProductSelected && (
                            <button className={styles.delButton} onClick={delProducts}>Delete</button>
                        )}
                    </div>
                </div>
                <div>
                    <div className={styles.container}>
                        <table>
                            <tr>
                                <th><input type='checkbox' onClick={handleSelectedAll} /></th>
                                <th>ID</th>
                                <th>Image</th>
                                <th>ProductName</th>
                                {/* <th>Description</th> */}
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Creation Date</th>
                                <th>Update Date</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            {products.map((product, index) => (
                                <tr>
                                    <td><input type="checkbox" checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} /></td>
                                    <td>{product.product_id}</td>
                                    <td><img src={product.product_image} alt="Product" width="100" height="100" /></td>
                                    <td>{product.product_name}</td>
                                    {/* <td>{product.product_description.length > 12 ? product.product_description.slice(0, 12) + "..." : product.product_description}</td> */}
                                    <td>{product.product_price.toLocaleString()}</td>
                                    <td>{product.product_quantity}</td>
                                    <td>{product.product_status}</td>
                                    <td>{product.type_id == 1 ? "Doll" : "Figurine"}</td>
                                    {/* <td>{product.creation_date}</td>
                        <td>{product.update_date}</td> */}
                                    <td>{new Date(product.creation_date).toLocaleString('en-GB').replace(',', '')}</td>
                                    <td>{new Date(product.update_date).toLocaleString('en-GB').replace(',', '')}</td>
                                    <td><Link to={"/UpdateProduct/" + product.product_id} className={styles.editIcon}><i className='bx bxs-edit'></i></Link></td>
                                    <td className={styles.delIcon} onClick={() => delProduct(product.product_id)}><i className='bx bxs-trash'></i></td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>

            </div>
        </div>


    )
}
