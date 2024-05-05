import React from 'react'

import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <p className={styles.textLogo}>LABOBO SHOP</p>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Link to="/AllProduct" className={styles.btn}>
          <p className={styles.btn}>Manage</p>
        </Link>
      </div>
    </div>
  )
}
