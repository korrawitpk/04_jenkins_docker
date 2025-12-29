'use client'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', detail: '', coverimage: '' });

  const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

  const getAttractions = async () => {
    try {
      const res = await fetch(`${apiHost}/attractions`);
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getAttractions(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiHost}/attractions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("บันทึกสำเร็จ!");
        setFormData({ name: '', detail: '', coverimage: '' });
        getAttractions();
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Final Project: My Attractions</h1>
        <p className="subtitle">6609119 - DIT312 CI/CD with Jenkins & Docker</p>
      </header>

      {/* ฟอร์มเพิ่มข้อมูล (เพิ่มสไตล์ให้เข้ากับธีม) */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '14px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>Add New Attraction</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <input type="text" placeholder="Name" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }}
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <textarea placeholder="Detail" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', minHeight: '80px' }}
            value={formData.detail} onChange={(e) => setFormData({...formData, detail: e.target.value})} />
          <input type="text" placeholder="Image URL (https://...)" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)' }}
            value={formData.coverimage} onChange={(e) => setFormData({...formData, coverimage: e.target.value})} />
          <button type="submit" style={{ background: '#2e7d32', color: 'white', padding: '0.8rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Save Attraction
          </button>
        </form>
      </section>

      {/* แสดงรายการการ์ด */}
      <div className="grid">
        {loading ? (
          <div className="empty">Loading attractions...</div>
        ) : rows.length === 0 ? (
          <div className="empty">No attractions found. Try adding one!</div>
        ) : (
          rows.map((item) => (
            <article key={item.id} className="card" tabIndex="0">
              <div className="media">
                <img src={item.coverimage || 'https://via.placeholder.com/400x225?text=No+Image'} alt={item.name} className="img" />
              </div>
              <div className="body">
                <h3 className="card-title">{item.name}</h3>
                <p className="detail">{item.detail}</p>
                <div className="meta">ID: <span className="code">{item.id}</span></div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}