import React, { useEffect, useState } from 'react'

import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'

type SidebarProps = {
    Selected: string
}

export default function Sidebar({ Selected }: SidebarProps) {
    const [selectedMenu, setSelectedMenu] = useState<string>(Selected);

    useEffect(() => {
    }, [selectedMenu])

    const handleMenu = (menu: string) => {
        setSelectedMenu(menu);
    }

    return (
        <div className={styles.container}>
            <div>
                <div>
                    <Link to='/'>
                        <div className={styles.backBtn}>

                            <i className='bx bx-arrow-back'></i>
                            <p>Back To Home</p>
                        </div>
                    </Link>
                </div>
                <div>
                    <h2 className={styles.logo}>LABOBO SHOP</h2>
                </div>
                <div>
                    <div className={styles.productMenu}>
                        <i className='bx bxs-shopping-bag'></i>
                        <p>Products</p>
                    </div>
                    <Link to='/AllProduct' onClick={(): void => handleMenu('ShowProduct')}>
                        <div className={`${styles.showProduct} ${selectedMenu === 'ShowProduct' ? styles.active : ''}`}>
                            <i className='bx bx-list-ul'></i>
                            <p>Product List</p>
                        </div>
                    </Link>
                    <Link to='/AddProduct' onClick={(): void => handleMenu('AddProduct')}>
                        <div className={`${styles.addProduct} ${selectedMenu === 'AddProduct' ? styles.active : ''}`}>
                            <i className='bx bx-plus-medical'></i>
                            <p>Add Product</p>
                        </div>
                    </Link>
                    {/* <Link to='/UpdateProduct' onClick={() => handleMenu('UpdateProduct')}>
                        <div className={`${styles.editProduct} ${selectedMenu === 'UpdateProduct' ? styles.active : ''}`}>
                            <i className='bx bxs-edit-alt'></i>
                            <p>Update Product</p>
                        </div>
                    </Link> */}
                </div>

                <div>
                    <div className={styles.recProductMenu}>
                        <i className='bx bxs-star'></i>
                        <p>Recommend Product</p>
                    </div>
                    <Link to='/ReccomendList' onClick={(): void => handleMenu('ReccomendList')}>
                        <div className={`${styles.recList} ${selectedMenu === 'ReccomendList' ? styles.active : ''}`}>
                            <i className='bx bx-list-ul'></i>
                            <p>Reccomend Product</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
