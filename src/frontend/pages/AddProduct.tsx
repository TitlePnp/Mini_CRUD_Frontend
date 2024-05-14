import React, { useState, ChangeEvent } from 'react'
import Sidebar from '../../components/shared/Sidebar'

import styles from './AddProduct.module.css'
import axios from 'axios'

type Product = {
  product_name: string,
  product_image: string,
  product_description: string,
  product_price: number,
  product_quantity: number,
  product_status: string,
  type_id: number,
}


export default function AddProduct() {

  const [product_name, setProduct_name] = useState<string>('')
  const [product_category, setProduct_category] = useState<string>('1')
  const [product_price, setProduct_price] = useState<number>(0)
  const [product_quantity, setProduct_quantity] = useState<number>(0)
  const [product_description, setProduct_description] = useState<string>('')
  const [product_status, setProduct_status] = useState<string>('')
  const [imgPath, setImgPath] = useState<string>('https://via.placeholder.com/150')

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImgPath(event.target.value);
  }

  const AddProductToDb = async () => {
    const product: Product = {
      product_name: product_name,
      product_image: imgPath,
      product_description: product_description,
      product_price: product_price,
      product_quantity: product_quantity,
      product_status: 'Active',
      type_id: parseInt(product_category)
    }


    const response = await axios.post(`http://localhost:3000/AddProduct`, product);

    if (response.status === 201) {
      alert('Add Product Successfully');
    }
  }

  return (
    <div className={styles.container}>
      <Sidebar Selected={"AddProduct"} />
      <div className={styles.content}>
        <div className={styles.filterBar}>
          <p className={styles.methodName}>Add Product</p>
        </div>

        <div className={styles.previewContent}>

          <div className={styles.imagePreview}>
            <img src={imgPath} alt="Product" />
          </div>

          <div className={styles.infoPreview}>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Name</p>
              <input type="text" placeholder='Product Name' onChange={(e) => setProduct_name(e.target.value)} className={styles.infoPreviewInput} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Category</p>
              <select value={product_category} onChange={(e) => setProduct_category(e.target.value)} className={styles.infoPreviewSelect}>
                <option value="1">Doll</option>
                <option value="2">Figurine</option>
              </select>
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Price</p>
              <input type="text" placeholder='Price' className={styles.infoPreviewInput} onChange={(e) => setProduct_price(Number(e.target.value))} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Quantity</p>
              <input type="text" placeholder='quantity' className={styles.infoPreviewInput} onChange={(e) => setProduct_quantity(Number(e.target.value))} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Description</p>
              <textarea placeholder='description' className={styles.infoPreviewInput} value={product_description} onChange={(e) => setProduct_description(e.target.value)} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Status</p>
              <input type="text" placeholder='Status' className={styles.infoPreviewInput} value={product_status} onChange={(e) => setProduct_status(e.target.value)} />
            </div>

            <div className={styles.infoPreviewRow}>
              <p className={styles.infoPreviewTitle}>Product Image</p>
              <input type="text" placeholder='Image Path' className={styles.infoPreviewInput} onChange={handleImageChange} />
            </div>
            <div className={styles.infoPreviewRow}>
              <button className={styles.infoPreviewButton} onClick={AddProductToDb}>Add Product</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}