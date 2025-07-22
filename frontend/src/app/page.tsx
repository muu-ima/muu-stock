'use client';

import React, { useEffect, useState } from 'react';
import ProductForm, { ProductFormData } from '@/components/ProductForm';

type Stock = {
  id: number;
  title: string;
  sku: string | null;
  quantity: number;
  price: number;
  vendor: string | null;     // 仕入先
  cost_price: number;        // 仕入額
  listed_at: string | null;  // 出品日
  updated_date: string | null; // 更新日
};

export default function StockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [form, setForm] = useState({
    title: '',
    sku: '',
    quantity: '',
    price: '',
    vendor: '',
    cost_price: '',
    listed_at: '',
    updated_date: '',
  });
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    fetch('http://localhost:8000/api/stocks')
      .then(res => res.json())
      .then(data => {
        console.log('APIからのデータ:', data.data);
        setStocks(data.data);
      })
      .catch(err => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title: form.title,
      sku: form.sku || null,
      quantity: parseInt(form.quantity, 10),
      price: parseInt(form.price, 10),
      vendor: form.vendor || null,
      cost_price: parseInt(form.cost_price, 10),
      listed_at: form.listed_at || null,
      updated_date: form.updated_date || null,
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
      setForm({
        title: '',
        sku: '',
        quantity: '',
        price: '',
        vendor: '',
        cost_price: '',
        listed_at: '',
        updated_date: '',
      });

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
    <div style={{ maxWidth: 1200, padding: 20 }}>
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
        <input
          type="text"
          placeholder="仕入先"
          value={form.vendor}
          onChange={e => setForm({ ...form, vendor: e.target.value })}
        />
        <input
          type="number"
          placeholder="仕入額"
          value={form.cost_price}
          onChange={e => setForm({ ...form, cost_price: e.target.value })}
        />
        <input
          type="date"
          placeholder="出品日"
          value={form.listed_at}
          onChange={e => setForm({ ...form, listed_at: e.target.value })}
        />
        <input
          type="date"
          placeholder="更新日"
          value={form.updated_date}
          onChange={e => setForm({ ...form, updated_date: e.target.value })}
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
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>仕入先</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>仕入額</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>出品日</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>更新日</th>
            <th style={{ border: '1px solid #aaa', padding: '8px' }}>操作</th> 
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
                {stock.vendor && stock.vendor !== '' ? stock.vendor : '-'}
              </td>
              <td style={{ border: '1px solid #aaa', padding: '8px', textAlign: 'right' }}>
                {stock.cost_price !== null && stock.cost_price !== undefined && stock.cost_price !== 0
                  ? stock.cost_price.toLocaleString()
                  : '-'}
              </td>
              <td style={{ border: '1px solid #aaa', padding: '8px' }}>
                {stock.listed_at && stock.listed_at !== ''
                  ? new Date(stock.listed_at).toLocaleDateString()
                  : '-'}
              </td>
              <td style={{ border: '1px solid #aaa', padding: '8px' }}>
                {stock.updated_date && stock.updated_date !== ''
                  ? new Date(stock.updated_date).toLocaleDateString()
                  : '-'}
              </td>
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
