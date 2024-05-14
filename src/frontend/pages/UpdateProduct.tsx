import React, { useState, ChangeEvent, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar'

import styles from './Update.module.css'
import axios from 'axios'

import { Link, useParams } from 'react-router-dom'

type Product = {
  product_id: number,
  product_name: string,
  product_image: string,
  product_description: string,
  product_price: number,
  product_quantity: number,
  product_status: string,
  type_id: number,
  creation_date: string | null,
  update_date: string | null,
}

export default function UpdateProduct() {
  const { id } = useParams<{ id: string }>();

  const [product_name, setProduct_name] = useState<string>('')
  const [product_category, setProduct_category] = useState<string>('')
  const [product_price, setProduct_price] = useState<number>(0)
  const [product_quantity, setProduct_quantity] = useState<number>(0)
  const [product_description, setProduct_description] = useState<string>('')
  const [product_status, setProduct_status] = useState<string>('')
  const [imgPath, setImgPath] = useState<string>('https://via.placeholder.com/150')

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImgPath(event.target.value);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchResponse = await axios.get<Product>(`http://localhost:3000/GetProduct/${id}`);

      setProduct_name(fetchResponse.data.product_name);
      setProduct_category(fetchResponse.data.type_id.toString());
      setProduct_price(fetchResponse.data.product_price);
      setProduct_quantity(fetchResponse.data.product_quantity);
      setProduct_description(fetchResponse.data.product_description);
      setProduct_status(fetchResponse.data.product_status);
      setImgPath(`/${fetchResponse.data.product_image}`);
    }
    fetchProducts();
  }, []);

  const updateProduct = async () => {
    const product: Product = {
      product_id: parseInt(id ?? '0'),
      product_name: product_name,
      product_image: imgPath.slice(1),
      product_description: product_description,
      product_price: product_price,
      product_quantity: product_quantity,
      product_status: 'Active',
      type_id: parseInt(product_category),
      creation_date: null,
      update_date: null
    }

    const response = await axios.patch<Product>(`http://localhost:3000/UpdateProduct/${id}`, product);

    if (response.status === 200) {
      alert('Product Updated Successfully');
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar Selected={"ShowProduct"} />
      <div className={styles.content}>
        <div className={styles.filterBar}>
          <div>
            <Link to='/AllProduct'>
              <div className={styles.backToProductList}>
                <i className='bx bx-arrow-back'></i>
                <p>back</p>
              </div>
            </Link>
            <p className={styles.methodName}>Update Product</p>
          </div>
        </div>

        <div className={styles.previewContent}>

          <div className={styles.imagePreview}>
            <img src={imgPath} alt="ProductImage" />
          </div>

          <div className={styles.infoPreview}>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Name</p>
              <input type="text" placeholder='Product Name' value={product_name} onChange={(e) => setProduct_name(e.target.value)} className={styles.infoPreviewInput} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Category</p>
              <select value={product_category ? product_category : ''} onChange={(e) => setProduct_category(e.target.value)} className={styles.infoPreviewSelect}>
                <option value="1">Doll</option>
                <option value="2">Figurine</option>
              </select>
            </div>
            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Price</p>
              <input type="text" className={styles.infoPreviewInput} value={product_price} onChange={(e) => setProduct_price(Number(e.target.value))} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Quantity</p>
              <input type="text" className={styles.infoPreviewInput} value={product_quantity} onChange={(e) => setProduct_quantity(Number(e.target.value))} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Description</p>
              <textarea className={styles.infoPreviewInput} placeholder='Product Description' value={product_description} onChange={(e) => setProduct_description(e.target.value)} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Status</p>
              <input type="text" className={styles.infoPreviewInput} placeholder='Product Status' value={product_status} onChange={(e) => setProduct_status(e.target.value)} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Image</p>
              <input type="text" className={styles.infoPreviewInput} onChange={handleImageChange} value={imgPath} />
            </div>

            <div className={styles.infoPreviewRow}>
              <button className={styles.infoPreviewButton} onClick={updateProduct}>Update Product</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}