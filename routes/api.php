<?php

use Illuminate\Support\Facades\Route;

// AUTH
Route::post('register', [App\Http\Controllers\API\AuthController::class, 'register']);
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // AUTH
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);

    // USER
    Route::get('/user', [App\Http\Controllers\API\UserController::class, 'user']);
});
