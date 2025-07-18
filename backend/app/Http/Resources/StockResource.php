<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'sku'        => $this->sku,
            'quantity'   => $this->quantity,
            'price'      => $this->price,
            'vendor'     => $this->vendor,
            'cost_price' => $this->cost_price,
            'listed_at'  => $this->listed_at,
            'updated_date' => $this->updated_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
