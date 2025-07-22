import React from "react";

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