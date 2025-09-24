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
    /**
     * Login user
     *
     * Authenticate user with email and password and return user data with access token.
     *
     * @group Authentication
     * @unauthenticated
     * @response 200 {
     *   "user": {
     *     "id": 1,
     *     "name": "John Doe",
     *     "email": "john@example.com",
     *     "email_verified_at": null,
     *     "created_at": "2023-01-01T00:00:00.000000Z",
     *     "updated_at": "2023-01-01T00:00:00.000000Z"
     *   },
     *   "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz1234567890"
     * }
     * @response 401 {
     *   "message": "Email or password is incorrect!"
     * }
     */
    public function login(LoginRequest $request) {
        $attributes = $request->validated();

        $user = User::where('email', $attributes['email'])->first();

        if (!$user || !Hash::check($attributes['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect!'
            ], 401);
        }

        $token = $user->createToken($user->name . ' ' . $user->email . ' - ' .date('l jS \of F Y h:i:s A'))->plainTextToken;
        $cookie = cookie('token', $token, 60 * 24 * 7); // one week

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ])->withCookie($cookie);
    }

    /**
     * Register user
     *
     * Create a new user account and return user data with access token.
     *
     * @group Authentication
     * @unauthenticated
     * @response 200 {
     *   "user": {
     *     "id": 1,
     *     "name": "John Doe",
     *     "email": "john@example.com",
     *     "email_verified_at": null,
     *     "created_at": "2023-01-01T00:00:00.000000Z",
     *     "updated_at": "2023-01-01T00:00:00.000000Z"
     *   },
     *   "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz1234567890"
     * }
     * @response 422 {
     *   "message": "The given data was invalid.",
     *   "errors": {
     *     "email": ["The email field is required."]
     *   }
     * }
     */
    public function register(RegisterRequest $request) {
        $attributes = $request->validated();
        $attributes['password'] = bcrypt($attributes['password']);

        $user = User::create($attributes);

        $token = $user->createToken($user->name . ' ' . $user->email . ' - ' .date('l jS \of F Y h:i:s A'))->plainTextToken;
        $cookie = cookie('token', $token, 60 * 24 * 7); // one week

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token
        ])->withCookie($cookie);
    }

    /**
     * Logout user
     *
     * Revoke the current user's access token and log them out.
     *
     * @group Authentication
     * @authenticated
     * @response 200 {
     *   "message": "Logged out successfully!"
     * }
     */
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }


}
