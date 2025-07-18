<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
    'title',
    'sku',
    'quantity',
    'price',
    'vendor',
    'cost_price',
    'listed_at',
    'updated_date',
    ];
}
