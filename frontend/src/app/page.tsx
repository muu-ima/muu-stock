'use client';

import React, { useEffect, useState } from 'react';

type Stock = {
  id: number;
  title: string;
  sku: string | null;
  quantity: number;
  price: number;
};

export default function StockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [form, setForm] = useState({ title: '', sku: '', quantity: '', price: '' });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    fetch('http://localhost:8000/api/stocks')
      .then(res => res.json())
      .then(data => setStocks(data.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title: form.title,
      sku: form.sku || null,
      quantity: parseInt(form.quantity, 10),
      price: parseInt(form.price, 10),
    };

    try {
      const res = await fetch('http://localhost:8000/api/stocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('送信失敗');

      const newStock = await res.json();
      setStocks(prev => [...prev, newStock.data]);
      setForm({ title: '', sku: '', quantity: '', price: '' });
    } catch (err) {
      alert('登録エラーです');
      console.error(err);
    }
  };

  // 追加：削除ハンドラ
  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      const res = await fetch(`http://localhost:8000/api/stocks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('削除失敗');

      // 削除成功したらリスト更新
      setStocks(prev => prev.filter(stock => stock.id !== id));
    } catch (err) {
      alert('削除エラーです');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <h1>在庫管理システム</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
        <input
          type="text"
          placeholder="タイトル"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="SKU"
          value={form.sku}
          onChange={e => setForm({ ...form, sku: e.target.value })}
        />
        <input
          type="number"
          placeholder="数量"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="価格"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">登録</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#dbe9ff' }}>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>タイトル</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>SKU</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>数量</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>価格 (円)</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>操作</th> {/* 追加 */}
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td style={{ border: '1px solid #aaa', padding: '8px', textAlign: 'center' }}>{stock.id}</td>
              <td style={{ border: '1px solid #aaa', padding: '8px' }}>{stock.title}</td>
              <td style={{ border: '1px solid #aaa', padding: '8px' }}>{stock.sku || '-'}</td>
              <td style={{ border: '1px solid #aaa', padding: '8px', textAlign: 'right' }}>{stock.quantity}</td>
              <td style={{ border: '1px solid #aaa', padding: '8px', textAlign: 'right' }}>{stock.price.toLocaleString()}</td>
              <td style={{ border: '1px solid #aaa', padding: '8px', textAlign: 'center' }}>
                <button onClick={() => handleDelete(stock.id)} style={{ color: 'red', cursor: 'pointer' }}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
