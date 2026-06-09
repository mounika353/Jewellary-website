import { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io(window.location.origin);

const GOLD_PRICES = {
  IN: { name: "India", symbol: "₹", price: 15320, unit: "per gram (24K)" },
  US: { name: "USA", symbol: "$", price: 139.50, unit: "per gram (24K)" },
  GB: { name: "UK", symbol: "£", price: 104.47, unit: "per gram (24K)" },
  AE: { name: "UAE", symbol: "AED", price: 521.75, unit: "per gram (24K)" },
  SG: { name: "Singapore", symbol: "SGD", price: 179.09, unit: "per gram (24K)" },
  AU: { name: "Australia", symbol: "A$", price: 210.35, unit: "per gram (24K)" },
  CA: { name: "Canada", symbol: "C$", price: 190.25, unit: "per gram (24K)" },
};

const COUPONS = {
  GOLD10: { discount: 10, type: "percent", desc: "10% off on all items" },
  FLAT500: { discount: 500, type: "flat", desc: "₹500 flat off" },
  NEWUSER: { discount: 15, type: "percent", desc: "15% off for new users" },
};

const INITIAL_ITEMS = [
  { id: 1, name: "22K Gold Mangalsutra", category: "Necklaces", price: 48500, weight: 6.2, karat: "22K", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80", isNew: false, isSpecial: true, discount: 0, desc: "Traditional design with black beads and gold pendant" },
  { id: 2, name: "Diamond Solitaire Ring", category: "Rings", price: 125000, weight: 3.1, karat: "18K", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", isNew: true, isSpecial: false, discount: 10, desc: "0.5 carat diamond with 18K gold band, IGI certified" },
  { id: 3, name: "Antique Jhumka Earrings", category: "Earrings", price: 28900, weight: 8.4, karat: "22K", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", isNew: false, isSpecial: false, discount: 0, desc: "Handcrafted antique gold jhumkas with stone work" },
  { id: 4, name: "Gold Bangles Set (4pc)", category: "Bangles", price: 87000, weight: 22, karat: "22K", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", isNew: true, isSpecial: true, discount: 5, desc: "Plain polished gold bangles, size 2-6" },
  { id: 5, name: "Temple Jewellery Necklace", category: "Necklaces", price: 94500, weight: 28.5, karat: "22K", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&q=80", isNew: false, isSpecial: true, discount: 15, desc: "South Indian temple jewellery with deity motifs" },
  { id: 6, name: "Pearl Drop Pendant", category: "Pendants", price: 18500, weight: 2.3, karat: "18K", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&q=80", isNew: true, isSpecial: false, discount: 0, desc: "Freshwater pearl with 18K gold setting" },
];

const CATEGORIES = ["All", "Necklaces", "Rings", "Earrings", "Bangles", "Pendants", "Mangalsutras", "Bracelets", "Nose Pins"];

const JEWELLERY_VIDEOS = [
  { id: 1, title: "Gold Kundan Making Process", thumb: "/images/kundan_choker.png", video: "https://assets.mixkit.co/videos/preview/mixkit-golden-rings-with-diamonds-in-a-jewelry-box-41712-large.mp4" },
  { id: 2, title: "Traditional Bridal Jewellery", thumb: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-holding-a-necklace-39733-large.mp4" },
  { id: 3, title: "Diamond Polishing Art", thumb: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-golden-rings-with-diamonds-in-a-jewelry-box-41712-large.mp4" },
  { id: 4, title: "Temple Jewellery Showcase", thumb: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80", video: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-holding-a-necklace-39733-large.mp4" },
];

export default function JewelleryWebsite() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => {
        console.error("Error loading items, using fallback data:", err);
        setItems([
          { id: 1, name: "Gold Kundan Choker", category: "Necklaces", price: 145000, weight: 35.5, karat: "22K", image: "/images/kundan_choker.png", isNew: true, isSpecial: true, discount: 5, desc: "Exquisite heavy Kundan choker with meenakari work and pearls." },
          { id: 2, name: "Antique Vaddanam", category: "Necklaces", price: 320000, weight: 80.0, karat: "22K", image: "/images/vaddanam.png", isNew: false, isSpecial: true, discount: 10, desc: "Traditional South Indian temple belt necklace featuring Goddess Lakshmi motifs." },
          { id: 3, name: "Polki Diamond Haar", category: "Necklaces", price: 215000, weight: 45.0, karat: "18K", image: "/images/polki_haar.png", isNew: false, isSpecial: true, discount: 0, desc: "Long layering necklace set with uncut Polki diamonds." },
          { id: 4, name: "Bridal Diamond Vanki Ring", category: "Rings", price: 85000, weight: 8.2, karat: "18K", image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80", isNew: false, isSpecial: true, discount: 15, desc: "Traditional v-shaped ring studded with VVS diamonds." },
          { id: 5, name: "Heritage Gold Jhumkas", category: "Earrings", price: 65000, weight: 15.0, karat: "22K", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80", isNew: false, isSpecial: true, discount: 5, desc: "Three-tier traditional jhumka earrings." },
          { id: 6, name: "Diamond Studs", category: "Earrings", price: 45000, weight: 3.2, karat: "18K", image: "https://images.unsplash.com/photo-1633519842404-e59cf719541a?w=600&q=80", isNew: true, isSpecial: false, discount: 10, desc: "Everyday wear diamond floral studs." },
          { id: 7, name: "Antique Kada (Pair)", category: "Bangles", price: 110000, weight: 28.0, karat: "22K", image: "./images/bangles.png", isNew: true, isSpecial: true, discount: 0, desc: "Intricately carved thick gold kadas." },
          { id: 8, name: "Peacock Motif Pendant", category: "Pendants", price: 38000, weight: 8.5, karat: "22K", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80", isNew: false, isSpecial: false, discount: 0, desc: "Solid gold pendant featuring a dancing peacock." },
          { id: 9, name: "Lakshmi Kasu Pendant", category: "Pendants", price: 24000, weight: 5.0, karat: "22K", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80", isNew: true, isSpecial: false, discount: 5, desc: "Classic gold coin pendant with Lakshmi design." },
          { id: 10, name: "22K Gold Black Bead Mangalsutra", category: "Mangalsutras", price: 52000, weight: 8.5, karat: "22K", image: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600&q=80", isNew: false, isSpecial: true, discount: 5, desc: "Traditional double-string black bead mangalsutra with gold pendant." },
          { id: 11, name: "Diamond Vati Mangalsutra", category: "Mangalsutras", price: 78000, weight: 6.2, karat: "18K", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80", isNew: true, isSpecial: false, discount: 10, desc: "Modern diamond-studded vati mangalsutra with delicate chain." },
          { id: 12, name: "Navaratna Gold Bracelet", category: "Bracelets", price: 95000, weight: 18.0, karat: "22K", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", isNew: true, isSpecial: true, discount: 0, desc: "Nine precious gemstones set in handcrafted 22K gold bracelet." },
          { id: 13, name: "Diamond Tennis Bracelet", category: "Bracelets", price: 185000, weight: 12.5, karat: "18K", image: "https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&q=80", isNew: false, isSpecial: false, discount: 8, desc: "Elegant 18K white gold bracelet with 3 carats of round brilliant diamonds." },
          { id: 14, name: "Traditional Maharashtrian Nath", category: "Nose Pins", price: 32000, weight: 4.8, karat: "22K", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80", isNew: false, isSpecial: true, discount: 0, desc: "Oversized traditional bridal nose ring with pearls and kundan." },
          { id: 15, name: "Diamond Solitaire Nose Pin", category: "Nose Pins", price: 18500, weight: 1.2, karat: "18K", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80", isNew: true, isSpecial: false, discount: 0, desc: "Minimalist 0.25 carat solitaire diamond nose pin in 18K gold." },
          { id: 16, name: "Ruby Emerald Choker Set", category: "Necklaces", price: 275000, weight: 52.0, karat: "22K", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80", isNew: true, isSpecial: true, discount: 8, desc: "Breathtaking 22K gold choker set encrusted with natural Burmese rubies and Colombian emeralds. Includes matching earrings." }
        ]);
      });

    socket.on('new_item', (item) => {
      setItems(prev => [...prev, item]);
    });
    
    socket.on('new_order', (data) => {
      console.log('Live Notification: Someone just bought something:', data);
    });

    return () => {
      socket.off('new_item');
      socket.off('new_order');
    };
  }, []);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCat, setFilterCat] = useState("All");
  const [filterSpecial, setFilterSpecial] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [showAddForm, setShowAddForm] = useState(false);
  const [billingDetails, setBillingDetails] = useState({ name: "", email: "", address: "", payment: "cod" });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [addMsg, setAddMsg] = useState("");
  const [newItem, setNewItem] = useState({
    name: "", category: "Rings", price: "", weight: "", karat: "22K",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", isNew: true, isSpecial: false, discount: 0, desc: ""
  });
  const [lastUpdated] = useState(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [adminAppointments, setAdminAppointments] = useState([]);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookData, setBookData] = useState({ name: "", phone: "", visit_date: "", visit_time: "" });
  const [bookMsg, setBookMsg] = useState("");
  
  const handleBookVisit = async () => {
    if (!bookData.name || !bookData.phone || !bookData.visit_date || !bookData.visit_time) {
      setBookMsg("Please fill all fields.");
      return;
    }
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (res.ok) {
        setBookMsg("✓ Appointment Scheduled Successfully!");
        setBookData({ name: "", phone: "", visit_date: "", visit_time: "" });
        setTimeout(() => { setBookMsg(""); setShowBookModal(false); }, 2500);
      } else {
        setBookMsg("Error scheduling appointment.");
      }
    } catch (err) {
      setBookMsg("Server error.");
    }
  };

  const gold = GOLD_PRICES[selectedCountry];
  const filtered = items.filter(i => (filterCat === "All" || i.category === filterCat) && (!filterSpecial || i.isSpecial));

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));

  const cartSubtotal = cart.reduce((s, c) => s + (c.price * (1 - c.discount / 100)) * c.qty, 0);

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    const c = COUPONS[appliedCoupon];
    if (c.type === "percent") return cartSubtotal * c.discount / 100;
    return Math.min(c.discount, cartSubtotal);
  };

  const cartTotal = cartSubtotal - getDiscount();

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponMsg(`✓ "${code}" applied — ${COUPONS[code].desc}`);
    } else {
      setCouponMsg("✗ Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.weight) {
      setAddMsg("Please fill in all required fields.");
      return;
    }
    
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price),
          weight: parseFloat(newItem.weight),
          discount: parseInt(newItem.discount) || 0
        })
      });
      if (response.ok) {
        setNewItem({ name: "", category: "Rings", price: "", weight: "", karat: "22K", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", isNew: true, isSpecial: false, discount: 0, desc: "" });
        setAddMsg("✓ Item added successfully!");
        setTimeout(() => { setAddMsg(""); setShowAddForm(false); }, 2000);
      } else {
        setAddMsg("Failed to add item.");
      }
    } catch (err) {
      setAddMsg("Error connecting to server.");
    }
  };

  const styles = {
    root: { fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", width: "100%", background: "linear-gradient(135deg, #fdf8f0 0%, #fef9ec 100%)", color: "#2c1a0e", margin: "0 auto" },
    header: { background: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #1a0a00 100%)", color: "#f5e6c8", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px", boxShadow: "0 2px 20px rgba(0,0,0,0.4)", position: "sticky", top: 0, zIndex: 100, width: "100%" },
    logo: { fontSize: "22px", fontWeight: "700", letterSpacing: "2px", color: "#d4af37", cursor: "pointer", textTransform: "uppercase" },
    nav: { display: "flex", gap: "8px", alignItems: "center" },
    navBtn: (active) => ({ background: active ? "rgba(212,175,55,0.2)" : "transparent", border: active ? "1px solid #d4af37" : "1px solid transparent", color: active ? "#d4af37" : "#f5e6c8", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", letterSpacing: "0.5px", transition: "all 0.2s" }),
    cartBtn: { background: "#d4af37", color: "#4A0E0E", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" },
    hero: { background: "#2c1a0e", color: "#f5e6c8", padding: "80px 32px", textAlign: "center", position: "relative", overflow: "hidden" },
    heroTitle: { fontSize: "56px", fontWeight: "400", letterSpacing: "4px", color: "#d4af37", margin: "0 0 16px", textTransform: "uppercase", fontFamily: "'Playfair Display', serif" },
    heroSub: { fontSize: "16px", letterSpacing: "3px", color: "#c9a96e", margin: "0 0 32px" },
    section: { padding: "32px", maxWidth: "1200px", margin: "0 auto" },
    sectionTitle: { fontSize: "22px", fontWeight: "400", letterSpacing: "3px", color: "#5c3317", textTransform: "uppercase", margin: "0 0 24px", paddingBottom: "12px", borderBottom: "2px solid #d4af37", display: "flex", alignItems: "center", justifyContent: "space-between" },
    goldGrid: { display: "flex", flexWrap: "nowrap", gap: "10px", marginBottom: "32px" },
    goldCard: (active) => ({ flex: "1 1 0", background: active ? "linear-gradient(135deg, #5c3317, #3d1a00)" : "white", border: `2px solid ${active ? "#d4af37" : "#e8d5b0"}`, borderRadius: "12px", padding: "14px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", boxShadow: active ? "0 4px 20px rgba(212,175,55,0.3)" : "0 2px 8px rgba(0,0,0,0.06)" }),
    goldCountry: (active) => ({ fontSize: "13px", fontWeight: "600", color: active ? "#d4af37" : "#5c3317", letterSpacing: "1px" }),
    goldPrice: (active) => ({ fontSize: "20px", fontWeight: "700", color: active ? "#f5e6c8" : "#2c1a0e", margin: "8px 0 4px" }),
    goldUnit: (active) => ({ fontSize: "11px", color: active ? "#c9a96e" : "#888", letterSpacing: "0.5px" }),
    filterRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px", alignItems: "center" },
    filterBtn: (active) => ({ background: active ? "#d4af37" : "white", color: active ? "#1a0a00" : "#5c3317", border: `1px solid ${active ? "#d4af37" : "#ddc898"}`, padding: "7px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: "500", letterSpacing: "0.5px", transition: "all 0.2s" }),
    specialToggle: (active) => ({ background: active ? "#5c3317" : "white", color: active ? "#d4af37" : "#5c3317", border: `1px solid ${active ? "#5c3317" : "#ddc898"}`, padding: "7px 14px", borderRadius: "20px", cursor: "pointer", fontSize: "12px", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px" }),
    itemGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" },
    card: { background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(92,51,23,0.08)", border: "1px solid #f0e4c8", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" },
    cardImg: { background: "linear-gradient(135deg, #fdf5e4, #fef0cc)", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "64px", position: "relative" },
    cardBody: { padding: "16px" },
    cardName: { fontSize: "15px", fontWeight: "600", color: "#2c1a0e", margin: "0 0 4px" },
    cardCat: { fontSize: "11px", color: "#c9a96e", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 10px" },
    cardPrice: { fontSize: "18px", fontWeight: "700", color: "#5c3317" },
    cardOriginal: { fontSize: "13px", color: "#aaa", textDecoration: "line-through", marginLeft: "8px" },
    addBtn: { width: "100%", background: "linear-gradient(135deg, #5c3317, #3d1a00)", color: "#d4af37", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", letterSpacing: "1px", marginTop: "12px", transition: "opacity 0.2s" },
    badge: (type) => ({ position: "absolute", top: "10px", left: type === "new" ? "10px" : "auto", right: type === "special" ? "10px" : "auto", background: type === "new" ? "#d4af37" : "#5c3317", color: type === "new" ? "#1a0a00" : "#d4af37", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "4px", letterSpacing: "1px", textTransform: "uppercase" }),
    discBadge: { position: "absolute", top: "10px", right: "10px", background: "#e74c3c", color: "white", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "4px" },
    couponBox: { background: "white", borderRadius: "16px", border: "1px solid #e8d5b0", padding: "24px", marginBottom: "24px" },
    couponRow: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" },
    input: { border: "1px solid #ddc898", borderRadius: "8px", padding: "10px 14px", fontSize: "14px", outline: "none", minWidth: "200px", fontFamily: "inherit" },
    applyBtn: { background: "#5c3317", color: "#d4af37", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", letterSpacing: "0.5px" },
    cartCard: { background: "white", borderRadius: "12px", border: "1px solid #e8d5b0", padding: "20px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px" },
    cartEmoji: { fontSize: "40px", width: "56px", textAlign: "center" },
    cartInfo: { flex: 1 },
    removeBtn: { background: "none", border: "1px solid #e0c4c4", color: "#c0392b", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" },
    summaryBox: { background: "linear-gradient(135deg, #fdf5e4, #fef9ec)", border: "2px solid #d4af37", borderRadius: "16px", padding: "24px" },
    totalRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "14px", color: "#5c3317" },
    grandTotal: { display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: "20px", fontWeight: "700", color: "#2c1a0e", borderTop: "2px solid #d4af37", marginTop: "8px" },
    checkoutBtn: { width: "100%", background: "linear-gradient(135deg, #d4af37, #b8962e)", color: "#1a0a00", border: "none", padding: "14px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", fontWeight: "700", letterSpacing: "1px", marginTop: "16px" },
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "20px" },
    modalBox: { background: "white", borderRadius: "20px", padding: "32px", maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
    formLabel: { fontSize: "12px", fontWeight: "600", color: "#5c3317", letterSpacing: "0.5px", marginBottom: "4px", display: "block" },
    formInput: { width: "100%", border: "1px solid #ddc898", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
    formSelect: { width: "100%", border: "1px solid #ddc898", borderRadius: "8px", padding: "9px 12px", fontSize: "14px", fontFamily: "inherit", outline: "none", background: "white", boxSizing: "border-box" },
    saveBtn: { background: "linear-gradient(135deg, #5c3317, #3d1a00)", color: "#d4af37", border: "none", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "700", letterSpacing: "1px", marginTop: "16px" },
    cancelBtn: { background: "white", color: "#5c3317", border: "1px solid #ddc898", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "14px", marginTop: "16px", marginLeft: "10px" },
    tag: (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", background: color === "gold" ? "#fef5d4" : color === "green" ? "#e8f5e9" : "#fce4ec", color: color === "gold" ? "#7d5a00" : color === "green" ? "#2e7d32" : "#c62828", marginRight: "4px" }),
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => setView("home")}>⚜ Reddy's Jewellery</div>
        <nav style={styles.nav}>
          {["home", "shop", "gold prices", "cart", "admin"].map(v => (
            <button key={v} style={styles.navBtn(view === v || (v === "shop" && view === "shop"))} onClick={() => {
              if(v === "admin") {
                fetch('/api/appointments').then(r=>r.json()).then(setAdminAppointments);
              }
              setView(v === "gold prices" ? "gold" : v);
            }}>
              {v.toUpperCase()}
            </button>
          ))}
          <button style={{...styles.navBtn(false), background: "linear-gradient(135deg, #d4af37, #b8962e)", color: "#1a0a00", border: "none", fontWeight: "700", padding: "8px 16px"}} onClick={() => setShowBookModal(true)}>
            ✦ BOOK VISIT
          </button>
          <button style={styles.cartBtn} onClick={() => setView("cart")}>
            🛍 {cartCount > 0 ? `(${cartCount})` : "Cart"}
          </button>
        </nav>
      </header>

      {/* HOME */}
      {view === "home" && (
        <>
          <div style={{ ...styles.hero, padding: 0, height: "85vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/images/hero_bg.png" alt="Reddy's Jewellery Background" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.65 }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", background: "radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)" }}>
              <div style={{ fontSize: "50px", marginBottom: "16px", color: "#d4af37", textShadow: "0 4px 10px rgba(0,0,0,0.8)" }}>⚜</div>
              <h1 style={{ ...styles.heroTitle, textShadow: "0 4px 10px rgba(0,0,0,0.8)" }}>Reddy's Jewellery</h1>
              <p style={{ ...styles.heroSub, textShadow: "0 4px 10px rgba(0,0,0,0.8)", fontWeight: "600", color: "#fff" }}>CRAFTING TRADITION SINCE 1952</p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
                <button style={{ background: "#d4af37", color: "#4A0E0E", border: "none", padding: "16px 36px", borderRadius: "4px", cursor: "pointer", fontSize: "15px", fontWeight: "700", letterSpacing: "2px", boxShadow: "0 4px 20px rgba(0,0,0,0.6)" }} onClick={() => setView("shop")}>EXPLORE TRADITION</button>
              </div>
            </div>
          </div>

          <div style={{ background: "#1a0a00", borderBottom: "1px solid #3d1a00" }}>
            <div style={{ display: "flex", gap: "32px", justifyContent: "center", padding: "24px 32px", flexWrap: "wrap", maxWidth: "1200px", margin: "0 auto" }}>
              {["100% BIS Hallmarked", "Free Insured Shipping", "Lifetime Exchange", "Traditional Craftsmanship"].map(f => (
                <div key={f} style={{ textAlign: "center", color: "#d4af37" }}>
                  <div style={{ fontSize: "20px", marginBottom: "4px" }}>✦</div>
                  <div style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "600" }}>{f}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Promotional Ads Section */}
          <div style={{ ...styles.section, marginTop: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              <div style={{ position: "relative", height: "240px", borderRadius: "16px", overflow: "hidden", cursor: "pointer" }} onClick={() => setView("shop")}>
                <img src="/images/bridal_banner.png" alt="Bridal Collection" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(74,14,14,0.9), transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: "24px", fontFamily: "'Playfair Display', serif" }}>Bridal Season</h3>
                  <p style={{ color: "white", margin: 0, fontSize: "14px" }}>Explore our handcrafted bridal sets →</p>
                </div>
              </div>
              <div style={{ position: "relative", height: "240px", borderRadius: "16px", overflow: "hidden", cursor: "pointer" }} onClick={() => setView("shop")}>
                <img src="/images/temple_banner.png" alt="Temple Jewellery" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(74,14,14,0.9), transparent)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
                  <h3 style={{ color: "#d4af37", margin: "0 0 8px", fontSize: "24px", fontFamily: "'Playfair Display', serif" }}>Temple Collection</h3>
                  <p style={{ color: "white", margin: 0, fontSize: "14px" }}>Divine antique craftsmanship →</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coupons Banner */}
          <div style={{ background: "linear-gradient(135deg, #5c3317, #2c1a0e)", color: "#f5e6c8", padding: "20px 32px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", letterSpacing: "2px", marginBottom: "12px", color: "#d4af37" }}>✦ ACTIVE OFFERS</div>
            <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
              {Object.entries(COUPONS).map(([code, data]) => (
                <div key={code} style={{ background: "rgba(212,175,55,0.15)", border: "1px dashed #d4af37", borderRadius: "10px", padding: "10px 20px", display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", color: "#d4af37", fontSize: "14px", letterSpacing: "1px" }}>{code}</span>
                  <span style={{ color: "#c9a96e", fontSize: "12px" }}>{data.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Items */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>Special Collection</span>
              <button style={{ background: "none", border: "none", color: "#d4af37", cursor: "pointer", fontSize: "13px", letterSpacing: "1px" }} onClick={() => setView("shop")}>View All →</button>
            </div>
            <div style={styles.itemGrid}>
              {items.filter(i => i.isSpecial).slice(0, 4).map(item => (
                <ItemCard key={item.id} item={item} styles={styles} onAdd={addToCart} onClick={() => { setSelectedItem(item); }} />
              ))}
            </div>
          </div>

          {/* Featured Videos */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span>Featured Videos</span>
              <span style={{ fontSize: "12px", color: "#888", fontWeight: "400", letterSpacing: "1px" }}>Click to play</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {JEWELLERY_VIDEOS.map(v => (
                <div key={v.id} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 16px rgba(92,51,23,0.12)", border: "1px solid #e8d5b0", transition: "transform 0.2s" }} onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(v.title)}`, '_blank')}>
                  <img src={v.thumb} alt={v.title} style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(212,175,55,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                      <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: "20px solid #1a0a00", marginLeft: "4px" }} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: "12px", left: "16px", right: "16px" }}>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: "600", textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>{v.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Gold Price */}
          <div style={{ ...styles.section, background: "linear-gradient(135deg, #fdf5e4, white)", borderRadius: "20px", margin: "0 32px 32px", border: "1px solid #e8d5b0" }}>
            <div style={styles.sectionTitle}><span>Today's Gold Rate</span><span style={{ fontSize: "12px", color: "#888", fontWeight: "400", letterSpacing: "1px" }}>Updated: {lastUpdated} IST</span></div>
            <div style={styles.goldGrid}>
              {Object.entries(GOLD_PRICES).map(([key, g]) => (
                <div key={key} style={styles.goldCard(key === selectedCountry)} onClick={() => setSelectedCountry(key)}>
                  <div style={styles.goldCountry(key === selectedCountry)}>{g.name}</div>
                  <div style={styles.goldPrice(key === selectedCountry)}>{g.symbol} {g.price.toLocaleString()}</div>
                  <div style={styles.goldUnit(key === selectedCountry)}>{g.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* SHOP */}
      {view === "shop" && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <span>Our Collection</span>
            <button style={{ background: "#5c3317", color: "#d4af37", border: "none", padding: "9px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "600", letterSpacing: "1px" }} onClick={() => setShowAddForm(true)}>+ ADD NEW ITEM</button>
          </div>
          <div style={styles.filterRow}>
            {CATEGORIES.map(c => <button key={c} style={styles.filterBtn(filterCat === c)} onClick={() => setFilterCat(c)}>{c}</button>)}
            <button style={styles.specialToggle(filterSpecial)} onClick={() => setFilterSpecial(v => !v)}>⭐ Special Only</button>
          </div>
          {filtered.length === 0 ? <div style={{ textAlign: "center", padding: "60px", color: "#aaa", fontSize: "18px" }}>No items found</div> : (
            <div style={styles.itemGrid}>
              {filtered.map(item => (
                <ItemCard key={item.id} item={item} styles={styles} onAdd={addToCart} onClick={() => setSelectedItem(item)} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* GOLD PRICES */}
      {view === "gold" && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}><span>Live Gold Prices</span><span style={{ fontSize: "12px", color: "#888", fontWeight: "400" }}>✧ {lastUpdated} IST</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {Object.entries(GOLD_PRICES).map(([key, g]) => (
              <div key={key} style={{ background: "white", borderRadius: "16px", border: "2px solid #e8d5b0", padding: "24px", boxShadow: "0 4px 16px rgba(92,51,23,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#5c3317", letterSpacing: "1px" }}>{g.name}</div>
                    <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>{g.unit}</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, #5c3317, #3d1a00)", color: "#d4af37", borderRadius: "10px", padding: "8px 16px", textAlign: "right" }}>
                    <div style={{ fontSize: "22px", fontWeight: "700" }}>{g.symbol} {g.price.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {["22K", "18K", "14K"].map(k => {
                    const mult = k === "22K" ? 22/24 : k === "18K" ? 18/24 : 14/24;
                    return (
                      <div key={k} style={{ background: "#fdf5e4", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                        <div style={{ fontSize: "12px", color: "#888" }}>{k} Gold</div>
                        <div style={{ fontSize: "16px", fontWeight: "700", color: "#2c1a0e", marginTop: "4px" }}>{g.symbol} {(g.price * mult).toFixed(1)}</div>
                      </div>
                    );
                  })}
                  <div style={{ background: "#fdf5e4", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", color: "#888" }}>Silver</div>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: "#2c1a0e", marginTop: "4px" }}>{g.symbol} {(g.price * 0.013).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "24px", background: "#fff8e7", border: "1px solid #e8d5b0", borderRadius: "12px", padding: "16px 20px", fontSize: "13px", color: "#7d5a00" }}>
            ✧ Prices shown are indicative. Actual making charges, GST (3%), and hallmarking fees apply. Contact store for exact billing.
          </div>
        </div>
      )}

      {/* CART */}
      {view === "cart" && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}><span>Shopping Cart</span></div>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🛍</div>
              <p style={{ color: "#aaa", fontSize: "18px" }}>Your cart is empty</p>
              <button style={{ background: "#d4af37", color: "#1a0a00", border: "none", padding: "12px 28px", borderRadius: "8px", cursor: "pointer", marginTop: "16px", fontSize: "14px", fontWeight: "700" }} onClick={() => setView("shop")}>Shop Now</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px" }}>
              <div>
                {cart.map(item => {
                  const disc = item.price * (1 - item.discount / 100);
                  return (
                    <div key={item.id} style={styles.cartCard}>
                      <div style={styles.cartEmoji}><img src={item.image} alt={item.name} style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px" }} /></div>
                      <div style={styles.cartInfo}>
                        <div style={{ fontWeight: "600", fontSize: "15px", color: "#2c1a0e" }}>{item.name}</div>
                        <div style={{ fontSize: "12px", color: "#888", margin: "4px 0" }}>{item.category} · {item.karat} · {item.weight}g</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: "700", fontSize: "16px", color: "#5c3317" }}>₹{disc.toLocaleString()}</span>
                          {item.discount > 0 && <span style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>₹{item.price.toLocaleString()}</span>}
                          {item.discount > 0 && <span style={{ fontSize: "11px", background: "#fce4ec", color: "#c62828", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>{item.discount}% OFF</span>}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                        <span style={{ fontWeight: "700", fontSize: "16px" }}>Qty: {item.qty}</span>
                        <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </div>
                  );
                })}

                {/* Coupon */}
                <div style={styles.couponBox}>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#5c3317", marginBottom: "12px", letterSpacing: "1px" }}>❖ APPLY COUPON</div>
                  <div style={styles.couponRow}>
                    <input style={styles.input} placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
                    <button style={styles.applyBtn} onClick={applyCoupon}>Apply</button>
                  </div>
                  {couponMsg && <div style={{ marginTop: "10px", fontSize: "13px", color: appliedCoupon ? "#2e7d32" : "#c62828", fontWeight: "500" }}>{couponMsg}</div>}
                  <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {Object.entries(COUPONS).map(([code]) => (
                      <span key={code} style={{ background: "#fdf5e4", border: "1px dashed #d4af37", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", color: "#7d5a00", cursor: "pointer", fontWeight: "600" }} onClick={() => setCouponCode(code)}>{code}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div style={styles.summaryBox}>
                  <div style={{ fontWeight: "600", fontSize: "16px", color: "#5c3317", marginBottom: "16px", letterSpacing: "1px" }}>ORDER SUMMARY</div>
                  <div style={styles.totalRow}><span>Subtotal ({cartCount} items)</span><span>₹{cartSubtotal.toLocaleString()}</span></div>
                  {appliedCoupon && <div style={{ ...styles.totalRow, color: "#2e7d32" }}><span>Coupon ({appliedCoupon})</span><span>-₹{getDiscount().toLocaleString()}</span></div>}
                  <div style={styles.totalRow}><span>Making Charges</span><span style={{ color: "#888" }}>At billing</span></div>
                  <div style={styles.totalRow}><span>GST (3%)</span><span>₹{(cartTotal * 0.03).toLocaleString()}</span></div>
                  <div style={styles.totalRow}><span>Shipping</span><span style={{ color: "#2e7d32" }}>FREE</span></div>
                  <div style={styles.grandTotal}><span>Total</span><span>₹{(cartTotal + cartTotal * 0.03).toLocaleString()}</span></div>
                  <button style={styles.checkoutBtn} onClick={() => setView("checkout")}>✦ PROCEED TO CHECKOUT</button>
                  <div style={{ marginTop: "16px", fontSize: "12px", color: "#888", textAlign: "center" }}>🔒 Safe & Secure Payments · BIS Certified</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADMIN */}
      {view === "admin" && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}><span>Admin Dashboard: Store Visits</span></div>
          {adminAppointments.length === 0 ? <p style={{color: '#888'}}>No appointments scheduled yet.</p> : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
              {adminAppointments.map(a => (
                <div key={a.id} style={{background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e8d5b0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h3 style={{margin: '0 0 8px', color: '#2c1a0e'}}>{a.name}</h3>
                    <p style={{margin: 0, fontSize: '14px', color: '#5c3317'}}>☏ {a.phone}</p>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div style={{background: '#fdf5e4', padding: '8px 12px', borderRadius: '8px', display: 'inline-block'}}>
                      <div style={{fontSize: '12px', color: '#888'}}>Date & Time</div>
                      <div style={{fontWeight: '700', color: '#d4af37'}}>{a.visit_date} at {a.visit_time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CHECKOUT / BILLING */}
      {view === "checkout" && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}><span>Billing Details</span></div>
          {orderSuccess ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px", color: "#2e7d32" }}>✓</div>
              <h2 style={{ color: "#2c1a0e" }}>Order Placed Successfully!</h2>
              <p style={{ color: "#888", fontSize: "16px", marginTop: "8px" }}>Thank you for shopping with Reddy's Jewellery.</p>
              <button style={{ ...styles.checkoutBtn, width: "auto", padding: "12px 32px", marginTop: "24px" }} onClick={() => { setOrderSuccess(false); setView("home"); }}>Back to Home</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px" }}>
              <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e8d5b0" }}>
                <h3 style={{ fontSize: "16px", color: "#5c3317", marginBottom: "16px" }}>Shipping Information</h3>
                <div style={{ display: "grid", gap: "16px" }}>
                  <div>
                    <label style={styles.formLabel}>Full Name *</label>
                    <input style={styles.formInput} placeholder="Enter your name" value={billingDetails.name} onChange={e => setBillingDetails({ ...billingDetails, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={styles.formLabel}>Email Address</label>
                    <input style={styles.formInput} placeholder="Enter your email" type="email" value={billingDetails.email} onChange={e => setBillingDetails({ ...billingDetails, email: e.target.value })} />
                  </div>
                  <div>
                    <label style={styles.formLabel}>Delivery Address *</label>
                    <textarea style={{ ...styles.formInput, minHeight: "80px", resize: "vertical" }} placeholder="Enter complete address" value={billingDetails.address} onChange={e => setBillingDetails({ ...billingDetails, address: e.target.value })} />
                  </div>
                  <div>
                    <label style={styles.formLabel}>Payment Method</label>
                    <select style={styles.formSelect} value={billingDetails.payment} onChange={e => setBillingDetails({ ...billingDetails, payment: e.target.value })}>
                      <option value="cod">Cash on Delivery (COD)</option>
                      <option value="card">Credit / Debit Card</option>
                      <option value="upi">UPI / Net Banking</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div style={styles.summaryBox}>
                  <div style={{ fontWeight: "600", fontSize: "16px", color: "#5c3317", marginBottom: "16px" }}>PAYMENT SUMMARY</div>
                  <div style={styles.totalRow}><span>Subtotal</span><span>₹{cartSubtotal.toLocaleString()}</span></div>
                  {appliedCoupon && <div style={{ ...styles.totalRow, color: "#2e7d32" }}><span>Discount</span><span>-₹{getDiscount().toLocaleString()}</span></div>}
                  <div style={styles.totalRow}><span>GST (3%)</span><span>₹{(cartTotal * 0.03).toLocaleString()}</span></div>
                  <div style={styles.grandTotal}><span>Amount Payable</span><span>₹{(cartTotal + cartTotal * 0.03).toLocaleString()}</span></div>
                  <button style={styles.checkoutBtn} onClick={async () => {
                    if(!billingDetails.name || !billingDetails.address) return alert("Please fill your Name and Address to continue");
                    try {
                      const res = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          ...billingDetails,
                          total: cartTotal + cartTotal * 0.03,
                          items: cart
                        })
                      });
                      if(res.ok) {
                        setCart([]);
                        setAppliedCoupon(null);
                        setCouponCode("");
                        setOrderSuccess(true);
                      } else {
                        alert("Failed to place order.");
                      }
                    } catch (err) {
                      alert("Error connecting to server.");
                    }
                  }}>✦ PLACE ORDER</button>
                  <button style={{ ...styles.cancelBtn, width: "100%", margin: "12px 0 0", marginLeft: 0 }} onClick={() => setView("cart")}>Back to Cart</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div style={styles.modal} onClick={() => setSelectedItem(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}><img src={selectedItem.image} alt={selectedItem.name} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }} /></div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
              {selectedItem.isNew && <span style={styles.tag("gold")}>NEW ARRIVAL</span>}
              {selectedItem.isSpecial && <span style={styles.tag("green")}>SPECIAL</span>}
              {selectedItem.discount > 0 && <span style={styles.tag("red")}>{selectedItem.discount}% OFF</span>}
            </div>
            <h2 style={{ fontSize: "22px", color: "#2c1a0e", margin: "0 0 8px" }}>{selectedItem.name}</h2>
            <p style={{ color: "#888", fontSize: "13px", letterSpacing: "1px", margin: "0 0 16px" }}>{selectedItem.category} · {selectedItem.karat} · {selectedItem.weight}g</p>
            <p style={{ color: "#5c3317", lineHeight: "1.6", marginBottom: "20px" }}>{selectedItem.desc}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "24px" }}>
              <span style={{ fontSize: "28px", fontWeight: "700", color: "#5c3317" }}>₹{(selectedItem.price * (1 - selectedItem.discount / 100)).toLocaleString()}</span>
              {selectedItem.discount > 0 && <span style={{ fontSize: "16px", color: "#aaa", textDecoration: "line-through" }}>₹{selectedItem.price.toLocaleString()}</span>}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ flex: 1, ...styles.addBtn, marginTop: 0 }} onClick={() => { addToCart(selectedItem); setSelectedItem(null); }}>Add to Cart</button>
              <button style={{ background: "white", border: "1px solid #ddc898", color: "#5c3317", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }} onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddForm && (
        <div style={styles.modal} onClick={() => setShowAddForm(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: "20px", color: "#5c3317", margin: "0 0 24px", letterSpacing: "2px", textTransform: "uppercase" }}>✦ Add New Item</h2>
            <div style={styles.formGrid}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={styles.formLabel}>Item Name *</label>
                <input style={styles.formInput} placeholder="e.g. Diamond Choker Necklace" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label style={styles.formLabel}>Category *</label>
                <select style={styles.formSelect} value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={styles.formLabel}>Karat</label>
                <select style={styles.formSelect} value={newItem.karat} onChange={e => setNewItem(p => ({ ...p, karat: e.target.value }))}>
                  {["24K", "22K", "18K", "14K"].map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label style={styles.formLabel}>Price (₹) *</label>
                <input style={styles.formInput} type="number" placeholder="e.g. 45000" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))} />
              </div>
              <div>
                <label style={styles.formLabel}>Weight (grams) *</label>
                <input style={styles.formInput} type="number" placeholder="e.g. 8.5" value={newItem.weight} onChange={e => setNewItem(p => ({ ...p, weight: e.target.value }))} />
              </div>
              <div>
                <label style={styles.formLabel}>Discount (%)</label>
                <input style={styles.formInput} type="number" min="0" max="80" placeholder="e.g. 10" value={newItem.discount} onChange={e => setNewItem(p => ({ ...p, discount: e.target.value }))} />
              </div>
              <div>
                <label style={styles.formLabel}>Image URL</label>
                <input style={styles.formInput} placeholder="https://..." value={newItem.image} onChange={e => setNewItem(p => ({ ...p, image: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={styles.formLabel}>Description</label>
                <textarea style={{ ...styles.formInput, minHeight: "72px", resize: "vertical" }} placeholder="Brief description of the item..." value={newItem.desc} onChange={e => setNewItem(p => ({ ...p, desc: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" }}>
                  <input type="checkbox" checked={newItem.isNew} onChange={e => setNewItem(p => ({ ...p, isNew: e.target.checked }))} /> Mark as New
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px" }}>
                  <input type="checkbox" checked={newItem.isSpecial} onChange={e => setNewItem(p => ({ ...p, isSpecial: e.target.checked }))} /> Mark as Special
                </label>
              </div>
            </div>
            {addMsg && <div style={{ marginTop: "12px", fontSize: "13px", color: addMsg.startsWith("✓") ? "#2e7d32" : "#c62828", fontWeight: "600" }}>{addMsg}</div>}
            <div>
              <button style={styles.saveBtn} onClick={handleAddItem}>Save Item</button>
              <button style={styles.cancelBtn} onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div style={styles.modal} onClick={() => setSelectedVideo(null)}>
          <div style={{ ...styles.modalBox, maxWidth: "800px", background: "#000", padding: "0", borderRadius: "16px", overflow: "hidden" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "linear-gradient(135deg, #1a0a00, #3d1a00)" }}>
              <h3 style={{ margin: 0, color: "#d4af37", fontSize: "16px", fontFamily: "'Playfair Display', serif", letterSpacing: "1px" }}>{selectedVideo.title}</h3>
              <button style={{ background: "rgba(212,175,55,0.2)", border: "1px solid #d4af37", color: "#d4af37", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setSelectedVideo(null)}>✕</button>
            </div>
            <video autoPlay controls style={{ width: "100%", display: "block", maxHeight: "70vh" }}>
              <source src={selectedVideo.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{ padding: "12px 20px", background: "#1a0a00", textAlign: "center" }}>
              <span style={{ color: "#c9a96e", fontSize: "12px", letterSpacing: "1px" }}>⚜ REDDY'S JEWELLERY — Crafting Tradition Since 1952</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#210A0A", color: "#c9a96e", padding: "40px 32px", textAlign: "center", marginTop: "40px", borderTop: "4px solid #d4af37" }}>
        <div style={{ fontSize: "24px", color: "#d4af37", marginBottom: "8px", fontFamily: "'Playfair Display', serif" }}>⚜ REDDY'S JEWELLERY</div>
        <div style={{ fontSize: "12px", letterSpacing: "2px", marginBottom: "20px" }}>TRUSTED SINCE 1952 · BIS CERTIFIED · GST REGISTERED</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", fontSize: "13px" }}>
          <span>☏ +91 98765 43210</span>
          <span>✉ care@reddysjewellery.in</span>
          <span>⚲ Hyderabad · Chennai · Bengaluru</span>
        </div>
      </footer>

      {/* Book Visit Modal */}
      {showBookModal && (
        <div style={styles.modal} onClick={() => setShowBookModal(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: "#5c3317", marginTop: 0, marginBottom: "20px", fontFamily: "'Playfair Display', serif", borderBottom: "2px solid #d4af37", paddingBottom: "10px" }}>✦ Schedule Store Visit</h2>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.formLabel}>Full Name</label>
                <input style={styles.formInput} placeholder="Your name" value={bookData.name} onChange={e => setBookData({...bookData, name: e.target.value})} />
              </div>
              <div>
                <label style={styles.formLabel}>Phone Number</label>
                <input style={styles.formInput} placeholder="Your phone number" type="tel" value={bookData.phone} onChange={e => setBookData({...bookData, phone: e.target.value})} />
              </div>
              <div>
                <label style={styles.formLabel}>Visit Date</label>
                <input style={styles.formInput} type="date" value={bookData.visit_date} onChange={e => setBookData({...bookData, visit_date: e.target.value})} />
              </div>
              <div>
                <label style={styles.formLabel}>Visit Time</label>
                <input style={styles.formInput} type="time" value={bookData.visit_time} onChange={e => setBookData({...bookData, visit_time: e.target.value})} />
              </div>
            </div>
            {bookMsg && <div style={{ marginTop: "16px", color: bookMsg.startsWith("✓") ? "#2e7d32" : "#c62828", fontWeight: "600", fontSize: "14px", textAlign: "center" }}>{bookMsg}</div>}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
              <button style={styles.cancelBtn} onClick={() => setShowBookModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={handleBookVisit}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function ItemCard({ item, styles, onAdd, onClick }) {
  const discountedPrice = item.price * (1 - item.discount / 100);
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.cardImg}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {item.isNew && <span style={styles.badge("new")}>NEW</span>}
        {item.isSpecial && !item.isNew && <span style={styles.badge("special")}>★ SPECIAL</span>}
        {item.discount > 0 && <span style={styles.discBadge}>{item.discount}% OFF</span>}
      </div>
      <div style={styles.cardBody}>
        <p style={styles.cardName}>{item.name}</p>
        <p style={styles.cardCat}>{item.category} · {item.karat} · {item.weight}g</p>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={styles.cardPrice}>₹{discountedPrice.toLocaleString()}</span>
          {item.discount > 0 && <span style={styles.cardOriginal}>₹{item.price.toLocaleString()}</span>}
        </div>
        <button style={styles.addBtn} onClick={e => { e.stopPropagation(); onAdd(item); }}>Add to Cart</button>
      </div>
    </div>
  );
}
