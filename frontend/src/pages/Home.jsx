import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BASE } from "../utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [size, setSize] = useState(searchParams.get("size") || "");
  const limit = 8;

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, size]);

  async function fetchProducts() {
    try {
      const qs = new URLSearchParams({ page, limit, search, category, size }).toString();
      const res = await fetch(`${BASE}/api/products?${qs}`);
      const json = await res.json();
      console.log(json); // check response
      setProducts(json.products || []);
      setTotal(json.total || 0);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  }

  function applyFilters() {
    setPage(1);
    setSearchParams({ page: 1, search, category, size });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <div style={{ marginBottom: 10 }}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <button onClick={applyFilters}>Apply</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
              <Link to={`/product/${p._id}`}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              </Link>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span style={{ margin: "0 8px" }}>Page {page} / {Math.ceil(total / limit)}</span>
        <button disabled={page >= Math.ceil(total / limit)} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> be50ace (Initial commit)
