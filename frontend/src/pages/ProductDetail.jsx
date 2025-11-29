import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE } from '../utils/api';

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

 

  useEffect(() => {
  if (!id) return;

  fetch(`${BASE}/api/products/${id}`)
    .then(r => {
      if (!r.ok) throw new Error('Product not found');
      return r.json();
    })
    .then(setProduct)
    .catch(err => {
      console.error(err);
      alert('Product not found');
    });
}, [id]);



  async function addToCart(){
    // support guest add-to-cart: use localStorage for guest
    const token = localStorage.getItem('token');
    if (token) {
      await fetch(`${BASE}/api/cart/add`, {
        method: 'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productId: id, size, qty })
      });
      navigate('/cart');
    } else {
      // guest cart in localStorage
      const cart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
      cart.push({ productId: id, name: product.name, size, qty, price: product.price, image: product.image });
      localStorage.setItem('guest_cart', JSON.stringify(cart));
      navigate('/cart');
    }
  }

  if (!product) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h2>{product.name}</h2>
      <img src={product.image} style={{width:300}}/>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <div>
        <select value={size} onChange={e=>setSize(e.target.value)}>
          <option value="">Select size</option>
          {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1"/>
      </div>
      <button disabled={!size} onClick={addToCart}>Add to cart</button>
    </div>
  );

}
