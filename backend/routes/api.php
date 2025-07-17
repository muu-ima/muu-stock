<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StockController;

Route::apiResource('stocks', StockController::class);
