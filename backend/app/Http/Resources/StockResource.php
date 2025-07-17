<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StockResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'title'     => $this->title,
            'sku'       => $this->sku,
            'quantity'  => $this->quantity,
            'price'     => $this->price,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
