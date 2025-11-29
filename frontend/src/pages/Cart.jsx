import React, {useEffect, useState} from 'react';
import { BASE } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Cart(){
  const [cart, setCart] = useState([]);
  const [guest, setGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{ loadCart(); }, []);

  async function loadCart(){
    const token = localStorage.getItem('token');
    if (token) {
      const data = await fetch(`${BASE}/api/cart`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json());
      setCart(data);
      setGuest(false);
    } else {
      const g = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      setCart(g);
      setGuest(true);
    }
  }

  function removeItem(item){
    if (guest) {
      const newCart = cart.filter((_, idx) => idx !== item);
      localStorage.setItem('guest_cart', JSON.stringify(newCart)); setCart(newCart);
    } else {
      // server remove
      const token = localStorage.getItem('token');
      fetch(`${BASE}/api/cart/remove`, {
        method: 'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}`},
        body: JSON.stringify({ productId: cart[item].product._id, size: cart[item].size })
      }).then(()=>loadCart());
    }
  }

  const total = cart.reduce((s,i)=> s + (i.qty * (i.product ? i.product.price : i.price)), 0);

  return (
    <div style={{padding:20}}>
      <h2>Cart</h2>
      {cart.length===0 ? <p>Empty</p> : cart.map((it, idx)=>(
        <div key={idx} style={{border:'1px solid #ddd', padding:10, marginBottom:8}}>
          <div>{it.product ? it.product.name : it.name}</div>
          <div>Size: {it.size}</div>
          <div>Qty: {it.qty}</div>
          <div>Price: ₹{it.product ? it.product.price : it.price}</div>
          <button onClick={()=>removeItem(idx)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      <button onClick={()=>navigate('/checkout')}>Checkout</button>
    </div>
  );
}
