import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import ProductCard from '../components/ProductCard';
import styles from './Home.module.css';

const HERO_IMG = 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=90';
const BRIDAL_IMG = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80';
const TEMPLE_IMG = 'https://images.unsplash.com/photo-1601121141418-36d0d9da8e3d?w=800&q=80';

const VIDEOS = [
  { title: 'Gold Kundan Making Process',   img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  { title: 'Traditional Bridal Jewellery', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { title: 'Diamond Polishing Art',        img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80' },
  { title: 'Temple Jewellery Showcase',    img: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80' },
];

const PERKS = ['100% BIS Hallmarked', 'Free Insured Shipping', 'Lifetime Exchange', 'Traditional Craftsmanship'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [goldRates, setGoldRates] = useState(null);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    api.get('/products').then(p => {
      if (Array.isArray(p)) setProducts(p.slice(0, 4));
    });
    api.get('/gold-rates').then(setGoldRates);
    api.get('/coupons').then(setCoupons);
  }, []);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroIcon}>✦</span>
          <h1 className={styles.heroTitle}>REDDY'S JEWELLERY</h1>
          <p className={styles.heroSub}>CRAFTING TRADITION SINCE 1952</p>
          <Link to="/shop" className={styles.heroCta}>EXPLORE TRADITION</Link>
        </div>
      </section>

      {/* Perks bar */}
      <div className={styles.perksBar}>
        {PERKS.map(p => (
          <span key={p} className={styles.perk}><span className={styles.perkStar}>✦</span> {p}</span>
        ))}
      </div>

      {/* Collection banners */}
      <section className={styles.banners}>
        <div className={styles.bannerCard} style={{ backgroundImage: `url(${BRIDAL_IMG})` }}>
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerText}>
            <h2>Bridal Season</h2>
            <p>Explore our handcrafted bridal sets →</p>
          </div>
        </div>
        <div className={styles.bannerCard} style={{ backgroundImage: `url(${TEMPLE_IMG})` }}>
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerText}>
            <h2>Temple Collection</h2>
            <p>Divine antique craftsmanship →</p>
          </div>
        </div>
      </section>

      {/* Active offers */}
      <section className={styles.offersBar}>
        <p className={styles.offersTitle}>✦ ACTIVE OFFERS</p>
        <div className={styles.offersList}>
          {coupons && coupons.map(c => (
            <div key={c.code} className={styles.offerChip}>
              <strong>{c.code}</strong> {c.description}
            </div>
          ))}
        </div>
      </section>

      {/* Special Collection */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>SPECIAL COLLECTION</h2>
          <Link to="/shop" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={styles.productGrid}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Featured Videos */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>FEATURED VIDEOS</h2>
          <span className={styles.viewAll}>CLICK TO PLAY</span>
        </div>
        <div className={styles.videoGrid}>
          {VIDEOS.map(v => (
            <div key={v.title} className={styles.videoCard} style={{ backgroundImage: `url(${v.img})` }}>
              <div className={styles.videoOverlay} />
              <button className={styles.playBtn}>⏵</button>
              <p className={styles.videoTitle}>{v.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gold Rates */}
      {goldRates && (
        <section className={styles.goldSection}>
          <div className={styles.goldBox}>
            <div className={styles.goldHeader}>
              <h2 className={styles.goldTitle}>TODAY'S GOLD RATE</h2>
              <span className={styles.goldUpdated}>UPDATED: {goldRates.updatedAt}</span>
            </div>
            <div className={styles.goldDivider} />
            <div className={styles.ratesGrid}>
              {goldRates.rates.map((r, i) => (
                <div key={r.country} className={`${styles.rateCard} ${i === goldRates.rates.length - 1 ? styles.rateCardActive : ''}`}>
                  <p className={styles.rateCountry}>{r.country}</p>
                  <p className={styles.rateValue}>{r.currency} {r.rate.toLocaleString('en-IN')}</p>
                  <p className={styles.rateUnit}>{r.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
