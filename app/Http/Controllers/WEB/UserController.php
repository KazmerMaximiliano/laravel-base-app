<?php

namespace App\Http\Controllers\WEB;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Spatie\Permission\Models\Role;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('permission:get users', only: ['index']),
            new Middleware('permission:create users', only: ['create']),
            new Middleware('permission:create users', only: ['store']),
            new Middleware('permission:edit users', only: ['edit']),
            new Middleware('permission:edit users', only: ['update']),
            new Middleware('permission:delete users', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $currentPage = $request->input('currentPage', 1);

        $users = User::paginate($pageSize, ['*'], 'page', $currentPage);

        return Inertia::render('Users/List', [
            'users' => UserResource::collection($users->items())->resolve(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->total() < $users->perPage() ? $users->total() : $users->perPage(),
                'total' => $users->total(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem(),
            ]
        ]);
    }

    public function create()
    {

        $roles = Role::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(UserRequest $request)
    {
        $data = $request->validated();

        $user = User::create($data);

        $user->assignRole($data['role']);

        return redirect()->route('users.index')->with('success', __('User created successfully.'));
    }

    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
            'roles' => $roles
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);

        $user->syncRoles([$data['role']]);

        return redirect()->route('users.index')->with('success', __('User updated successfully.'));
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', __('User deleted successfully.'));
    }
}
