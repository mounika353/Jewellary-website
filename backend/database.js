import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('jewellary.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected');
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        weight REAL,
        karat TEXT,
        image TEXT,
        isNew BOOLEAN,
        isSpecial BOOLEAN,
        discount INTEGER,
        desc TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        visit_date TEXT,
        visit_time TEXT,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        address TEXT,
        payment TEXT,
        total REAL,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId INTEGER,
        itemId INTEGER,
        qty INTEGER,
        price REAL,
        FOREIGN KEY(orderId) REFERENCES orders(id),
        FOREIGN KEY(itemId) REFERENCES items(id)
      )`);

      db.get("SELECT COUNT(*) as count FROM items", (err, row) => {
        if (!err && row.count === 0) {
          const INITIAL_ITEMS = [
            { id: 1, name: "Gold Kundan Choker", category: "Necklaces", price: 145000, weight: 35.5, karat: "22K", image: "/images/kundan_choker.png", isNew: true, isSpecial: true, discount: 5, desc: "Exquisite heavy Kundan choker with meenakari work and pearls." },
            { id: 2, name: "Antique Vaddanam", category: "Necklaces", price: 320000, weight: 80.0, karat: "22K", image: "/images/vaddanam.png", isNew: false, isSpecial: true, discount: 10, desc: "Traditional South Indian temple belt necklace featuring Goddess Lakshmi motifs." },
            { id: 3, name: "Polki Diamond Haar", category: "Necklaces", price: 215000, weight: 45.0, karat: "18K", image: "/images/polki_haar.png", isNew: false, isSpecial: true, discount: 0, desc: "Long layering necklace set with uncut Polki diamonds." },
            
            { id: 4, name: "Bridal Diamond Vanki Ring", category: "Rings", price: 85000, weight: 8.2, karat: "18K", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80", isNew: false, isSpecial: true, discount: 15, desc: "Traditional v-shaped ring studded with VVS diamonds." },
            { id: 5, name: "Heritage Gold Jhumkas", category: "Earrings", price: 65000, weight: 15.0, karat: "22K", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80", isNew: false, isSpecial: true, discount: 5, desc: "Three-tier traditional jhumka earrings." },
            { id: 6, name: "Diamond Studs", category: "Earrings", price: 45000, weight: 3.2, karat: "18K", image: "https://images.unsplash.com/photo-1633519842404-e59cf719541a?w=600&q=80", isNew: true, isSpecial: false, discount: 10, desc: "Everyday wear diamond floral studs." },
            { id: 7, name: "Antique Kada (Pair)", category: "Bangles", price: 110000, weight: 28.0, karat: "22K", image: "/images/bangles.png", isNew: true, isSpecial: true, discount: 0, desc: "Intricately carved thick gold kadas." },
            { id: 8, name: "Peacock Motif Pendant", category: "Pendants", price: 38000, weight: 8.5, karat: "22K", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80", isNew: false, isSpecial: false, discount: 0, desc: "Solid gold pendant featuring a dancing peacock." },
            { id: 9, name: "Lakshmi Kasu Pendant", category: "Pendants", price: 24000, weight: 5.0, karat: "22K", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80", isNew: true, isSpecial: false, discount: 5, desc: "Classic gold coin pendant with Lakshmi design." },

            { id: 10, name: "22K Gold Black Bead Mangalsutra", category: "Mangalsutras", price: 52000, weight: 8.5, karat: "22K", image: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600&q=80", isNew: false, isSpecial: true, discount: 5, desc: "Traditional double-string black bead mangalsutra with gold pendant." },
            { id: 11, name: "Diamond Vati Mangalsutra", category: "Mangalsutras", price: 78000, weight: 6.2, karat: "18K", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80", isNew: true, isSpecial: false, discount: 10, desc: "Modern diamond-studded vati mangalsutra with delicate chain." },

            { id: 12, name: "Navaratna Gold Bracelet", category: "Bracelets", price: 95000, weight: 18.0, karat: "22K", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", isNew: true, isSpecial: true, discount: 0, desc: "Nine precious gemstones set in handcrafted 22K gold bracelet." },
            { id: 13, name: "Diamond Tennis Bracelet", category: "Bracelets", price: 185000, weight: 12.5, karat: "18K", image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&q=80", isNew: false, isSpecial: false, discount: 8, desc: "Elegant 18K white gold bracelet with 3 carats of round brilliant diamonds." },

            { id: 14, name: "Traditional Maharashtrian Nath", category: "Nose Pins", price: 32000, weight: 4.8, karat: "22K", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80", isNew: false, isSpecial: true, discount: 0, desc: "Oversized traditional bridal nose ring with pearls and kundan." },
            { id: 15, name: "Diamond Solitaire Nose Pin", category: "Nose Pins", price: 18500, weight: 1.2, karat: "18K", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80", isNew: true, isSpecial: false, discount: 0, desc: "Minimalist 0.25 carat solitaire diamond nose pin in 18K gold." },

            { id: 16, name: "Ruby Emerald Choker Set", category: "Necklaces", price: 275000, weight: 52.0, karat: "22K", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80", isNew: true, isSpecial: true, discount: 8, desc: "Breathtaking 22K gold choker set encrusted with natural Burmese rubies and Colombian emeralds. Includes matching earrings." }
          ];
          
          const stmt = db.prepare("INSERT INTO items VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
          INITIAL_ITEMS.forEach(item => {
            stmt.run(item.id, item.name, item.category, item.price, item.weight, item.karat, item.image, item.isNew, item.isSpecial, item.discount, item.desc);
          });
          stmt.finalize();
          console.log("Database seeded with exactly the requested items.");
        }
      });
    });
  }
});

export default db;
