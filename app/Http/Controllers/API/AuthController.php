<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $attributes = $request->validated();

        $user = User::where('email', $attributes['email'])->first();

        if (!$user || !Hash::check($attributes['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect!'
            ], 401);
        }

        $token = $user->createToken($user->first_name . ' ' . $user->email . ' - ' .date('l jS \of F Y h:i:s A'))->plainTextToken;
        $cookie = cookie('token', $token, 60 * 24 * 7); // one week

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ])->withCookie($cookie);
    }

    public function register(RegisterRequest $request) {
        $attributes = $request->validated();
        $attributes['password'] = bcrypt($attributes['password']);

        $user = User::create($attributes);

        $token = $user->createToken($user->first_name . ' ' . $user->email . ' - ' .date('l jS \of F Y h:i:s A'))->plainTextToken;
        $cookie = cookie('token', $token, 60 * 24 * 7); // one week

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ])->withCookie($cookie);
    }


    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }


}
