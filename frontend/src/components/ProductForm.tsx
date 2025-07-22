import React from 'react';

export interface ProductFormData {
    title: string;
    sku: string;
    quantity: number | '';
    price: number | '';
    vendor: string;
    cost_price: number | '';
    listed_at: string;
    updated_date: string;
}

interface ProductFormProps {
    form: ProductFormData;
    setForm: React.Dispatch<React.SetStateAction<ProductFormData>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, setForm, handleSubmit }) => {
    return (
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
                onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
                required
            />
            <input
                type="number"
                placeholder="価格"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
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
                onChange={e => setForm({ ...form, cost_price: Number(e.target.value) })}
            />
            <input
                type="date"
                placeholder="出品日"
                value={form.listed_at}
                readOnly // ユーザーに編集させない場合
            />
          

            <button type="submit">登録</button>
        </form>
    );
};

export default ProductForm;
