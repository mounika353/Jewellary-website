import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  if (!product) return null;
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <img src={product.image} alt={product.name} className={styles.img} />
        {product.isNew && <span className={`${styles.badge} ${styles.badgeNew}`}>NEW</span>}
        {product.isSpecial && !product.isNew && <span className={`${styles.badge} ${styles.badgeSpecial}`}>✦ SPECIAL</span>}
        {product.discount > 0 && <span className={styles.discBadge}>{product.discount}% OFF</span>}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardName}>{product.name}</p>
        <p className={styles.cardCat}>{product.category} · {product.karat} · {product.weight}g</p>
        <div className={styles.priceContainer}>
          <span className={styles.cardPrice}>₹{discountedPrice.toLocaleString()}</span>
          {product.discount > 0 && <span className={styles.cardOriginal}>₹{product.price.toLocaleString()}</span>}
        </div>
        <button className={styles.addBtn} onClick={(e) => { e.preventDefault(); /* add logic later */ }}>Add to Cart</button>
      </div>
    </div>
  );
}
