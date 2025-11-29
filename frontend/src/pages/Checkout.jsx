import React, {useState, useEffect} from 'react';
import { BASE } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const [cart, setCart] = useState([]);
  const [guestEmail, setGuestEmail] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{ loadCart(); }, []);

  function loadCart(){
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BASE}/api/cart`, { headers: { Authorization: `Bearer ${token}` }})
        .then(r=>r.json()).then(data=> setCart(data));
    } else {
      const g = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      setCart(g);
    }
  }

  async function placeOrder(){
    const token = localStorage.getItem('token');
    const items = cart.map(it => ({
      product: it.product ? it.product._id : it.productId,
      name: it.product ? it.product.name : it.name,
      size: it.size,
      qty: it.qty,
      price: it.product ? it.product.price : it.price
    }));
    const totalPrice = items.reduce((s,i)=>s + i.qty * i.price, 0);
    const body = { items, totalPrice, guestEmail, token };
    const res = await fetch(`${BASE}/api/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(body)
    }).then(r=>r.json());
    // clear guest cart
    if (!token) localStorage.removeItem('guest_cart');
    alert('Order placed. Order ID: ' + (res.order && res.order._id));
    navigate('/');
  }

  return (
    <div style={{padding:20}}>
      <h2>Checkout</h2>
      {!localStorage.getItem('token') && (
        <div>
          <p>Guest Checkout - provide email for confirmation:</p>
          <input value={guestEmail} onChange={e=>setGuestEmail(e.target.value)} placeholder="Email"/>
        </div>
      )}
      <div>
        <h3>Order summary</h3>
        {cart.map((it, idx)=>(
          <div key={idx}>{it.product ? it.product.name : it.name} - {it.size} x {it.qty} - ₹{it.product ? it.product.price : it.price}</div>
        ))}
      </div>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );

}
