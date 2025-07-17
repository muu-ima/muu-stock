<?php

// app/Http/Controllers/Api/StockController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StockResource;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //1件ずつ StockResource に通す
        return StockResource::collection(Stock::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'sku' => 'nullable|string|max:255',
                'quantity' => 'required|integer',
                'price' => 'required|integer',
            ]);
            $stock = Stock::create($validated);

            return new StockResource($stock);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        return new StockResource($stock);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        $validated = $request->validate([
         'title' => 'sometimes|required|string|max:255',
         'sku' => 'nullable|string|max:255',
         'quantity' => 'sometimes|required|integer',
         'price' => 'sometimes|required|integer',
        ]);

        $stock->update($validated);
        return new StockResource($stock);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        $stock->delete();
        return response()->noContent();
    }
}
