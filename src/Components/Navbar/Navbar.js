import React from 'react'
import styles from "./Navbar.module.css"

export default function Navbar() {
  return (
    <div className={styles.Container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src='https://static.vecteezy.com/system/resources/previews/004/753/030/non_2x/portfolio-icon-shadowed-detailed-portfolio-logo-free-vector.jpg' alt='logo' />
        <span>PhotoFolio</span>
      </div>
    </div>
  )
}

